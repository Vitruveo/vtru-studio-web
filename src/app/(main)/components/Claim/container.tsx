import { memo, useEffect, useState } from 'react';
import { useAccount, useDisconnect, useWalletClient } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/navigation';

import { BASE_URL_API3 } from '@/constants/api';
import { useSelector } from '@/store/hooks';
import { useToastr } from '@/app/hooks/useToastr';

import { createSignedMessage } from './actions';
import { ClaimComponent } from './components';
import StakeModal from './StakeModal';
import ClaimedModal from './ClaimedModal';
import { CLAIM_VERSE_ENABLE } from '@/constants/claim';

export const ClaimContainer = memo(() => {
    const [balance, setBalance] = useState(0);
    const [balanceVUSD, setBalanceVUSD] = useState(0);
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

    const vaultAddress = useSelector((state) => state?.user?.vault?.vaultAddress);
    const vaultCreatedAt = useSelector((state) => state?.user?.vault?.createdAt);
    const wallets = useSelector((state) => state.user.wallets);

    const closeModalStake = () => setIsModalOpenStake(false);
    const closeModalClaimed = () => setIsClaimed(false);

    useEffect(() => {
        const getBalance = async () => {
            setLoading(true);
            try {
                const [responseBalance, responseBalanceVUSD] = await Promise.all([
                    fetch(`${BASE_URL_API3}/wallet/balance`, {
                        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                    }),
                    fetch(`${BASE_URL_API3}/wallet/balanceVUSD`, {
                        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                    }),
                ]);

                const dataBalance = await responseBalance.json();
                if (responseBalance.status === 403 && dataBalance.code === 'vitruveo.batch.api.balance.disabled') {
                    setIsBlocked(true);
                    return;
                }
                setBalance(Number(dataBalance.data));

                const dataBalanceVUSD = await responseBalanceVUSD.json();
                setBalanceVUSD(Number(dataBalanceVUSD.data));
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

    const onClaimAllocate = async () => {
        if (wallets.find((wallet) => !wallet.archived && wallet.address === address)) {
            setLoading(true);
            try {
                const { domain, signedMessage, signer, tx, types } = await createSignedMessage({
                    name: 'Creator Vault',
                    action: 'Claim $VTRU earnings from Vault',
                    method: 'claimStudio',
                    client: client!,
                });
                // Send the signed message to backend
                const response = await fetch(`${BASE_URL_API3}/claim`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        signer: signer.address,
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
            router.push('/profile');
        }
    };

    return (
        <>
            <StakeModal
                isOpen={isModalOpenStake}
                handleClose={closeModalStake}
                available={Math.trunc(balance)}
                claimAllocate={onClaimAllocate}
                loading={loading}
                vaultCreatedAt={vaultCreatedAt}
            />

            <ClaimedModal isOpen={isClaimed} handleClose={closeModalClaimed} />

            <ClaimComponent
                data={{
                    value: balance.toFixed(4),
                    symbol: 'VTRU',
                    disabled: loading || balance <= 0 || !client,
                    isConnected,
                    address,
                    vaultAddress,
                    loading,
                    isBlocked,
                    VUSD: {
                        value: balanceVUSD.toFixed(2),
                        symbol: 'VUSD',
                    },
                }}
                actions={{
                    onConnect,
                    onDisconnect,
                    openStakModal: onClaimAllocate,
                }}
            />
        </>
    );
});
