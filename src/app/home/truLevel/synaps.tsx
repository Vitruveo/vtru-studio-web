import { useEffect } from 'react';
import { Synaps } from '@synaps-io/verify-sdk';
import { synapsSessionInitThunk, synapsIndividualSessionThunk } from '@/features/user/thunks';
import { useDispatch, useSelector } from '@/store/hooks';
import { Box, Button, Typography } from '@mui/material';

const stepsNames = {
    LIVENESS: '1. Face Scan',
    ID_DOCUMENT: '2. ID Document',
    PROOF_OF_ADDRESS: '3. Proof of Address',
    PHONE: '4. Phone number',
};

const SynapsModal = () => {
    const dispatch = useDispatch();
    const synaps = useSelector((state) => state.user.synaps);

    const completedlevel = synaps?.steps?.filter((step) => step.status === 'APPROVED');
    const pendingVerifylevel = synaps?.steps?.filter((step) => step.status === 'PENDING_VERIFICATION');
    const stepsRequiringSubmission = synaps?.steps?.filter((step) => step.status === 'SUBMISSION_REQUIRED');

    const handleOpen = () => {
        if (synaps?.sessionId) {
            Synaps.init({
                sessionId: synaps.sessionId,
                onClose: () => {
                    dispatch(synapsIndividualSessionThunk());
                },
                onFinish: () => {
                    dispatch(synapsIndividualSessionThunk());
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
        } else {
            dispatch(synapsIndividualSessionThunk());
        }
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
