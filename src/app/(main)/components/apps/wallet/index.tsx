import { WagmiProvider } from 'wagmi';
import axios from 'axios';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WALLET_APP_NAME, WALLET_NETWORKS, WALLET_PROJECT_ID } from '@/constants/wallet';
import '@rainbow-me/rainbowkit/styles.css';
import { REDIRECTS_JSON } from '@/constants/vitruveo';

interface EtheriumProviderProps {
    children: React.ReactNode;
}

const vitruveoMainnet = {
    id: 1490,
    name: 'Vitruveo Mainnet',
    network: 'vitruveo',
    iconUrl: '/v-icon.png',
    iconBackground: '#000',
    nativeCurrency: {
        decimals: 18,
        name: 'Vitruveo',
        symbol: 'VTRU',
    },
    rpcUrls: {
        public: { http: [''] },
        default: { http: [''] },
    },
    blockExplorers: {
        default: { name: 'VitruveoScan', url: '' },
        etherscan: { name: 'VitruveoScan', url: '' },
    },
    testnet: false,
};

const vitruveoTestnet = {
    id: 14333,
    name: 'Vitruveo Testnet',
    network: 'vitruveo-testnet',
    iconUrl: '/v-icon.png',
    iconBackground: '#000',
    nativeCurrency: {
        decimals: 18,
        name: 'Vitruveo Testnet',
        symbol: 'tVTRU',
    },
    rpcUrls: {
        public: { http: [''] },
        default: { http: [''] },
    },
    blockExplorers: {
        default: { name: 'VitruveoScan', url: '' },
        etherscan: { name: 'VitruveoScan', url: '' },
    },
    testnet: true,
};

const fetchRedirects = async () => {
    const rowData = await axios.get(REDIRECTS_JSON);
    return rowData.data;
};
fetchRedirects().then((data) => {
    const updateNetwork = (network: any, env: string) => {
        network.blockExplorers.default.url = data[env].vitruveo.explorer_url;
        network.blockExplorers.etherscan.url = data[env].vitruveo.explorer_url;
        network.rpcUrls.public.http[0] = data[env].vitruveo.web3_network_rpc;
        network.rpcUrls.default.http[0] = data[env].vitruveo.web3_network_rpc;
    };
    updateNetwork(vitruveoMainnet, 'production');
    updateNetwork(vitruveoTestnet, 'qa');
});

export const config = getDefaultConfig({
    appName: WALLET_APP_NAME,
    projectId: WALLET_PROJECT_ID,
    chains: WALLET_NETWORKS == 'mainnet' ? [vitruveoMainnet] : [vitruveoTestnet],
});

export function WalletProvider({ children }: EtheriumProviderProps) {
    const queryClient = new QueryClient();
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>{children}</RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
