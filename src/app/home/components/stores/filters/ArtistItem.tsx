import { Box, Typography } from '@mui/material';
import MultiSelect from '../../ui-components/select/MultiSelect';
import { countryData } from '@/utils/countryData';

const ArtistItem = () => {
    return (
        <Box display={'flex'} flexDirection={'column'} gap={2}>
            <Box>
                <Typography variant="h6">Name</Typography>
                <MultiSelect onChange={() => {}} options={[]} value={[]} />
            </Box>
            <Box>
                <Typography variant="h6">Nationality</Typography>
                <MultiSelect
                    onChange={() => {}}
                    options={countryData.map((item) => ({
                        value: item.code,
                        label: item.label,
                    }))}
                    value={[]}
                />
            </Box>
            <Box>
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
        </Box>
    );
};

export default ArtistItem;
