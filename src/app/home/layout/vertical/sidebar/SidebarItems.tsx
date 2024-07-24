import Menuitems from './MenuItems';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import useMediaQuery from '@mui/material/useMediaQuery';
import NavItem from './NavItem';
import NavCollapse from './NavCollapse';
import NavGroup from './NavGroup/NavGroup';
import { useDispatch, useSelector } from '@/store/hooks';
import { toggleMobileSidebar } from '@/features/customizer/slice';
import { consignArtworkActionsCreators } from '@/features/consignArtwork/slice';
import Image from 'next/image';
import WhatHappensBanner from 'public/images/breadcrumb/what-happens-banner.png';

const SidebarItems = () => {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const pathDirect = pathname;
    const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf('/'));

    const canConsignArtwork = useSelector((state) => state.user.canConsignArtwork);

    const customizer = useSelector((state) => state.customizer);

    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
    const hideMenu: any = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';

    return (
        <Box sx={{ px: 3 }}>
            <List sx={{ pt: 0 }} className="sidebarNav">
                {Menuitems.map((item) => {
                    if (item?.required === 'canConsignArtwork' && !canConsignArtwork) {
                        item.href = '/home';
                    }

                    // {/********SubHeader**********/}
                    if (item.subheader) {
                        return <NavGroup item={item} hideMenu={hideMenu} key={item.subheader} />;

                        // {/********If Sub Menu**********/}
                        /* eslint no-else-return: "off" */
                    } else if (item.children) {
                        return (
                            <NavCollapse
                                menu={item}
                                pathDirect={pathDirect}
                                hideMenu={hideMenu}
                                pathWithoutLastPart={pathWithoutLastPart}
                                level={1}
                                key={item.id}
                                onClick={() => dispatch(toggleMobileSidebar())}
                            />
                        );

                        // {/********If Sub No Menu**********/}
                    } else {
                        return (
                            <NavItem
                                item={item}
                                key={item.id}
                                pathDirect={pathDirect}
                                hideMenu={hideMenu}
                                onClick={() => {
                                    dispatch(consignArtworkActionsCreators.changeGoToConsignArtwork(true));
                                    dispatch(toggleMobileSidebar());
                                }}
                            />
                        );
                    }
                })}
            </List>
        </Box>
    );
};
export default SidebarItems;
