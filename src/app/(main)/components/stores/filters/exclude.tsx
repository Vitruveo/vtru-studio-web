import { useState } from 'react';
import Image from 'next/image';
import { Box, Button, Checkbox, InputAdornment, Switch, TextField, Typography } from '@mui/material';
import { ASSET_STORAGE_URL } from '@/constants/asset';
import { useFormikContext } from 'formik';
import { useDispatch, useSelector } from '@/store/hooks';
import { getArtsAndArtistsThunk } from '@/features/storesArtwork/thunks';
import { ArtsAndArtistsList } from '@/features/storesArtwork/types';

interface FormValues {
    general: {
        licenses: {
            minPrice: number;
            maxPrice: number;
        };
        shortcuts: {
            hasBTS: boolean;
        };
    };
    context: {
        precision: number;
    };
    taxonomy: any;
    artists: any;
    portfolio: {
        wallets: string[];
    };
    exclude: {
        arts: { value: string; label: string }[];
        artists: { value: string; label: string }[];
        onlyInStore: boolean;
    };
}

const Exclude = () => {
    const dispatch = useDispatch();
    const selectedStore = useSelector((state) => state.stores.selectedStore);
    const store = useSelector((state) => state.stores.data.data.find((item) => item._id === selectedStore.id));

    const { values, setFieldValue } = useFormikContext<FormValues>();
    const [inputValue, setInputValue] = useState('');
    const [isOnlyInStore, setIsOnlyInStore] = useState(true);
    const [artsAndArtists, setArtsAndArtists] = useState<ArtsAndArtistsList | null>(null);

    const onChangeArt = (id: string) => {
        const arts = values.exclude.arts;
        const artIndex = arts.findIndex((art) => art.value === id);
        if (artIndex !== -1) {
            setFieldValue(
                'exclude.arts',
                arts.filter((art) => art.value !== id)
            );
        } else {
            setFieldValue('exclude.arts', [...arts, { value: id, label: 'Art Title' }]);
        }
    };

    const onChangeArtist = (id: string) => {
        const artists = values.exclude.artists;
        const artistsIndex = artists.findIndex((artist) => artist.value === id);
        if (artistsIndex !== -1) {
            setFieldValue(
                'exclude.artists',
                artists.filter((artist) => artist.value !== id)
            );
        } else {
            setFieldValue('exclude.artists', [...artists, { value: id, label: 'Artist Name' }]);
        }
    };

    const onChangeSwitch = (value: boolean) => {
        setIsOnlyInStore(value);
        setFieldValue('exclude.onlyInStore', value);
    };

    const search = async () => {
        const artsAndArtistsResponse = await dispatch(
            getArtsAndArtistsThunk({
                price: {
                    max: values.general?.licenses.maxPrice,
                    min: values.general?.licenses.minPrice,
                },
                hasBts: values.general?.shortcuts.hasBTS === true ? 'yes' : '',
                filters: {
                    general: values.general,
                    context: values.context,
                    taxonomy: values.taxonomy,
                    artists: values.artists,
                    portfolio: values.portfolio,
                    exclude: values.exclude,
                },
                colorPrecision: values.context?.precision,
                onlyInStore: isOnlyInStore,
                search: inputValue,
            })
        );
        setArtsAndArtists(artsAndArtistsResponse);
    };

    return (
        <Box display={'flex'} flexDirection={'column'} gap={2}>
            <Box display={'flex'} flexDirection={'column'} gap={1}>
                <Typography variant="h6">Search Arts / Artists</Typography>
                <Box display="flex" gap={1}>
                    <TextField
                        variant="outlined"
                        onChange={(e) => setInputValue(e.target.value)}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <Checkbox
                                        checked={isOnlyInStore}
                                        onChange={(e) => onChangeSwitch(e.target.checked)}
                                    />
                                    <Typography>Only in {store?.organization.name || 'Folio'}</Typography>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button variant="contained" onClick={search}>
                        Search
                    </Button>
                </Box>
            </Box>
            <Box>
                <Typography variant="h6">Arts</Typography>
                <Box display="flex" gap={2} sx={{ overflowX: 'scroll', overflowY: 'hidden' }}>
                    {artsAndArtists?.arts.map((item) => (
                        <ArtItem
                            key={item.id}
                            id={item.id}
                            image={`${ASSET_STORAGE_URL}/${item.image}`}
                            title={item.title}
                            isHide={values.exclude.arts.some((art) => art.value === item.id)}
                            onChange={onChangeArt}
                        />
                    ))}
                </Box>
            </Box>
            <Box>
                <Typography variant="h6">Artists</Typography>
                <Box display="flex" gap={2} sx={{ overflowX: 'scroll', overflowY: 'hidden' }}>
                    {artsAndArtists?.artists.map((item) => (
                        <ArtistItem
                            key={item.id}
                            id={item.id}
                            image={`${ASSET_STORAGE_URL}/${item.avatar}`}
                            title={item.name}
                            isHide={values.exclude.artists.some((artist) => artist.value === item.id)}
                            onChange={onChangeArtist}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

interface ArtItemProps {
    id: string;
    image: string;
    title: string;
    isHide: boolean;
    onChange: (id: string) => void;
}
const ArtItem = ({ id, image, title, isHide, onChange }: ArtItemProps) => {
    return (
        <Box display={'flex'} flexDirection={'column'}>
            <Box display={'flex'} alignItems={'center'}>
                <Typography>Hide</Typography>
                <Switch checked={isHide} onChange={() => onChange(id)} />
            </Box>
            <Image src={image} alt={title} width={100} height={100} />
            <Typography>{title}</Typography>
        </Box>
    );
};

interface ArtistItemProps {
    id: string;
    image: string;
    title: string;
    isHide: boolean;
    onChange: (id: string) => void;
}
const ArtistItem = ({ id, image, title, isHide, onChange }: ArtistItemProps) => {
    return (
        <Box display={'flex'} flexDirection={'column'}>
            <Box display={'flex'} alignItems={'center'}>
                <Typography>Hide</Typography>
                <Switch checked={isHide} onChange={() => onChange(id)} />
            </Box>
            <Image src={image} alt={title} width={100} height={100} />
            <Typography>{title}</Typography>
        </Box>
    );
};

export default Exclude;
