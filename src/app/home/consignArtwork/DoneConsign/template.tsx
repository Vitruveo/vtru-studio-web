'use client';
import { useSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function DoneConsignTemplate({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const reviewAndConsign = useSelector((state) => state.consignArtwork.completedSteps.reviewAndConsign);

    const isCompleted = reviewAndConsign.status === 'completed'
    
    useEffect(() => {
        if (!isCompleted) {
            router.push('/home/consignArtwork/reviewAndConsign');
        }
    }, [router]);

    if (!isCompleted) return;

    return <React.Fragment>{children}</React.Fragment>;
}
