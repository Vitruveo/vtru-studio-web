import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import ProgressBar, { ProgressBarProps } from '@ramonak/react-progress-bar';
import { RequestAssetUpload } from '@/features/asset/types';
import { assetActionsCreators } from '@/features/asset/slice';
import { useDispatch } from '@/store/hooks';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';

interface UploadProgressBarProps {
    fileStatus: RequestAssetUpload;
}

const UploadProgressBar = ({ fileStatus }: UploadProgressBarProps) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [toastr, setToastr] = useState<CustomizedSnackbarState>({
        type: 'success',
        open: false,
        message: '',
    });

    const { uploadProgress, status, transactionId } = fileStatus;

    const completed =
        status === 'uploading'
            ? uploadProgress || 1
            : status === 'requested'
              ? 'Preparing upload...'
              : 'Starting upload...';

    useEffect(() => {
        if (completed === 100) {
            setToastr({ open: true, type: 'success', message: 'Upload completed!' });
            setTimeout(() => {
                dispatch(assetActionsCreators.requestAssetUpload({ transactionId, status: 'completed' }));
            }, 2000);
        }
    }, [completed]);

    return (
        <>
            <ProgressBar
                height="12px"
                bgColor={theme.palette.primary.main}
                customLabelStyles={{
                    flexDirection: 'column',
                    display: 'flex',
                    fontSize: '10px',
                    textAlign: 'center',
                    justifyContent: 'center',
                    width: '100%',
                }}
                completed={completed}
            />
            <CustomizedSnackbar
                type={toastr.type}
                open={toastr.open}
                message={toastr.message}
                setOpentate={setToastr}
            />
        </>
    );
};

export default UploadProgressBar;
