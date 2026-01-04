import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderMenuContent from "./HeaderMenuContent";
import { selectUser } from "@/Redux/Auth/authSlice";
import { useSelector } from "react-redux";
import Alert from '@mui/material/Alert';
import { Box, LinearProgress } from "@mui/material";

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const user = useSelector(selectUser);

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
    <>
      <header
        className={`header-nav menu_style_home_one style2 navbar-scrolltofixed stricky main-menu  ${navbar ? "stricky-fixed " : ""
          }`}
      >
        <div className="container-fluid p0">
          {/* <!-- Menu Toggle btn--> */}
          <Link to="/" className="navbar_brand float-start dn-smd">
            <img
              className="logo1"
              src="/assets/images/header-logo3.png" height={50}
              alt="header-logo3.png"
            />
            <img
              className="logo2  "
              src="/assets/images/header-logo3.png" height={50}
              alt="header-logo3.png"
            />

          </Link>
          {/* site logo brand */}

          <nav>
            <HeaderMenuContent />
          </nav>
          {/* End .navbar */}
        </div>
      </header>
    
    </>


    // {/* <!-- /.theme-main-menu --> */}
  );
};

export default Header;
