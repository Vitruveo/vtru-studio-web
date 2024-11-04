'use client';

import { Box, Button, Grid, IconButton, Slider, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';

import Breadcrumb from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
import CustomTextField from '@/app/home/components/forms/theme-elements/CustomTextField';

import { Delete } from '@mui/icons-material';
import { UploadMedia } from '@/app/home/components/stores/UploadMedia';
import { useState } from 'react';

const Component = () => {
    const theme = useTheme();
    const router = useRouter();

    const [files, setFiles] = useState<(File | null)[]>([null, null, null]);

    const handleChangeFile = (file: File | null, index: number) => {
        setFiles((prev) => {
            const newFiles = [...prev];
            newFiles[index] = file;
            return newFiles;
        });
    };

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
                                    marginTop: 2,
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
                            <Button variant="contained">
                                <Typography variant="h4" textTransform="lowercase">
                                    https://horizon.xibit.art
                                </Typography>
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
                            marginTop: 2,
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
                        sx={{
                            marginTop: 2,
                        }}
                    />
                </Box>

                <Box width={400}>
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

                <Box display="flex" gap={4}>
                    {[
                        { name: 'Logo - Horizontal', dimensions: '500x120' },
                        { name: 'Logo - Square', dimensions: '1000x1000' },
                        { name: 'Banner', dimensions: '1500x500' },
                    ].map((item, index) => (
                        <Box key={item.name} width={160}>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <h4>{item.name}</h4>
                                <IconButton onClick={() => handleChangeFile(null, index)}>
                                    <Delete color="error" />
                                </IconButton>
                            </Box>

                            <Box
                                sx={{
                                    border: '1px solid #e5e7eb',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                }}
                            >
                                <header
                                    style={{
                                        backgroundColor: theme.palette.grey[200],
                                        padding: 16,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        borderTopLeftRadius: 2,
                                        borderTopRightRadius: 2,
                                    }}
                                >
                                    <Typography>Image</Typography>
                                    <Typography>{item.dimensions}</Typography>
                                    <Typography>10 MB maximun</Typography>
                                </header>
                                <UploadMedia
                                    file={files[index] || null}
                                    onChange={(file) => handleChangeFile(file, index)}
                                />
                            </Box>
                        </Box>
                    ))}
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
                        <Button variant="contained">Next</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default function Organization() {
    return <Component />;
}
