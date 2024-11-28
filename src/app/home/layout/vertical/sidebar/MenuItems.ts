import { uniqueId } from 'lodash';
import { IconPhotoUp, IconBrandWechat, IconTrendingUp, IconUser } from '@tabler/icons-react';

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
        href: '/home/consignArtwork',
    },
    {
        id: uniqueId(),
        title: 'studio.sidebar.truLevel',
        icon: IconTrendingUp,
        href: '/home/truLevel',
    },
    {
        id: uniqueId(),
        title: 'studio.sidebar.profile',
        icon: IconUser,
        href: '/home/myProfile',
    },
    {
        id: uniqueId(),
        title: 'studio.sidebar.community',
        icon: IconBrandWechat,
        external: true,
        href: '//dreamverse.vitruveo.xyz/',
    },
];

export default Menuitems;
