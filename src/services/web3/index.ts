import { JsonRpcProvider, BrowserProvider, JsonRpcSigner } from 'ethers';
import type { Account, Chain, Client, Transport } from 'viem';

import { WALLET_NETWORKS, WEB3_NETWORK_RPC_ADDRESS } from '@/constants/wallet';

const isTestNet = WALLET_NETWORKS === 'testnet';
export const network = isTestNet ? 'testnet' : 'mainnet';

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
