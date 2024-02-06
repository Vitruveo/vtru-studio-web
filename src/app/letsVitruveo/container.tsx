'use client';
import { useState } from 'react';

import LetsView from './view';

import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';

const LetsVitruveo = () => {
    const [toastr, setToastr] = useState<CustomizedSnackbarState>({ type: 'success', open: false, message: '' });

    return (
        <>
            <LetsView />
            <CustomizedSnackbar
                type={toastr.type}
                open={toastr.open}
                message={toastr.message}
                setOpentate={setToastr}
            />
        </>
    );
};

export default LetsVitruveo;
