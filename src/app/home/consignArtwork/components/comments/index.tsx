import { getRequestConsignCommentsThunk } from '@/features/asset/thunks';
import { useDispatch, useSelector } from '@/store/hooks';
import { formatDate } from '@/utils/formatDate';
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
        <Box width={'40vw'}>
            <Typography variant="h5" mb={1}>
                Moderator&apos;s Note
            </Typography>
            <Box>
                {comments?.map((comment) => (
                    <Box
                        key={comment.id}
                        display="flex"
                        flexDirection="column"
                        p={2}
                        border="2px solid #47D7BC"
                        borderRadius={2}
                        mb={1}
                    >
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="body1" flexGrow={1} mr={2}>
                                {comment.comment}
                            </Typography>
                            <Typography variant="caption" flexShrink={0}>
                                {formatDate(comment.when)}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
