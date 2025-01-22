'use client';

import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import { Fab, Action } from 'react-tiny-fab';
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
    Theme,
    useTheme,
    ToggleButton,
    Switch,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import {
    IconCircleFilled,
    IconCopyPlus,
    IconMessage,
    IconPlus,
    IconLicense,
    IconTrash,
    IconSettings,
    IconEdit,
    IconEye,
} from '@tabler/icons-react';
import RSelect from 'react-select';
import Image from 'next/image';

import { useDispatch, useSelector } from '@/store/hooks';
import { useI18n } from '../../hooks/useI18n';
import { putAutoStakeThunk, requestMyAssetsThunk } from '@/features/user/thunks';
import { userActionsCreators } from '@/features/user/slice';
import { createNewAssetThunk, deleteAssetThunk } from '@/features/asset/thunks';
import { consignArtworkActionsCreators } from '@/features/consign/slice';
import { assetActionsCreators } from '@/features/asset/slice';
import { setFilter } from '@/features/filters/filtersSlice';
import PageContainer from '@/app/(main)/components/container/PageContainer';
import { MintExplorer } from '@/features/user/types';
import isVideoExtension from '@/utils/isVideo';
import { ModalListOfLicenses } from '../components/licenses/ModalListOfLicenses';
import { userSelector } from '@/features/user';

const iconStyle: CSSProperties = {
    position: 'absolute',
    bottom: 15,
    right: 10,
    color: '#595959',
};

const iconStyleComment: CSSProperties = {
    position: 'absolute',
    bottom: 15,
    right: 50,
    color: '#595959',
};
const filters = ['Draft', 'Pending', 'Listed', 'Sold', 'ArtCards', 'All'];

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

