import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  Building,
  Home,
  UserSquare,
  CallOutgoing
} from "iconsax-react";
import { GoDot } from "react-icons/go";
import { ExpandLess, ExpandMore, Dashboard as DashboardIcon, Category as CategoryIcon } from '@mui/icons-material';
import HeaderAppBar from '@/CustomCommon/MaterialUi/HeaderAppBar';


const drawerWidth = 270;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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

export default function BuyerNewSidebar({ children }) {
  const theme = useTheme();
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

  const [menuState, setMenuState] = React.useState({
    managePropertiesOpen: false,
    manageBlogsOpen: false,
    manageEnquiriesOpen: false,
    manangePageContentsOpen: false
  });

  React.useEffect(() => {
    const initialMenuState = { managePropertiesOpen: false, manageBlogsOpen: false, manageEnquiriesOpen: false, manangePageContentsOpen: false };
    if (location.pathname.startsWith('/admin/properties') ||
      location.pathname.startsWith('/admin/archived-properties') ||
      location.pathname.startsWith('/admin/feature-banner') ||
      location.pathname.startsWith('/admin/promoted-properties') ||
      location.pathname.startsWith('/admin/property-category-list')
    ) {
      initialMenuState.managePropertiesOpen = true;
    }
    if (location.pathname.startsWith('/admin/about-page-content') ||
      location.pathname.startsWith('/admin/contact-page-content') ||
      location.pathname.startsWith('/admin/footer-seo')
    ) {
      initialMenuState.manangePageContentsOpen = true;
    }
    if (location.pathname.startsWith('/admin/blog')) {
      initialMenuState.manageBlogsOpen = true;
    }
    if (location.pathname.startsWith('/admin/enquiries') || location.pathname.startsWith('/admin/general-enquiries')) {
      initialMenuState.manageEnquiriesOpen = true;
    }

    setMenuState(initialMenuState);
  }, [location.pathname]);

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

  const menuItems = [
    {
      text: 'Home',
      icon: <Home />,
      link: '/',
    },
    {
      text: 'My Profile',
      icon: <UserSquare />,
      link: '/my-profile',
    },
    {
      text: 'Shortlisted Properties',
      icon: <Building />,
      link: '/buyer/shortlist-property',
    },
    {
      text: 'Owners Contacted',
      icon: <CallOutgoing />,
      link: '/buyer/owners-contacted',
    },
  ];

  const handleSubMenuToggle = (stateKey) => {
    setMenuState((prevState) => ({ ...prevState, [stateKey]: !prevState[stateKey] }));
  };

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
                    component={item.link ? Link : 'button'}
                    to={item.link || undefined}
                    onClick={item.stateKey ? () => handleSubMenuToggle(item.stateKey) : undefined}
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
                {item.subItems && (
                  <Collapse in={menuState[item.stateKey]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.subItems.map((subItem, subIndex) => (
                        <ListItemButton
                          key={subIndex}
                          component={Link}
                          to={subItem.link}
                          sx={{
                            pl: 4,
                            backgroundColor: isActive(subItem.link) ? activeMenuBg : 'inherit',
                            color: isActive(subItem.link) ? activeMenuFont : 'inherit',
                            '&:hover': {
                              backgroundColor: activeMenuBg,
                              color: activeMenuFont,
                            },
                          }}
                        >
                          <GoDot style={{ marginRight: 10, color: activeMenuFont }} />
                          <ListItemText primary={subItem.text} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            ))}
          </List>
        </Drawer>
        <Main open={open && !isMediumOrSmaller}>
          <DrawerHeader />
          {children}
        </Main>
      </Box>
    </div>


  );
}
