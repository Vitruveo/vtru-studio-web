import { ChangeEvent, useCallback } from 'react';
import {
    Box,
    CardContent,
    FormControl,
    Grid,
    MenuItem,
    Select,
    SelectChangeEvent,
    Theme,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { ProfileTabsGeneralProps } from '.';
import BlankCard from '../../components/shared/BlankCard';
import { CustomTextFieldDebounce } from '../../components/forms/theme-elements/CustomTextField';
import sectionsJSON from '../../consignArtwork/assetMetadata/newSections.json';
import { useI18n } from '@/app/hooks/useI18n';
import { getSectionFields, mergeSelectOptions } from './utils';
import { CustomTextarea } from '../../components/forms/theme-elements/CustomTextarea';

export interface PersonalDetailsProps extends ProfileTabsGeneralProps {}

type CreatorFieldInfo = (typeof sectionsJSON)['creators']['schema']['items']['properties'];

const PersonalDetails = ({ values, setFieldValue }: PersonalDetailsProps) => {
    const { language } = useI18n();

    const creatorFields = getSectionFields<CreatorFieldInfo>({
        section: 'creators',
        language,
    });

    const getOptions = useCallback(mergeSelectOptions, []);

    const handleChangeSelect = (e: SelectChangeEvent<string>) => {
        setFieldValue(`personalDetails.${e.target.name}`, e.target.value);
    };

    const handleTextAreaChange = (value: string) => {
        setFieldValue('personalDetails.bio', value);
    };

    const handlePlusCodeChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFieldValue('personalDetails.plusCode', e.target.value);
    };

    const xl = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'));

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
                <BlankCard>
                    <CardContent sx={{ height: { xs: 'auto', lg: '500px' }, overflowY: 'auto', maxHeight: '535px' }}>
                        <Box maxWidth={!xl ? 300 : 350} my={2}>
                            <Typography marginBottom={3} fontSize="1.2rem" fontWeight="500">
                                About Me
                            </Typography>
                            <Box my={2}>
                                <Box mb={1}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label">
                                        Bio
                                    </Typography>
                                </Box>
                                <CustomTextarea
                                    value={values.personalDetails?.bio}
                                    minRows={8}
                                    handleChange={handleTextAreaChange}
                                />
                            </Box>

                            <Box my={2}>
                                <Box mb={1}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label">
                                        Ethnicity
                                    </Typography>
                                </Box>
                                <FormControl fullWidth variant="outlined" size="small">
                                    <Select
                                        name="ethnicity"
                                        value={values.personalDetails?.ethnicity}
                                        onChange={handleChangeSelect}
                                    >
                                        {creatorFields.ethnicity?.info.enum.map((ethnicity) => (
                                            <MenuItem key={ethnicity} value={ethnicity}>
                                                {ethnicity}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box my={2}>
                                <Box mb={1}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label">
                                        Gender
                                    </Typography>
                                </Box>
                                <FormControl fullWidth variant="outlined" size="small">
                                    <Select
                                        name="gender"
                                        value={values.personalDetails?.gender}
                                        onChange={handleChangeSelect}
                                    >
                                        {creatorFields.gender?.info.enum.map((gender) => (
                                            <MenuItem key={gender} value={gender}>
                                                {gender}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                    </CardContent>
                </BlankCard>
            </Grid>
            <Grid item xs={12} lg={6}>
                <BlankCard>
                    <CardContent sx={{ height: { xs: 'auto', lg: '500px' }, overflowY: 'auto', maxHeight: '535px' }}>
                        <Box maxWidth={!xl ? 300 : 350} my={2}>
                            <Typography marginBottom={3} fontSize="1.2rem" fontWeight="500">
                                Location
                            </Typography>
                            <Box my={2}>
                                <Box mb={1}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label">
                                        Nationality
                                    </Typography>
                                </Box>
                                <FormControl fullWidth variant="outlined" size="small">
                                    <Select
                                        name="nationality"
                                        value={values.personalDetails?.nationality}
                                        onChange={handleChangeSelect}
                                    >
                                        {getOptions({ info: creatorFields.nationality?.info }).map((nationality) => (
                                            <MenuItem key={nationality.value} value={nationality.value}>
                                                {nationality.title}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box my={2}>
                                <Box mb={1}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label">
                                        Residence
                                    </Typography>
                                </Box>
                                <FormControl fullWidth variant="outlined" size="small">
                                    <Select
                                        name="residence"
                                        value={values.personalDetails?.residence}
                                        onChange={handleChangeSelect}
                                    >
                                        {getOptions({ info: creatorFields.residence?.info }).map((residence) => (
                                            <MenuItem key={residence.value} value={residence.value}>
                                                {residence.title}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box my={2}>
                                <Box mb={1}>
                                    <Typography variant="subtitle1" fontWeight={600} component="label">
                                        Plus Code
                                    </Typography>
                                </Box>
                                <CustomTextFieldDebounce
                                    size="small"
                                    name="personalDetails.plusCode"
                                    variant="outlined"
                                    fullWidth
                                    value={values.personalDetails?.plusCode}
                                    handleChange={handlePlusCodeChange}
                                />
                            </Box>
                        </Box>
                    </CardContent>
                </BlankCard>
            </Grid>
        </Grid>
    );
};

export default PersonalDetails;
