import { useEffect, useMemo, useState } from 'react';
import { licenseThunk } from '@/features/asset/thunks';
import { useDispatch, useSelector } from '@/store/hooks';
import { Box, Button, Modal, Switch, Typography } from '@mui/material';

interface ModalListOfLicensesProps {
    open: boolean;
    onClose: () => void;
}

interface Licenses {
    [key: string]: { added: boolean; version: string };
}

export const ModalListOfLicenses = ({ ...rest }: ModalListOfLicensesProps) => {
    const dispatch = useDispatch();

    const assetSelected = useSelector((state) => state.user.selectedAsset);
    const asset = useSelector((state) => state.user.assets.data.find((item) => item._id === assetSelected));

    const [licenseArtCards, setLicenseArtCards] = useState(asset?.licenses?.artCards?.added ?? false);

    const licenses: Licenses = useMemo(() => {
        if (!asset?.licenses) {
            return {};
        }

        if (!asset.licenses.artCards) {
            return {
                ...asset.licenses,
                artCards: {
                    added: false,
                    version: '1',
                },
            };
        }

        return asset.licenses;
    }, [asset]);

    useEffect(() => {
        setLicenseArtCards(asset?.licenses?.artCards?.added ?? false);
    }, [asset]);

    const handleSave = () => {
        dispatch(
            licenseThunk({
                ...asset!.licenses,
                artCards: {
                    ...asset!.licenses.artCards,
                    added: licenseArtCards,
                },
            })
        );
    };

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
                            <Box display="flex" alignItems="center" key={key}>
                                <Switch
                                    disabled={key !== 'artCards'}
                                    checked={key !== 'artCards' ? value.added : licenseArtCards}
                                    onChange={(e) => {
                                        if (key === 'artCards') {
                                            setLicenseArtCards(e.target.checked);
                                        }
                                    }}
                                />
                                <Typography variant="h4">{key}</Typography>
                            </Box>
                        ))
                    )}
                </Box>

                <Box display="flex" justifyContent="flex-end">
                    <Button variant="contained" onClick={handleSave}>
                        Save
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};
