import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WALLET_APP_NAME, WALLET_NETWORKS, WALLET_PROJECT_ID, WEB3_NETWORK_RPC_ADDRESS } from '@/constants/wallet';
import '@rainbow-me/rainbowkit/styles.css';
import { EXPLORER_URL } from '@/constants/explorer';

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
        public: { http: [WEB3_NETWORK_RPC_ADDRESS] },
        default: { http: [WEB3_NETWORK_RPC_ADDRESS] },
    },
    blockExplorers: {
        default: { name: 'VitruveoScan', url: EXPLORER_URL },
        etherscan: { name: 'VitruveoScan', url: EXPLORER_URL },
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
        public: { http: [WEB3_NETWORK_RPC_ADDRESS] },
        default: { http: [WEB3_NETWORK_RPC_ADDRESS] },
    },
    blockExplorers: {
        default: { name: 'VitruveoScan', url: EXPLORER_URL },
        etherscan: { name: 'VitruveoScan', url: EXPLORER_URL },
    },
    testnet: true,
};

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
