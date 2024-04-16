import { darkTheme, getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from '@wagmi/core';

import { WagmiProvider } from 'wagmi';
import { bsc, bscTestnet, goerli, mainnet } from 'wagmi/chains';

const PROJECT_ID = 'e35af8e9cf766036d44374c2bd11ebbe';
const APP_NAME = 'vitruveo.studio';
const VITE_PUBLIC_ENV = 'testnet';

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
        public: { http: ['https://rpc.vitruveo.xyz/'] },
        default: { http: ['https://rpc.vitruveo.xyz/'] },
    },
    blockExplorers: {
        default: { name: 'VitruveoScan', url: 'https://explorer.vitruveo.xyz' },
        etherscan: { name: 'VitruveoScan', url: 'https://explorer.vitruveo.xyz' },
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
        public: { http: ['https://test-rpc.vitruveo.xyz/'] },
        default: { http: ['https://test-rpc.vitruveo.xyz/'] },
    },
    blockExplorers: {
        default: { name: 'VitruveoScan', url: 'https://test-explorer.vitruveo.xyz' },
        etherscan: { name: 'VitruveoScan', url: 'https://test-explorer.vitruveo.xyz' },
    },
    testnet: false,
};

export const config = getDefaultConfig({
    appName: APP_NAME,
    projectId: PROJECT_ID,
    chains: VITE_PUBLIC_ENV == 'mainnet' ? [mainnet, bsc, vitruveoMainnet] : [bscTestnet, vitruveoTestnet],
    ssr: false,
    transports:
        VITE_PUBLIC_ENV == 'mainnet'
            ? { [mainnet.id]: http(), [bsc.id]: http(), [vitruveoMainnet.id]: http() }
            : { [bscTestnet.id]: http(), [vitruveoTestnet.id]: http() },
});

const queryClient = new QueryClient();

interface Props {
    children: React.ReactNode;
}

export function WalletProvider({ children }: Props) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={darkTheme()}>{children}</RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
