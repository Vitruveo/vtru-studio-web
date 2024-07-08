'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Container, MenuItem, Select, Box, Grid, Typography, CircularProgress } from '@mui/material';
import { IconCircleFilled, IconPlus, IconTrash } from '@tabler/icons-react';
import RSelect from 'react-select';
import Image from 'next/image';

import { useDispatch, useSelector } from '@/store/hooks';
import { useI18n } from '../hooks/useI18n';
import { requestMyAssetsThunk } from '@/features/user/thunks';
import { userActionsCreators } from '@/features/user/slice';
import { createNewAssetThunk, deleteAssetThunk } from '@/features/asset/thunks';
import { consignArtworkActionsCreators } from '@/features/consignArtwork/slice';
import PageContainer from '@/app/home/components/container/PageContainer';

const filters = ['Draft', 'Pending', 'Listed', 'Sold', 'All'];

export default function Home() {
    const { language } = useI18n();
    const dispatch = useDispatch();
    const router = useRouter();

    const assets = useSelector((state) => state.user.assets);
    const customizer = useSelector((state) => state.customizer);

    const [collectionSelected, setCollectionSelected] = useState('all');
    const [filterSelected, setFilterSelected] = useState('all');
    const [cloneId, setCloneId] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    const texts = {
        title: language['studio.home.title'],
        welcome: language['studio.home.wellcome'],
        transform: language['studio.home.transforming'],
        software: language['studio.home.software'],
        consign: language['studio.home.consign'],
        myProfile: language['studio.home.myProfile'],
    } as { [key: string]: string };

    useEffect(() => {
        dispatch(userActionsCreators.setSelectedAsset(''));
        dispatch(consignArtworkActionsCreators.resetConsignArtwork());
        dispatch(requestMyAssetsThunk());
    }, []);

    const collections = assets.reduce<string[]>((acc, asset) => {
        asset.collections.forEach((collection: string) => {
            if (!acc.includes(collection)) {
                acc.push(collection);
            }
        });

        return acc;
    }, []);

    const data = useMemo(() => {
        if (collectionSelected.toUpperCase() === 'ALL') {
            return assets;
        }

        return assets.filter((asset: any) => asset?.collections?.includes(collectionSelected));
    }, [assets, collectionSelected]);

    const dataFiltered = useMemo(() => {
        if (filterSelected.toUpperCase() === 'ALL') {
            return data;
        }

        return data.filter((asset: any) => asset?.status?.toUpperCase() === filterSelected.toUpperCase());
    }, [data, filterSelected]);

    return (
        <Container
            sx={{
                overflow: 'auto',
                maxHeight: '85vh',
                maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
            }}
        >
            <PageContainer title={texts.title}>
                {loading ? (
                    <div
                        style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1000,
                        }}
                    >
                        <CircularProgress size={100} />
                    </div>
                ) : (
                    <></>
                )}
                <Box pb={10} paddingInline={3}>
                    <Box display="flex" flexWrap="wrap" rowGap={1} alignItems="center">
                        <Typography marginRight={1} fontSize="1.7rem" alignSelf="center">
                            {texts.welcome}
                        </Typography>

                        <Image
                            src={'/images/logos/studiologo.png'}
                            priority
                            alt="bg"
                            width={140}
                            height={50}
                            style={{
                                paddingBlock: 1,
                                maxWidth: '300px',
                                maxHeight: '300px',
                                alignSelf: 'baseline',
                            }}
                        />
                    </Box>
                    <Box mt={2}>
                        <button
                            style={{
                                backgroundColor: '#D8C2D9',
                                borderRadius: '10px',
                                padding: '20px',
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '20px',
                                alignItems: 'center',
                                width: '100%',
                                border: 'none',
                                cursor: 'pointer',
                                transition: '0.3s',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div
                                onClick={async () => {
                                    setLoading(true);
                                    const assetId = await dispatch(createNewAssetThunk(cloneId));
                                    dispatch(userActionsCreators.setSelectedAsset(assetId));
                                    router.push('/home/consignArtwork');
                                    setLoading(false);
                                }}
                                onMouseEnter={(event) => {
                                    event.currentTarget.style.color = '#fff';
                                }}
                                onMouseLeave={(event) => {
                                    event.currentTarget.style.color = '#000';
                                }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: 10,
                                    alignItems: 'center',
                                    transition: '0.3s',
                                }}
                            >
                                <IconPlus
                                    size={40}
                                    style={{
                                        backgroundColor: '#fff',
                                        borderRadius: '5px',
                                        padding: '5px',
                                        transition: '0.3s',
                                    }}
                                    onMouseEnter={(event) => {
                                        // rotate on hover
                                        event.currentTarget.style.transform = 'rotate(180deg)';
                                    }}
                                    onMouseLeave={(event) => {
                                        event.currentTarget.style.transform = 'rotate(0deg)';
                                    }}
                                    color="#000"
                                />
                                <Typography sx={{ fontSize: 22 }}>Consign a new asset</Typography>
                            </div>
                            <RSelect
                                placeholder="Clone and consign from..."
                                options={assets.map((asset) => ({
                                    value: asset._id,
                                    label: asset.title,
                                }))}
                                onChange={(event) => setCloneId(event?.value)}
                                isClearable
                                styles={{
                                    container: (provided) => ({
                                        ...provided,
                                        minWidth: 200,
                                    }),
                                }}
                            ></RSelect>
                        </button>
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
                        <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
                            <Typography variant="h4">Collection:</Typography>
                            <Select
                                defaultValue="all"
                                style={{
                                    minWidth: 200,
                                }}
                                onChange={(event) => setCollectionSelected(event.target.value)}
                            >
                                <MenuItem value="all">All</MenuItem>

                                {collections.map((collection, index) => (
                                    <MenuItem key={index} value={collection}>
                                        {collection}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                        <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
                            {filters.map((filter, index) => (
                                <Button
                                    key={index}
                                    onClick={() => setFilterSelected(filter)}
                                    variant="text"
                                    style={{
                                        color: filterSelected === filter ? '#000' : '#666',
                                        border: filterSelected === filter ? '1px solid #000' : 'none',
                                        transition: '0.3s',
                                        textDecoration: 'underline',
                                        fontSize: 18,
                                    }}
                                >
                                    {filter}
                                </Button>
                            ))}
                        </Box>
                    </Box>
                    <Box mt={2}>
                        <Grid container spacing={12}>
                            {dataFiltered.map((asset, index) => (
                                <Grid item key={index} sm={6} md={4} lg={3}>
                                    <button
                                        style={{
                                            backgroundColor: '#fff',
                                            borderRadius: '10px',
                                            cursor: 'pointer',
                                            transition: '0.3s',
                                            border: 'none',
                                            padding: '0px',
                                            margin: '0px',
                                            position: 'relative',
                                        }}
                                        onMouseEnter={(event) => {
                                            event.currentTarget.style.boxShadow = '0px 0px 10px 0px #000';
                                        }}
                                        onMouseLeave={(event) => {
                                            event.currentTarget.style.boxShadow = 'none';
                                        }}
                                        onClick={() => {
                                            dispatch(userActionsCreators.setSelectedAsset(asset._id));
                                            router.push('/home/consignArtwork');
                                        }}
                                    >
                                        <button
                                            style={{
                                                position: 'absolute',
                                                top: 10,
                                                right: 10,
                                                backgroundColor: '#fff',
                                                color: '#000',

                                                padding: '5px',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                                transition: '0.3s',
                                                border: '1px solid #fff',
                                            }}
                                            onClick={(event) => {
                                                event.stopPropagation();

                                                dispatch(deleteAssetThunk(asset._id));
                                            }}
                                            onMouseEnter={(event) => {
                                                event.currentTarget.style.backgroundColor = '#000';
                                                event.currentTarget.style.borderColor = '#ff0000';
                                            }}
                                            onMouseLeave={(event) => {
                                                event.currentTarget.style.backgroundColor = '#fff';
                                                event.currentTarget.style.borderColor = '#fff';
                                            }}
                                        >
                                            <IconTrash size={20} color="#ff0000" />
                                        </button>
                                        <img
                                            src={asset.image}
                                            alt="bg"
                                            width={300}
                                            height={300}
                                            style={{
                                                objectFit: 'cover',
                                                borderTopLeftRadius: 10,
                                                borderTopRightRadius: 10,
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                backgroundColor: '#e6e6e6',
                                                padding: '10px',
                                                marginTop: -1,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 1,
                                                borderBottomLeftRadius: 10,
                                                borderBottomRightRadius: 10,
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    textAlign: 'left',
                                                }}
                                            >
                                                {asset.title}
                                            </Typography>
                                            <Box display="flex" alignItems="center" gap={1}>
                                                {asset.status === 'SOLD' && (
                                                    <IconCircleFilled
                                                        size={20}
                                                        style={{
                                                            color: '#ff0000',
                                                        }}
                                                    />
                                                )}
                                                <Typography>{asset.status}</Typography>
                                            </Box>
                                            <Button
                                                variant="text"
                                                style={{ color: '#000', textDecoration: 'underline' }}
                                            >
                                                View
                                            </Button>
                                        </Box>
                                    </button>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </PageContainer>
        </Container>
    );
}
