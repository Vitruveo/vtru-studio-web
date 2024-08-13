'use client';
import { validateUploadedMediaThunk } from '@/features/asset/thunks';
import { useDispatch, useSelector } from '@/store/hooks';
import React, { useEffect, useState } from 'react';

export default function AssetMediaTemplate({ children }: { children: React.ReactNode }) {
    const [validated, setValidated] = useState(false);
    const dispatch = useDispatch();
    const { formats, _id } = useSelector((state) => state.asset);
    const definition = formats?.original.definition;

    useEffect(() => {
        if (formats && !validated) {
            Object.entries(formats).forEach(([key, value]) => {
                if (value.path && definition && key !== 'print' && value.validation?.isValid === false) {
                    dispatch(
                        validateUploadedMediaThunk({
                            assetId: _id,
                            media: key,
                            path: value.path,
                            orientation: definition,
                        })
                    );
                }
            });
            setValidated(true);
        }
    }, [formats, validated]);

    return <React.Fragment>{children}</React.Fragment>;
}
