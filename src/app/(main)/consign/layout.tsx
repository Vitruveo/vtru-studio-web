'use client';
import React from 'react';
import { useSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';

export default function ConsignArtworkLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const canConsign = useSelector((state) => state.user.canConsignArtwork);

    if (!canConsign) router.push('/home');

    return children;
}
