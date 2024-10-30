'use client';

import { Box, Button, Grid, Slider, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';

import Breadcrumb from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
import CustomTextField from '@/app/home/components/forms/theme-elements/CustomTextField';

import Image1 from '../../../../../../public/images/temp/banner.jpg';
import Image2 from '../../../../../../public/images/temp/logo.png';
import Image3 from '../../../../../../public/images/temp/logo-horizontal.jpg';

const Component = () => {
    const theme = useTheme();
    const router = useRouter();

    return (
        <Box
            position="relative"
            paddingInline={3}
            sx={{
                overflowY: 'auto',
                height: 'calc(100vh - 64px)',
                paddingBottom: 30,
            }}
        >
            <Breadcrumb
                title="Publish Store"
                assetTitle={'Horizon Gallery'}
                items={[
                    { title: 'Stores', to: '/home/stores' },
                    { title: 'Publish', to: '/home/stores/publish' },
                    {
                        title: 'Organization',
                    },
                ]}
            />
            <Box p={2} pt={0}>
                <Typography variant="h4">Organization</Typography>
                <Typography variant="h6" fontWeight="normal" color="GrayText">
                    Complete all required tasks to publish your Store.
                </Typography>
            </Box>

            <form
                style={{
                    padding: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                }}
            >
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" flexDirection="column">
                            <Typography variant="h6" fontWeight="normal">
                                ID
                            </Typography>
                            <CustomTextField
                                id="id"
                                label=""
                                size="small"
                                value="horizon"
                                sx={{
                                    width: 200,
                                }}
                            />
                            <Typography variant="caption" color="GrayText">
                                Lowercase a-z, numbers 0-9 <br /> and hyphens. Minimum length 4 characters.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" flexDirection="column" gap={0.5}>
                            <Typography variant="h6" fontWeight="normal">
                                Store URL
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{
                                    color: theme.palette.secondary.contrastText,
                                }}
                            >
                                https://horizon.xibit.art
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                <Box>
                    <Typography variant="h6" fontWeight="normal">
                        Name
                    </Typography>
                    <CustomTextField
                        id="name"
                        label=""
                        size="small"
                        value="Horizon Gallery"
                        sx={{
                            width: 400,
                        }}
                    />
                </Box>
                <Box>
                    <Typography variant="h6" fontWeight="normal">
                        Description
                    </Typography>
                    <CustomTextField
                        id="description"
                        label=""
                        value="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab sapiente commodi tenetur nostrum minima quas repudiandae earum, sunt obcaecati ipsum porro totam, iste voluptatum fuga quae magni consequatur consectetur perferendis. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab sapiente commodi tenetur nostrum minima quas repudiandae earum, sunt obcaecati ipsum porro totam, iste voluptatum fuga quae magni consequatur consectetur perferendis. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab sapiente commodi tenetur nostrum minima quas repudiandae earum, sunt obcaecati ipsum porro totam, iste voluptatum fuga quae magni consequatur consectetur perferendis."
                        size="small"
                        multiline
                        rows={4}
                        fullWidth
                    />
                </Box>

                <Box>
                    <Typography variant="h6" fontWeight="normal">
                        Markup
                    </Typography>
                    <Slider
                        defaultValue={10}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={0}
                        max={25}
                    />
                </Box>
                {/* <h1>Option 1</h1>
                <Grid container>
                    <Grid item md={6}>
                        <Box>
                            <Typography variant="h6" fontWeight="normal" mb={1}>
                                Logo Horizontal
                            </Typography>
                            <Box width={500} height={250} borderRadius={1} bgcolor={'#e5e7eb'}>
                                <Image
                                    src={Image3}
                                    alt="Horizon Gallery"
                                    width={500}
                                    height={120}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box>
                            <Typography variant="h6" fontWeight="normal" mb={1} mt={1}>
                                Logo Square
                            </Typography>
                            <Box width={200} height={200} borderRadius={1} bgcolor={'#e5e7eb'}>
                                <Image
                                    src={Image2}
                                    alt="Horizon Gallery"
                                    width={200}
                                    height={200}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item md={6}>
                        {' '}
                        <Box>
                            <Typography variant="h6" fontWeight="normal" mb={1}>
                                Banner
                            </Typography>
                            <Box width="100%" height={250} maxWidth={750} borderRadius={1} bgcolor={'#e5e7eb'}>
                                <Image
                                    src={Image1}
                                    alt="Horizon Gallery"
                                    width={750}
                                    height={250}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid> */}

                {/* <h1>Option 2</h1> */}
                <Box display="flex" gap={2}>
                    <Box>
                        <Typography variant="h6" fontWeight="normal" mb={1}>
                            Logo Horizontal
                        </Typography>
                        <Box width={400} height={200} borderRadius={1} bgcolor={'#e5e7eb'}>
                            <Image
                                src={Image3}
                                alt="Horizon Gallery"
                                width={300}
                                height={200}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h6" fontWeight="normal" mb={1}>
                            Logo Square
                        </Typography>
                        <Box width={200} height={200} borderRadius={1} bgcolor={'#e5e7eb'}>
                            <Image
                                src={Image2}
                                alt="Horizon Gallery"
                                width={200}
                                height={200}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h6" fontWeight="normal" mb={1}>
                            Banner
                        </Typography>
                        <Box width={600} height={200} borderRadius={1} bgcolor={'#e5e7eb'}>
                            <Image
                                src={Image1}
                                alt="Horizon Gallery"
                                width={500}
                                height={300}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </form>

            <Box
                bgcolor="#e5e7eb"
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                }}
            >
                <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
                    <Typography color="GrayText">Step 1 of 3</Typography>
                    <Box display="flex" gap={2}>
                        <Button variant="text" onClick={() => router.push('/home/stores/publish')}>
                            <Typography color="gray">Back</Typography>
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                color: theme.palette.secondary.contrastText,
                            }}
                        >
                            Next
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default function Organization() {
    return <Component />;
}