export default function Home() {
    const { language } = useI18n();
    const dispatch = useDispatch();
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width: 600px)');
    const isTablet = useMediaQuery('(max-width: 900px)');
    const { assets, currentPage, autoStake, collections, sort } = useSelector((state) => state.user);
    const customizer = useSelector((state) => state.customizer);
    const lgUp = useMediaQuery((item: Theme) => item.breakpoints.up('lg'));
    const mdUp = useMediaQuery((item: Theme) => item.breakpoints.up('md'));
    const smUp = useMediaQuery((item: Theme) => item.breakpoints.up('sm'));
    const selectedFilter = useSelector((state) => state.filters.selectedFilter);

    const topRef = useRef<HTMLDivElement>(null);
    const [cloneId, setCloneId] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [assetToDelete, setAssetToDelete] = useState<string | null>(null);
    const [showListOfLicenses, setShowListOfLicenses] = useState(false);

    const { emails, username, wallets } = useSelector(userSelector(['emails', 'wallets', 'username']));
    const isCompletedProfile = emails.length && wallets.length && username.length;

    const generalVault = useSelector((state) => state.user.generalVault);

    const texts = {
        title: language['studio.home.title'],
        welcome: language['studio.home.wellcome'],
        transform: language['studio.home.transforming'],
        software: language['studio.home.software'],
        consign: language['studio.home.consign'],
        myProfile: language['studio.home.myProfile'],
    } as { [key: string]: string };

    const handleScrollToTop = () => {
        if (topRef.current) {
            topRef.current.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        handleScrollToTop();
    }, [currentPage]);

    useEffect(() => {
        if (generalVault) {
            router.push('/profile');
        }
    }, [generalVault]);

    useEffect(() => {
        dispatch(userActionsCreators.setSelectedAsset(''));
        dispatch(consignArtworkActionsCreators.resetConsignArtwork());
        dispatch(assetActionsCreators.resetAsset());
        dispatch(
            requestMyAssetsThunk({ page: currentPage, status: selectedFilter, collection: assets.collection, sort })
        );
    }, [dispatch]);

    const handleCreateNewAsset = async (assetClonedId?: string) => {
        if (isCompletedProfile) {
            setLoading(true);
            dispatch(createNewAssetThunk(assetClonedId || cloneId))
                .then(() => {
                    router.push('/consign');
                })
                .finally(() => setLoading(false));
        } else {
            dispatch(consignArtworkActionsCreators.changeGoToConsignArtwork(true));
            router.push('/profile');
        }
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
        dispatch(userActionsCreators.setCurrentPage(1));
        dispatch(
            requestMyAssetsThunk({
                page: 1,
                status: filter,
                collection: assets.collection,
                sort,
            })
        );
    };

    const handleChangeAutoStake = () => {
        dispatch(putAutoStakeThunk());
    };

    if (generalVault) return <></>;

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
                <Box
                    pr={1}
                    sx={{
                        maxHeight: lgUp
                            ? 'calc(100vh - 100px)'
                            : mdUp || smUp
                              ? 'calc(100vh - 400px)'
                              : 'calc(100vh - 500px)',
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                    }}
                >
                    <Box display="flex" flexWrap="wrap" alignItems="center">
                        <Typography marginRight={1} fontSize="1.7rem" alignSelf="center">
                            {texts.welcome}
                        </Typography>
                        <Image src={'/images/logos/XIBIT-logo_light.png'} priority alt="bg" width={90} height={30} />
                    </Box>

                    <Box bgcolor="#ff0066" color="#fff" p={2} borderRadius={2} mt={2}>
                        <Typography fontSize="1.1rem" alignSelf="center" lineHeight={1.5}>
                            Xibit is beta software. Funds from platform sales are subject to the following restrictions:
                        </Typography>
                        <br />
                        <Typography fontSize="1.1rem" alignSelf="center" lineHeight={1.5}>
                            1) For the first 30 days after your initial consignment, no funds may be withdrawn.
                        </Typography>
                        <Typography fontSize="1.1rem" alignSelf="center" lineHeight={1.5}>
                            2) After 30 days you have two choices for the funds in your Vault:
                        </Typography>

                        <Box ml={8}>
                            <Typography fontSize="1.1rem" alignSelf="center" lineHeight={1.5}>
                                a) Claim 5% and Stake 95%, OR
                            </Typography>
                            <Typography fontSize="1.1rem" alignSelf="center" lineHeight={1.5}>
                                b) Claim 100% <b>after</b> VTRU is listed on a Centralized Exchange in January 2025
                            </Typography>
                        </Box>
                    </Box>
                    <Box gap={2} display="flex">
                        <Box flex={3} mt={2}>
                            <button
                                style={{
                                    height: 80,
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
                                            // rotate on hover.
                                            event.currentTarget.style.transform = 'rotate(180deg)';
                                        }}
                                        onMouseLeave={(event) => {
                                            event.currentTarget.style.transform = 'rotate(0deg)';
                                        }}
                                        color="#000"
                                    />
                                </div>
                                <Box
                                    display={'flex'}
                                    flexDirection={smUp ? 'row' : 'column'}
                                    gap={2}
                                    alignItems={'center'}
                                    justifyContent={'space-between'}
                                    width={'100%'}
                                >
                                    <Typography sx={{ fontSize: 22 }}>Consign a new asset</Typography>
                                    <RSelect
                                        placeholder="Duplicate asset and consign from..."
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
                                                width: 'auto',
                                            }),
                                        }}
                                    ></RSelect>
                                </Box>
                            </button>
                        </Box>
                        <Box flex={1} mt={2}>
                            <button
                                style={{
                                    height: 80,
                                    backgroundColor: '#D8C2D9',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    width: '100%',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: '0.3s',
                                }}
                            >
                                <Box marginLeft={2}>
                                    <Box display={'flex'} gap={1} alignItems={'center'} width={'100%'}>
                                        <Switch
                                            name={`autoStake`}
                                            checked={autoStake}
                                            onChange={handleChangeAutoStake}
                                        />
                                        <Typography sx={{ fontSize: 18, whiteSpace: 'nowrap' }}>
                                            Auto-stake for Buying Blitz
                                        </Typography>
                                    </Box>
                                    <Typography sx={{ fontSize: 14, whiteSpace: 'nowrap' }}>
                                        Sales for all artworks will be auto-staked 95%
                                    </Typography>
                                </Box>
                            </button>
                        </Box>
                    </Box>

                    <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
                        <Box
                            display="flex"
                            flexDirection={lgUp ? 'row' : 'column'}
                            alignItems="center"
                            gap={2}
                            justifyContent={'space-between'}
                        >
                            <Box display={'flex'} alignItems={'center'} gap={0.7}>
                                <Typography variant="h4">Collection:</Typography>
                                <Select
                                    defaultValue="all"
                                    style={{
                                        minWidth: 163,
                                    }}
                                    onChange={(event) => {
                                        dispatch(userActionsCreators.setSelectedCollection(event.target.value));
                                        dispatch(userActionsCreators.setCurrentPage(1));
                                        dispatch(
                                            requestMyAssetsThunk({
                                                page: 1,
                                                collection: event.target.value,
                                                status: selectedFilter,
                                                sort,
                                            })
                                        );
                                    }}
                                >
                                    <MenuItem value="all">All</MenuItem>

                                    {collections
                                        ?.slice()
                                        .sort((a, b) => a.collection.localeCompare(b.collection))
                                        .map((item, index) => (
                                            <MenuItem key={index} value={item.collection}>
                                                {item.collection}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </Box>
                            <Box display={'flex'} alignItems={'center'} gap={2}>
                                <Typography variant="h4">Sort:</Typography>
                                <Select
                                    defaultValue="consignNewToOld"
                                    style={{
                                        minWidth: 163,
                                    }}
                                    onChange={(event) => {
                                        dispatch(userActionsCreators.setSort(event.target.value));
                                        dispatch(
                                            requestMyAssetsThunk({
                                                page: currentPage,
                                                collection: assets.collection,
                                                status: selectedFilter,
                                                sort: event.target.value,
                                            })
                                        );
                                    }}
                                >
                                    <MenuItem value="consignNewToOld">Consigned — New to Old</MenuItem>
                                    <MenuItem value="consignOldToNew">Consigned — Old to New</MenuItem>
                                </Select>
                            </Box>
                        </Box>
                        {isMobile || isTablet ? (
                            <Box display="flex" alignItems="center">
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
                            <Box display="flex" flexDirection="row" alignItems="center">
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
                    <Box mt={2} ref={topRef}>
                        <Grid container spacing={2} padding={1} width={'100%'} justifyContent={'center'}>
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
                                                    zIndex: 1,
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
                                                        zIndex: 1,
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
                                                borderBottomLeftRadius: 10,
                                                borderBottomRightRadius: 10,
                                                height: asset?.mintExplorer ? 110 : 90,
                                                paddingLeft: '13px',
                                                position: 'relative',
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    maxWidth: 270,
                                                    overflowX: 'hidden',
                                                    textAlign: 'left',
                                                }}
                                            >
                                                {asset.title}
                                            </Typography>
                                            <Typography
                                                style={{
                                                    textAlign: 'left',
                                                }}
                                            >
                                                {getStatusText(asset.status, asset.mintExplorer)}
                                            </Typography>

                                            {asset.mintExplorer && (
                                                <Typography
                                                    sx={{
                                                        textAlign: 'left',
                                                    }}
                                                >
                                                    {`$${asset?.licenses?.nft.single.editionPrice}.00`}
                                                </Typography>
                                            )}

                                            <Button
                                                variant="text"
                                                style={{
                                                    justifyContent: 'unset',
                                                    padding: 0,
                                                    color: '#000',
                                                    textDecoration: 'underline',
                                                }}
                                            >
                                                {getButtonText(asset.status, asset.mintExplorer)}
                                            </Button>

                                            {asset.mintExplorer && (
                                                <IconCircleFilled
                                                    size={40}
                                                    style={{
                                                        color: '#ff0000',
                                                        position: 'absolute',
                                                        bottom: 10,
                                                        right: 70,
                                                    }}
                                                />
                                            )}
                                            <Fab
                                                mainButtonStyles={{
                                                    backgroundColor: 'transparent',
                                                    color: 'GrayText',
                                                    boxShadow: 'none',
                                                }}
                                                style={{
                                                    position: 'absolute',
                                                    bottom: -22,
                                                    right: -20,
                                                }}
                                                icon={<IconSettings size={40} />}
                                                alwaysShowTitle={true}
                                            >
                                                {!asset.mintExplorer && (
                                                    <Action
                                                        style={{ backgroundColor: '#fff' }}
                                                        text="Edit"
                                                        onClick={() => router.push('/consign')}
                                                    >
                                                        <IconEdit color={theme.palette.primary.main} size={30} />
                                                    </Action>
                                                )}
                                                {(asset.mintExplorer || asset.contractExplorer) && (
                                                    <Action
                                                        style={{ backgroundColor: '#fff' }}
                                                        text="View"
                                                        onClick={() => router.push('/consign/completed')}
                                                    >
                                                        <IconEye color={theme.palette.primary.main} size={30} />
                                                    </Action>
                                                )}
                                                <Action
                                                    style={{ backgroundColor: '#fff' }}
                                                    text="List of Licenses"
                                                    onClick={() => setShowListOfLicenses(true)}
                                                >
                                                    <IconLicense color={theme.palette.primary.main} size={30} />
                                                </Action>
                                            </Fab>

                                            {getStatus(asset.status, asset.mintExplorer) !== 'Sold' &&
                                                getStatus(asset.status, asset.mintExplorer) !== 'Listed' &&
                                                asset.countComments > 0 && (
                                                    <div style={iconStyleComment}>
                                                        <Badge badgeContent={asset.countComments} color="primary">
                                                            <IconMessage size={30} />
                                                        </Badge>
                                                    </div>
                                                )}
                                        </Box>
                                    </button>
                                </Grid>
                            ))}
                        </Grid>
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
                                        sort,
                                    })
                                );
                            }}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: 2,
                            }}
                        />
                    </Box>
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

            <ModalListOfLicenses
                open={showListOfLicenses}
                onClose={() => {
                    // load assets again
                    dispatch(
                        requestMyAssetsThunk({
                            page: currentPage,
                            status: selectedFilter,
                            collection: assets.collection,
                            sort,
                        })
                    ).finally(() => {
                        setShowListOfLicenses(false);
                    });
                }}
            />
        </Container>
    );
}
