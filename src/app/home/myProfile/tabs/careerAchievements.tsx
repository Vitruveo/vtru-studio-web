import { CardContent, Grid } from '@mui/material';
import { ProfileTabsGeneralProps } from '.';
import BlankCard from '../../components/shared/BlankCard';
import Links, { LinkProps } from './links';

export interface CareerAchievementsProps extends ProfileTabsGeneralProps {}

const CareerAchievements = ({ values, setFieldValue }: CareerAchievementsProps) => {
    const handleAddLinkExhibitions = (link: LinkProps) => {
        setFieldValue('careerAchievements.exhibitions', [...(values?.careerAchievements?.exhibitions || []), link]);
    };

    const handleDeleteLinkExhibitions = (index: number) => {
        setFieldValue(
            'careerAchievements.exhibitions',
            values.careerAchievements?.exhibitions.filter((item, i) => i !== index)
        );
    };

    const handleAddLinkAwards = (link: LinkProps) => {
        setFieldValue('careerAchievements.awards', [...(values?.careerAchievements?.awards || []), link]);
    };

    const handleDeleteAwards = (index: number) => {
        setFieldValue(
            'careerAchievements.awards',
            values.careerAchievements?.awards.filter((item, i) => i !== index)
        );
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
                <BlankCard>
                    <CardContent sx={{ height: { xs: 'auto', lg: '500px' }, overflowY: 'auto', maxHeight: '535px' }}>
                        <Links
                            title="Exhibitions"
                            links={values.careerAchievements?.exhibitions || []}
                            handleAddLink={handleAddLinkExhibitions}
                            handleDeleteLink={handleDeleteLinkExhibitions}
                        />
                    </CardContent>
                </BlankCard>
            </Grid>
            <Grid item xs={12} lg={6}>
                <BlankCard>
                    <CardContent sx={{ height: { xs: 'auto', lg: '500px' }, overflowY: 'auto', maxHeight: '535px' }}>
                        <Links
                            title="Awards"
                            links={values.careerAchievements?.awards || []}
                            handleAddLink={handleAddLinkAwards}
                            handleDeleteLink={handleDeleteAwards}
                        />
                    </CardContent>
                </BlankCard>
            </Grid>
        </Grid>
    );
};

export default CareerAchievements;
