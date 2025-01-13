import { useRouter, usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import useMediaQuery from '@mui/material/useMediaQuery';
import Menuitems, { logoutItem } from './MenuItems';
import NavItem from './NavItem';
import NavCollapse from './NavCollapse';
import NavGroup from './NavGroup/NavGroup';
import { useDispatch, useSelector } from '@/store/hooks';
import { toggleMobileSidebar } from '@/features/customizer/slice';
import { consignArtworkActionsCreators } from '@/features/consign/slice';
import { userActionsCreators } from '@/features/user/slice';

const SidebarItems = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const pathname = usePathname();
    const pathDirect = pathname;
    const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf('/'));

    const canConsignArtwork = useSelector((state) => state.user.canConsignArtwork);
    const features = useSelector((state) => state.features.list);
    const isEmailAllowed = useSelector((state) => state.features.isEmailAllowed);

    const generalVault = useSelector((state) => state.user.generalVault);

    const filterMenus = Menuitems.filter((v) => {
        const trulevelFeature = features.find((feature) => feature.name?.includes('trulevel'));
        if (generalVault) {
            return v.title !== 'studio.sidebar.consign';
        }

        if (v.title === 'studio.sidebar.truLevel') {
            if (trulevelFeature && trulevelFeature.released) {
                if (trulevelFeature.onlyForAllowList) {
                    if (isEmailAllowed) return true;
                    return false;
                }
                return true;
            } else {
                return false;
            }
        }

        return true;
    });
    const customizer = useSelector((state) => state.customizer);

    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
    const hideMenu: any = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';

    const handleLogout = () => {
        setTimeout(() => {
            router.push('/login');
        }, 1000);
        dispatch(userActionsCreators.logout());
    };

    return (
        <Box sx={{ px: 3 }}>
            <List sx={{ pt: 0 }} className="sidebarNav">
                {filterMenus.map((item) => {
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
                {
                    <NavItem
                        item={logoutItem}
                        key={logoutItem.id}
                        pathDirect={pathDirect}
                        hideMenu={hideMenu}
                        forceClick
                        onClick={handleLogout}
                    />
                }
            </List>
        </Box>
    );
};
export default SidebarItems;
