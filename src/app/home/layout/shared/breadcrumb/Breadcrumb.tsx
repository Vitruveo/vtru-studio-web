import React from 'react';
import { Grid, Typography, Box, Breadcrumbs, Theme } from '@mui/material';
import NextLink from 'next/link';

import breadcrumbImg from 'public/images/breadcrumb/brand-asset-banner.png';
import { IconCircle } from '@tabler/icons-react';
import Image from 'next/image';

export interface BreadCrumbItem {
    title: string;
    to?: string;
}

interface BreadCrumbType {
    subtitle?: string;
    items?: BreadCrumbItem[];
    title: string;
    children?: JSX.Element;
    assetTitle?: string;
}

const Breadcrumb = ({ subtitle, items, title, children, assetTitle }: BreadCrumbType) => (
    <Grid
        container
        sx={{
            backgroundColor: 'primary.light',
            borderRadius: (theme: Theme) => theme.shape.borderRadius / 4,
            p: '30px 16px 20px',
            position: 'relative',
            overflow: 'hidden',
        }}
    >
        <Grid item xs={12} sm={6} lg={8} mb={1} display={'flex'} flexDirection={'column'} gap={0.5}>
            <Typography variant="h4">{title}</Typography>
            {subtitle && (
                <Typography color="textSecondary" variant="h6" fontWeight={400} mt={0.8} mb={0}>
                    {subtitle}
                </Typography>
            )}
            <Breadcrumbs
                separator={<IconCircle size="5" fill="textSecondary" fillOpacity={'0.6'} style={{ margin: '0 5px' }} />}
                sx={{ alignItems: 'center', mt: items ? '10px' : '' }}
                aria-label="breadcrumb"
            >
                {items
                    ? items.map((item) => (
                          <div key={item.title}>
                              {item.to ? (
                                  <NextLink href={item.to} passHref>
                                      <Typography color="textSecondary">{item.title}</Typography>
                                  </NextLink>
                              ) : (
                                  <Typography color="textPrimary">{item.title}</Typography>
                              )}
                          </div>
                      ))
                    : ''}
            </Breadcrumbs>
            {assetTitle && (
                <Typography variant="h2" color="textSecondary" mt={1}>
                    {assetTitle}
                </Typography>
            )}
        </Grid>
        <Grid item xs={12} sm={6} lg={4} display="flex" alignItems="flex-end">
            <Box
                sx={{
                    display: { xs: 'none', md: 'flex', lg: 'flex' },
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    width: '100%',
                }}
            >
                {children && <Box sx={{ top: '0px', position: 'absolute' }}>{children}</Box>}
            </Box>
        </Grid>
    </Grid>
);

export default Breadcrumb;
