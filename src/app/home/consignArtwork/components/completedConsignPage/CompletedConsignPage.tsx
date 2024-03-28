import { Box, Button, Grid, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from '@/store/hooks';
import { CompletedConsignTableStatus, ConsignTableStatus } from './CompletedConsignTableStatus';
import PageContainerFooter from '@/app/home/components/container/PageContainerFooter';
import Breadcrumb, { BreadCrumbItem } from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
import AssetMediaPreview from '../assetMediaPreview';
import { useFormik } from 'formik';
import { useI18n } from '@/app/hooks/useI18n';
import { updateAssetStep } from '@/features/asset/requests';
import { getStatus, getTableStatus } from './helpers';
import { assetActionsCreators } from '@/features/asset/slice';

// TODO: ADICIONAR TRADUÇÃO

interface FormType {
    selectedStatus: ConsignTableStatus;
}

export const CompletedConsignPage = () => {
    const { previewAndConsign } = useSelector((state) => state.consignArtwork);
    const xL = useMediaQuery((them: Theme) => them.breakpoints.up('xl'));
    const theme = useTheme();
    const dispatch = useDispatch();
    const { status } = useSelector(state => state.asset)
    const { language } = useI18n();

    const grayColor = theme.palette.text.disabled;

    // TODO: VERIFICAR SE A CHAMADA A API ESTÁ SENDO FEITO DA MANEIRA CORRETA
    const formik = useFormik<FormType>({
        initialValues: {
            selectedStatus: getTableStatus(status),
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                await updateAssetStep({ stepName: 'publish', status: getStatus(values.selectedStatus) });
                dispatch(assetActionsCreators.change({ status: getStatus(values.selectedStatus) }))
            } catch (error) {
                // TODO: TRATAR ERRO
            }
        },
    });

    const texts = {
        artworkListingTitle: language['studio.consignArtwork.artworkListing'],
        artworkListingActionTitle: language['studio.consignArtwork.consignmentStatus.preview.title'],
        consignedTitle: language['studio.consignArtwork.artworkConsignedTitle'],
        consignArtworkTitle: language['studio.consignArtwork.title'],
    } as { [key: string]: string };

    const consignSteps = {
        artworkListing: {
            title: texts.artworkListingTitle,
            actionTitle: texts.artworkListingActionTitle,
            actionFunc: () => {
                window.open('https://www.google.com', '_blank');
            },
            value: undefined,
        },
        creatorContract: {
            title: 'Creator Contract',
            actionTitle: 'View',
            value: previewAndConsign.creatorContract?.value,
            actionFunc: async () => {
                window.open('https://explorer.vitruveo.xyz/', '_blank');
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
            <PageContainerFooter submitText="Update" secondaryText="Edit" submitDisabled={!formik.dirty}>
                <Breadcrumb title="Consign Artwork" items={BCrumb} />
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
                            <Box mt={4}>
                                <CompletedConsignTableStatus
                                    selectedStatus={formik.values.selectedStatus}
                                    onStatusChange={formik.handleChange}
                                />
                            </Box>
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
