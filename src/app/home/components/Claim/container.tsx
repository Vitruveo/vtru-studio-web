import { useAccount, useConnectorClient } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { ClaimComponent } from './components';
import { createSignedMessage } from './actions';
import { BASE_URL_BATCH } from '@/constants/api';
import { useEffect, useState } from 'react';
import { useToastr } from '@/app/hooks/useToastr';
import { useSelector } from '@/store/hooks';

export const ClaimContainer = () => {
    const { isConnected } = useAccount();
    const [balance, setBalance] = useState(0);
    const toastr = useToastr();
    const { data: client } = useConnectorClient();
    const { openConnectModal } = useConnectModal();
    const token = useSelector((state) => state.user.token);

    useEffect(() => {
        const getBalance = async () => {
            try {
                const response = await fetch(`${BASE_URL_BATCH}/wallet/balance`, {
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                });

                const { data } = (await response.json()) as { data: string };

                setBalance(Number(data));
            } catch {
                toastr.display({
                    type: 'error',
                    message: 'Failed to get balance',
                });
            }
        };
        getBalance();
    }, []);

    const onConnect = async () => {
        openConnectModal?.();
    };

    const onClaim = async () => {
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
                alert('Transaction submitted successfully');
            } else {
                throw new Error(responseData.error);
            }
        } catch (error) {
            console.error('Transaction failed:', error);
        }
    };

    return (
        <ClaimComponent
            data={{
                value: balance.toFixed(4),
                symbol: 'VTRU',
                disabled: balance <= 0 || !client,
                isConnected,
            }}
            actions={{
                onClaim,
                onConnect,
            }}
        />
    );
};
