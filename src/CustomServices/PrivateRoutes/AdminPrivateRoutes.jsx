import React, { useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setPreviousUrl } from "@/Redux/Auth/authSlice";
import AdminDashboard from "@/MainRoles/Admin/Features/Dashboard/AdminDashboard";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";

const AdminPrivateRoutes = ({ children, requiredPermission }) => {
  const user = useSelector(selectUser);
  const location = useLocation();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPreviousUrl(location.pathname))
  }, [location.pathname])

  if (!user) {
    return <Navigate to="/" replace={true}></Navigate>;
  }
  if (
    user.interested === "admin" ||
    user[requiredPermission]
  ) {
    return children;
  } else if (user.interested === "user" && user[requiredPermission] !== true) {
    // navigate("/admin/dashboard")
    return < AdminDashboardPage />
  }

  return <Navigate to="/" replace={true}></Navigate>;
};

export default AdminPrivateRoutes;
