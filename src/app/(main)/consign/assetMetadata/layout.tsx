'use client';

import { ReactNode } from 'react';
import { WalletProvider } from '../../components/apps/wallet';

export default function Layout({ children }: { children: ReactNode }) {
    return <WalletProvider>{children}</WalletProvider>;
}
