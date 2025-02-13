import { useEffect } from 'react';
import { Synaps } from '@synaps-io/verify-sdk';
import { synapsSessionInitThunk, synapsIndividualSessionThunk } from '@/features/user/thunks';
import { useDispatch, useSelector } from '@/store/hooks';
import { Button } from '@mui/material';

const SynapsModal = () => {
    const dispatch = useDispatch();
    const synaps = useSelector((state) => state.user.synaps);

    const handleUpdateSynaps = () => {
        dispatch(synapsIndividualSessionThunk());
    };

    const handleOpen = () => {
        if (synaps?.sessionId) {
            Synaps.init({
                sessionId: synaps.sessionId,
                onClose: () => {
                    handleUpdateSynaps();
                },
                onFinish: () => {
                    handleUpdateSynaps();
                },
                mode: 'modal',
            });
            Synaps.show();
        } else {
            dispatch(synapsSessionInitThunk());
        }
    };

    useEffect(() => {
        if (!synaps?.sessionId) {
            dispatch(synapsSessionInitThunk());
        }
        handleUpdateSynaps();
    }, []);

    return (
        <div className="App">
            <Button
                sx={{ height: '64px', width: '100%', fontWeight: 'bold', fontSize: '1.5rem' }}
                variant="contained"
                onClick={() => handleOpen()}
            >
                KYC
            </Button>
        </div>
    );
};

export default SynapsModal;
