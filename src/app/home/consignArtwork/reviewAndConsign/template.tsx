'use client';
import { useSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function ReviewAndConsignTemplate({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const steps = useSelector((state) => state.consignArtwork.completedSteps);

    const isCompleted = Object.values(steps).every((step) => step.status === 'completed');

    useEffect(() => {
        if (!isCompleted) {
            router.push('/home');
        }
    }, [router]);

    if (!isCompleted) return;

    return <React.Fragment>{children}</React.Fragment>;
}
