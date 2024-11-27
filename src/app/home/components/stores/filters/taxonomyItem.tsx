import { Box, Typography } from '@mui/material';
import MultiSelect from '../../ui-components/select/MultiSelect';
import {
    aiGenerationOptions,
    arEnabledOptions,
    categoryOptions,
    mediumOptions,
    nudityOptions,
    objectTypeOptions,
    styleOptions,
} from './options';

const TaxonomyItem = () => {
    return (
        <Box>
            <Typography variant="h6">Object type</Typography>
            <MultiSelect onChange={() => {}} options={objectTypeOptions} value={[]} />
            <Typography variant="h6">Tags</Typography>
            <MultiSelect onChange={() => {}} options={[{}]} value={[]} />
            <Typography variant="h6">Collections</Typography>
            <MultiSelect onChange={() => {}} options={[{}]} value={[]} />
            <Typography variant="h6">AI generation</Typography>
            <MultiSelect onChange={() => {}} options={aiGenerationOptions} value={[]} />
            <Typography variant="h6">AR enabled</Typography>
            <MultiSelect onChange={() => {}} options={arEnabledOptions} value={[]} />
            <Typography variant="h6">Nudity</Typography>
            <MultiSelect onChange={() => {}} options={nudityOptions} value={[]} />
            <Typography variant="h6">Category</Typography>
            <MultiSelect onChange={() => {}} options={categoryOptions} value={[]} />
            <Typography variant="h6">Medium</Typography>
            <MultiSelect onChange={() => {}} options={mediumOptions} value={[]} />
            <Typography variant="h6">Style</Typography>
            <MultiSelect onChange={() => {}} options={styleOptions} value={[]} />
            <Typography variant="h6">Subject</Typography>
            <MultiSelect onChange={() => {}} options={[{}]} value={[]} />
        </Box>
    );
};

export default TaxonomyItem;
