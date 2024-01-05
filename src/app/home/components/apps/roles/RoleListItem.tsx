import React from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { IconStar, IconTrash } from '@tabler/icons-react';
import { RoleType } from '@/mock/roles';
import { useSelector } from '@/store/hooks';

interface Props extends RoleType {
    onRoleClick: (event: React.MouseEvent<HTMLElement>) => void;
    onStarredClick: React.MouseEventHandler<SVGElement>;
    onDeleteClick: React.MouseEventHandler<SVGElement>;
    image: string;
    active: any;
}

export default function RoleListItem({
    onRoleClick,
    onStarredClick,
    onDeleteClick,
    name,
    description,
    image,
    active,
}: Props) {
    const customizer = useSelector((state) => state.customizer);

    const br = `${customizer.borderRadius}px`;

    const theme = useTheme();

    const warningColor = theme.palette.warning.main;

    return (
        <ListItemButton sx={{ mb: 1 }} selected={active}>
            <ListItemAvatar>
                <Avatar alt="" src="" sx={{ fontSize: 14 }}>
                    {name.slice(0, 2).toUpperCase()}
                </Avatar>
            </ListItemAvatar>
            <ListItemText>
                <Stack direction="row" gap="10px" alignItems="center">
                    <Box mr="auto" onClick={onRoleClick}>
                        <Typography variant="subtitle1" noWrap fontWeight={600} sx={{ maxWidth: '150px' }}>
                            {name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" noWrap>
                            {description}
                        </Typography>
                    </Box>
                    <IconStar onClick={onStarredClick} size="16" stroke={1.5} />
                    <IconTrash onClick={onDeleteClick} size="16" stroke={1.5} />
                </Stack>
            </ListItemText>
        </ListItemButton>
    );
}
