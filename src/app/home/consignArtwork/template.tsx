'use client';
import { useSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function ConsignArtworkTemplate({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const canConsignArtwork = useSelector((state) => state.user.canConsignArtwork);
    const status = useSelector((state) => state.asset.consignArtwork?.status);

    useEffect(() => {
        if (!canConsignArtwork) {
            router.push('/home');
        }
        if (status === 'pending') {
            router.push('/home/consignArtwork/reviewAndConsign');
        }
    }, [router, status]);

    if (!canConsignArtwork) return;

    return <React.Fragment>{children}</React.Fragment>;
}
