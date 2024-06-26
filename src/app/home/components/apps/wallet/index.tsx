import { darkTheme, RainbowKitProvider, connectorsForWallets } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { walletConnectWallet, metaMaskWallet, coinbaseWallet, rainbowWallet } from '@rainbow-me/rainbowkit/wallets';
import { WALLET_APP_NAME, WALLET_NETWORKS, WALLET_PROJECT_ID } from '@/constants/wallet';
import '@rainbow-me/rainbowkit/styles.css';

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

const { chains, publicClient } = configureChains(
    WALLET_NETWORKS === 'mainnet' ? [vitruveoMainnet] : [vitruveoTestnet],
    [publicProvider()]
);

const walletDefaultOptions = {
    projectId: WALLET_PROJECT_ID,
    chains,
};

const connectors = connectorsForWallets([
    {
        groupName: 'Recommended',
        wallets: [
            metaMaskWallet({ ...walletDefaultOptions, UNSTABLE_shimOnConnectSelectAccount: true }),
            coinbaseWallet({ appName: WALLET_APP_NAME, chains }),
            walletConnectWallet(walletDefaultOptions),
            rainbowWallet(walletDefaultOptions),
        ],
    },
]);

export const config = createConfig({
    autoConnect: false,
    connectors,
    publicClient,
});

const queryClient = new QueryClient();

interface Props {
    children: React.ReactNode;
}

export function WalletProvider({ children }: Props) {
    return (
        <WagmiConfig config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider chains={chains} theme={darkTheme()} appInfo={{ appName: WALLET_APP_NAME }}>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiConfig>
    );
}
