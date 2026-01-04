import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "@/Redux/Auth/authSlice"; 
import { Avatar } from "@mui/material";

const AdminHeaderMenuContent = ({ float = "" }) => {
  const { pathname } = useLocation();
  const user = useSelector(selectUser);

  const profile = [
    { id: 1, name: "Admin", routerPath: "" },
    { id: 2, name: "new", routerPath: "" },
  ];

  return (
    <>
      <ul
        id="respMenu"
        className="ace-responsive-menu text-end d-lg-block d-none"
        data-menu-style="horizontal"
      >
        <li className="">
          <Link className={pathname === "/home-1" && "ui-active"} to="/home-1">
            <span className="title">Home</span>
          </Link>
        </li>

        <li className="">
          <Link
            className={pathname === "/listing-grid-v1" && "ui-active"}
            to="/listing-grid-v1"
          >
            <span className="title">All Properties</span>
          </Link>
        </li>

        {/* End .dropitem */}

        {/* End .dropitem */}

        <li className="dropitem">
          <Link className={pathname === "/faq" && "ui-active"} to="/faq">
            <span className="title">FAQ</span>
          </Link>
        </li>
        {/* End .dropitem */}

        {user?.interested === "buy" && (
          <li className="dropitem">
            <a
              href="#"
              className={
                profile.some(
                  (page) =>
                    page.routerPath?.split("/")[1] === pathname?.split("/")[1]
                )
                  ? "ui-active"
                  : undefined
              }
            >
              <span className="title">
                {user?.profilePic ? (
                  <Avatar alt="User" src={user?.profilePic} />
                ) : (
                  <Avatar
                  sx={{
                    bgcolor: "#F4F6F8",
                    color: "#919EAB",
                    border: "1px solid #919EAB",
                  }}
                >
                    {user?.fullName?.slice(0, 1)}
                  </Avatar>
                )}
              </span>
            </a>
            <ul className="sub-menu ">
              {profile.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.routerPath}
                    className={
                      pathname?.split("/")[1] === item.routerPath?.split("/")[1]
                        ? "ui-active"
                        : undefined
                    }
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        )}



        {/* End .dropitem */}

        {!user && (
          <li className={`list-inline-item list_s ${float}`}>
            <Link to="/login">
              <span
                className={
                  pathname === "/login" || pathname === "/register"
                    ? "ui-active"
                    : undefined
                }
              >
                Login/Signup
              </span>
            </Link>
          </li>
        )}

        {/* End .dropitem */}

      

        {user && user?.interested === "sell" && (
          <li className={`list-inline-item add_listing ${float}`}>
            <Link to="/create-listing">
              <span className="flaticon-plus"></span>
              <span className="dn-lg"> Create Listing</span>
            </Link>
          </li>
        )}

        {/* End .dropitem */}
      </ul>
    </>
  );
};

export default AdminHeaderMenuContent;
