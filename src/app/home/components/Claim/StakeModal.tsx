import { Box, Button, FormControl, MenuItem, Modal as MuiModal, Select, Typography } from '@mui/material';

interface ModalProps {
    isOpen: boolean;
    handleClose: () => void;
}

export default function StakeModal({ isOpen, handleClose }: ModalProps) {
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
                <Box width={600} bgcolor="#fff" padding={5}>
                    <Box display="flex" justifyContent="space-between" mb={2}>
                        <Box>
                            <Typography variant="caption">Available</Typography>
                            <Typography variant="h3">123.45 VTRU</Typography>
                        </Box>

                        <Box>
                            <Typography variant="caption">Unassigned</Typography>
                            <Typography variant="h3">49.38 VTRU</Typography>
                        </Box>
                    </Box>

                    <Box mb={2}>
                        <Box display="flex" alignItems="center" gap={3} mb={1}>
                            <FormControl>
                                <Select value="60%">
                                    <MenuItem value="60%">60%</MenuItem>
                                </Select>
                            </FormControl>
                            <Typography>74.07 Claim to wallet</Typography>
                        </Box>

                        <Box display="flex" alignItems="center" gap={3} mb={1}>
                            <FormControl>
                                <Select value="0%">
                                    <MenuItem value="0%">0%</MenuItem>
                                </Select>
                            </FormControl>
                            <Typography>0.0 Stake for 1 year at 15% APR</Typography>
                        </Box>

                        <Box display="flex" alignItems="center" gap={3} mb={1}>
                            <FormControl>
                                <Select value="0%">
                                    <MenuItem value="0%">0%</MenuItem>
                                </Select>
                            </FormControl>
                            <Typography>0.0 Stake for 3 years at 30% APR</Typography>
                        </Box>

                        <Box display="flex" alignItems="center" gap={3} mb={1}>
                            <FormControl>
                                <Select value="0%">
                                    <MenuItem value="0%">0%</MenuItem>
                                </Select>
                            </FormControl>
                            <Typography>0.0 Stake for 5 years at 60% APR</Typography>
                        </Box>

                        <Box display="flex" alignItems="center" gap={3} mb={1}>
                            <FormControl>
                                <Select value="0%">
                                    <MenuItem value="0%">0%</MenuItem>
                                </Select>
                            </FormControl>
                            <Typography>0.0 Allocate to VIBE Creator Equity Pool</Typography>
                        </Box>
                    </Box>

                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="h5">
                            <a href="#">How-to Guide</a>
                        </Typography>
                        <Button variant="contained">Go</Button>
                    </Box>
                </Box>
            </Box>
        </MuiModal>
    );
}
