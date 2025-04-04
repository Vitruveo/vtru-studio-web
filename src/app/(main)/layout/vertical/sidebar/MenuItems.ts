import { uniqueId } from 'lodash';
import {
    IconPhotoUp,
    IconBrandWechat,
    IconTrendingUp,
    IconUser,
    IconLogout,
    IconFolderPlus,
} from '@tabler/icons-react';

interface MenuitemsType {
    [x: string]: any;
    id?: string;
    navlabel?: boolean;
    subheader?: string;
    title?: string;
    icon?: any;
    href?: string;
    children?: MenuitemsType[];
    chip?: string;
    chipColor?: string;
    variant?: string;
    external?: boolean;
}

const Menuitems: MenuitemsType[] = [
    {
        id: uniqueId(),
        title: 'studio.sidebar.consign',
        icon: IconPhotoUp,
        required: 'canConsignArtwork',
        href: '/home',
    },
    {
        id: uniqueId(),
        title: 'studio.sidebar.store',
        icon: IconFolderPlus,
        href: '/stores',
    },
    {
        id: uniqueId(),
        title: 'studio.sidebar.truLevel',
        icon: IconTrendingUp,
        href: '/truLevel',
    },
    {
        id: uniqueId(),
        title: 'studio.sidebar.profile',
        icon: IconUser,
        href: '/profile',
    },
    {
        id: uniqueId(),
        title: 'studio.sidebar.community',
        icon: IconBrandWechat,
        external: true,
        href: 'https://dreamverse.vitruveo.xyz/',
    },
];

export const logoutItem: MenuitemsType = {
    id: uniqueId(),
    title: 'studio.sidebar.logout',
    icon: IconLogout,
    href: '/login',
};

export default Menuitems;
