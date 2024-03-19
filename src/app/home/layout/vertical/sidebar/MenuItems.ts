import { uniqueId } from 'lodash';
import { IconPhotoUp, IconBook, IconBrandWechat } from '@tabler/icons-react';

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
import { IconPackage, IconChartDonut3, IconAperture } from '@tabler/icons-react';

const Menuitems: MenuitemsType[] = [
    // {
    //     navlabel: true,
    //     subheader: 'Home',
    // },

    {
        id: uniqueId(),
        title: 'studio.sidebar.consign',
        icon: IconPhotoUp,
        href: '/home/consignArtwork',
    },
    {
        id: uniqueId(),
        title: 'studio.sidebar.artistGuide',
        icon: IconBook,
        external: true,
        href: '//dreamer.vitruveo.xyz/',
    },
    {
        id: uniqueId(),
        title: 'studio.sidebar.community',
        icon: IconBrandWechat,
        external: true,
        href: '//dreamverse.vitruveo.xyz/',
    },

    // {
    //   id: uniqueId(),
    //   title: "General",
    //   icon: IconChartDonut3,
    //   href: "/home/contents/general",
    // },
];

export default Menuitems;
