'use client';

import { CSSProperties, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Button,
    Container,
    MenuItem,
    Select,
    Box,
    Grid,
    Typography,
    CircularProgress,
    Tooltip,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useMediaQuery,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Badge,
    Pagination,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import {
    IconCircleFilled,
    IconCopyPlus,
    IconMessage,
    IconPlus,
    IconScanEye,
    IconTag,
    IconTrash,
} from '@tabler/icons-react';
import RSelect from 'react-select';
import Image from 'next/image';

import { useDispatch, useSelector } from '@/store/hooks';
import { useI18n } from '../hooks/useI18n';
import { requestMyAssetsThunk } from '@/features/user/thunks';
import { userActionsCreators } from '@/features/user/slice';
import { createNewAssetThunk, deleteAssetThunk } from '@/features/asset/thunks';
import { consignArtworkActionsCreators } from '@/features/consignArtwork/slice';
import { assetActionsCreators } from '@/features/asset/slice';
import { setFilter } from '@/features/filters/filtersSlice';
import PageContainer from '@/app/home/components/container/PageContainer';
import { MintExplorer } from '@/features/user/types';
import { LicensesFormValues } from './consignArtwork/licenses/types';
import { IconEdit } from '@tabler/icons-react';
import isVideoExtension from '@/utils/isVideo';

const iconStyle: CSSProperties = {
    position: 'absolute',
    width: '80px',
    height: '30px',
    zIndex: '9999',
    bottom: '5px',
    right: '-20px',
    color: '#595959',
};

const iconStyleComment: CSSProperties = {
    position: 'absolute',
    width: '80px',
    height: '30px',
    zIndex: '9999',
    bottom: '0px',
    right: '20px',
    color: '#595959',
};
const filters = ['Draft', 'Pending', 'Listed', 'Sold', 'All'];

const getButtonText = (status: string, mintExplorer?: MintExplorer) => {
    if (status.toUpperCase() === 'DRAFT') return 'Edit';
    if (status.toUpperCase() === 'REJECTED') return 'Edit';
    if (status.toUpperCase() === 'PENDING') return 'View';
    if (status.toUpperCase() === 'ACTIVE' && mintExplorer?.transactionHash) return 'View Transaction';
    if (status.toUpperCase() === 'ACTIVE') return 'View Listing';
    return 'View';
};

const getStatusText = (status: string, mintExplorer?: MintExplorer) => {
    if (status.toUpperCase() === 'ACTIVE' && mintExplorer?.transactionHash) return 'Sold';
    if (status.toUpperCase() === 'ACTIVE') return 'Listed';
    return status.charAt(0).toUpperCase() + status.slice(1);
};

const getStatus = (status: string, mintExplorer?: MintExplorer) => {
    if (status.toUpperCase() === 'DRAFT') return 'Draft';
    if (status.toUpperCase() === 'PENDING') return 'Pending';
    if (status.toUpperCase() === 'ACTIVE' && mintExplorer?.transactionHash) return 'Sold';
    if (status.toUpperCase() === 'ACTIVE') return 'Listed';
    if (status.toUpperCase() === 'REJECTED') return 'Rejected';
    return status;
};

const getPriceText = (licenses: LicensesFormValues) => {
    return licenses?.nft.elastic.editionPrice ? `Price: ${licenses.nft.elastic.editionPrice}` : '';
};

export default function Home() {
    const { language } = useI18n();
    const dispatch = useDispatch();
    const router = useRouter();
    const isMobile = useMediaQuery('(max-width: 600px)');
    const isTablet = useMediaQuery('(max-width: 900px)');

    const { assets, currentPage, collections } = useSelector((state) => state.user);
    const customizer = useSelector((state) => state.customizer);
    const selectedFilter = useSelector((state) => state.filters.selectedFilter);

    const [cloneId, setCloneId] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [assetToDelete, setAssetToDelete] = useState<string | null>(null);

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
        dispatch(assetActionsCreators.resetAsset());
        dispatch(requestMyAssetsThunk({ page: currentPage, status: selectedFilter, collection: assets.collection }));
    }, [dispatch]);

    const handleCreateNewAsset = async (assetClonedId?: string) => {
        setLoading(true);
        dispatch(createNewAssetThunk(assetClonedId || cloneId))
            .then(() => {
                router.push('/home/consignArtwork');
            })
            .finally(() => setLoading(false));
    };

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleDeleteClick = (assetId: string) => {
        setAssetToDelete(assetId);
        setOpenDeleteDialog(true);
    };

    const handleDeleteConfirm = () => {
        if (assetToDelete) {
            dispatch(deleteAssetThunk(assetToDelete));
        }
        setOpenDeleteDialog(false);
        setAssetToDelete(null);
    };

    const handleDeleteCancel = () => {
        setOpenDeleteDialog(false);
        setAssetToDelete(null);
    };

    const handleFilterChange = (filter: string) => {
        dispatch(setFilter(filter));
        dispatch(
            requestMyAssetsThunk({ page: currentPage, status: filter.toLowerCase(), collection: assets.collection })
        );
    };

    return (
        <Container
            sx={{
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
                                onClick={() => handleCreateNewAsset()}
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
                                options={assets.data.map((asset) => ({
                                    value: asset._id,
                                    label: asset.title,
                                }))}
                                onChange={(event) => setCloneId(event?.value)}
                                isClearable
                                styles={{
                                    container: (provided) => ({
                                        ...provided,
                                        minWidth: 163,
                                        width: isMobile ? 163 : 'auto',
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
                                    minWidth: 163,
                                }}
                                onChange={(event) => {
                                    dispatch(userActionsCreators.setSelectedCollection(event.target.value));
                                    dispatch(
                                        requestMyAssetsThunk({
                                            page: currentPage,
                                            collection: event.target.value,
                                            status: selectedFilter,
                                        })
                                    );
                                }}
                            >
                                <MenuItem value="all">All</MenuItem>

                                {collections?.map((item, index) => (
                                    <MenuItem key={index} value={item.collection}>
                                        {item.collection}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                        {isMobile || isTablet ? (
                            <Box display="flex" alignItems="center" gap={2}>
                                <IconButton onClick={handleDrawerToggle}>
                                    <MenuIcon />
                                </IconButton>
                                <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
                                    <List>
                                        {filters.map((filter, index) => (
                                            <ListItem
                                                button
                                                key={index}
                                                onClick={() => {
                                                    handleFilterChange(filter);
                                                    handleDrawerToggle();
                                                }}
                                            >
                                                <ListItemText primary={filter} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Drawer>
                            </Box>
                        ) : (
                            <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
                                {filters.map((filter, index) => (
                                    <Button
                                        key={index}
                                        onClick={() => handleFilterChange(filter)}
                                        variant="text"
                                        style={{
                                            color: selectedFilter === filter ? '#000' : '#666',
                                            border: selectedFilter === filter ? '1px solid #000' : 'none',
                                            transition: '0.3s',
                                            textDecoration: 'underline',
                                            fontSize: 18,
                                        }}
                                    >
                                        {filter}
                                    </Button>
                                ))}
                            </Box>
                        )}
                    </Box>
                    <Box mt={2} style={{ maxHeight: 'calc(100vh - 420px)', overflowY: 'scroll' }}>
                        <Grid container spacing={2} padding={1}>
                            {assets.data.map((asset, index) => (
                                <Grid item key={index} sm={6} md={6} lg={4}>
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
                                            minWidth: '300px',
                                            minHeight: '380px',
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
                                        <Tooltip title="Duplicate asset" placement="top">
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
                                                onMouseEnter={(event) => {
                                                    event.currentTarget.style.backgroundColor = '#000';
                                                    event.currentTarget.style.borderColor = '#13DFAA';
                                                }}
                                                onMouseLeave={(event) => {
                                                    event.currentTarget.style.backgroundColor = '#fff';
                                                    event.currentTarget.style.borderColor = '#fff';
                                                }}
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    handleCreateNewAsset(asset._id);
                                                }}
                                            >
                                                <IconCopyPlus size={20} color="#13DFAA" />
                                            </button>
                                        </Tooltip>
                                        {!['Pending', 'Sold', 'Listed'].includes(
                                            getStatus(asset.status, asset.mintExplorer)
                                        ) && (
                                            <Tooltip title="Delete asset" placement="top">
                                                <button
                                                    style={{
                                                        position: 'absolute',
                                                        top: 60,
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
                                                        handleDeleteClick(asset._id);
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
                                            </Tooltip>
                                        )}

                                        {isVideoExtension(asset.image) ? (
                                            <video
                                                autoPlay
                                                muted
                                                loop
                                                style={{
                                                    objectFit: 'cover',
                                                    borderTopLeftRadius: 10,
                                                    borderTopRightRadius: 10,
                                                    minHeight: 300,
                                                }}
                                                width={300}
                                                height={300}
                                            >
                                                <source src={asset.image} type="video/mp4" />
                                            </video>
                                        ) : (
                                            <Image
                                                src={asset.image}
                                                alt="bg"
                                                width={300}
                                                height={300}
                                                style={{
                                                    objectFit: 'cover',
                                                    borderTopLeftRadius: 10,
                                                    borderTopRightRadius: 10,
                                                    minHeight: 300,
                                                }}
                                            />
                                        )}

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
                                                height: 90,
                                                paddingLeft: '13px',
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    textAlign: 'left',
                                                    marginBottom: '-10px',
                                                }}
                                            >
                                                {asset.title}
                                            </Typography>
                                            <Box display="flex" alignItems="center" gap={1} marginBottom={0}>
                                                <Typography>
                                                    {getStatusText(asset.status, asset.mintExplorer)}
                                                </Typography>
                                            </Box>
                                            <Typography
                                                sx={{
                                                    textAlign: 'left',
                                                    color:
                                                        getStatusText(asset.status, asset.mintExplorer) === 'Sold'
                                                            ? 'inherit'
                                                            : 'transparent',
                                                    marginBottom:
                                                        getStatusText(asset.status, asset.mintExplorer) === 'Sold'
                                                            ? '0px'
                                                            : '20px',
                                                    marginTop:
                                                        getStatusText(asset.status, asset.mintExplorer) === 'blocked'
                                                            ? '-30px'
                                                            : '-10px',
                                                }}
                                            >
                                                {asset.mintExplorer
                                                    ? `$${asset?.licenses?.nft.single.editionPrice}.00`
                                                    : ''}
                                            </Typography>
                                            {getStatus(asset.status, asset.mintExplorer) === 'Draft' && (
                                                <IconEdit style={iconStyle} />
                                            )}
                                            {getStatus(asset.status, asset.mintExplorer) === 'Rejected' && (
                                                <IconEdit style={iconStyle} />
                                            )}
                                            {getStatus(asset.status, asset.mintExplorer) !== 'Sold' &&
                                                getStatus(asset.status, asset.mintExplorer) !== 'Listed' &&
                                                asset.countComments > 0 && (
                                                    <div style={iconStyleComment}>
                                                        <Badge badgeContent={asset.countComments} color="primary">
                                                            <IconMessage />
                                                        </Badge>
                                                    </div>
                                                )}
                                            {getStatus(asset.status, asset.mintExplorer) === 'Pending' && (
                                                <IconScanEye style={iconStyle} />
                                            )}
                                            {getStatus(asset.status, asset.mintExplorer) === 'Listed' && (
                                                <IconTag style={iconStyle} />
                                            )}
                                            {asset.mintExplorer && (
                                                <IconCircleFilled
                                                    size={20}
                                                    style={{
                                                        color: '#ff0000',
                                                        position: 'absolute',
                                                        bottom: '6px',
                                                        left: '233px',
                                                        height: '35px',
                                                        width: '80px',
                                                    }}
                                                />
                                            )}
                                            <Typography>{getPriceText(asset.licenses)}</Typography>
                                            <Button
                                                variant="text"
                                                style={{
                                                    color: '#000',
                                                    textDecoration: 'underline',
                                                    textAlign: 'left',
                                                    justifyContent: 'flex-start',
                                                    float: 'left',
                                                    paddingLeft: '0',
                                                    position: 'relative',
                                                    top: '-20px',
                                                    paddingTop: '0',
                                                    marginTop: '-3px',
                                                }}
                                            >
                                                {getButtonText(asset.status, asset.mintExplorer)}
                                            </Button>
                                        </Box>
                                    </button>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    <Pagination
                        count={assets.totalPage}
                        page={currentPage}
                        color="primary"
                        onChange={(_event, value) => {
                            dispatch(userActionsCreators.setCurrentPage(value));
                            dispatch(
                                requestMyAssetsThunk({
                                    page: value,
                                    status: selectedFilter,
                                    collection: assets.collection,
                                })
                            );
                        }}
                    />
                </Box>
            </PageContainer>

            <Dialog
                open={openDeleteDialog}
                onClose={handleDeleteCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Delete Asset'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you really want to delete this asset?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="outlined">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
