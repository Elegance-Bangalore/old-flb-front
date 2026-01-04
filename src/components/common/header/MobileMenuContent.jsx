// import "react-pro-sidebar/dist/css/styles.css";
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { selectUser, setLogout, setUser } from "@/Redux/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import LogoutModal from "@/components/Modals/LogoutModal";
import { useState } from "react";

const MobileMenuContent = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const user = useSelector(selectUser);

  return (
    <>
      <div className="sidebar-header">
        <Link to="/" className="sidebar-header-inner">
          <img
            className="nav_logo_img img-fluid mt20"
            src="/assets/images/header-logo3.png"
            height={50}
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
      <div style={{ maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}>
        {/* seller menu */}

        {user?.interested === "sell" ? (
          <Menu>
            <MenuItem>
              <div
                onClick={() => navigate("/")}
                className={
                  pathname === "/" ? "ui-active" : "inactive-mobile-menu"
                }
              >
                Home
              </div>
            </MenuItem>
            <MenuItem>
              <div
                onClick={() => navigate("/seller/dashboard")}
                className={
                  pathname === "/seller/dashboard"
                    ? "ui-active"
                    : "inactive-mobile-menu"
                }
              >
                Dashboard
              </div>
            </MenuItem>
            <MenuItem>
              <div
                onClick={() => navigate("/seller/post-property")}
                className={
                  pathname === "/seller/post-property"
                    ? "ui-active"
                    : "inactive-mobile-menu"
                }
              >
                Post Property 
              </div>
            </MenuItem>
            <MenuItem>
              <div
                onClick={() => navigate("/seller/property-list")}
                className={
                  pathname === "/seller/property-list"
                    ? "ui-active"
                    : "inactive-mobile-menu"
                }
              >
                Property-Listing
              </div>
            </MenuItem>
            <MenuItem>
              <div
                onClick={() => navigate("/seller/my-profile")}
                className={
                  pathname === "/seller/my-profile"
                    ? "ui-active"
                    : "inactive-mobile-menu"
                }
              >
                Profile Management
              </div>
            </MenuItem>
            <MenuItem>
              <div
                onClick={() => navigate("/manage-enquiries")}
                className={
                  pathname === "/manage-enquiries"
                    ? "ui-active"
                    : "inactive-mobile-menu"
                }
              >
                Enquiries
              </div>
            </MenuItem>
            {/* <MenuItem>
            <div
              onClick={() => navigate("/subscription-plan")}
              className={
                pathname === "/subscription-plan" ? "ui-active" : 'inactive-mobile-menu'
              }
            >
              Subscription
            </div>
          </MenuItem> */}

            <MenuItem>
              <div
                onClick={() => setOpen(true)}
                className={"inactive-mobile-menu"}
              >
                <span className="flaticon-user"></span> Log out
              </div>
            </MenuItem>
          </Menu>
        ) : (
          <Menu>
            <MenuItem>
              <div
                onClick={() => navigate("/")}
                className={
                  pathname === "/" ? "ui-active" : "inactive-mobile-menu"
                }
              >
                Home
              </div>
            </MenuItem>
            <MenuItem>
              <div
                onClick={() => navigate("/my-profile")}
                className={
                  pathname === "/my-profile"
                    ? "ui-active"
                    : "inactive-mobile-menu"
                }
              >
                Profile
              </div>
            </MenuItem>
            <MenuItem>
              <div
                onClick={() => navigate("/buyer/shortlist-property")}
                className={
                  pathname === "/buyer/shortlist-property"
                    ? "ui-active"
                    : "inactive-mobile-menu"
                }
              >
                Shortlisted Properties
              </div>
            </MenuItem>
            <MenuItem>
              <div
                onClick={() => navigate("/buyer/owners-contacted")}
                className={
                  pathname === "/buyer/owners-contacted"
                    ? "ui-active"
                    : "inactive-mobile-menu"
                }
              >
                Owners Contacted
              </div>
            </MenuItem>
            <MenuItem>
              <div
                onClick={() => setOpen(true)}
                className={"inactive-mobile-menu"}
              >
                <span className="flaticon-user"></span> Log out
              </div>
            </MenuItem>
          </Menu>
        )}

        {/* buyer menu */}

        <LogoutModal open={open} handleClose={handleClose} />
      </div>
    </>
  );
};

export default MobileMenuContent;
