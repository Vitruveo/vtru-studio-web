import { useState } from 'react';
import { IconBrandX } from '@tabler/icons-react';
import { removeSocialThunk, requestSocialXThunk } from '@/features/user/thunks';
import { Avatar, Box, Button, IconButton, Theme, Typography, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from '@/store/hooks';

const sizes = {
    width: '25px',
    height: '25px',
};

const Socials = () => {
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();
    const { x } = useSelector((state) => state.user.socials);

    const xl = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'));

    return (
        <Box maxWidth={!xl ? 300 : 400}>
            <Typography variant="subtitle1" fontWeight={600} style={{ width: '70%' }}>
                Socials
            </Typography>
            <Box display="grid" gridTemplateColumns="50px 50px 50px">
                <Box>
                    {!x.avatar && (
                        <IconButton onClick={() => dispatch(requestSocialXThunk())}>
                            <IconBrandX />
                        </IconButton>
                    )}
                </Box>
            </Box>
            <Box>
                <Box>
                    {x.avatar && (
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Box display="flex" alignItems="center" gap={1}>
                                <IconButton onClick={() => setShow(true)}>
                                    <Avatar sx={sizes} src={x.avatar} />
                                </IconButton>
                                <Typography width="100%">{x.name}</Typography>
                            </Box>
                            <Button
                                variant="contained"
                                size="small"
                                sx={{ minWidth: 102 }}
                                onClick={() => dispatch(removeSocialThunk({ social: 'x' }))}
                            >
                                Disconnect
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};
export default Socials;
