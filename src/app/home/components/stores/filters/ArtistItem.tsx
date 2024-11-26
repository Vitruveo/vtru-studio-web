import { Box, Typography } from '@mui/material';
import MultiSelect from '../../ui-components/select/MultiSelect';
import { countryData } from '@/utils/countryData';

const ArtistItem = () => {
    return (
        <Box>
            <Typography variant="h6">Name</Typography>
            <MultiSelect onChange={() => {}} options={[]} value={[]} />
            <Typography variant="h6">Nationality</Typography>
            <MultiSelect
                onChange={() => {}}
                options={countryData.map((item) => ({
                    value: item.code,
                    label: item.label,
                }))}
                value={[]}
            />
            <Typography variant="h6">Residence</Typography>
            <MultiSelect
                onChange={() => {}}
                options={countryData.map((item) => ({
                    value: item.code,
                    label: item.label,
                }))}
                value={[]}
            />
        </Box>
    );
};

export default ArtistItem;
