'use client';
import { useSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function ReviewAndConsignTemplate({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const steps = useSelector((state) => state.consignArtwork.completedSteps);

    // auxilaryMedia is optional so we don't need to check for it
    // reviewAndConsign is the last step so we don't need to check for it
    const isCompleted =
        steps.assetMedia.status === 'completed' &&
        steps.assetMetadata.status === 'completed' &&
        steps.licenses.status === 'completed' &&
        steps.termsOfUse.status === 'completed';

    useEffect(() => {
        if (!isCompleted) {
            router.push('/consign');
        }
    }, [router]);

    if (!isCompleted) return;

    return <React.Fragment>{children}</React.Fragment>;
}
