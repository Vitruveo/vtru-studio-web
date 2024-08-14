import { getRequestConsignCommentsThunk } from '@/features/asset/thunks';
import { useDispatch, useSelector } from '@/store/hooks';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { format } from 'date-fns';

interface CommentsProps {
    assetId: string;
}
export default function Comments({ assetId }: CommentsProps) {
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.asset.comments || []);

    useEffect(() => {
        dispatch(getRequestConsignCommentsThunk({ id: assetId }));
    }, [assetId]);

    if (comments?.length === 0) return;

    return (
        <Box marginBlock={3}>
            <Typography variant="h5" mb={1}>
                Moderator&apos;s Note
            </Typography>
            <Box>
                {[...comments]
                    .sort((a, b) => new Date(b.when).getTime() - new Date(a.when).getTime())
                    .map((comment) => (
                        <Box
                            key={comment.id}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            gap={1}
                            flexDirection="row"
                            p={2}
                            borderRadius={1}
                            mb={1}
                            boxShadow={'0 0 1px 0 rgba(0,0,0,0.31),0 11px 20px -8px rgba(0,0,0,0.25)'}
                        >
                            <Typography variant="caption" flexShrink={0}>
                                {format(new Date(comment.when), 'dd/MM/yyyy HH:mm')}
                                {': '}
                            </Typography>
                            <Typography variant="caption" flexGrow={1} mr={2}>
                                {comment.comment}
                            </Typography>
                        </Box>
                    ))}
            </Box>
        </Box>
    );
}
