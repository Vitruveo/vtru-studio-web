import React from 'react';
import Link from 'next/link';

// mui imports
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled, useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from '@/store/hooks';
import { consignArtworkActionsCreators } from '@/features/consign/slice';
import { useI18n } from '@/app/hooks/useI18n';
import { userSelector } from '@/features/user';

type NavGroup = {
    [x: string]: any;
    id?: string;
    navlabel?: boolean;
    subheader?: string;
    title?: string;
    icon?: any;
    href?: any;
    children?: NavGroup[];
    chip?: string;
    chipColor?: any;
    variant?: string | any;
    external?: boolean;
    level?: number;
    onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
};

interface ItemType {
    item: NavGroup;
    forceClick?: boolean;
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
    hideMenu?: any;
    level?: number | any;
    pathDirect: string;
}

export default function NavItem({ item, level, pathDirect, hideMenu, forceClick, onClick }: ItemType) {
    const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
    const customizer = useSelector((state) => state.customizer);

    const Icon = item?.icon;
    const theme = useTheme();
    const dispatch = useDispatch();

    const { language } = useI18n();

    const status = useSelector((state) => state.asset.status);
    const { emails, username, wallets } = useSelector(userSelector(['emails', 'wallets', 'username']));
    const isCompletedProfile = emails.length && wallets.length && username.length;
    const isConsign = item.href === '/consign';
    const itemIcon = level > 1 ? <Icon stroke={1.5} size="1rem" /> : <Icon stroke={1.5} size="1.3rem" />;

    const isPublished = status === 'preview';

    const ListItemStyled = styled(ListItemButton)(() => ({
        whiteSpace: 'nowrap',
        marginBottom: '2px',
        padding: '8px 10px',
        marginTop: theme.spacing(0.4),
        borderRadius: `${customizer.borderRadius}px`,
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        color:
            level > 1 && pathDirect === item?.href
                ? `${theme.palette.primary.main}!important`
                : theme.palette.text.secondary,
        paddingLeft: hideMenu ? '10px' : level > 2 ? `${level * 15}px` : '10px',
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.main,
        },
        '&.Mui-selected': {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.main,
        },
    }));

    const listItemProps: {
        component: any;
        href?: string;
        target?: any;
        to?: any;
    } = {
        component: item?.external ? 'a' : Link,
        to: item?.href,
        href: item?.external ? item?.href : '',
        target: item?.external ? '_blank' : '',
    };

    return (
        <List component="li" disablePadding key={item?.id && item.title}>
            <Link
                {...listItemProps}
                href={isConsign && !isCompletedProfile ? '/profile' : isPublished ? '/consign' : item.href}
                style={{ textDecoration: 'none' }}
            >
                <ListItemStyled
                    disabled={item?.disabled}
                    selected={pathDirect === item?.href}
                    onClick={
                        lgDown || forceClick
                            ? onClick
                            : () =>
                                  isConsign
                                      ? dispatch(consignArtworkActionsCreators.changeGoToConsignArtwork(true))
                                      : {}
                    }
                >
                    <ListItemIcon
                        sx={{
                            minWidth: '36px',
                            p: '3px 0',
                            color:
                                level > 1 && pathDirect === item?.href
                                    ? `${theme.palette.primary.main}!important`
                                    : 'inherit',
                        }}
                    >
                        {itemIcon}
                    </ListItemIcon>
                    <ListItemText>
                        {hideMenu ? (
                            ''
                        ) : (
                            <>
                                {item?.title === 'studio.sidebar.truLevel' ? (
                                    <>
                                        <span style={{ color: '#FF0066' }}>tru</span>Level
                                    </>
                                ) : (
                                    (language[item?.title || ''] as string)
                                )}
                            </>
                        )}
                        <br />
                        {item?.subtitle ? (
                            <Typography variant="caption">
                                {hideMenu ? '' : (language[item?.subtitle] as string)}
                            </Typography>
                        ) : (
                            ''
                        )}
                    </ListItemText>

                    {!item?.chip || hideMenu ? null : (
                        <Chip
                            color={item?.chipColor}
                            variant={item?.variant ? item?.variant : 'filled'}
                            size="small"
                            label={item?.chip}
                        />
                    )}
                </ListItemStyled>
            </Link>
        </List>
    );
}
