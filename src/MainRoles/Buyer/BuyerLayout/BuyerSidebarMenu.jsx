import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  isParentPageActive,
  isSinglePageActive,
} from "../../../utils/daynamicNavigation";
import { removeCookie } from "@/CustomServices/GetCookies";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setLogout, setUser } from "@/Redux/Auth/authSlice";
import { useState } from "react";
import LogoutModal from "../../../components/Modals/LogoutModal";
import { Buildings2, Call, Home2, Logout, UserSquare } from "iconsax-react";

const BuyerSidebarMenu = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false)



  function handleLogout() {
    removeCookie("token");
    dispatch(setLogout(null));
    navigate("/login");
  }

  return (
    <>
      <ul className="sidebar-menu">
        <li className="sidebar_header header">
          <Link to="/">
            <img src="/assets/images/header-logo3.png" height={50} width={200} alt="header-logo3.png" />
          </Link>
        </li>
        {/* End header */}

        <li className="title">
          <ul>
            <li
              className={`treeview ${isSinglePageActive("/", pathname) ? "active" : ""
                }`}
            >
              <Link to="/">
               <Home2
                  size="32"
                  variant="Bulk"
                /> 
                <span>Home</span>
              </Link>
            </li>
            <li
              className={`treeview ${isSinglePageActive("/my-profile", pathname) ? "active" : ""
                }`}
            >
              <Link to="/my-profile">
                <UserSquare size="32" variant="Bulk" />
                <span>Profile</span>
              </Link>
            </li>

            <li
              className={`treeview ${isSinglePageActive("/buyer/shortlist-property", pathname)
                ? "active"
                : ""
                }`}
            >
              <Link to="/buyer/shortlist-property">
                <Buildings2 size="32" variant="Bulk" />
                <span>Shortlisted Properties</span>
              </Link>
            </li>

            {/* <li
              className={`treeview ${
                isSinglePageActive("/buyer/my-chat", pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link to="/buyer/my-chat">
                <img src={call} alt="chat"/>
                <span>My chat</span>
              </Link>
            </li> */}

            <li
              className={`treeview ${isSinglePageActive("/buyer/owners-contacted", pathname)
                ? "active"
                : ""
                }`}
            >
              <Link to="/buyer/owners-contacted">
                <Call
                  size="32"
                  variant="Bulk"
                />
                <span>Owners Contacted</span>
              </Link>
            </li>

            {/* <li
              className={`treeview ${
                isSinglePageActive("/buyer-properties", pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link to="/buyer-properties">
                <i className="flaticon-user"></i>
                <span>My Properties</span>
              </Link>
            </li> */}
            {/* 
            <li
              className={`treeview ${
                isSinglePageActive("/post-properties", pathname) ? "active" : ""
              }`}
            >
              <Link to="/post-properties">
                <i className="flaticon-plus"></i>
                <span>Post Property</span>
              </Link>
            </li> */}

            <li onClick={() => setOpen(true)}>
              <Link>
                <Logout
                  size="32"
                  variant="Bulk"
                />
                <span>Log out</span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
      <LogoutModal open={open} handleClose={handleClose} />
    </>
  );
};

export default BuyerSidebarMenu;
