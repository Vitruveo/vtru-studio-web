import { useAccount, useDisconnect, useWalletClient, useConnect } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { ClaimComponent } from './components';
import { createSignedMessage } from './actions';
import { BASE_URL_BATCH } from '@/constants/api';
import { useEffect, useState } from 'react';
import { useSelector } from '@/store/hooks';
import ClaimedModal from './ClaimedModal';
import StakeModal from './StakeModal';
import { useToastr } from '@/app/hooks/useToastr';
import { useRouter } from 'next/navigation';

export const ClaimContainer = () => {
    const [balance, setBalance] = useState(0);
    const token = useSelector((state) => state.user.token);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);

    const { isConnected, address } = useAccount();
    const { data: client } = useWalletClient();
    const { disconnect } = useDisconnect();
    const { openConnectModal } = useConnectModal();

    const router = useRouter();
    const toast = useToastr();

    const vaultTransactionHash = useSelector((state) => state?.user?.vault?.transactionHash);
    const wallets = useSelector((state) => state.user.wallets);

    const closeModal = () => {
        setIsModalOpen(false);
    };

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

    const onClaim = async () => {
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
                const response = await fetch(`${BASE_URL_BATCH}/claim`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ signer: signer.address, domain, types, tx, signedMessage }),
                });
                const responseData = await response.json();
                if (response.ok) {
                    setIsModalOpen(true);
                } else {
                    throw new Error(responseData.error);
                }
            } catch (error) {
                // do nothing
            } finally {
                setLoading(false);
            }
        } else {
            toast.display({ type: 'warning', message: 'Add the wallet to your profile before' });
            await onDisconnect();
            router.push('/home/myProfile');
        }
    };

    return (
        <>
            <ClaimedModal isOpen={isModalOpen} handleClose={closeModal} />
            <StakeModal isOpen={true} handleClose={closeModal} available={balance} />
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
                    onClaim,
                    onConnect,
                    onDisconnect,
                }}
            />
        </>
    );
};
