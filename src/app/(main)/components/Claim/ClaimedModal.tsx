import { Box, Modal as MuiModal, Typography } from '@mui/material';

interface ModalProps {
    isOpen: boolean;
    handleClose: () => void;
}

export default function ClaimedModal({ isOpen, handleClose }: ModalProps) {
    return (
        <MuiModal open={isOpen} onClose={handleClose}>
            <Box
                borderRadius={4}
                onClick={(e) => e.target === e.currentTarget && handleClose()}
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100vh"
            >
                <Box width={400}>
                    <Typography
                        variant="h3"
                        style={{
                            backgroundColor: '#13DFAA',
                            color: '#ffff',
                            borderRadius: 4,
                            borderEndEndRadius: 0,
                            textAlign: 'center',
                            padding: 10,
                        }}
                    >
                        Congrats! 🎉
                    </Typography>
                    <Box
                        height={150}
                        padding={3}
                        display="flex"
                        flexDirection="column"
                        gap={5}
                        sx={{
                            backgroundColor: '#fff',
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                        }}
                    >
                        <Typography variant="h6">Your claim was successful. Check your wallet.</Typography>
                        <Typography variant="body1">
                            Check active stakes on{' '}
                            <a href="https://scope.vitruveo.xyz/staking/vtru" target="_new">
                                Scope
                            </a>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </MuiModal>
    );
}
