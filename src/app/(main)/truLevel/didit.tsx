import { useEffect, useState, memo } from 'react';
import { createPortal } from 'react-dom';
import { Button, CircularProgress } from '@mui/material';
import { diditSessionInitThunk } from '@/features/user/thunks';
import { useDispatch, useSelector } from '@/store/hooks';
import { userActionsCreators } from '@/features/user/slice';

const DiditModal = memo(() => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const diditURL = useSelector((state) => state.user.didit?.url);
    const workflows = useSelector((state) => state.user.didit?.workflows);

    const currentWorkflowIndex = workflows?.list?.findIndex((v) => v.id === workflows.current);
    const checkApproved = workflows?.list?.[currentWorkflowIndex!]?.status === 'Approved';

    const allApproved =
        workflows?.list?.length && !workflows?.current && workflows?.list?.every((v) => v.status === 'Approved');

    const handleOpen = () => {
        if (allApproved) return;
        setOpen(true);
        dispatch(diditSessionInitThunk());
    };

    const handleClose = () => {
        setOpen(false);
        dispatch(userActionsCreators.setDiditUrl({ url: undefined }));
    };

    useEffect(() => {
        if (allApproved) handleClose();
        if (currentWorkflowIndex === -1) return;
        if (checkApproved && open) handleClose();
        if (currentWorkflowIndex! >= 2) {
            const interval = setInterval(() => {
                dispatch(diditSessionInitThunk());
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [checkApproved, currentWorkflowIndex, allApproved]);

    const modal = (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(0,0,0,0.7)',
                zIndex: 2147483647,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'auto',
            }}
        >
            {diditURL ? (
                <div
                    style={{
                        position: 'relative',
                        width: '45vw',
                        height: '80vh',
                        borderRadius: 8,
                        overflow: 'hidden',
                    }}
                >
                    <iframe src={diditURL} style={{ width: '100%', height: '100%', border: 'none' }} allowFullScreen />
                    <button
                        onClick={handleClose}
                        style={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            background: '#fff',
                            border: '1px solid #ccc',
                            borderRadius: '50%',
                            width: 32,
                            height: 32,
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            zIndex: 2,
                        }}
                        aria-label="Fechar"
                    >
                        ×
                    </button>
                </div>
            ) : (
                <CircularProgress size={64} thickness={5} color="primary" />
            )}
        </div>
    );

    return (
        <div className="App">
            <Button
                sx={{
                    backgroundColor: allApproved ? '#CCCCCC' : undefined,
                    height: '64px',
                    width: '100%',
                    fontWeight: 'bold',
                    fontSize: allApproved ? '1.4rem' : '1.5rem',
                    whiteSpace: 'nowrap',
                    color: 'white',
                    '&:hover': allApproved
                        ? {
                              backgroundColor: '#CCCCCC',
                              boxShadow: 'none',
                              cursor: 'not-allowed',
                          }
                        : undefined,
                }}
                variant="contained"
                onClick={() => handleOpen()}
            >
                {allApproved ? 'KYC Completed' : 'KYC'}
            </Button>
            {open && createPortal(modal, document.body)}
        </div>
    );
});

export default DiditModal;
