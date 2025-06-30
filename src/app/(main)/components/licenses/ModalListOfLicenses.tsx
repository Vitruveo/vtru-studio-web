import { useMemo } from 'react';
import { useSelector } from '@/store/hooks';
import { Box, Modal, Typography } from '@mui/material';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useTheme } from '@mui/material/styles';

interface ModalListOfLicensesProps {
    open: boolean;
    onClose: () => void;
}

interface Licenses {
    [key: string]: { added: boolean; version: string; status?: string };
}

export const ModalListOfLicenses = ({ ...rest }: ModalListOfLicensesProps) => {
    const theme = useTheme();

    const assetSelected = useSelector((state) => state.user.selectedAsset);
    const asset = useSelector((state) => state.user.assets.data.find((item) => item._id === assetSelected));

    const licenses: Licenses = useMemo(() => {
        if (!asset?.licenses) {
            return {};
        }

        const { artCards, ...filteredLicenses } = asset.licenses;

        return filteredLicenses;
    }, [asset]);

    return (
        <Modal open={rest.open} onClose={rest.onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h3" textAlign="center">
                    List of Licenses
                </Typography>
                <Box mt={4}>
                    {!Object.entries(licenses).length ? (
                        <Typography variant="h4">No licenses found for this asset</Typography>
                    ) : (
                        Object.entries(licenses).map(([key, value]) => (
                            <Box key={key} display="flex" justifyContent="space-between">
                                <Box display="flex" alignItems="center" gap={2}>
                                    {value?.added ? (
                                        <IconCheck color={theme.palette.primary.main} />
                                    ) : (
                                        <IconX color={theme.palette.primary.main} />
                                    )}
                                    <Typography variant="h4">{key.toUpperCase()} </Typography>
                                </Box>
                            </Box>
                        ))
                    )}
                </Box>
            </Box>
        </Modal>
    );
};
