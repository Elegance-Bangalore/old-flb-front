import { Link, useLocation } from "react-router-dom";
import { isSinglePageActive } from "../../../../utils/daynamicNavigation";

const MyAccount = () => {
  const { pathname } = useLocation();
  const profileMenuItems = [
    { id: 1, name: "My Profile", ruterPath: "/my-profile" },
    { id: 2, name: " My Message", ruterPath: "/my-message" },
    { id: 3, name: " My Favourite", ruterPath: "/my-favourites" },
    { id: 4, name: " My Package", ruterPath: "/my-package" },
  ];

  return (
    <>
      <div className="user_set_header">
        <img
          className="float-start"
          src="/assets/images/team/e1.png"
          alt="e1.png"
        />
        <p>
          Ali Tufan <br />
          <span className="address">alitufan@gmail.com</span>
        </p>
      </div>
      {/* End user_set_header */}

      <div className="user_setting_content">
        {profileMenuItems.map((item) => (
          <Link
            to={item.ruterPath}
            key={item.id}
            className="dropdown-item"
            style={
              isSinglePageActive(`${item.ruterPath}`, pathname)
                ? { color: "#ff5a5f" }
                : undefined
            }
          >
            {item.name}
          </Link>
        ))}
      </div>
    </>
  );
};

export default MyAccount;
