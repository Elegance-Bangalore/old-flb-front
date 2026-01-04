

// import "react-pro-sidebar/dist/css/styles.css";
import {
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { selectUser, setLogout, setUser } from "@/Redux/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import LogoutModal from "@/components/Modals/LogoutModal";
import SubAdminMobileMenuContent from "./SubAdminMobileMenuContent";


const AdminMobileMenuContent = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate();


  const user = useSelector(selectUser)
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="sidebar-header">
        <Link to="/" className="sidebar-header-inner">
          <img

            className="nav_logo_img img-fluid mt20"
            src="/assets/images/header-logo3.png" height={50}
            alt="header-logo.png"
          />
        </Link>
        {/* End .logo */}

        <div
          className="fix-icon"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <span className="flaticon-close"></span>
        </div>
        {/* Mobile Menu close icon */}
      </div>

      {/* End logo */}
      {/* <Sidebar> */}
      <div style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
        {/* seller menu */}

        {user.interested === "admin" ? (
          <>
            <Menu>
              <MenuItem>
                <div
                  onClick={() => navigate("/admin/dashboard")}
                  className={
                    pathname === "/admin/dashboard" ? "ui-active" : 'inactive-mobile-menu'
                  }
                >
                  Dashboard
                </div>
              </MenuItem>
              <MenuItem>
                <div
                  onClick={() => navigate("/admin/properties")}
                  className={
                    pathname === "/admin/properties" ? "ui-active" : 'inactive-mobile-menu'
                  }
                >
                  Properties
                </div>
              </MenuItem>
              <MenuItem>
                <div
                  onClick={() => navigate("/admin/archived-properties")}
                  className={
                    pathname === "/admin/archived-properties" ? "ui-active" : 'inactive-mobile-menu'
                  }
                >
                  Archived Properties
                </div>
              </MenuItem>
              <MenuItem>
                <div
                  onClick={() => navigate("/admin/enquires")}
                  className={
                    pathname === "/admin/enquires" ? "ui-active" : 'inactive-mobile-menu'
                  }
                >
                  Enquires
                </div>
              </MenuItem>
              <MenuItem>
                <div
                  onClick={() => navigate("/admin/general-enquiries")}
                  className={
                    pathname === "/admin/general-enquiries" ? "ui-active" : 'inactive-mobile-menu'
                  }
                >
                  General Enquiries
                </div>
              </MenuItem>
              <MenuItem>
                <div
                  onClick={() => navigate("/admin/developer-profile")}
                  className={
                    pathname === "/admin/developer-profile" ? "ui-active" : 'inactive-mobile-menu'
                  }
                >
                  Developer Profiles 
                </div>
              </MenuItem>
              <MenuItem>
                <div
                  onClick={() => navigate("/admin/users")}
                  className={
                    pathname === "/admin/users" ? "ui-active" : 'inactive-mobile-menu'
                  }
                >
                  Users
                </div>
              </MenuItem>
              <MenuItem>
                <div
                  onClick={() => navigate("/admin/blog")}
                  className={
                    pathname === "/admin/blog" ? "ui-active" : 'inactive-mobile-menu'
                  }
                >
                  Blog List
                </div>
              </MenuItem>
              <MenuItem>
                <div
                  onClick={() => navigate("/admin/blog-categories")}
                  className={
                    pathname === "/admin/blog-categories" ? "ui-active" : 'inactive-mobile-menu'
                  }
                >
                  Blog Categories
                </div>
              </MenuItem>
              <MenuItem>
                <div
                  onClick={() => navigate("/admin/blog-tags")}
                  className={
                    pathname === "/admin/blog-tags" ? "ui-active" : 'inactive-mobile-menu'
                  }>
                  Blog Tags
                </div>
              </MenuItem>
              <MenuItem>
                <div
                  onClick={() => navigate("/admin/faq")}
                  className={
                    pathname === "/admin/faq" ? "ui-active" : 'inactive-mobile-menu'
                  }
                >
                  FAQs
                </div>
              </MenuItem>
              <MenuItem>
                <div
                  onClick={() => navigate("/admin/property-category-list")}
                  className={
                    pathname === "/admin/property-category-list" ? "ui-active" : 'inactive-mobile-menu'
                  }
                >
                  Property Category
                </div>
              </MenuItem>
              <MenuItem>
                <div
                  onClick={() => navigate("/admin/about-page-content")}
                  className={
                    pathname === "/admin/about-page-content" ? "ui-active" : 'inactive-mobile-menu'
                  }
                >
                  About Page
                </div>
              </MenuItem>
              <MenuItem>
                <div
                  onClick={() => navigate("/admin/contact-page-content")}
                  className={
                    pathname === "/admin/contact-page-content" ? "ui-active" : 'inactive-mobile-menu'
                  }
                >
                  Contact Us
                </div>
              </MenuItem>
              <MenuItem>
                <div
                  onClick={() => navigate("/admin/footer")}
                  className={
                    pathname === "/admin/footer" ? "ui-active" : 'inactive-mobile-menu'
                  }
                >
                  Footer
                </div>
              </MenuItem>

              <MenuItem>
                <div
                  onClick={() => setOpen(true)}
                  className={'inactive-mobile-menu'}
                >
                  <span className="flaticon-user"></span> Log out
                </div>
              </MenuItem>
            </Menu>
            <LogoutModal open={open} handleClose={handleClose} />
          </>

        ) : (
          <>
            <SubAdminMobileMenuContent />
          </>
        )}






      </div>


    </>


  );
};

export default AdminMobileMenuContent;
