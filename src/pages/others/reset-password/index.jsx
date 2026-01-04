import ResetPassword from "@/components/reset-password";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/Redux/Auth/authSlice";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

function ResetPasswordPage() {

  const user = useSelector(selectUser);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {user ? <Navigate to="/" /> : <ResetPassword />}

    </>
  );
}

export default ResetPasswordPage;
