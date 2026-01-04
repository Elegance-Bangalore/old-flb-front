import React, { useEffect } from "react";
import { Navigate , useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setPreviousUrl } from "@/Redux/Auth/authSlice";

const SellerPrivateRoute = ({ children }) => {
  const user = useSelector(selectUser);
  const location = useLocation();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPreviousUrl(location.pathname))
  }, [location.pathname])

  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  if (user && user?.interested != "sell") {
    return <Navigate to="/" replace={true}></Navigate>;
  }
  return children;
};

export default SellerPrivateRoute;
