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
import { ClaimModal } from './ClaimModal';

export const ClaimContainer = memo(() => {
    const [balance, setBalance] = useState(0);
    const [balanceVUSD, setBalanceVUSD] = useState(0);
    const token = useSelector((state) => state.user.token);
    const [isModalOpenStake, setIsModalOpenStake] = useState(false);
    const [isModalOpenClaimed, setIsModalOpenClaimed] = useState(false);
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
    const closeModalClaim = () => setIsModalOpenClaimed(false);

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
            setBalance(Number(dataBalance.data) || 0);

            const dataBalanceVUSD = await responseBalanceVUSD.json();
            setBalanceVUSD(Number(dataBalanceVUSD.data) || 0);
        } catch (error) {
            // do nothing
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBalance();
    }, []);

    const onConnect = async () => {
        openConnectModal?.();
    };

    const onDisconnect = async () => {
        await disconnect();
    };

    const onClaimAllocate = async ({ vusd, vtru }: { vusd: number; vtru: number }) => {
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
                        basisPoints: {
                            vusdBasisPoints: vusd,
                            vtruBasisPoints: vtru,
                        },
                    }),
                });
                const responseData = await response.json();
                if (response.ok) {
                    setIsClaimed(true);

                    setTimeout(() => {
                        getBalance();
                    }, 15_000);
                } else {
                    toast.display({ type: 'error', message: responseData.message });
                }
            } catch (error) {
                const message = error instanceof Error ? error.message : error;
                console.error(message);

                toast.display({ type: 'error', message: 'An error occurred' });
            } finally {
                setLoading(false);
                closeModalClaim();
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
                claimAllocate={() => onClaimAllocate({ vtru: 0, vusd: 0 })}
                loading={loading}
                vaultCreatedAt={vaultCreatedAt}
            />

            <ClaimedModal isOpen={isClaimed} handleClose={closeModalClaimed} />

            <ClaimModal
                isOpen={isModalOpenClaimed}
                isLoading={loading}
                handleClose={closeModalClaim}
                vusd={balanceVUSD}
                vtru={balance}
                handleClaim={onClaimAllocate}
            />

            <ClaimComponent
                data={{
                    value: balance.toFixed(4),
                    symbol: 'VTRU',
                    disabled: loading || balance <= 0 || !client || (balanceVUSD <= 0 && balance <= 0),
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
                    openStakModal: () => {
                        if (balanceVUSD > 0) {
                            setIsModalOpenStake(true);
                            return;
                        }

                        onClaimAllocate({
                            vusd: 0,
                            vtru: 10_000,
                        });
                    },
                }}
            />
        </>
    );
});
