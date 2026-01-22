import LogoutModal from "@/components/Modals/LogoutModal";
import { admin, buy, sell, subAdmin } from "@/CustomServices/Constant";
import { selectUser } from "@/Redux/Auth/authSlice";
import { User } from "iconsax-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function BuyerMenu() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const postProperty = () => {
    if (!user) {
      toast.success("Please make a seller account first");
      navigate("/post-your-property", { state: { interested: "sell" } });
    } else if (user.interested === buy) {
      toast.info("Please login as seller");
    } else if (user.interested === admin || user.interested === subAdmin) {
      navigate("/admin/add-property");
    } else if (user.interested === sell) {
      navigate("/seller/post-property");
    }
  };

  return (
    <>
      <div className="header-drop-icons buyer-menu-postion">
        <ul className="navbar-nav me-auto d-flex align-items-center justify-content-end">
          {/* <li className="me-3 fl-white-free-btn"> */}
          <li className="me-3">

            <button className="fl-btn-green" onClick={postProperty}>
              Post Your Property
            </button>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle me-2 main-menu-color"
              id="userDrop"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <User size="24" />
            </a>
            <ul
              className="dropdown-menu border-radius-10"
              aria-labelledby="userDrop"
            >
              {(user && user?.interested === "admin") ||
              user?.interested === "user" ? (
                <>
                  <li className="px-2">
                    <Link
                      to="/admin/dashboard"
                      className="fl-ff-main text-white"
                    >
                      <button className="fl-btn-green mt-2 w-100">
                        Dashboard
                      </button>
                    </Link>
                  </li>
                  <li className="px-2">
                    <button
                      className="fl-btn-dark mt-2 w-100"
                      onClick={() => setOpen(true)}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : user && user?.interested === "buy" ? (
                <>
                  <li className="px-2">
                    <Link to="/my-profile" className="fl-ff-main text-white">
                      <button className="fl-btn-green mt-2 w-100">
                        My Profile
                      </button>
                    </Link>

                    <button
                      className="fl-btn-dark mt-2 w-100"
                      onClick={() => setOpen(true)}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : user && user?.interested === "sell" ? (
                <>
                  <li className="px-2">
                    <Link
                      to="/seller/dashboard"
                      className="fl-ff-main text-white"
                    >
                      <button className="fl-btn-green mt-2 w-100">
                        Dashboard
                      </button>
                    </Link>

                    <button
                      className="fl-btn-dark mt-2 w-100"
                      onClick={() => setOpen(true)}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="px-2">
                    <Link to="/login" className="fl-ff-main text-white">
                      <button className="fl-btn-green mt-2 w-100">Login</button>
                    </Link>
                  </li>
                  <li className="px-2">
                    <Link to="/register" className="fl-ff-main text-white">
                      <button className="fl-btn-dark mt-2 w-100">
                        Sign Up
                      </button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle main-menu-color"
              id="menuDrop"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 30 30"
                fill="currentColor"
              >
                <rect x="11" y="6" width="14" height="2.5" fill="currentColor" />
                <rect x="5" y="21" width="14" height="2.5" fill="currentColor" />
                <rect x="4" y="13.5" width="22" height="2.5" fill="currentColor" />
              </svg>
            </a>
            <ul
              className="dropdown-menu border-radius-10"
              aria-labelledby="menuDrop"
            >
              <li className="px-2">
                <Link className="dropdown-item" to="/about">
                  About Us
                </Link>
              </li>
              <li className="px-2">
                <Link className="dropdown-item" to="/blog">
                  Blogs
                </Link>
              </li>
              <li className="px-2">
                <Link className="dropdown-item" to="/faq">
                  FAQs
                </Link>
              </li>
              <li className="px-2">
                <Link className="dropdown-item" to="/contact">
                  Contact Us
                </Link>
              </li>
              <li className="px-2">
                <Link className="dropdown-item" to="/terms">
                  Terms and Conditions
                </Link>
              </li>
              <li className="px-2">
                <Link className="dropdown-item" to="/privacy-policy">
                  Privacy Policy
                </Link>
              </li>
              {/* <li className="px-2">
                <Link className="dropdown-item" to="/price-trends">
                  Price Trends
                </Link>
              </li> */}

              <li className="border-top px-2 py-2">
                <button className="fl-btn-yellow mt-2" onClick={postProperty}>
                  <Link to="#" className="fl-ff-main fl-text-dark">
                    Post Your Property
                  </Link>
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <LogoutModal open={open} handleClose={handleClose} />
    </>
  );
}

export default BuyerMenu;
