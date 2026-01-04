import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import useMediaQuery from "@mui/material/useMediaQuery";
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
  DiscountShape,
} from "iconsax-react";
import { GoDot } from "react-icons/go";
import {
  ExpandLess,
  ExpandMore,
  Dashboard as DashboardIcon,
  Category as CategoryIcon,
  Analytics,
} from "@mui/icons-material";
import { selectUser } from "@/Redux/Auth/authSlice";
import { useSelector } from "react-redux";
import HeaderAppBar from "@/CustomCommon/MaterialUi/HeaderAppBar";
import { MdOutlineAnalytics } from "react-icons/md";
import CampaignIcon from "@mui/icons-material/Campaign";

const drawerWidth = 270;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
    },
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function NewAdminSidebar({ children }) {
  const theme = useTheme();
  const isMediumOrSmaller = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = React.useState(() => {
    const savedState = localStorage.getItem("drawerOpen");
    // Always open on desktop, use saved state only for mobile
    return isMediumOrSmaller ? (savedState === null ? false : JSON.parse(savedState)) : true;
  });
  const location = useLocation();
  const activeMenuBg = "rgba(0, 167, 111, 0.08)";
  const activeMenuFont = "#00A76F";
  const user = useSelector(selectUser);

  const [menuState, setMenuState] = React.useState({
    managePropertiesOpen: false,
    manageBlogsOpen: false,
    manageEnquiriesOpen: false,
    manangePageContentsOpen: false,
    manageAnalyticsOpen: false,
    manageUsers: false,
    managePromotions: false,
  });

  React.useEffect(() => {
    const initialMenuState = {
      managePropertiesOpen: false,
      manageBlogsOpen: false,
      manageEnquiriesOpen: false,
      manangePageContentsOpen: false,
      manageAnalyticsOpen: false,
      manageUsers: false,
      managePromotions: false,
    };
    if (
      location.pathname.startsWith("/admin/property-analytics") ||
      location.pathname.startsWith("/admin/recent-activities") ||
      location.pathname.startsWith("/admin/developer-analytics")
    ) {
      initialMenuState.manageAnalyticsOpen = true;
    }
    if (
      location.pathname.startsWith("/admin/promotion-banners") ||
      location.pathname.startsWith("/admin/promoted-properties") ||
      location.pathname.startsWith("/admin/feature-banner")
    ) {
      initialMenuState.managePromotions = true;
    }

    if (
      location.pathname.startsWith("/admin/developer-profile") ||
      location.pathname.startsWith("/admin/manage-buyers")
    ) {
      initialMenuState.manageUsers = true;
    }
    if (
      location.pathname.startsWith("/admin/properties") ||
      location.pathname.startsWith("/admin/archived-properties") ||
      location.pathname.startsWith("/admin/property-category-list")
    ) {
      initialMenuState.managePropertiesOpen = true;
    }
    if (
      location.pathname.startsWith("/admin/about-page-content") ||
      location.pathname.startsWith("/admin/contact-page-content") ||
      location.pathname.startsWith("/admin/footer-seo") ||
      location.pathname.startsWith("/admin/manage-testimonials") ||
      location.pathname.startsWith("/admin/manage-media") ||
      location.pathname.startsWith("/admin/campaign-page")
    ) {
      initialMenuState.manangePageContentsOpen = true;
    }
    if (location.pathname.startsWith("/admin/blog")) {
      initialMenuState.manageBlogsOpen = true;
    }
    if (
      location.pathname.startsWith("/admin/enquiries") ||
      location.pathname.startsWith("/admin/general-enquiries") || 
      location.pathname.startsWith("/admin/advertisement")
    ) {
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
      const savedState = localStorage.getItem("drawerOpen");
      setOpen(savedState === null ? false : JSON.parse(savedState));
    }
  }, [isMediumOrSmaller]);

  React.useEffect(() => {
    // Only save state for mobile devices
    if (isMediumOrSmaller) {
      localStorage.setItem("drawerOpen", open);
    }
  }, [open, isMediumOrSmaller]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const adminItems = [
    {
      text: "Dashboard",
      icon: <Dash />,
      link: "/admin/dashboard",
      allow: true,
    },
    {
      text: "Analytics",
      icon: <MdOutlineAnalytics size={24} />,
      link: "",
      stateKey: "manageAnalyticsOpen",
      allow: true,
      subItems: [
        { text: "Property Analytics", link: "/admin/property-analytics" },
        { text: "Developer Analytics", link: "/admin/developer-analytics" },
        { text: "Recent Activities", link: "/admin/recent-activities" },
      ],
    },
    {
      text: "Manage Properties",
      icon: <Buildings2 />,
      link: "",
      stateKey: "managePropertiesOpen",
      allow: true,
      subItems: [
        {
          text: "All Properties",
          link: "/admin/properties",
        },
        { text: "Archived Properties", link: "/admin/archived-properties" },
        { text: "Property Categories", link: "/admin/property-category-list" },
        { text: "Document Types", link: "/admin/document-type" },
      ],
    },
    {
      text: "Manage Promotions",
      icon: <CampaignIcon />,
      link: "",
      stateKey: "managePromotions",
      allow: true,
      subItems: [
        {
          text: "Featured Properties",
          link: "/admin/promoted-properties",
        },
        {
          text: "Feature Banner",
          link: "/admin/feature-banner",
        },
        {
          text: "Promotion Banner",
          link: "/admin/promotion-banners",
        },
      ],
    },
    {
      text: "Manage Enquiries",
      icon: <MessageQuestion />,
      link: "",
      stateKey: "manageEnquiriesOpen",
      allow: true,
      subItems: [
        { text: "Properties Enquiries", link: "/admin/enquiries" },
        { text: "General Enquiries", link: "/admin/general-enquiries" },
        { text: "Advertisement Request", link: "/admin/advertisement" },
        { text: "Download campaign", link: "/admin/campaign-downloads" },
      ],
    },
    {
      text: "Developers Profile",
      icon: <UserSquare />,
      link: "",
      allow: true,
      stateKey: "manageUsers",
      subItems: [
        { text: "Manage Developers", link: "/admin/developer-profile" },
        { text: "Manage Buyers", link: "/admin/manage-buyers" },
      ],
    },
    {
      text: "Users",
      icon: <User />,
      link: "/admin/users",
      allow: true,
    },
    {
      text: "Coupons",
      icon: <DiscountShape />,
      link: "/admin/coupons",
      allow: true,
    },
    {
      text: "FAQs",
      icon: <MessageEdit />,
      link: "/admin/faq",
      allow: true,
    },
    {
      text: "Footer",
      icon: <KeyboardOpen />,
      link: "/admin/footer",
      allow: true,
    },
    {
      text: "Manage Blogs",
      icon: <Category />,
      link: "",
      stateKey: "manageBlogsOpen",
      allow: true,
      subItems: [
        { text: "Blogs List", link: "/admin/blog" },
        { text: "Tags", link: "/admin/blog-tags" },
        { text: "Blog Categories", link: "/admin/blog-categories" },
        { text: "Sub Categories", link: "/admin/blog-sub-categories" },
      ],
    },
    {
      text: "Manage Page Content",
      icon: <Additem />,
      link: "",
      allow: true,
      stateKey: "manangePageContentsOpen",
      subItems: [
        { text: "About Us", link: "/admin/about-page-content" },
        { text: "Contact Us", link: "/admin/contact-page-content" },
        { text: "Terms & Conditions", link: "/admin/terms-and-conditions" },
        { text: "Footer SEO", link: "/admin/footer-seo" },
        { text: "Testimonials", link: "/admin/manage-testimonials" },
        { text: "Media", link: "/admin/manage-media" },
        { text: "Campaign Page", link: "/admin/campaign-page" },
      ],
    },
  ];

  const userItems = [
    {
      text: "Dashboard",
      icon: <Dash />,
      link: "/admin/dashboard",
      allow: true,
    },
    {
      text: "Manage Properties",
      icon: <Buildings2 />,
      link: "",
      stateKey: "managePropertiesOpen",
      allow: user?.manageProperty,
      subItems: [
        {
          text: "All Properties",
          link: "/admin/properties",
        },
        { text: "Archived Properties", link: "/admin/archived-properties" },
        { text: "Property Categories", link: "/admin/property-category-list" },
        { text: "Document Types", link: "/admin/document-type" },
      ],
    },
    {
      text: "Manage Promotions",
      icon: <CampaignIcon />,
      link: "",
      stateKey: "managePromotions",
      allow: user?.manageProperty,
      subItems: [
        {
          text: "Featured Properties",
          link: "/admin/promoted-properties",
        },
        {
          text: "Feature Banner",
          link: "/admin/feature-banner",
        },
        {
          text: "Promotion Banner",
          link: "/admin/promotion-banners",
        },
      ],
    },
    {
      text: "Analytics",
      icon: <MdOutlineAnalytics size={24} />,
      link: "",
      stateKey: "manageAnalyticsOpen",
      allow: user?.manageAnalytics,
      subItems: [
        { text: "Property Analytics", link: "/admin/property-analytics" },
        { text: "Developer Analytics", link: "/admin/developer-analytics" },
        { text: "Recent Activities", link: "/admin/recent-activities" },
      ],
    },
    {
      text: "Manage Enquiries",
      icon: <MessageQuestion />,
      link: "",
      stateKey: "manageEnquiriesOpen",
      allow: user?.manageEnquiry,
      subItems: [
        { text: "Properties Enquiries", link: "/admin/enquiries" },
        { text: "General Enquiries", link: "/admin/general-enquiries" },
        { text: "Advertisement Request", link: "/admin/advertisement" },
        { text: "Download campaign", link: "/admin/campaign-downloads" },
      ],
    },
    {
      text: "Developers Profile",
      icon: <UserSquare />,
      link: "/admin/developer-profile",
      allow: user?.manageDeveloperProfile,
    },
    {
      text: "Footer",
      icon: <KeyboardOpen />,
      link: "/admin/footer",
      allow: user?.manageFooter,
    },
    {
      text: "Manage Blogs",
      icon: <Category />,
      link: "",
      stateKey: "manageBlogsOpen",
      allow: user?.manageBlogs,
      subItems: [
        { text: "Blogs List", link: "/admin/blog" },
        { text: "Tags", link: "/admin/blog-tags" },
        { text: "Blog Categories", link: "/admin/blog-categories" },
        { text: "Sub Categories", link: "/admin/blog-sub-categories" },
      ],
    },
    {
      text: "FAQs",
      icon: <MessageEdit />,
      link: "/admin/faq",
      allow: user?.manageFooter,
    },
    {
      text: "Manage Page Content",
      icon: <Additem />,
      link: "",
      allow: user?.managePageContent,
      stateKey: "manangePageContentsOpen",
      subItems: [
        { text: "About Us", link: "/admin/about-page-content" },
        { text: "Contact Us", link: "/admin/contact-page-content" },
        { text: "Footer SEO", link: "/admin/footer-seo" },
        { text: "Testimonials", link: "/admin/manage-testimonials" },
        { text: "Media", link: "/admin/manage-media" },
        { text: "Campaign Page", link: "/admin/campaign-page" },
      ],
    },
  ];

  const handleSubMenuToggle = (stateKey) => {
    setMenuState((prevState) => ({
      ...prevState,
      [stateKey]: !prevState[stateKey],
    }));
  };

  const sidebarItems = user?.interested === "user" ? userItems : adminItems;

  return (
    <div className="new-sidebar-collapse">
      <Box sx={{ display: "flex" }}>
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
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant={isMediumOrSmaller ? "temporary" : "persistent"}
          anchor="left"
          open={open}
          onClose={isMediumOrSmaller ? handleDrawerClose : undefined}
        >
          <DrawerHeader>
            <div className="d-flex justify-content-between align-items-center w-100 my-4  ">
              <div>
                {open && (
                  <Link to="/">
                    <img
                      src="/assets/images/header-logo3.png"
                      height={50}
                      alt="header-logo3.png"
                    />
                  </Link>
                )}
              </div>
              {/* Only show close button on mobile */}
              {isMediumOrSmaller && (
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "ltr" ? (
                    <ChevronLeftIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </IconButton>
              )}
            </div>
          </DrawerHeader>
          <Divider />
          <List>
            {sidebarItems?.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem disablePadding>
                  <ListItemButton
                    component={item.link ? Link : "button"}
                    to={item.link || undefined}
                    onClick={
                      item.stateKey
                        ? () => handleSubMenuToggle(item.stateKey)
                        : undefined
                    }
                    sx={{
                      backgroundColor:
                        (item.stateKey && menuState[item.stateKey]) ||
                        isActive(item.link)
                          ? activeMenuBg
                          : "inherit",
                      color: isActive(item.link) ? activeMenuFont : "inherit",
                      "&:hover": {
                        backgroundColor: activeMenuBg,
                        color: activeMenuFont,
                      },
                      display: item.allow ? "" : "none",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: isActive(item.link) ? activeMenuFont : "inherit",
                        minWidth: "40px",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{ fontWeight: 700 }}
                    />
                    {item.stateKey &&
                      (menuState[item.stateKey] ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      ))}
                  </ListItemButton>
                </ListItem>
                {item.subItems && (
                  <Collapse
                    in={menuState[item.stateKey]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List
                      component="div"
                      disablePadding
                      className="sub-menus-custom"
                    >
                      {item.subItems.map((subItem, subIndex) => (
                        <ListItemButton
                          key={subIndex}
                          component={Link}
                          to={subItem.link}
                          sx={{
                            pl: 4,
                            // backgroundColor: isActive(subItem.link) ? activeMenuBg : 'inherit',
                            color: isActive(subItem.link)
                              ? activeMenuFont
                              : "inherit",
                            "&:hover": {
                              backgroundColor: activeMenuBg,
                              color: activeMenuFont,
                            },
                          }}
                        >
                          <GoDot
                            style={{ marginRight: 10, color: activeMenuFont }}
                          />
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
