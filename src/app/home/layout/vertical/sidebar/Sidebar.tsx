import { useEffect, useState } from 'react';
import Scrollbar from '@/app/home/components/custom-scroll/Scrollbar';
import { Box, Drawer, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Logo from '../../shared/logo/Logo';
import SidebarItems from './SidebarItems';
import { useDispatch, useSelector } from '@/store/hooks';
import { hoverSidebar, toggleMobileSidebar } from '@/features/customizer/slice';

const sidebarBackgroundImages = [
    'side1.jpg',
    'side2.jpg',
    'side3.jpg',
    'side4.jpg',
    'side5.jpg',
    'side6.jpg',
    'side7.jpg',
    'side8.jpg',
];

const Sidebar = () => {
    const [backgroundImage, setBackgroundImage] = useState(sidebarBackgroundImages[0]);
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));

    const dispatch = useDispatch();

    const customizer = useSelector((state) => state.customizer);

    const theme = useTheme();
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

    useEffect(() => {
        const backgroundInterval = setInterval(() => {
            const index = sidebarBackgroundImages.indexOf(backgroundImage);

            const targetIndex = index === sidebarBackgroundImages.length - 1 ? 0 : index + 1;

            setBackgroundImage(sidebarBackgroundImages[targetIndex]);
        }, 60000);

        return () => {
            clearInterval(backgroundInterval);
        };
    }, [backgroundImage]);

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
                            transition: theme.transitions.create('width', {
                                duration: theme.transitions.duration.shortest,
                            }),
                            width: toggleWidth,
                            boxSizing: 'border-box',
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
                        <Scrollbar
                            sx={{
                                height: 'calc(100% - 70px)',
                                backgroundPosition: 'center 60px',
                                backgroundImage: `linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), url(/images/backgrounds/sidebar/${backgroundImage})`,
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
                    backgroundPosition: 'center 130px',
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(/images/backgrounds/sidebar/${backgroundImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    // backgroundColor:
                    //   customizer.activeMode === 'dark'
                    //     ? customizer.darkBackground900
                    //     : customizer.activeSidebarBg,
                    // color: customizer.activeSidebarBg === '#ffffff' ? '' : 'white',
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
