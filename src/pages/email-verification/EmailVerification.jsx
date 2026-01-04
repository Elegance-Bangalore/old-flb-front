import { emailVerification } from "@/ApiRoutes/AuthApi";
import BuyerHeader from "@/MainRoles/Buyer/Features/BuyerHomePage/Layouts/BuyerHeader";
import { selectUser, userProfileAsync } from "@/Redux/Auth/authSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function EmailVerification() {
  const dispatch = useDispatch();
  const { verificationToken } = useParams();
  const [verificationStatusText, setVerificationStatusText] =
    useState("Please Wait...");
  const user = useSelector(selectUser);
  function profileSync() {
    dispatch(userProfileAsync());
  }

  useEffect(() => {
    if (!user?.isEmailVerified) {
      emailVerification(verificationToken)
        .then(() => {
          toast.success("Email verification successful.");
          setVerificationStatusText("Thank you for verifying your email.");
        })
        .catch(() => {
          setVerificationStatusText(
            "The verification token has expired. Please request a new one."
          );
        });
    }
  }, [verificationToken]);

  return (
    <>
      <BuyerHeader />
      <div
        className="home-one home1-overlay home1_bgi1"
        style={{
          display: "grid",
          textAlign: "center",
          placeContent: "center",
        }}
      >
        <div style={{ position: "relative", zIndex: "1" }}>
          <h2 style={{ color: "white", fontSize: "3rem" }}>
            {!user?.isEmailVerified
              ? verificationStatusText
              : "Email Already Verified"} 
          </h2>
          <Link to={"/"} onClick={profileSync}>
            <h4 style={{ color: "#fff", fontSize: "1.5rem", textDecoration: "underline" }}>
              Click here to Redirect to Home Page
            </h4>
          </Link>
        </div>
      </div>
    </>
  );
}

export default EmailVerification;
