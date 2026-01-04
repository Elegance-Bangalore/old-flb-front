import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  isParentPageActive,
  isSinglePageActive,
} from "../../../utils/daynamicNavigation";
import { removeCookie } from "@/CustomServices/GetCookies";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setLogout, setUser } from "@/Redux/Auth/authSlice";
import {
  Buildings2,
  Category,
  HambergerMenu,
  KeyboardOpen,
  Logout,
  MessageQuestion,
  Profile,
  User,
  UserSquare,
} from "iconsax-react";
import LogoutModal from "../../../components/Modals/LogoutModal";
import { useState } from "react";

const SubAdminSideBarMenu = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);



  const myProperties = [
    { id: 1, name: "Properties", route: "/admin/properties" },
    { id: 2, name: "Archived Properties", route: "/admin/archived-properties" },
  ];


  return (
    <>
      <ul className="sidebar-menu admin-sidebarmenu">
        <li className="sidebar_header header">
          <Link to="/">
            <img src="/assets/images/header-logo3.png" height={50} alt="header-logo3.png" />
          </Link>
        </li>
        {/* End header */}
        <li className="title">
          <ul style={{ height: "80vh", overflowY: "scroll" }}>
            <li
              className={`treeview ${isSinglePageActive("/admin/dashboard", pathname) ? "active" : ""
                }`}
            >
              <NavLink to="/admin/dashboard">
                <UserSquare size="32" variant="Bulk" />
                <span>Dashboard</span>
              </NavLink>
            </li>

            {user?.manageProperty === true && (
              <ul>
                <li
                  className={`treeview ${isParentPageActive(myProperties, pathname) ? "active" : ""
                    }`}
                >
                  <a data-bs-toggle="collapse" href="#my-property">
                    <Buildings2 size="32" variant="Bulk" /> <span>My Properties</span>
                    <i className="fa fa-angle-down pull-right"></i>
                  </a>
                  <ul className="treeview-menu collapse" id="my-property">
                    {myProperties.map((item) => (
                      <li key={item.id}>
                        <Link to={item.route}>
                          <i className="fa fa-circle"></i> {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            )}

            {user?.manageEnquiry && (
              <>
                <li
                  className={`treeview ${isSinglePageActive("/admin/enquires", pathname) ? "active" : ""
                    }`}
                >
                  <Link to="/admin/enquires">
                    <MessageQuestion size="32" variant="Bulk" />
                    <span>Enquiries</span>
                  </Link>
                </li>
                <li
                  className={`treeview ${isSinglePageActive("/admin/general-enquiries", pathname) ? "active" : ""
                    }`}
                >
                  <Link to="/admin/general-enquiries">
                    <MessageQuestion size="32" variant="Bulk" />
                    <span>General Enquiries</span>
                  </Link>
                </li>
              </>
            )}

            {user?.manageDeveloperProfile && (
              <li
                className={`treeview ${isSinglePageActive("/admin/developer-profile", pathname)
                  ? "active"
                  : ""
                  }`}
              >
                <Link to="/admin/developer-profile">
                  <Buildings2 size="32" variant="Bulk" />
                  <span>Developer Profiles </span>
                </Link>
              </li>
            )}


            {user?.manageBlogs && (
              <li
                className={`treeview ${isSinglePageActive("/admin/blog", pathname) ? "active" : ""
                  }`}
              >
                <Link to="/admin/blog">
                  <KeyboardOpen size="32" variant="Bulk" />
                  <span>Blogs</span>
                </Link>
              </li>
            )}

            {user?.manageBlogCategory && (
              <li
                className={`treeview ${isSinglePageActive("/admin/blog-categories", pathname)
                  ? "active"
                  : ""
                  }`}
              >
                <Link to="/admin/blog-categories">
                  <Category size="32" variant="Bulk" />
                  <span>Blog Categories</span>
                </Link>
              </li>
            )}



            {user?.manageFooter && (
              <li
                className={`treeview ${isSinglePageActive("/admin/footer", pathname) ? "active" : ""
                  }`}
              >
                <Link to="/admin/footer">
                  <HambergerMenu size="32" variant="Bulk" />
                  <span>Footer</span>
                </Link>
              </li>
            )}

            <li onClick={() => setOpen(true)}>
              <Link>
                <Logout size="32" variant="Bulk" />
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

export default SubAdminSideBarMenu;
