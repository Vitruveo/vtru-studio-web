import { useEffect } from 'react';
import { Synaps } from '@synaps-io/verify-sdk';
import { synapsSessionInitThunk } from '@/features/user/thunks';
import { useDispatch, useSelector } from '@/store/hooks';

const SynapsModal = () => {
    const dispatch = useDispatch();
    const synaps = useSelector((state) => state.user.synaps);

    const handleOpen = ({ sessionId }: { sessionId: string }) => {
        Synaps.init({
            sessionId: sessionId,
            onClose: () => {},
            onFinish: () => {
                alert('Verification finished');
            },
            mode: 'modal',
        });
        Synaps.show();
    };

    useEffect(() => {
        if (synaps?.sessionId) {
            handleOpen({ sessionId: synaps.sessionId });
        } else {
            dispatch(synapsSessionInitThunk());
        }
    }, [synaps?.sessionId]);

    return (
        <div className="App">
            <button onClick={handleOpen}>Start verification</button>
        </div>
    );
};

export default SynapsModal;
