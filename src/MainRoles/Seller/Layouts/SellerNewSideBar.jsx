import * as React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
    Buildings2,
    Category,
    MessageQuestion,
    KeyboardOpen,
    MessageEdit,
    Dash,
    UserSquare,
    User,
    Additem,
    Home,
    Building3
} from "iconsax-react";
import { GoDot } from "react-icons/go";
import { ExpandLess, ExpandMore, Dashboard as DashboardIcon, Category as CategoryIcon } from '@mui/icons-material';
import AppBarLogo from "../../../CustomAssets/BuyerImages/Logo.png"
import HeaderAppBar from '@/CustomCommon/MaterialUi/HeaderAppBar';
import { MdSubscriptions } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { selectSubscription, selectUser } from '@/Redux/Auth/authSlice';
import SubscriptionModal from '@/components/Modals/SubscriptionModal';


const drawerWidth = 270;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        width:"100%",
        // backgroundColor:"red",
        // transition: theme.transitions.create('margin', {
        //     easing: theme.transitions.easing.sharp,
        //     duration: theme.transitions.duration.leavingScreen,
        // }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
        [theme.breakpoints.down('md')]: {
            marginLeft: 0,
        },
    })
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function SellerNewSidebar({ children, isDirty = false, getUrl, setShowUnsavedChangesModal, formValues }) {
    const theme = useTheme();
    const navigate = useNavigate()
    const isMediumOrSmaller = useMediaQuery(theme.breakpoints.down('md'));
    // Mobile/Desktop drawer state management
    const [open, setOpen] = React.useState(() => {
        const savedState = localStorage.getItem('drawerOpen');
        // Always open on desktop, use saved state only for mobile
        return isMediumOrSmaller ? (savedState === null ? false : JSON.parse(savedState)) : true;
    });
    const location = useLocation();
    const activeMenuBg = "rgba(0, 167, 111, 0.08)"
    const activeMenuFont = "#00A76F"
    
    // Get user and subscription data from Redux
    const user = useSelector(selectUser);
    const subscription = useSelector(selectSubscription);

    const [menuState, setMenuState] = React.useState({
        managePropertiesOpen: false,
        manageBlogsOpen: false,
        manageEnquiriesOpen: false,
        manangePageContentsOpen: false
    });

    const [showSubscriptionModal, setShowSubscriptionModal] = React.useState(false);

    // Update open state when screen size changes
    React.useEffect(() => {
        if (!isMediumOrSmaller) {
            setOpen(true); // Always open on desktop
        } else {
            // On mobile, use saved state
            const savedState = localStorage.getItem('drawerOpen');
            setOpen(savedState === null ? false : JSON.parse(savedState));
        }
    }, [isMediumOrSmaller]);

    React.useEffect(() => {
        // Only save state for mobile devices
        if (isMediumOrSmaller) {
            localStorage.setItem('drawerOpen', open);
        }
    }, [open, isMediumOrSmaller]);

    // Add drawer open/close handlers
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const isActive = (path) => location.pathname === path;

    // Check if user has active subscription
    const hasActiveSubscription = subscription && subscription.active;

    const menuItems = [
        {
            text: 'Home',
            icon: <Home />,
            link: '/',
        },
        {
            text: 'Dashboard',
            icon: <Dash />,
            link: '/seller/dashboard',
        },
        {
            text: 'Post Property',
            icon: <Building3 />,
            link: '/seller/post-property',
        },
        {
            text: 'Property List',
            icon: <Buildings2 />,
            link: '/seller/property-list',
        },
        {
            text: 'My Profile',
            icon: <User />,
            link: '/seller/my-profile',
        },
        {
            text: user?.subscription ? 'Enquiries' : 'Unlock Enquiries',
            icon: <MessageQuestion />,
            link: '/manage-enquiries',
            // isEnquiries: true,
        },
        {
            text: 'Subscription',
            icon: <MdSubscriptions />,
            link: '/subscription-plan',
        },
    ];

    function navigateToPage(link) {
        if (location.pathname === link) return
        if (
  location.pathname === "/seller/post-property" &&
  isDirty &&
  formValues?.propertyTitle &&
  formValues?.status !== "draft"
) {
  getUrl(link);
  setShowUnsavedChangesModal(true);
  return;
}
        navigate(link)
    }

    function handleEnquiriesClick(item) {
        if (item.isEnquiries && !hasActiveSubscription) {
            setShowSubscriptionModal(true);
            return;
        }
        navigateToPage(item.link);
    }

    return (

        <div className='new-sidebar-collapse'>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <HeaderAppBar 
                    open={open} 
                    handleDrawerOpen={handleDrawerOpen} 
                    isMobile={isMediumOrSmaller}
                />
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant={isMediumOrSmaller ? 'temporary' : 'persistent'}
                    anchor="left"
                    open={open}
                    onClose={isMediumOrSmaller ? handleDrawerClose : undefined}
                >
                    <DrawerHeader>
                        <div className='d-flex justify-content-between align-items-center w-100 my-4  '>
                            <div>
                                {open && (
                                    <Link to="/">
                                        <img src="/assets/images/header-logo3.png" height={50} alt="header-logo3.png" />
                                    </Link>
                                )}
                            </div>
                            {/* Only show close button on mobile */}
                            {isMediumOrSmaller && (
                                <IconButton onClick={handleDrawerClose}>
                                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                                </IconButton>
                            )}
                        </div>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {menuItems.map((item, index) => (
                            <React.Fragment key={index}>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        component={item.link ? 'div' : 'button'}
                                        onClick={() => item.isEnquiries ? handleEnquiriesClick(item) : navigateToPage(item.link)}
                                        sx={{
                                            backgroundColor: (item.stateKey && menuState[item.stateKey]) || isActive(item.link) ? activeMenuBg : 'inherit',
                                            color: isActive(item.link) ? activeMenuFont : 'inherit',
                                            '&:hover': {
                                                backgroundColor: activeMenuBg,
                                                color: activeMenuFont,
                                            },
                                        }}
                                    >
                                        <ListItemIcon sx={{ color: isActive(item.link) ? activeMenuFont : 'inherit', minWidth: "40px" }}>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.text} sx={{ fontWeight: 700, }} />
                                        {item.stateKey && (menuState[item.stateKey] ? <ExpandLess /> : <ExpandMore />)}
                                    </ListItemButton>
                                </ListItem>
                            </React.Fragment>
                        ))}
                    </List>
                </Drawer>
                <Main open={open && !isMediumOrSmaller}>
                    <DrawerHeader />
                    {children}
                </Main>
                <SubscriptionModal show={showSubscriptionModal} handleClose={() => setShowSubscriptionModal(false)} />
            </Box>
        </div>


    );
}
