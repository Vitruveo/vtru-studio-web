import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Box, Button, List, Switch, TextField, Typography } from '@mui/material';
import { ASSET_STORAGE_URL, NO_IMAGE_ASSET } from '@/constants/asset';
import { useFormikContext } from 'formik';
import { useDispatch } from '@/store/hooks';
import { getArtsAndArtistsForIncludeThunk, getCreatorAvatarThunk } from '@/features/storesArtwork/thunks';
import { ArtsAndArtistsList } from '@/features/storesArtwork/types';
import MediaRender from '../MediaRender/mediaRender';

interface FormValues {
    include: {
        arts: { value: string; label: string }[];
        artists: { value: string; label: string }[];
    };
    exclude: {
        arts: { value: string; label: string }[];
        artists: { value: string; label: string }[];
    };
}

const Include = () => {
    const dispatch = useDispatch();

    const { values, setFieldValue } = useFormikContext<FormValues>();
    const [inputValue, setInputValue] = useState('');
    const [artsAndArtists, setArtsAndArtists] = useState<ArtsAndArtistsList | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onChangeArt = (id: string, label: string) => {
        const arts = values.include.arts;
        const artIndex = arts.findIndex((art) => art.value === id);
        if (artIndex !== -1) {
            setFieldValue(
                'include.arts',
                arts.filter((art) => art.value !== id)
            );
        } else {
            setFieldValue('include.arts', [...arts, { value: id, label }]);
        }
    };

    const onChangeArtist = (id: string, label: string) => {
        const artists = values.include.artists;
        const artistsIndex = artists.findIndex((artist) => artist.value === id);
        if (artistsIndex !== -1) {
            setFieldValue(
                'include.artists',
                artists.filter((artist) => artist.value !== id)
            );
        } else {
            setFieldValue('include.artists', [...artists, { value: id, label }]);
        }
    };

    const fetchData = async () => {
        return await dispatch(
            getArtsAndArtistsForIncludeThunk({
                exclude: values.exclude,
                search: inputValue,
                page: artsAndArtists?.page || 1,
                limit: artsAndArtists?.limit || 20,
            })
        );
    };

    const search = async () => {
        setArtsAndArtists(null);
        if (inputValue.length < 1) {
            setErrorMessage('Please enter at least 1 characters');
            return;
        }
        const artsAndArtistsResponse = await fetchData();
        if (artsAndArtistsResponse.arts.length === 0 && artsAndArtistsResponse.artists.length === 0) {
            setErrorMessage('No results found');
            return;
        }
        setArtsAndArtists(artsAndArtistsResponse);
        setErrorMessage(null);
    };

    const handleNextPageArts = async () => {
        const response = await fetchData();
        if (response.arts.length) {
            setArtsAndArtists((prev) => ({
                arts: prev ? [...prev.arts, ...response.arts] : response.arts,
                artists: prev ? prev.artists : [],
                page: response.page,
                limit: response.limit,
                total: response.total,
                totalPage: response.totalPage,
            }));
        }
    };

    const handleNextPageArtists = async () => {
        const response = await fetchData();
        if (response.arts.length) {
            setArtsAndArtists((prev) => ({
                arts: prev ? response.arts : [],
                artists: prev ? [...prev.artists, ...response.artists] : response.artists,
                page: response.page,
                limit: response.limit,
                total: response.total,
                totalPage: response.totalPage,
            }));
        }
    };

    useEffect(() => {
        if (errorMessage) {
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
        }
    }, [errorMessage]);

    return (
        <Box display={'flex'} flexDirection={'column'} padding={2}>
            <Box display={'flex'} flexDirection={'column'} gap={1}>
                <Typography variant="h6">Search Arts / Artists</Typography>
                <Box display="flex" gap={1}>
                    <TextField variant="outlined" onChange={(e) => setInputValue(e.target.value)} fullWidth />
                    <Button variant="contained" onClick={search}>
                        Search
                    </Button>
                </Box>
                {errorMessage && <Typography color="error">{errorMessage}</Typography>}
            </Box>
            {artsAndArtists?.arts && artsAndArtists.arts.length > 0 && (
                <Box paddingBlock={2}>
                    <Typography variant="h6">Arts</Typography>
                    <List>
                        <InfiniteScroll
                            dataLength={artsAndArtists.arts.length}
                            loader={<h4>Loading...</h4>}
                            hasMore={artsAndArtists.page < artsAndArtists.totalPage}
                            next={handleNextPageArts}
                            height="100%"
                            style={{ display: 'flex', gap: 4 }}
                            scrollThreshold={0.9}
                        >
                            {artsAndArtists.arts.map((item) => (
                                <ArtItem
                                    key={item.id}
                                    id={item.id}
                                    image={`${ASSET_STORAGE_URL}/${item.image}`}
                                    title={item.title}
                                    isHide={values.include.arts.some((art) => art.value === item.id)}
                                    onChange={onChangeArt}
                                />
                            ))}
                        </InfiniteScroll>
                    </List>
                </Box>
            )}
            {artsAndArtists?.artists && artsAndArtists.artists.length > 0 && (
                <Box>
                    <Typography variant="h6">Artists</Typography>
                    <List>
                        <InfiniteScroll
                            dataLength={artsAndArtists.artists.length}
                            loader={<h4>Loading...</h4>}
                            hasMore={artsAndArtists.page < artsAndArtists.totalPage}
                            next={handleNextPageArtists}
                            height={'100%'}
                            style={{ display: 'flex', gap: 4 }}
                            scrollThreshold={0.9}
                        >
                            {artsAndArtists?.artists.map((item) => (
                                <ArtistItem
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    isHide={values.include.artists.some((artist) => artist.value === item.id)}
                                    onChange={onChangeArtist}
                                />
                            ))}
                        </InfiniteScroll>
                    </List>
                </Box>
            )}
        </Box>
    );
};

interface ArtItemProps {
    id: string;
    image: string;
    title: string;
    isHide: boolean;
    onChange: (id: string, label: string) => void;
}
const ArtItem = ({ id, image, title, isHide, onChange }: ArtItemProps) => {
    return (
        <Box display={'flex'} flexDirection={'column'}>
            <Box display={'flex'} alignItems={'center'}>
                <Typography>Show</Typography>
                <Switch checked={isHide} onChange={() => onChange(id, title)} />
            </Box>
            <MediaRender path={image} width={150} height={150} alt={title} fallback={NO_IMAGE_ASSET} />
            <Typography>{title}</Typography>
        </Box>
    );
};

interface ArtistItemProps {
    id: string;
    name: string;
    isHide: boolean;
    onChange: (id: string, label: string) => void;
}
const ArtistItem = ({ id, name, isHide, onChange }: ArtistItemProps) => {
    const dispatch = useDispatch();
    const [avatar, setAvatar] = useState<string>('');

    useEffect(() => {
        dispatch(getCreatorAvatarThunk(id)).then((response) => {
            setAvatar(response);
        });
    }, []);

    return (
        <Box display={'flex'} flexDirection={'column'}>
            <Box display={'flex'} alignItems={'center'}>
                <Typography>Show</Typography>
                <Switch checked={isHide} onChange={() => onChange(id, name)} />
            </Box>
            <MediaRender
                path={`${ASSET_STORAGE_URL}/${avatar}`}
                width={150}
                height={150}
                alt={name}
                fallback={'/images/profile/profileDefault.png'}
            />
            <Typography>{name}</Typography>
        </Box>
    );
};

export default Include;
