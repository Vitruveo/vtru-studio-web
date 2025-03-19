import { useState } from 'react';
import Image from 'next/image';
import { Box, Switch, Typography } from '@mui/material';
import { CustomTextFieldDebounce } from '../../forms/theme-elements/CustomTextField';
import { NO_IMAGE_ASSET } from '@/constants/asset';
import { useFormikContext } from 'formik';

interface FormValues {
    exclude: {
        arts: string[];
        artists: string[];
    };
}

const Exclude = () => {
    const { values, setFieldValue } = useFormikContext<FormValues>();
    const [inputValue, setInputValue] = useState('');

    const onChangeArt = (id: string) => {
        const arts = values.exclude.arts;
        if (arts.includes(id)) {
            setFieldValue(
                'exclude.arts',
                arts.filter((art) => art !== id)
            );
        } else {
            setFieldValue('exclude.arts', [...arts, id]);
        }
    };

    const onChangeArtist = (id: string) => {
        const artists = values.exclude.artists;
        if (artists.includes(id)) {
            setFieldValue(
                'exclude.artists',
                artists.filter((artist) => artist !== id)
            );
        } else {
            setFieldValue('exclude.artists', [...artists, id]);
        }
    };

    return (
        <Box display={'flex'} flexDirection={'column'} gap={2}>
            <Box>
                <Typography variant="h6">Search Arts / Artists</Typography>
                <Box>
                    <Box display="flex" gap={1}>
                        <CustomTextFieldDebounce
                            value={inputValue}
                            handleChange={(e) => setInputValue(e.target.value)}
                            variant="outlined"
                        />
                    </Box>
                </Box>
            </Box>
            <Box>
                <Typography variant="h6">Arts</Typography>
                <Box display="flex" gap={2} sx={{ overflowX: 'scroll', overflowY: 'hidden' }}>
                    {Array.from({ length: 20 }).map((_, index) => (
                        <ArtItem
                            key={index}
                            id={index.toString()}
                            image={NO_IMAGE_ASSET}
                            title="Art Title"
                            isHide={values.exclude.arts.includes(index.toString())}
                            onChange={onChangeArt}
                        />
                    ))}
                </Box>
            </Box>
            <Box>
                <Typography variant="h6">Artists</Typography>
                <Box display="flex" gap={2} sx={{ overflowX: 'scroll', overflowY: 'hidden' }}>
                    {Array.from({ length: 20 }).map((_, index) => (
                        <ArtistItem
                            key={index}
                            id={index.toString()}
                            image={NO_IMAGE_ASSET}
                            title="Art Title"
                            isHide={values.exclude.artists.includes(index.toString())}
                            onChange={onChangeArtist}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

interface ArtItemProps {
    id: string;
    image: string;
    title: string;
    isHide: boolean;
    onChange: (id: string) => void;
}
const ArtItem = ({ id, image, title, isHide, onChange }: ArtItemProps) => {
    return (
        <Box display={'flex'} flexDirection={'column'}>
            <Box display={'flex'} alignItems={'center'}>
                <Typography>Hide</Typography>
                <Switch checked={isHide} onChange={() => onChange(id)} />
            </Box>
            <Image src={image} alt={title} width={100} height={100} />
            <Typography>{title}</Typography>
        </Box>
    );
};

interface ArtistItemProps {
    id: string;
    image: string;
    title: string;
    isHide: boolean;
    onChange: (id: string) => void;
}
const ArtistItem = ({ id, image, title, isHide, onChange }: ArtistItemProps) => {
    return (
        <Box display={'flex'} flexDirection={'column'}>
            <Box display={'flex'} alignItems={'center'}>
                <Typography>Hide</Typography>
                <Switch checked={isHide} onChange={() => onChange(id)} />
            </Box>
            <Image src={image} alt={title} width={100} height={100} />
            <Typography>{title}</Typography>
        </Box>
    );
};

export default Exclude;
