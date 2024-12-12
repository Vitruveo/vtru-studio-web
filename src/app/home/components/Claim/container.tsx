import { memo, useEffect, useState } from 'react';
import { useAccount, useDisconnect, useWalletClient } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/navigation';

import { BASE_URL_BATCH } from '@/constants/api';
import { useSelector } from '@/store/hooks';
import { useToastr } from '@/app/hooks/useToastr';

import { createSignedMessage } from './actions';
import { ClaimComponent } from './components';
import StakeModal from './StakeModal';
import ClaimedModal from './ClaimedModal';

export const ClaimContainer = memo(() => {
    const [balance, setBalance] = useState(0);
    const token = useSelector((state) => state.user.token);
    const [isModalOpenStake, setIsModalOpenStake] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const [isClaimed, setIsClaimed] = useState(false);

    const { isConnected, address } = useAccount();
    const { data: client } = useWalletClient();
    const { disconnect } = useDisconnect();
    const { openConnectModal } = useConnectModal();

    const router = useRouter();
    const toast = useToastr();

    const vaultTransactionHash = useSelector((state) => state?.user?.vault?.transactionHash);
    const wallets = useSelector((state) => state.user.wallets);

    const closeModalStake = () => setIsModalOpenStake(false);
    const closeModalClaimed = () => setIsClaimed(false);

    useEffect(() => {
        const getBalance = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${BASE_URL_BATCH}/wallet/balance`, {
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                });

                const data = await response.json();

                if (response.status === 403 && data.code === 'vitruveo.batch.api.balance.disabled') {
                    setIsBlocked(true);
                    return;
                }

                setBalance(Number(data.data));
            } catch (error) {
                // do nothing
            } finally {
                setLoading(false);
            }
        };
        getBalance();
    }, []);

    const onConnect = async () => {
        openConnectModal?.();
    };

    const onDisconnect = async () => {
        await disconnect();
    };

    const onClaimAllocate = async (values: number[]) => {
        const total = values.reduce((acc, cur) => acc + cur, 0);
        if (total !== 100) {
            toast.display({ type: 'warning', message: 'The total percentage must be 100%' });
            return;
        }
        if (wallets.find((wallet) => !wallet.archived && wallet.address === address)) {
            setLoading(true);
            try {
                const [walletBasisPoints, stake1BasisPoints, stake3BasisPoints, stake5BasisPoints, vibeBasisPoints] =
                    values;
                const { domain, signedMessage, signer, tx, types } = await createSignedMessage({
                    name: 'Creator Vault',
                    action: 'Claim $VTRU earnings from Vault',
                    method: 'claimWithAllocateStudio',
                    client: client!,
                });
                // Send the signed message to backend
                const response = await fetch(`${BASE_URL_BATCH}/claim/allocate`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        signer: signer.address,
                        basisPoints: {
                            walletBasisPoints,
                            stake1BasisPoints,
                            stake3BasisPoints,
                            stake5BasisPoints,
                            vibeBasisPoints,
                        },
                        domain,
                        types,
                        tx,
                        signedMessage,
                    }),
                });
                const responseData = await response.json();
                if (response.ok) {
                    setIsClaimed(true);
                } else {
                    toast.display({ type: 'error', message: responseData.message });
                }
            } catch (error) {
                const message = error instanceof Error ? error.message : error;
                console.error(message);

                toast.display({ type: 'error', message: 'An error occurred' });
            } finally {
                setLoading(false);
                closeModalStake();
            }
        } else {
            toast.display({ type: 'warning', message: 'Add the wallet to your profile before' });
            await onDisconnect();
            router.push('/home/myProfile');
        }
    };

    return (
        <>
            <StakeModal
                isOpen={isModalOpenStake}
                handleClose={closeModalStake}
                available={balance}
                claimAllocate={onClaimAllocate}
                loading={loading}
            />

            <ClaimedModal isOpen={isClaimed} handleClose={closeModalClaimed} />

            <ClaimComponent
                data={{
                    value: balance.toFixed(4),
                    symbol: 'VTRU',
                    disabled: loading || balance <= 0 || !client,
                    isConnected,
                    address,
                    vaultTransactionHash,
                    loading,
                    isBlocked,
                }}
                actions={{
                    onConnect,
                    onDisconnect,
                    openStakModal: () => setIsModalOpenStake(true),
                }}
            />
        </>
    );
});
