import { WALLET_NETWORKS, WEB3_NETWORK_RPC_ADDRESS, WEB3_PRIVATE_KEY } from '@/constants/wallet';
import { JsonRpcProvider, Contract, BrowserProvider, JsonRpcSigner, Wallet } from 'ethers';
import type { Account, Chain, Client, Transport } from 'viem';

import schema from '../../../../services/web3/contracts.json';

const isTestNet = WALLET_NETWORKS === 'testnet';
export const network = isTestNet ? 'testnet' : 'mainnet';

export const provider = new JsonRpcProvider(WEB3_NETWORK_RPC_ADDRESS);
const signerWallet = new Wallet(WEB3_PRIVATE_KEY, provider);

type MainnetKeys = keyof (typeof schema)['mainnet'];
type TestnetKeys = keyof (typeof schema)['testnet'];

const getContractAddress = (name: MainnetKeys | TestnetKeys) => schema[network][name];

export const VUSD = new Contract(getContractAddress('VUSD'), schema.abi.VUSD, signerWallet);

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
