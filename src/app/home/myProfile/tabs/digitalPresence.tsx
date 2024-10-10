import { useState } from 'react';
import { ValidationError } from 'yup';
import { FormikErrors } from 'formik';
import { IconButton, Theme, Typography, useMediaQuery, Box, CardContent, Button, Link, Grid } from '@mui/material';
import { IconTrash } from '@tabler/icons-react';
import Socials from '../Socials';
import { ProfileTabsGeneralProps } from '.';
import BlankCard from '../../components/shared/BlankCard';
import CustomTextField, { CustomTextFieldDebounce } from '../../components/forms/theme-elements/CustomTextField';
import { linkSchema } from './formschema';

export interface DigitalPresenceProps extends ProfileTabsGeneralProps {}

const DigitalPresence = ({ values, errors, setFieldValue }: DigitalPresenceProps) => {
    const [link, setLink] = useState({ name: '', url: '' });
    const [linkErrors, setLinkErrors] = useState<{ name?: string; url?: string }>({});

    const handleAddLink = async () => {
        try {
            const formatLink = { ...link, url: link.url.trim() };
            await linkSchema.validate(formatLink, { abortEarly: false });
            setFieldValue('links', [...values.links, formatLink]);
            setLink({ name: '', url: '' });
            setLinkErrors({});
        } catch (err) {
            if (err instanceof ValidationError) {
                const validationErrors: FormikErrors<{ name: string; url: string }> = {};
                err.inner.forEach((error) => {
                    if (error.path) {
                        validationErrors[error.path as 'name' | 'url'] = error.message;
                    }
                });
                setLinkErrors(validationErrors);
            }
        }
    };
    const handleDeleteLink = async (index: number) => {
        setFieldValue(
            'links',
            values.links.filter((item, i) => i !== index)
        );
    };

    const handleChangeLinkName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLink((cLink) => ({ ...cLink, name: e.target.value }));
    };

    const handleChangeLinkURL = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLink((cLink) => ({ ...cLink, url: e.target.value }));
    };

    const handleMyWebsiteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFieldValue('myWebsite', e.target.value);
    };

    const xl = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'));

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={6} width="50%">
                <BlankCard>
                    <CardContent
                        sx={{ height: { xs: 'auto', lg: '500px' } }}
                        style={{ overflowY: 'auto', maxHeight: '535px' }}
                    >
                        <Box maxWidth={!xl ? 300 : 350}>
                            <Socials />
                            <Box>
                                <Box mb={1}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label">
                                        Website Link
                                    </Typography>
                                </Box>
                                <CustomTextFieldDebounce
                                    size="small"
                                    name="myWebsite"
                                    variant="outlined"
                                    fullWidth
                                    value={values.myWebsite}
                                    handleChange={handleMyWebsiteChange}
                                    error={!!errors.myWebsite}
                                    helperText={errors.myWebsite}
                                />
                            </Box>
                        </Box>
                    </CardContent>
                </BlankCard>
            </Grid>
            <Grid item xs={12} lg={6} width="50%">
                <BlankCard>
                    <CardContent
                        sx={{ height: { xs: 'auto', lg: '500px' } }}
                        style={{ overflowY: 'auto', maxHeight: '535px' }}
                    >
                        <Box maxWidth={!xl ? 300 : 450} display="flex" flexDirection="column" my={2}>
                            <Typography marginBottom={3} fontSize="1.2rem" fontWeight="500">
                                Links
                            </Typography>
                            <Box display="flex" justifyContent="space-between" mb={2}>
                                <Typography variant="subtitle1" fontWeight={600} style={{ width: '40%' }}>
                                    Name
                                </Typography>
                                <Typography variant="subtitle1" fontWeight={600} style={{ width: '40%' }}>
                                    URL
                                </Typography>
                                <Box style={{ width: '20%' }} />
                            </Box>

                            {values.links?.map((item, index) => (
                                <Box
                                    key={item.url}
                                    display="flex"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    mb={2}
                                >
                                    <Typography
                                        variant="body1"
                                        style={{
                                            width: '40%',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {item.name}
                                    </Typography>

                                    <Typography
                                        variant="body1"
                                        style={{
                                            width: '40%',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        <Link
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            underline="none"
                                        >
                                            {item.url}
                                        </Link>
                                    </Typography>

                                    <Box display="flex" justifyContent="center" alignItems="center" width="10%">
                                        <IconButton
                                            sx={{ padding: 0, margin: 0 }}
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteLink(index);
                                            }}
                                        >
                                            <IconTrash color={'red'} size="16" stroke={1.5} />
                                        </IconButton>
                                    </Box>
                                </Box>
                            ))}
                            <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                                <CustomTextField
                                    style={{ width: '40%' }}
                                    value={link.name}
                                    onChange={handleChangeLinkName}
                                    size="small"
                                    fullWidth
                                    error={!!linkErrors.name}
                                    helperText={linkErrors.name}
                                    FormHelperTextProps={{
                                        style: {
                                            position: 'absolute',
                                            bottom: '-22px',
                                            left: 0,
                                            fontSize: '0.75rem',
                                        },
                                    }}
                                    variant="outlined"
                                />
                                <CustomTextField
                                    style={{ width: '40%', marginLeft: '1%' }}
                                    type="url"
                                    value={link.url}
                                    onChange={handleChangeLinkURL}
                                    size="small"
                                    fullWidth
                                    error={!!linkErrors.url}
                                    helperText={linkErrors.url}
                                    FormHelperTextProps={{
                                        style: {
                                            position: 'absolute',
                                            bottom: '-22px',
                                            left: 0,
                                            fontSize: '0.75rem',
                                        },
                                    }}
                                    variant="outlined"
                                />
                                <Box width="20%" display="flex" justifyContent="center">
                                    <Button
                                        style={{ width: '85%', marginLeft: '1%' }}
                                        size="small"
                                        variant="contained"
                                        onClick={handleAddLink}
                                    >
                                        Add
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </BlankCard>
            </Grid>
        </Grid>
    );
};

export default DigitalPresence;
