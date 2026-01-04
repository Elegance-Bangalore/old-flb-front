

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


const SubAdminMobileMenuContent = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate();


    const user = useSelector(selectUser)
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    return (
        <>


            <div style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
                {/* seller menu */}

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
                    {user?.manageProperty && (
                        <>
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
                        </>
                    )}

                    {user?.manageEnquiry && (
                        <>
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
                        </>
                    )}

                    {user?.manageDeveloperProfile && (
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
                    )}

                    {user?.manageBlogs && (
                        <MenuItem>
                            <div
                                onClick={() => navigate("/admin/blog")}
                                className={
                                    pathname === "/admin/blog" ? "ui-active" : 'inactive-mobile-menu'
                                }
                            >
                                Blogs
                            </div>
                        </MenuItem>
                    )}

                    {user?.manageBlogCategory && (
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
                    )}

                    {
                        user?.manageFooter && (
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
                        )
                    }



                    <MenuItem>
                        <div
                            onClick={() => setOpen(true)}
                            className={'inactive-mobile-menu'}
                        >
                            <span className="flaticon-user"></span> Log out
                        </div>
                    </MenuItem>
                </Menu>
            </div>
            <LogoutModal open={open} handleClose={handleClose} />

        </>


    );
};

export default SubAdminMobileMenuContent;
