'use client';

import { useRouter } from 'next/navigation';
import { getStoreByIdThunk } from '@/features/stores/thunks';
import { useDispatch, useSelector } from '@/store/hooks';
import { Box } from '@mui/material';
import { useEffect } from 'react';

export default function ReviewAndPublishLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const { publishStore, selectedStore } = useSelector((state) => state.stores);

    useEffect(() => {
        dispatch(getStoreByIdThunk(selectedStore.id));
    }, [selectedStore]);

    useEffect(() => {
        const reviewAndPublishAvailable = Object.values(publishStore || {})
            .filter((value) => !value.optional)
            .every((value) => value.status === 'Completed');

        if (!reviewAndPublishAvailable) {
            router.push('/stores');
        }
    }, [publishStore]);

    return <Box>{children}</Box>;
}
