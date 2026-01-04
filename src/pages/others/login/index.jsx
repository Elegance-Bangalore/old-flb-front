import Login from "@/components/login";
import MetaComponent from "@/components/common/MetaComponent";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "@/Redux/Auth/authSlice";
import { useEffect } from "react";

const metadata = {
  title: "Farmland Bazaar - Buy and Sell Farmlands, Agricultural Land, Farmhouses India",
  description: "Farmland Bazaar",
};

const LoginPage = () => {
  const user = useSelector(selectUser);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <MetaComponent meta={metadata} />
      {user ? <Navigate to="/" /> : <Login />}
    </>
  );
};

export default LoginPage;
