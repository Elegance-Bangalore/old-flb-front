import SignUp from "@/components/register";
import { useSelector } from "react-redux";
import { selectUser } from "@/Redux/Auth/authSlice";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Farmland Bazaar - Buy and Sell Farmlands, Agricultural Land, Farmhouses India",
  description: "Farmland Bazaar",
};

const RegisterPage = () => {
  const user = useSelector(selectUser);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <MetaComponent meta={metadata} />
      {user ? <Navigate to="/" /> : <SignUp />}
    </>
  );
};

export default RegisterPage;
