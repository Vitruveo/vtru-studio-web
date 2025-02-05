'use client';
import { Formik, Form, Field } from 'formik';
import { STORE_STORAGE_URL } from '@/constants/asset';
import { useSelector } from '@/store/hooks';
import Breadcrumb from '@/app/(main)/layout/shared/breadcrumb/Breadcrumb';
import { Box, Button, Typography } from '@mui/material';
import { debounce } from '@mui/material/utils';
import HideElements from '@/app/(main)/components/stores/hideElements';
import { PreviewDetailed } from '@/app/(main)/components/stores/PreviewDetailed';

export interface State {
    filter: boolean;
    order: boolean;
    header: boolean;
    recentlySold: boolean;
    spotlight: boolean;
    artistSpotlight: boolean;
    pageNavigation: boolean;
    cardDetail: boolean;
    assets: boolean;
    color: string;
}

const AppearanceAndContent = () => {
    const selectedStore = useSelector((state) => state.stores.selectedStore);
    const store = useSelector((state) => state.stores.data.data.find((item) => item._id === selectedStore.id));
    const isFile = (path: any): path is File => path instanceof File;

    const handleChangeColor = debounce(
        (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
            const color = e.target.value;
            setFieldValue('color', color);
        },
        500
    );

    const handleBack = () => {};
    const handleNext = () => {};

    return (
        <Box display={'grid'} gridTemplateRows={'1fr auto'} height="calc(100vh - 64px)">
            <Formik
                initialValues={{
                    filter: false,
                    order: false,
                    header: false,
                    recentlySold: false,
                    spotlight: false,
                    artistSpotlight: false,
                    pageNavigation: false,
                    cardDetail: false,
                    assets: false,
                    color: '#000000',
                }}
                onSubmit={() => {}}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <Box paddingInline={3}>
                            <Breadcrumb
                                title="Publish Store"
                                assetTitle={store?.organization.url || ''}
                                items={[
                                    { title: 'Stores', to: '/stores' },
                                    { title: 'Publish', to: '/stores/publish' },
                                    { title: 'Appearance And Content' },
                                ]}
                            />
                        </Box>

                        <Box display={'flex'} flexDirection={'column'} padding={3} gap={2}>
                            <Typography variant="h6" fontWeight={'bold'}>
                                Hide Elements
                            </Typography>
                            <Typography variant="body2">
                                You can choose which elements you want to show in your store{' '}
                            </Typography>
                            <HideElements />
                        </Box>

                        <Box display={'flex'} flexDirection={'column'} padding={3} gap={2}>
                            <Typography variant="h6" fontWeight={'bold'}>
                                Highlight Color
                            </Typography>
                            <Typography variant="body2">You can choose the highlight color for your store </Typography>
                            <input type="color" onChange={(e) => handleChangeColor(e, setFieldValue)} />
                        </Box>

                        <PreviewDetailed
                            title={store?.organization.url || 'Store Name'}
                            description={store?.organization.description || 'Store Description'}
                            domain={
                                store?.organization.url
                                    ? `https://${store?.organization.url}.xibit.live`
                                    : 'https://example.xibit.live'
                            }
                            banner={
                                store?.organization.formats?.banner?.path
                                    ? isFile(store?.organization.formats?.banner.path)
                                        ? URL.createObjectURL(store?.organization?.formats?.banner.path)
                                        : `${STORE_STORAGE_URL}/${store?.organization.formats?.banner.path}`
                                    : null
                            }
                            logo={
                                isFile(store?.organization.formats?.logo.square.path)
                                    ? URL.createObjectURL(store?.organization?.formats?.logo.square.path)
                                    : `${STORE_STORAGE_URL}/${store?.organization.formats?.logo.square.path}` || ''
                            }
                            logoHorizontal={
                                isFile(store?.organization.formats?.logo.horizontal.path)
                                    ? URL.createObjectURL(store?.organization?.formats?.logo.horizontal.path)
                                    : `${STORE_STORAGE_URL}/${store?.organization.formats?.logo.horizontal.path}` || ''
                            }
                        />

                        <Box bgcolor="#e5e7eb">
                            <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
                                <Typography color="GrayText">Step 3 of 3</Typography>
                                <Box display="flex" gap={2}>
                                    <Button type="button" variant="text" onClick={handleBack}>
                                        <Typography color="gray">Back</Typography>
                                    </Button>
                                    <Button type="button" onClick={handleNext} variant="contained">
                                        Next
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default AppearanceAndContent;
