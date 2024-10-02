import { useState, useEffect } from 'react';
import { InputActionMeta } from 'react-select';
import {
    Box,
    Button,
    CardContent,
    Grid,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Theme,
    useMediaQuery,
    CircularProgress,
} from '@mui/material';
import { nanoid } from '@reduxjs/toolkit';
import AsyncSelect from 'react-select/async';

import { useDispatch, useSelector } from '@/store/hooks';
import { ProfileTabsGeneralProps } from '.';
import BlankCard from '../../components/shared/BlankCard';
import { generalStorageThunk } from '@/features/user/thunks';
import { CustomTextFieldDebounce } from '../../components/forms/theme-elements/CustomTextField';
import { Asset } from '@/features/asset/types';
import { apiService } from '@/services/api';
import { userSelector } from '@/features/user';
import AssetCard from './assetCard';
import Artwork from './artwork';
import { sendRequestUploadThunk } from '@/features/user/thunks';

export interface ArtworkRecognitionProps extends ProfileTabsGeneralProps {}

interface SelectedArtwork {
    label: string;
    value: Asset | undefined;
}

const ArtworkRecognition = ({ values, setFieldValue }: ArtworkRecognitionProps) => {
    const [inputValue, setInputValue] = useState('');
    const [selectedArtwork, setSelectedArtwork] = useState<SelectedArtwork | null>({
        label: '',
        value: undefined,
    });
    const [open, setOpen] = useState(false);
    const [load, setLoad] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [link, setLink] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [name, setName] = useState('');
    const [assetUpload, setAssetUpload] = useState<File | null>();

    const dispatch = useDispatch();

    const { requestsUpload } = useSelector(userSelector(['requestsUpload']));

    const isAwards = modalTitle === 'Awards';

    const handleOpenModal = (type: 'Exhibitions' | 'Awards') => {
        setModalTitle(type);
        setOpen(true);
    };

    const handleCloseModal = () => {
        if (!load) {
            setSelectedArtwork({ label: '', value: undefined });
            setAssetUpload(null);
            setOpen(false);
            setInputValue('');
            setLink('');
            setName('');
            setTransactionId('');
        }
    };

    const handleSelectChange = (selected: SelectedArtwork | null) => {
        if (selected) setAssetUpload(null);
        setSelectedArtwork(selected);
    };

    const handleAddLink = () => {
        if (assetUpload) {
            setLoad(true);
            const tranId = nanoid();
            setTransactionId(tranId);
            dispatch(
                sendRequestUploadThunk({
                    transactionId: tranId,
                    requestsUpload: true,
                    mimetype: assetUpload.type,
                    originalName: assetUpload.name,
                })
            );
        } else {
            if (isAwards) {
                setFieldValue('artworkRecognition.awards', [
                    ...(values?.artworkRecognition?.awards || []),
                    {
                        name,
                        url: link.trim(),
                        artwork: {
                            title: inputValue,
                            value: selectedArtwork?.value?._id,
                            type: 'assetRef',
                        },
                    },
                ]);
            } else {
                setFieldValue('artworkRecognition.exhibitions', [
                    ...(values?.artworkRecognition?.exhibitions || []),
                    {
                        name,
                        url: link.trim(),
                        artwork: {
                            title: inputValue,
                            value: selectedArtwork?.value?._id,
                            type: 'assetRef',
                        },
                    },
                ]);
            }
            handleCloseModal();
        }
    };

    const handleDeleteLinkExhibitions = (index: number) => {
        const exhibition = values.artworkRecognition?.exhibitions.find((item, i) => i === index);
        if (exhibition && exhibition.artwork.type === 'upload') {
            setFieldValue('deleteKeys', [...(values.deleteKeys || []), exhibition.artwork.value]);
        }
        setFieldValue(
            'artworkRecognition.exhibitions',
            values.artworkRecognition?.exhibitions.filter((item, i) => i !== index)
        );
    };

    const handleDeleteAwards = (index: number) => {
        const award = values.artworkRecognition?.awards.find((item, i) => i === index);
        if (award && award.artwork.type === 'upload') {
            setFieldValue('deleteKeys', [...(values.deleteKeys || []), award.artwork.value]);
        }
        setFieldValue(
            'artworkRecognition.awards',
            values.artworkRecognition?.awards.filter((item, i) => i !== index)
        );
    };

    const loadArtworks = async (inputText: string): Promise<SelectedArtwork[]> => {
        if (!inputText) return [];

        const artworksFromDB = await apiService
            .get<[]>(`/assets/myAssets?title=${inputText}`)
            .then((res) => res.data)
            .catch(() => []);

        return artworksFromDB?.map((artwork: any) => ({
            label: artwork.assetMetadata?.context.formData?.title,
            value: artwork,
        })) as SelectedArtwork[];
    };

    const handleInputChange = (newValue: string, actionMeta: InputActionMeta) => {
        if (actionMeta.action === 'input-change' || actionMeta.action === 'set-value') setInputValue(newValue);
    };

    useEffect(() => {
        const transaction = requestsUpload?.[transactionId];
        if (transaction) {
            if (transaction.status === 'ready') {
                dispatch(
                    generalStorageThunk({
                        file: assetUpload!,
                        url: transaction.url!,
                        path: transaction.path!,
                        transactionId: transaction.transactionId,
                    })
                );
            }
            if (transaction.status === 'finished') {
                if (isAwards) {
                    setFieldValue('artworkRecognition.awards', [
                        ...(values?.artworkRecognition?.awards || []),
                        {
                            name,
                            url: link.trim(),
                            artwork: {
                                title: inputValue,
                                value: transaction.path,
                                type: 'upload',
                            },
                        },
                    ]);
                } else {
                    setFieldValue('artworkRecognition.exhibitions', [
                        ...(values?.artworkRecognition?.exhibitions || []),
                        {
                            name,
                            url: link.trim(),
                            artwork: {
                                title: inputValue,
                                value: transaction.path,
                                type: 'upload',
                            },
                        },
                    ]);
                }
                setLoad(false);
            }
        }
    }, [requestsUpload]);

    useEffect(() => {
        if (!load) handleCloseModal();
    }, [load]);

    const xl = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'));

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
                <BlankCard>
                    <CardContent sx={{ height: { xs: 'auto', lg: '503px' }, overflowY: 'auto', maxHeight: '538px' }}>
                        <Box style={{ width: !xl ? 300 : 350 }}>
                            <Typography my={2} marginBottom={3} fontSize="1.2rem" fontWeight="500">
                                Exhibitions
                            </Typography>
                            {values.artworkRecognition?.exhibitions?.map((v, i) => (
                                <Artwork
                                    key={v.artwork.value}
                                    name={v.name}
                                    url={v.url}
                                    artwork={v.artwork}
                                    handleDelete={() => handleDeleteLinkExhibitions(i)}
                                />
                            ))}
                            <Box width="150px">
                                <Button
                                    fullWidth
                                    size="small"
                                    variant="contained"
                                    onClick={() => handleOpenModal('Exhibitions')}
                                >
                                    Add
                                </Button>
                            </Box>
                        </Box>
                    </CardContent>
                </BlankCard>
            </Grid>

            <Grid item xs={12} lg={6}>
                <BlankCard>
                    <CardContent sx={{ height: { xs: 'auto', lg: '503px' }, overflowY: 'auto', maxHeight: '535px' }}>
                        <Box style={{ width: !xl ? 300 : 350 }}>
                            <Typography my={2} marginBottom={3} fontSize="1.2rem" fontWeight="500">
                                Awards
                            </Typography>

                            {values.artworkRecognition?.awards?.map((v, i) => (
                                <Artwork
                                    key={v.artwork.value}
                                    name={v.name}
                                    url={v.url}
                                    artwork={v.artwork}
                                    handleDelete={() => handleDeleteAwards(i)}
                                />
                            ))}

                            <Box width="150px">
                                <Button
                                    size="small"
                                    variant="contained"
                                    fullWidth
                                    onClick={() => handleOpenModal('Awards')}
                                >
                                    Add
                                </Button>
                            </Box>
                        </Box>
                    </CardContent>
                </BlankCard>
            </Grid>

            <Dialog open={open} onClose={handleCloseModal}>
                <DialogTitle>Add {modalTitle}</DialogTitle>

                <DialogContent style={{ width: !xl ? 300 : 350 }}>
                    <Box my={2}>
                        <AssetCard
                            asset={selectedArtwork?.value}
                            onUpload={(asset) => {
                                setSelectedArtwork({ label: '', value: undefined });
                                setAssetUpload(asset);
                            }}
                        />
                        <Box my={2} mb={1}>
                            <Typography variant="subtitle1" fontWeight={600} component="label">
                                Artwork
                            </Typography>
                        </Box>
                        <AsyncSelect
                            isDisabled={load}
                            blurInputOnSelect={false}
                            loadOptions={loadArtworks}
                            defaultOptions
                            value={selectedArtwork}
                            onInputChange={handleInputChange}
                            inputValue={inputValue}
                            onChange={handleSelectChange}
                            isClearable
                            placeholder="Search or enter new artwork"
                            noOptionsMessage={() =>
                                inputValue ? `No artwork found for "${inputValue}"` : 'Start typing to search'
                            }
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    height: '40px',
                                }),
                            }}
                        />
                    </Box>
                    <Box my={2}>
                        <Box mb={1}>
                            <Typography variant="subtitle1" fontWeight={600} component="label">
                                {isAwards ? 'Award' : 'Exhibition'}
                            </Typography>
                        </Box>
                        <CustomTextFieldDebounce
                            disabled={load}
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={name}
                            handleChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </Box>
                    <Box my={2}>
                        <Box mb={1}>
                            <Typography variant="subtitle1" fontWeight={600} component="label">
                                Link
                            </Typography>
                        </Box>
                        <CustomTextFieldDebounce
                            disabled={load}
                            variant="outlined"
                            size="small"
                            type="url"
                            fullWidth
                            value={link}
                            handleChange={(e) => {
                                setLink(e.target.value);
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button onClick={handleAddLink}>{load ? <CircularProgress color="primary" /> : 'Add'}</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export default ArtworkRecognition;
