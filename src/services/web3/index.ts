import axios from 'axios';
import { JsonRpcProvider, BrowserProvider, JsonRpcSigner } from 'ethers';
import type { Account, Chain, Client, Transport } from 'viem';

import { WALLET_NETWORKS } from '@/constants/wallet';
import { REDIRECTS_JSON } from '@/constants/vitruveo';
import { NODE_ENV } from '@/constants/api';

const isTestNet = WALLET_NETWORKS === 'testnet';
export const network = isTestNet ? 'testnet' : 'mainnet';

let web3_network_rpc = '';
const fetchData = async () => {
    const rowData = await axios.get(REDIRECTS_JSON);
    return rowData.data[NODE_ENV].vitruveo.web3_network_rpc;
};
fetchData().then((data) => {
    web3_network_rpc = data;
});

export const provider = new JsonRpcProvider(web3_network_rpc);

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
