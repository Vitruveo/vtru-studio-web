'use client';
import { useSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function ConsignArtworkTemplate({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const canConsignArtwork = useSelector((state) => state.user.canConsignArtwork);

    useEffect(() => {
        if (!canConsignArtwork) {
            router.push('/home');
        }
    }, [router]);

    if (!canConsignArtwork) return;

    return <React.Fragment>{children}</React.Fragment>;
}
