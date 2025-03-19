import Scrollbar from '@/app/(main)/components/custom-scroll/Scrollbar';
import { Box, Drawer, Typography, useMediaQuery } from '@mui/material';
import Logo from '../../shared/logo/Logo';
import SidebarItems from './SidebarItems';
import { useDispatch, useSelector } from '@/store/hooks';
import { hoverSidebar, toggleMobileSidebar } from '@/features/customizer/slice';
import pakge from '../../../../../../package.json';

const Sidebar = () => {
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));

    const dispatch = useDispatch();

    const customizer = useSelector((state) => state.customizer);

    const toggleWidth =
        customizer.isCollapse && !customizer.isSidebarHover ? customizer.MiniSidebarWidth : customizer.SidebarWidth;

    const onHoverEnter = () => {
        if (customizer.isCollapse) {
            dispatch(hoverSidebar(true));
        }
    };

    const onHoverLeave = () => {
        dispatch(hoverSidebar(false));
    };

    if (lgUp) {
        return (
            <Box
                sx={{
                    zIndex: 100,
                    width: toggleWidth,
                    flexShrink: 0,
                    ...(customizer.isCollapse && {
                        position: 'absolute',
                    }),
                }}
            >
                {/* ------------------------------------------- */}
                {/* Sidebar for desktop */}
                {/* ------------------------------------------- */}
                <Drawer
                    anchor="left"
                    open
                    onMouseEnter={onHoverEnter}
                    onMouseLeave={onHoverLeave}
                    variant="permanent"
                    PaperProps={{
                        sx: {
                            width: toggleWidth,
                            boxSizing: 'border-box',
                            background: 'linear-gradient(to bottom, white, lightgray 75%, gray)',
                        },
                    }}
                >
                    {/* ------------------------------------------- */}
                    {/* Sidebar Box */}
                    {/* ------------------------------------------- */}
                    <Box
                        sx={{
                            height: '100%',
                        }}
                    >
                        {/* ------------------------------------------- */}
                        {/* Logo */}
                        {/* ------------------------------------------- */}
                        <Box px={3}>
                            <Logo />
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="caption">version {pakge.version}</Typography>
                        </Box>
                        <Scrollbar
                            sx={{
                                height: 'calc(100% - 92px)',
                                backgroundPosition: 'center 60px',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                            }}
                        >
                            {/* ------------------------------------------- */}
                            {/* Sidebar Items */}
                            {/* ------------------------------------------- */}
                            <SidebarItems />
                        </Scrollbar>
                    </Box>
                </Drawer>
            </Box>
        );
    }

    return (
        <Drawer
            anchor="left"
            open={customizer.isMobileSidebar}
            onClose={() => dispatch(toggleMobileSidebar())}
            variant="temporary"
            PaperProps={{
                sx: {
                    width: customizer.SidebarWidth,
                    height: 'calc(100%)',
                    background: 'linear-gradient(to bottom, white, lightgray 75%, gray)',
                    border: '0 !important',
                    boxShadow: (th) => th.shadows[8],
                },
            }}
        >
            {/* ------------------------------------------- */}
            {/* Logo */}
            {/* ------------------------------------------- */}
            <Box px={2}>
                <Logo />
            </Box>
            {/* ------------------------------------------- */}
            {/* Sidebar For Mobile */}
            {/* ------------------------------------------- */}
            <SidebarItems />
        </Drawer>
    );
};

export default Sidebar;
