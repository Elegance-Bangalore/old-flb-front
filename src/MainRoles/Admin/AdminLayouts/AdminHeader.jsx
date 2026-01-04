

import { Link } from "react-router-dom";
import { useEffect, useState } from "react"; 
import AdminHeaderMenuContent from "./AdminHeaderMenuContent";


const AdminHeader = () => {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 95) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    <header
      className={`header-nav menu_style_home_one navbar-scrolltofixed stricky main-menu  ${
        navbar ? "stricky-fixed " : ""
      }`}
    >
      <div className="container-fluid p0">
        {/* <!-- Ace Responsive Menu --> */}

        <Link to="/" className="navbar_brand float-start dn-smd">
          <img
           
            className="logo1 contain"
            src="/assets/images/header-logo.png"
            alt="header-logo.png"
          />
          <img
           
            className="logo2 contain"
            src="/assets/images/header-logo3.png" height={50}
            alt="header-logo3.png"
          />
        </Link>
        {/* site logo brand */}

        <nav>
          <AdminHeaderMenuContent />
        </nav>
        {/* End .navbar */}
      </div>
    </header>
    // {/* <!-- /.theme-main-menu --> */}
  );
};

export default AdminHeader;
