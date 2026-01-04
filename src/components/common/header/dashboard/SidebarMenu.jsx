import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  isParentPageActive,
  isSinglePageActive,
} from "../../../../utils/daynamicNavigation";
import { removeCookie } from "@/CustomServices/GetCookies";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setLogout, setUser } from "@/Redux/Auth/authSlice";
import LogoutModal from "@/components/Modals/LogoutModal";
import { useState } from "react";
import { Building, Buildings2, Buliding, DollarCircle, Element3, Logout, MessageQuestion, UserSquare } from "iconsax-react";
import UnsavedChangesModal from "@/components/Modals/UnsavedChanges";


const SidebarMenu = ({ isDirty = true, handleOpen }) => {
  const { pathname } = useLocation();
  const user = useSelector(selectUser);
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [showUnsavedChangesModal, setShowUnsavedChangesModal] = useState(false);
  const [url, setUrl] = useState("/")

  // console.log("Is Dirty" , isDirty)

  function navigationChange(url) {
    setUrl(url)
    navigate(url)
    if (isDirty) {
      setShowUnsavedChangesModal(true)
    }
  }


  return (
    <>
      <ul className="sidebar-menu">
        <li className="sidebar_header header">
          <Link to="/">
            <img src="/assets/images/header-logo3.png" height={50} alt="header-logo3.png" width={200} />
          </Link>
        </li>
        {/* End header */}

        <li className="title">
          <ul>
            <li
              className={`treeview ${isSinglePageActive("/", pathname) ? "active" : ""
}`} onClick={() => navigationChange("/")}
            >
              <Link to="#">
                <UserSquare size="32" variant="Bulk" />
                <span>Home</span>
              </Link>
            </li>
            <li
              className={`treeview ${isSinglePageActive("/seller/dashboard", pathname) ? "active" : ""
                }`} onClick={() => navigationChange("/seller/dashboard")}
            >
              <Link to="#">
                <Element3
                  size="32"
                  variant="Bulk"
                />
                <span> Dashboard</span>
              </Link>
            </li>
            <li
              className={`treeview ${isSinglePageActive("/seller/post-property", pathname) ? "active" : ""
                }`}
            >
              <Link to="/seller/post-property">
                <Building
                  size="32"
                  variant="Bulk"
                />
                <span> Post Property </span>
              </Link>
            </li>
            <li
              className={`treeview ${isSinglePageActive("/seller/property-list", pathname)
                ? "active"
                : ""
                }`} onClick={() => navigationChange("/seller/property-list")}
            >
              <Link to="#">
                <Buildings2
                  size="32"
                  variant="Bulk"
                />
                <span>My Properties</span>
              </Link>
            </li>
            <li
              className={`treeview ${isSinglePageActive("/seller/my-profile", pathname)
                ? "active"
                : ""
                }`} onClick={() => navigationChange("/seller/my-profile")}
            >
              <Link to="#">
                <Buliding
                  size="32"
                  variant="Bulk"
                />
                <span>Profile Management</span>
              </Link>
            </li>
            <li
              className={`treeview ${isSinglePageActive("/manage-enquiries", pathname) ? "active" : ""
                }`} onClick={() => navigationChange("/manage-enquiries")}
            >
              <Link to="#">
                <MessageQuestion
                  size="32"
                  variant="Bulk"
                />
                <span>Enquiries</span>
              </Link>
            </li>

            {/* <li
              className={`treeview ${isSinglePageActive("/subscription-plan", pathname)
                ? "active"
                : ""
                }`} onClick={() => navigationChange("/subscription-plan",)}
            >
              <Link to="#">
                <DollarCircle
                  size="32"
                  variant="Bulk"
                />
                <span>Subscription </span>
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
      <UnsavedChangesModal open={showUnsavedChangesModal} handleClose={() => setShowUnsavedChangesModal(false)} />
    </>
  );
};

export default SidebarMenu;
