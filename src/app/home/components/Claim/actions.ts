import { WEB3_NETWORK_RPC_ADDRESS } from '@/constants/wallet';
import { JsonRpcProvider, Contract, BrowserProvider, JsonRpcSigner } from 'ethers';
import type { Account, Chain, Client, Transport } from 'viem';

export const provider = new JsonRpcProvider(WEB3_NETWORK_RPC_ADDRESS);

export const clientToSigner = (client: Client<Transport, Chain, Account>) => {
    const { account, chain, transport } = client;
    const networkClient = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
    };
    const providerClient = new BrowserProvider(transport, networkClient);
    const signer = new JsonRpcSigner(providerClient, account.address);
    return signer;
};

export const createSignedMessage = async ({
    name,
    action,
    method,
    client,
}: {
    name: string;
    action: string;
    method: string;
    client: Client<Transport, Chain, Account>;
}) => {
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
        name,
        action,
        method,
        timestamp: Math.floor(Date.now() / 1000),
    };

    const signedMessage = await signer.signTypedData(domain, types, tx);

    return {
        domain,
        types,
        tx,
        signedMessage,
        signer,
    };
};
