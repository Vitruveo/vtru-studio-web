import React from 'react';
import Grid from '@mui/material/Grid';

import { StepsProps } from './types';
import { Box, Typography } from '@mui/material';
const SeventhStep = ({ values }: StepsProps) => {
    return (
        <Grid mt={1} my={3} alignItems="center" width={500} lg={6} xs={12}>
            <Typography variant="h6" mb={2} fontWeight={600}>
                Creator account
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                        Username
                    </Typography>
                    <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {values.username}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                        Emails
                    </Typography>
                    <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {values.emails.map((item) => (
                            <span key={item.email}>{item.email}</span>
                        ))}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                        Wallets
                    </Typography>
                    <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {values.wallets.map((item) => (
                            <span key={item.address}>
                                {item.network.name} {item.address}
                            </span>
                        ))}
                    </Typography>
                </Grid>
            </Grid>

            <Typography variant="h6" mb={2} mt={2} fontWeight={600}>
                Asset
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        Display
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        Exhibition
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        Preview
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    {values.asset.formats.display.file && (
                        <Box width={50} height={50}>
                            <img
                                width="100%"
                                height="100%"
                                src={URL.createObjectURL(values.asset.formats.display.file)}
                                style={{ objectFit: 'contain' }}
                                alt=""
                            />
                        </Box>
                    )}
                </Grid>

                <Grid item xs={4}>
                    {values.asset.formats.exhibition.file && (
                        <Box width={50} height={50}>
                            <img
                                width="100%"
                                height="100%"
                                src={URL.createObjectURL(values.asset.formats.exhibition.file)}
                                style={{ objectFit: 'contain' }}
                                alt=""
                            />
                        </Box>
                    )}
                </Grid>
                <Grid item xs={4}>
                    {values.asset.formats.preview.file && (
                        <Box width={50} height={50}>
                            <img
                                width="100%"
                                height="100%"
                                src={URL.createObjectURL(values.asset.formats.preview.file)}
                                style={{ objectFit: 'contain' }}
                                alt=""
                            />
                        </Box>
                    )}
                </Grid>
            </Grid>
            <Typography variant="h6" mb={2} mt={2} fontWeight={600}>
                Asset metadata
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                        Domain
                    </Typography>
                    <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {values.assetMetadata.assetMetadataDomains[0].label}
                    </Typography>
                </Grid>
                {values.assetMetadata.assetMetadataDefinitions.map((item) => (
                    <Grid item xs={6} key={item.name}>
                        <Typography variant="body2" color="text.secondary">
                            {item.title}
                        </Typography>
                        <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                            {item.type === 'date' ? (item.value as any).toString() : item.value}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
            <Typography variant="h6" mb={2} mt={2} fontWeight={600}>
                Creator metadata
            </Typography>
            <Grid container spacing={2}>
                {values.creatorMetadata.creatorMetadataDefinitions.map((item) => (
                    <Grid item xs={6} key={item.name}>
                        <Typography variant="body2" color="text.secondary">
                            {item.title}
                        </Typography>
                        <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                            {item.type === 'date' ? (item.value as any).toString() : item.value}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
            <Typography variant="h6" mb={2} mt={2} fontWeight={600}>
                License
            </Typography>
            {values.licenses
                .filter((item) => item.added)
                .map((item) => (
                    <Grid container spacing={2} key={item.title} mb={2}>
                        <Grid item xs={12}>
                            {item.title}
                            <>
                                <Grid container spacing={2}>
                                    {item.licenseMetadataDefinitions.map((license) => (
                                        <Grid item xs={6} key={license.name}>
                                            <Typography variant="body2" color="text.secondary">
                                                {license.title}
                                            </Typography>
                                            <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                                                {license.value as any}
                                            </Typography>
                                        </Grid>
                                    ))}
                                </Grid>
                            </>
                        </Grid>
                    </Grid>
                ))}

            <Typography variant="h6" mb={2} mt={2} fontWeight={600}>
                Contract
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                        Accept
                    </Typography>
                    <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {values.contract ? 'Yes' : 'No'}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default SeventhStep;
