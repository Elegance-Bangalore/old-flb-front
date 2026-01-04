import { Link } from "react-router-dom";
import DefaultMobileMenuContent from "./DefaultMobileMenuContent";


const DefaultMobileMenu = () => {
  return (
    // <!-- Main Header Nav For Mobile -->
    <div className="stylehome1 h0 mega-menu-wrapper">
      <div className="mobile-menu">
        <div className="header stylehome1">
          <div className="main_logo_home2 text-center">
            <Link to="/" className="mobile-header-logo">
            <img
              className="nav_logo_img contain mt20"
              src="/assets/images/header-logo3.png" height={50}
              alt="header-logo3.png"
            />
            </Link>
            <span className="mt20"></span>
          </div>
          {/* main_logo_home2 */}

          <ul className="menu_bar_home2">
            {/* <li className="list-inline-item list_s">
              <Link to="/login">
                <span className="flaticon-user"></span>
              </Link>
            </li> */}
            <li
              className="list-inline-item"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenu"
              aria-controls="offcanvasMenu"
            >
              <a>
                <span></span>
              </a>
            </li>
          </ul>
          {/* menu_bar_home2 */}
        </div>
      </div>
      {/* <!-- /.mobile-menu --> */}

      <div className="mobile-menu">
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="offcanvasMenu"
          aria-labelledby="offcanvasMenuLabel"
          data-bs-scroll="true"
          style={{ maxWidth: "90vw" }}
        >
          <div className="offcanvas-body px-2">
            <DefaultMobileMenuContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultMobileMenu;
