import { useEffect, useState, useCallback, useRef, useMemo, memo } from 'react';
import { FixedSizeList as List } from 'react-window';
import { Box, Button, Switch, TextField, Typography } from '@mui/material';
import { ASSET_STORAGE_URL, GENERAL_STORAGE_URL, NO_IMAGE_ASSET } from '@/constants/asset';
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
}

const Include = () => {
    const dispatch = useDispatch();
    const artsContainerRef = useRef<HTMLDivElement>(null);
    const artistsContainerRef = useRef<HTMLDivElement>(null);

    const avatarCacheRef = useRef<Map<string, string>>(new Map());

    const { values, setFieldValue } = useFormikContext<FormValues>();
    const [inputValue, setInputValue] = useState('');
    const [artsAndArtists, setArtsAndArtists] = useState<ArtsAndArtistsList | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoadingArts, setIsLoadingArts] = useState(false);
    const [isLoadingArtists, setIsLoadingArtists] = useState(false);
    const [containerWidth, setContainerWidth] = useState(800);
    const [artsPage, setArtsPage] = useState(1);
    const [artistsPage, setArtistsPage] = useState(1);
    const artsScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const artistsScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
                search: inputValue,
                page: artsAndArtists?.page ? artsAndArtists?.page + 1 : 1,
                limit: artsAndArtists?.limit || 20,
            })
        );
    };

    const search = async () => {
        setArtsAndArtists(null);
        setArtsPage(1);
        setArtistsPage(1);

        avatarCacheRef.current.clear();

        if (inputValue.length < 1) {
            setErrorMessage('Please enter at least 1 characters');
            return;
        }
        const artsAndArtistsResponse = await fetchData();
        if (artsAndArtistsResponse.arts.length === 0 && artsAndArtistsResponse.artists.length === 0) {
            setErrorMessage('No results found');
            return;
        }

        artsAndArtistsResponse.arts.forEach((art) => {
            const img = document.createElement('img');
            img.src = `${ASSET_STORAGE_URL}/${art.image}`;
        });

        setArtsAndArtists(artsAndArtistsResponse);
        setErrorMessage(null);
    };

    const handleNextPageArts = useCallback(async () => {
        if (isLoadingArts || !artsAndArtists || artsPage >= artsAndArtists.totalPage) return;

        setIsLoadingArts(true);
        try {
            const response = await dispatch(
                getArtsAndArtistsForIncludeThunk({
                    search: inputValue,
                    page: artsPage + 1,
                    limit: artsAndArtists.limit || 20,
                })
            );

            if (response.arts.length) {
                response.arts.forEach((art) => {
                    const img = document.createElement('img');
                    img.src = `${ASSET_STORAGE_URL}/${art.image}`;
                });

                setArtsAndArtists((prev) => ({
                    ...prev!,
                    arts: [
                        ...prev!.arts,
                        ...response.arts.filter((cur) => !prev!.arts.find((item) => item.id === cur.id)),
                    ],
                }));
                setArtsPage((prev) => prev + 1);
            }
        } finally {
            setIsLoadingArts(false);
        }
    }, [dispatch, inputValue, artsAndArtists, isLoadingArts, artsPage]);

    const handleNextPageArtists = useCallback(async () => {
        if (isLoadingArtists || !artsAndArtists || artistsPage >= artsAndArtists.totalPage) return;

        setIsLoadingArtists(true);
        try {
            const response = await dispatch(
                getArtsAndArtistsForIncludeThunk({
                    search: inputValue,
                    page: artistsPage + 1,
                    limit: artsAndArtists.limit || 20,
                })
            );

            if (response.artists.length) {
                setArtsAndArtists((prev) => ({
                    ...prev!,
                    artists: [
                        ...prev!.artists,
                        ...response.artists.filter((cur) => !prev!.artists.find((item) => item.id === cur.id)),
                    ],
                }));
                setArtistsPage((prev) => prev + 1);
            }
        } finally {
            setIsLoadingArtists(false);
        }
    }, [dispatch, inputValue, artsAndArtists, isLoadingArtists, artistsPage]);

    const handleArtsScroll = useCallback(
        ({ scrollOffset, scrollDirection }: { scrollOffset: number; scrollDirection: 'backward' | 'forward' }) => {
            if (!artsAndArtists?.arts || scrollDirection !== 'forward') return;

            const itemWidth = 180;
            const totalWidth = artsAndArtists.arts.length * itemWidth;
            const visibleWidth = containerWidth;
            const scrollPercentage = (scrollOffset + visibleWidth) / totalWidth;

            const remainingDistance = totalWidth - (scrollOffset + visibleWidth);
            const shouldLoadMore = scrollPercentage > 0.7 || remainingDistance < itemWidth * 3;

            if (shouldLoadMore && artsPage < artsAndArtists.totalPage && !isLoadingArts) {
                if (artsScrollTimeoutRef.current) {
                    clearTimeout(artsScrollTimeoutRef.current);
                }
                artsScrollTimeoutRef.current = setTimeout(() => {
                    handleNextPageArts();
                }, 50);
            }
        },
        [artsAndArtists, containerWidth, artsPage, isLoadingArts, handleNextPageArts]
    );

    const handleArtistsScroll = useCallback(
        ({ scrollOffset, scrollDirection }: { scrollOffset: number; scrollDirection: 'backward' | 'forward' }) => {
            if (!artsAndArtists?.artists || scrollDirection !== 'forward') return;

            const itemWidth = 180;
            const totalWidth = artsAndArtists.artists.length * itemWidth;
            const visibleWidth = containerWidth;
            const scrollPercentage = (scrollOffset + visibleWidth) / totalWidth;

            const remainingDistance = totalWidth - (scrollOffset + visibleWidth);
            const shouldLoadMore = scrollPercentage > 0.7 || remainingDistance < itemWidth * 3;

            if (shouldLoadMore && artistsPage < artsAndArtists.totalPage && !isLoadingArtists) {
                if (artistsScrollTimeoutRef.current) {
                    clearTimeout(artistsScrollTimeoutRef.current);
                }
                artistsScrollTimeoutRef.current = setTimeout(() => {
                    handleNextPageArtists();
                }, 50);
            }
        },
        [artsAndArtists, containerWidth, artistsPage, isLoadingArtists, handleNextPageArtists]
    );

    useEffect(() => {
        if (errorMessage) {
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
        }
    }, [errorMessage]);

    useEffect(() => {
        const updateWidth = () => {
            if (artsContainerRef.current) {
                setContainerWidth(artsContainerRef.current.offsetWidth);
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);

        return () => {
            window.removeEventListener('resize', updateWidth);

            if (artsScrollTimeoutRef.current) {
                clearTimeout(artsScrollTimeoutRef.current);
            }
            if (artistsScrollTimeoutRef.current) {
                clearTimeout(artistsScrollTimeoutRef.current);
            }
        };
    }, []);

    const ArtRow = useCallback(
        ({ index, style }: { index: number; style: React.CSSProperties }) => {
            if (!artsAndArtists?.arts) return null;

            const item = artsAndArtists.arts[index];

            return (
                <div style={{ ...style, display: 'flex', alignItems: 'center', padding: '4px' }}>
                    <MemoizedArtItem
                        key={item.id}
                        id={item.id}
                        image={`${ASSET_STORAGE_URL}/${item.image}`}
                        title={item.title}
                        isHide={values.include.arts.some((art) => art.value === item.id)}
                        onChange={onChangeArt}
                        forceLoad={true}
                    />
                </div>
            );
        },
        [artsAndArtists, values.include.arts, onChangeArt]
    );

    const ArtistRow = useCallback(
        ({ index, style }: { index: number; style: React.CSSProperties }) => {
            if (!artsAndArtists?.artists) return null;

            const item = artsAndArtists.artists[index];

            return (
                <div style={{ ...style, display: 'flex', alignItems: 'center', padding: '4px' }}>
                    <MemoizedArtistItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        isHide={values.include.artists.some((artist) => artist.value === item.id)}
                        onChange={onChangeArtist}
                        forceLoad={true}
                        avatarCache={avatarCacheRef.current}
                    />
                </div>
            );
        },
        [artsAndArtists, values.include.artists, onChangeArtist]
    );

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
                    <Box ref={artsContainerRef} width="100%" height={220}>
                        <List
                            style={{ overflowY: 'hidden' }}
                            height={220}
                            width={containerWidth}
                            itemCount={artsAndArtists.arts.length}
                            itemSize={180}
                            layout="horizontal"
                            onScroll={handleArtsScroll}
                            overscanCount={8}
                        >
                            {ArtRow}
                        </List>
                    </Box>
                    {isLoadingArts && (
                        <Box display="flex" justifyContent="center" padding={2}>
                            <Typography>Loading more arts...</Typography>
                        </Box>
                    )}
                </Box>
            )}
            {artsAndArtists?.artists && artsAndArtists.artists.length > 0 && (
                <Box>
                    <Typography variant="h6">Artists</Typography>
                    <Box ref={artistsContainerRef} width="100%" height={220}>
                        <List
                            style={{ overflowY: 'hidden' }}
                            height={220}
                            width={containerWidth}
                            itemCount={artsAndArtists.artists.length}
                            itemSize={180}
                            layout="horizontal"
                            onScroll={handleArtistsScroll}
                            overscanCount={8}
                        >
                            {ArtistRow}
                        </List>
                    </Box>
                    {isLoadingArtists && (
                        <Box display="flex" justifyContent="center" padding={2}>
                            <Typography>Loading more artists...</Typography>
                        </Box>
                    )}
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
    forceLoad?: boolean;
}
const ArtItem = ({ id, image, title, isHide, onChange, forceLoad = false }: ArtItemProps) => {
    return (
        <Box display={'flex'} flexDirection={'column'}>
            <Box display={'flex'} alignItems={'center'}>
                <Typography>Show</Typography>
                <Switch checked={isHide} onChange={() => onChange(id, title)} />
            </Box>
            <MediaRender
                path={image}
                width={150}
                height={150}
                alt={title}
                fallback={NO_IMAGE_ASSET}
                forceLoad={forceLoad}
            />
            <Typography
                sx={{
                    maxWidth: 150,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}
            >
                {title}
            </Typography>
        </Box>
    );
};

const MemoizedArtItem = memo(ArtItem);

interface ArtistItemProps {
    id: string;
    name: string;
    isHide: boolean;
    onChange: (id: string, label: string) => void;
    forceLoad?: boolean;
    avatarCache?: Map<string, string>;
}
const ArtistItem = ({ id, name, isHide, onChange, forceLoad = false, avatarCache }: ArtistItemProps) => {
    const dispatch = useDispatch();
    const [avatar, setAvatar] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        if (avatarCache?.has(id)) {
            const cachedAvatar = avatarCache.get(id) || '';
            setAvatar(cachedAvatar);
            setIsLoading(false);
            return;
        }

        dispatch(getCreatorAvatarThunk(id)).then((response) => {
            if (isMounted) {
                const avatarUrl = response || '';
                setAvatar(avatarUrl);
                setIsLoading(false);

                if (avatarCache) {
                    avatarCache.set(id, avatarUrl);
                }

                if (forceLoad && response) {
                    const img = document.createElement('img');
                    img.src = `${GENERAL_STORAGE_URL}/${response}`;
                }
            }
        });

        return () => {
            isMounted = false;
        };
    }, [dispatch, id, forceLoad, avatarCache]);

    const imagePath = useMemo(() => {
        return avatar ? `${GENERAL_STORAGE_URL}/${avatar}` : '/images/profile/profileDefault.png';
    }, [avatar]);

    return (
        <Box display={'flex'} flexDirection={'column'}>
            <Box display={'flex'} alignItems={'center'}>
                <Typography>Show</Typography>
                <Switch checked={isHide} onChange={() => onChange(id, name)} />
            </Box>
            <MediaRender
                path={imagePath}
                width={150}
                height={150}
                alt={name}
                fallback={'/images/profile/profileDefault.png'}
                forceLoad={forceLoad}
                isLoading={isLoading}
            />
            <Typography>{name}</Typography>
        </Box>
    );
};

const MemoizedArtistItem = memo(ArtistItem);

export default Include;
