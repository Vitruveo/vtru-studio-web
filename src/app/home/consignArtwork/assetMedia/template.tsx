'use client';
import { validateUploadedMediaThunk } from '@/features/asset/thunks';
import { useDispatch, useSelector } from '@/store/hooks';
import React, { useEffect, useState } from 'react';

export default function AssetMediaTemplate({ children }: { children: React.ReactNode }) {
    const [validated, setValidated] = useState(false);
    const dispatch = useDispatch();
    const formats = useSelector((state) => state.asset.formats);
    const definition = formats?.original.definition;

    useEffect(() => {
        if (formats && !validated) {
            Object.entries(formats).forEach(([key, value]) => {
                if (key === 'print') return;
                const data = {
                    media: key,
                    path: value.path || '',
                    orientation: definition || '',
                };
                dispatch(validateUploadedMediaThunk(data));
            });
            setValidated(true);
        }
    }, [formats, validated]);

    return <React.Fragment>{children}</React.Fragment>;
}
