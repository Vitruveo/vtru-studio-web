import { useState } from 'react';
import { IconButton, Theme, Typography, useMediaQuery, Box, Button, Link } from '@mui/material';
import { IconTrash } from '@tabler/icons-react';

import CustomTextField from '../../components/forms/theme-elements/CustomTextField';

export interface LinkProps {
    name: string;
    url: string;
}

interface LinksProps {
    title: string;
    links: LinkProps[];
    handleAddLink: (link: LinkProps) => void;
    handleDeleteLink: (index: number) => void;
}

const Links = ({ links, title, handleAddLink, handleDeleteLink }: LinksProps) => {
    const [link, setLink] = useState({ name: '', url: '' });

    const handleChangeLinkName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLink((cLink) => ({ ...cLink, name: e.target.value }));
    };

    const handleChangeLinkURL = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLink((cLink) => ({ ...cLink, url: e.target.value }));
    };

    const handleAdd = async () => {
        handleAddLink({ ...link, url: link.url.trim() });
        setLink({ name: '', url: '' });
    };

    const xl = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'));

    return (
        <Box maxWidth={!xl ? 300 : 450} display="flex" flexDirection="column" my={2}>
            <Typography marginBottom={3} fontSize="1.2rem" fontWeight="500">
                {title}
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

            {links?.map((item, index) => (
                <Box key={item.url} display="flex" justifyContent="flex-start" alignItems="center" mb={2}>
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
                        <Link href={item.url} target="_blank" rel="noopener noreferrer" underline="none">
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
                        onClick={handleAdd}
                    >
                        Add
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Links;
