import { useEffect, useState, memo } from 'react';
import { createPortal } from 'react-dom';
import { Button, CircularProgress } from '@mui/material';
import { diditSessionInitThunk } from '@/features/user/thunks';
import { useDispatch, useSelector } from '@/store/hooks';

const DiditModal = memo(() => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const diditURL = useSelector((state) => state.user.didit?.url);
    const workflows = useSelector((state) => state.user.didit?.workflows);

    const isApproved = workflows?.list?.some((v) => v.id === workflows.current && v.status === 'Approved');
    console.log(diditURL, open, isApproved);

    const handleOpen = () => {
        if (isApproved) return;
        if (diditURL) {
            setOpen(true);
        } else {
            dispatch(diditSessionInitThunk());
        }
    };

    useEffect(() => {
        dispatch(diditSessionInitThunk());
        if (isApproved) setOpen(false);
        if (isApproved || !open) return;
    }, [isApproved, open]);

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
                        onClick={() => setOpen(false)}
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
                    backgroundColor: isApproved ? '#CCCCCC' : undefined,
                    height: '64px',
                    width: '100%',
                    fontWeight: 'bold',
                    fontSize: isApproved ? '1.4rem' : '1.5rem',
                    whiteSpace: 'nowrap',
                    color: 'white',
                    '&:hover': isApproved
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
                {isApproved ? 'KYC Completed' : 'KYC'}
            </Button>
            {open && createPortal(modal, document.body)}
        </div>
    );
});

export default DiditModal;
