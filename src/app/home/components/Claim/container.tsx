import { useAccount, useConnectorClient, useBalance } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { BigNumber } from '@ethersproject/bignumber';

import { ClaimComponent } from './components';
import { clientToSigner, provider } from './actions';
import { BASE_URL_BATCH } from '@/constants/api';

export const ClaimContainer = () => {
    const { isConnected, address, chain, status } = useAccount();
    const { data: client } = useConnectorClient();
    const { openConnectModal } = useConnectModal();
    const { data: balance } = useBalance({
        address,
    });

    const onConnect = async () => {
        openConnectModal?.();
    };

    const onClaim = async () => {
        try {
            const signer = clientToSigner(client!);

            const domain = {
                name: 'Vitruveo Studio',
                version: '1',
                chainId: Number((await provider.getNetwork()).chainId),
            };

            const types = {
                Transaction: [
                    { name: 'name', type: 'string' },
                    { name: 'action', type: 'string' },
                    { name: 'method', type: 'string' },
                    { name: 'timestamp', type: 'uint' },
                ],
            };

            const tx = {
                name: 'Creator Vault',
                action: 'Claim $VTRU earnings from Vault',
                method: 'claimStudio',
                timestamp: Math.floor(Date.now() / 1000),
            };

            // Sign the message
            const signedMessage = await signer.signTypedData(domain, types, tx);

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
                value: balance?.formatted ? Number(balance?.formatted).toFixed(4) : '',
                symbol: balance?.symbol || '',
                disabled: !client,
                isConnected,
            }}
            actions={{
                onClaim,
                onConnect,
            }}
        />
    );
};
