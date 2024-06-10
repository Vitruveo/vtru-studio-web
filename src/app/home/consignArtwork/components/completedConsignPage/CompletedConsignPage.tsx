import { Box, Button, Grid, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from '@/store/hooks';
import { CompletedConsignTableStatus } from './CompletedConsignTableStatus';
import PageContainerFooter from '@/app/home/components/container/PageContainerFooter';
import Breadcrumb, { BreadCrumbItem } from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
import AssetMediaPreview from '../assetMediaPreview';
import { useFormik } from 'formik';
import { useI18n } from '@/app/hooks/useI18n';
import { ConsignArtworkAssetStatus } from '@/features/consignArtwork/types';
import { useToastr } from '@/app/hooks/useToastr';
import { consignArtworkThunks } from '@/features/consignArtwork/thunks';
import { EXPLORER_URL } from '@/constants/explorer';
import BannerVault from '@/app/home/components/bannerVault/banner';

// TODO: ADICIONAR TRADUÇÃO

interface FormType {
    selectedStatus: ConsignArtworkAssetStatus;
}

export const CompletedConsignPage = () => {
    const dispatch = useDispatch();
    const xL = useMediaQuery((them: Theme) => them.breakpoints.up('xl'));
    const { language } = useI18n();
    const theme = useTheme();
    const toastr = useToastr();

    const previewAndConsign = useSelector((state) => state.consignArtwork.previewAndConsign);
    const status = useSelector((state) => state.consignArtwork.status);
    const transactionHash = useSelector((state) => state.asset.contractExplorer?.tx);

    const grayColor = theme.palette.text.disabled;

    const formik = useFormik<FormType>({
        initialValues: {
            selectedStatus: status,
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            dispatch(consignArtworkThunks.updateStatus(values.selectedStatus));
        },
    });

    const texts = {
        artworkListingTitle: language['studio.consignArtwork.artworkListing'],
        artworkListingActionTitle: language['studio.consignArtwork.consignmentStatus.preview.title'],
        consignedTitle: language['studio.consignArtwork.artworkConsignedTitle'],
        consignArtworkTitle: language['studio.consignArtwork.title'],
        view: language['studio.consignArtwork.consignmentStatus.view'],
    } as { [key: string]: string };

    const handlePreview = () => {
        dispatch(consignArtworkThunks.preview());
    };

    const consignSteps = {
        artworkListing: {
            title: texts.artworkListingTitle,
            actionTitle: texts.artworkListingActionTitle,
            actionFunc: handlePreview,
            value: undefined,
        },
        creatorContract: {
            title: 'Artwork Transaction',
            actionTitle: texts.view,
            value: previewAndConsign.creatorContract?.value,
            actionFunc: async () => {
                if (transactionHash) {
                    window.open(`${EXPLORER_URL}/tx/${transactionHash}`, '_blank');
                } else {
                    toastr.display({ type: 'error', message: 'Explorer URL not found' });
                }
            },
        },
    };

    const BCrumb: BreadCrumbItem[] = [
        {
            title: 'Home',
        },
        {
            title: texts.consignArtworkTitle,
            to: '/home/consignArtwork',
        },
    ];

    return (
        <form onSubmit={formik.handleSubmit}>
            <PageContainerFooter hasBackButton>
                <BannerVault />
                <Breadcrumb title={texts.consignArtworkTitle} items={BCrumb} />
                <Grid display="flex" flexWrap="wrap" marginBottom={6} item xs={12} lg={6}>
                    <Box marginBottom={2}>
                        <Box>
                            <Typography variant="h6" fontWeight="normal" color="GrayText">
                                {texts.consignedTitle}
                            </Typography>
                        </Box>
                        <Box maxWidth={600} p={2}>
                            {Object.values(consignSteps).map((v) => (
                                <Box
                                    sx={{ alignItems: 'center!important' }}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    flexWrap="wrap"
                                    key={v.title}
                                >
                                    <Box flex={2}>
                                        <Typography
                                            sx={{
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                                overflow: 'hidden',
                                            }}
                                            my={2}
                                            variant="h6"
                                            fontWeight="normal"
                                            color="GrayText"
                                        >
                                            {v.title}
                                        </Typography>
                                    </Box>
                                    <Box flex={2} display="flex">
                                        <Box width={110} display="flex" alignItems="center">
                                            {v.value && (
                                                <Box
                                                    display="flex"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    height="100%"
                                                    width="100%"
                                                    color={!v.value ? 'white' : 'inherit'}
                                                    bgcolor={(!v?.value && grayColor) || '#EFEFEF'}
                                                >
                                                    {v.value}
                                                </Box>
                                            )}
                                        </Box>
                                        <Box width={100} marginLeft={1}>
                                            <Button onClick={v.actionFunc} size="small" variant="contained" fullWidth>
                                                {v.actionTitle}
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                            {
                                <Box mt={4}>
                                    <CompletedConsignTableStatus
                                        selectedStatus={formik.values.selectedStatus}
                                        onStatusChange={formik.handleChange}
                                    />
                                </Box>
                            }
                        </Box>
                    </Box>
                    <Box flex={1} display="flex" justifyContent={!xL ? 'flex-start' : 'center'}>
                        <AssetMediaPreview />
                    </Box>
                </Grid>
            </PageContainerFooter>
        </form>
    );
};
