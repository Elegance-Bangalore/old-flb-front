// AdminAppBar.js
import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import AccountMenu from "./AccountMenu";
import { useSelector } from "react-redux";
import { selectUser } from "@/Redux/Auth/authSlice";
import { Link } from "react-router-dom";

const drawerWidth = 270;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: "#ffffff",
  // backgroundColor: "red",
  width: "100%",
  color: theme.palette.text.primary,
  // transition: theme.transitions.create(["margin", "width"], {
  //   easing: theme.transitions.easing.sharp,
  //   duration: theme.transitions.duration.leavingScreen,
  // }),
  boxShadow:
    "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const HeaderAppBar = ({ open, handleDrawerOpen, isMobile }) => {
  const theme = useTheme();
  const isMediumOrSmaller = useMediaQuery(theme.breakpoints.down("md"));
  const user = useSelector(selectUser);

  return (
    <AppBar position="fixed" open={open && !isMediumOrSmaller}>
      <div className="d-flex justify-content-between max-w-100 ">
        <div>
          <Toolbar>
            {/* Only show hamburger menu on mobile devices */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: "none" }) }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              noWrap
              component="div"
              sx={{
                fontSize: {
                  xs: '10px', // h6
                  md: '1.75rem', // h3
                },
                fontWeight: 500
              }}
            >
              {`${user?.interested === 'admin' || user?.interested === 'user'
                ? 'ADMIN'
                : user?.interested === 'sell'
                  ? 'SELLER'
                  : 'BUYER'} DASHBOARD`}
            </Typography>

          </Toolbar>
        </div>

        <div className="d-flex align-items-center me-3">
          {user?.interested === "admin" && (
            <Link to="/admin/add-property">
              <button className="btn-upgrade " type="button">
                POST PROPERTY
              </button>
            </Link>
          )}

          <AccountMenu />
        </div>
      </div>
    </AppBar>
  );
};

export default HeaderAppBar;
