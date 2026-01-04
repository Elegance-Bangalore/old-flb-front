import { Link } from "react-router-dom";
import MobileMenuContent from "./MobileMenuContent";


const MobileMenu = () => {
  return (
    // <!-- Main Header Nav For Mobile -->
    <div className="stylehome1 h0 mega-menu-wrapper">
      <div className="mobile-menu">
        <div className="header stylehome1">
          <div className="main_logo_home2 text-center">
            <img
             
              className="nav_logo_img contain mt20"
              src="/assets/images/header-logo3.png" height={50}
              alt="header-logo3.png"
            />
            <span className="mt20"></span>
          </div>
          {/* main_logo_home2 */}

          <ul className="menu_bar_home2">
           
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

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasMenu"
        aria-labelledby="offcanvasMenuLabel"
        data-bs-scroll="true"
      >
        <MobileMenuContent />
      </div>
    </div>
  );
};

export default MobileMenu;
