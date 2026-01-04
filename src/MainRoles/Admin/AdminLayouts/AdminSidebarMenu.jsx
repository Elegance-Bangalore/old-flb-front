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
import SubAmenities from "@/MainRoles/Buyer/Features/BuyersPropertyDetailPage/components/SubAmenities";
import SubAdminSideBarMenu from "./SubAdminSideBarMenu";

const AdminSidebarMenu = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);



  const myProperties = [
    { id: 1, name: "Properties", route: "/admin/properties" },
    { id: 2, name: "Archived Properties", route: "/admin/archived-properties" },
    { id: 3, name: "Feature Properties", route: "/admin/feature-banner" },
    { id: 4, name: "Promoted Properties", route: "/admin/promoted-properties" },
  ];

  const manageBlogs = [
    { id: 1, name: "Blog List", route: "/admin/blog" },
    { id: 2, name: "Blog Categories", route: "/admin/blog-categories" },
    { id: 3, name: "Blog Tags", route: "/admin/blog-tags" },
  ];

  const pageContent = [
    { id: 1, name: "About Page", route: "/admin/about-page-content" },
    { id: 2, name: "Contact Us", route: "/admin/contact-page-content" },
    { id: 3, name: "Footer Seo", route: "/admin/footer-seo" },
  ];


  return (
    <>
      {user.interested === "admin" ? (
        <>
          <ul className="sidebar-menu admin-sidebarmenu">
            <li className="sidebar_header header">
              <Link to="/">
                <img src="/assets/images/header-logo3.png" height={50} alt="header-logo3.png" />
              </Link>
            </li>
            {/* End header */}
            <li className="title">
              <ul className="admin-menu-aside" style={{ height: "80vh", overflowY: "scroll" }}>
                <li
                  className={`treeview ${isSinglePageActive("/admin/dashboard", pathname) ? "active" : ""
                    }`}
                >
                  <NavLink to="/admin/dashboard">
                    <UserSquare size="32" variant="Bulk" />
                    <span>DashBoard</span>
                  </NavLink>
                </li>

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
                <li
                  className={`treeview ${isSinglePageActive("/admin/developer-profile", pathname)
                    ? "active"
                    : ""
                    }`}
                >
                  <Link to="/admin/developer-profile">
                    <Buildings2 size="32" variant="Bulk" />
                    <span>Developer Profiles</span>
                  </Link>
                </li>
                <li
                  className={`treeview ${isSinglePageActive("/admin/users", pathname) ? "active" : ""
                    }`}
                >
                  <Link to="/admin/users">
                    <Profile size="32" variant="Bulk" />
                    <span>Users</span>
                  </Link>
                </li>

                <ul>
                  <li
                    className={`treeview ${isParentPageActive(manageBlogs, pathname) ? "active" : ""
                      }`}
                  >
                    <a data-bs-toggle="collapse" href="#my-blogs">
                      <KeyboardOpen size="32" variant="Bulk" /> <span>Blog Manage</span>
                      <i className="fa fa-angle-down pull-right"></i>
                    </a>
                    <ul className="treeview-menu collapse" id="my-blogs">
                      {manageBlogs.map((item) => (
                        <li key={item.id}>
                          <Link to={item.route}>
                            <i className="fa fa-circle"></i> {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
                <li
                  className={`treeview ${isSinglePageActive("/admin/faq", pathname) ? "active" : ""
                    }`}
                >
                  <Link to={`/admin/faq`}>
                    {/* <i className="flaticon-user"></i> */}
                    <MessageQuestion size="32" variant="Bulk" />
                    <span>FAQs</span>
                  </Link>
                </li>
                <li
                  className={`treeview ${isSinglePageActive("/admin/footer", pathname) ? "active" : ""
                    }`}
                >
                  <Link to="/admin/footer">
                    <HambergerMenu size="32" variant="Bulk" />
                    <span>Footer</span>
                  </Link>
                </li>
                <li
                  className={`treeview ${isSinglePageActive("/admin/property-category-list", pathname)
                    ? "active"
                    : ""
                    }`}
                >
                  <Link to="/admin/property-category-list">
                    <HambergerMenu size="32" variant="Bulk" />
                    <span>Property Category</span>
                  </Link>
                </li>


                <ul>
                  <li
                    className={`treeview ${isParentPageActive(pageContent, pathname) ? "active" : ""
                      }`}
                  >
                    <a data-bs-toggle="collapse" href="#my-pages">
                      <Buildings2 size="32" variant="Bulk" /> <span>Pages Content</span>
                      <i className="fa fa-angle-down pull-right"></i>
                    </a>
                    <ul className="treeview-menu collapse" id="my-pages">
                      {pageContent.map((item) => (
                        <li key={item.id}>
                          <Link to={item.route}>
                            <i className="fa fa-circle"></i> {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>

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

      ) : (
        <>
          <SubAdminSideBarMenu />
        </>
      )}


    </>
  );
};

export default AdminSidebarMenu;
