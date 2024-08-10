import { getRequestConsignCommentsThunk } from '@/features/asset/thunks';
import { useDispatch, useSelector } from '@/store/hooks';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';

interface CommentsProps {
    assetId: string;
}
export default function Comments({ assetId }: CommentsProps) {
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.asset.comments);

    useEffect(() => {
        dispatch(getRequestConsignCommentsThunk({ id: assetId }));
    }, [assetId]);

    if (comments?.length === 0) return;

    return (
        <Box>
            <Typography variant="h6">Moderator&apos;s Note</Typography>
            <Typography variant="body1">{assetId}</Typography>
            <Box>
                {comments?.map((comment) => (
                    <Box key={comment.id}>
                        <Typography variant="body1">{comment.comment}</Typography>
                        <Typography variant="caption">{comment.when}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
