import {
    removeSocialThunk,
    requestSocialFacebookThunk,
    requestSocialGoogleThunk,
    requestSocialXThunk,
} from '@/features/user/thunks';
import { useDispatch, useSelector } from '@/store/hooks';
import { Avatar, Box, Button, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { IconBrandInstagram, IconBrandYoutube, IconBrandX } from '@tabler/icons-react';
import { useState } from 'react';

const sizes = {
    width: '25px',
    height: '25px',
};

const Socials = () => {
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();
    const { x, facebook, google } = useSelector((state) => state.user.socials);

    return (
        <Box>
            <Box display="grid" gridTemplateColumns="50px 50px 50px">
                <Box>
                    <IconButton>
                        <IconBrandYoutube onClick={() => dispatch(requestSocialGoogleThunk())} />
                    </IconButton>
                </Box>

                <Box>
                    <IconButton onClick={() => dispatch(requestSocialXThunk())}>
                        <IconBrandX />
                    </IconButton>
                </Box>

                <Box>
                    <IconButton>
                        <IconBrandInstagram onClick={() => dispatch(requestSocialFacebookThunk())} />
                    </IconButton>
                </Box>
            </Box>
            <Box display="grid" gridTemplateColumns="50px 50px 50px">
                <Box>
                    {google.avatar && (
                        <IconButton onClick={() => setShow(true)}>
                            <Avatar sx={sizes} src={google.avatar} />
                        </IconButton>
                    )}
                </Box>

                <Box>
                    {x.avatar && (
                        <IconButton onClick={() => setShow(true)}>
                            <Avatar sx={sizes} src={x.avatar} />
                        </IconButton>
                    )}
                </Box>

                <Box>
                    {facebook.avatar && (
                        <IconButton onClick={() => setShow(true)}>
                            <Avatar sx={sizes} src={facebook.avatar} />
                        </IconButton>
                    )}
                </Box>
            </Box>

            <Dialog maxWidth="lg" open={show} onClose={() => setShow(false)}>
                <DialogTitle color="GrayText" sx={{ textAlign: 'center' }}>
                    Your accounts
                </DialogTitle>
                <DialogContent>
                    <Box display="flex" flexDirection="column" gap={3} width={300}>
                        {google.avatar && (
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Box display="flex" gap={1} alignItems="center">
                                    <Avatar sx={sizes} src={google.avatar} />
                                    <Box>{google.name}</Box>
                                </Box>
                                <Button
                                    sx={{ minWidth: 100 }}
                                    onClick={() => dispatch(removeSocialThunk({ social: 'google' }))}
                                >
                                    Disconnect
                                </Button>
                            </Box>
                        )}
                        {x.avatar && (
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Box display="flex" gap={1} alignItems="center">
                                    <Avatar sx={sizes} src={x.avatar} />
                                    <Box>{x.name}</Box>
                                </Box>
                                <Button
                                    sx={{ minWidth: 100 }}
                                    onClick={() => dispatch(removeSocialThunk({ social: 'x' }))}
                                >
                                    Disconnect
                                </Button>
                            </Box>
                        )}
                        {facebook.avatar && (
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Box display="flex" gap={1} alignItems="center">
                                    <Avatar sx={sizes} src={facebook.avatar} />
                                    <Box>{facebook.name}</Box>
                                </Box>
                                <Button
                                    sx={{ minWidth: 100 }}
                                    onClick={() => dispatch(removeSocialThunk({ social: 'facebook' }))}
                                >
                                    Disconnect
                                </Button>
                            </Box>
                        )}
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
};
export default Socials;
