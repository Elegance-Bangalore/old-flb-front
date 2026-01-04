import React, { useEffect, useState } from "react";
import adds from "@/public/assets/images/profile/promotional-banners.png";
import Banner from "@/public/assets/images/profile/profile-banner.png";
import editIcon from "@/public/assets/images/profile/profile-edit.svg";
import deleteIcon from "@/public/assets/images/profile/delete-profile.svg";
import call from "@/public/assets/images/profile/call-calling.svg";
import sms from "@/public/assets/images/profile/sms-edit.svg";
import "../../../SellerStyle/sellerStyle.scss";
import { TextField, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { selectUser, setUser, userProfileAsync } from "@/Redux/Auth/authSlice";
import {
  developerProfileSchema,
  ownerProfileSchema,
} from "@/MainRoles/Buyer/Schemas/profileSchema";
import MobileMenu from "@/components/common/header/MobileMenu";
import SidebarMenu from "@/components/common/header/dashboard/SidebarMenu";

import { toastMessage } from "@/CustomServices/ToastMessage";
import {
  developerProfileUpdateApi,
  ownerProfileUpdateApi,
  resendEmail,
} from "@/ApiRoutes/SellerApis";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import Header from "@/components/common/header/dashboard/Header";
import { MdVerified } from "react-icons/md";
import ChangeEmailModal from "@/components/Modals/ChangeEmailModal";
import { MdError } from "react-icons/md";
import Alert from "@mui/material/Alert";
import { toast } from "react-toastify";
import ProfileForm from "@/CustomCommon/ProfilePage/ProfileForm";
import CompanyDetailForm from "@/CustomCommon/ProfilePage/CompanyDetailForm";
import ChangePassword from "@/CustomCommon/ProfilePage/ChangePassword";
import Support from "@/CustomCommon/AllRoles/Support";
import dummyProfile from "@/CustomAssets/BuyerImages/Dummy-profile.png";

function ProfileMain() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const initialValues = {
    fullName: user?.fullName,
    email: user?.email,
    phone: user?.phone,
    i_am: user?.i_am,
    city: user?.city,
    companyName: user?.companyName,
    website: user?.website,
    address: user?.address,
    url: user?.url,
    logo: user?.logo ?? "",
    profilePic: user?.profilePic,
    alternateNumber: user?.alternateNumber,
    ongoingProjects: user?.ongoingProjects,
    completedProjects: user?.ongoingProjects,
    notification: user?.notification,
    about: user?.about,
    establishedYear: user?.establishedYear,
  };

  const Formik = useFormik({
    initialValues,
    validationSchema: () => {
      return values.i_am === "developer"
        ? developerProfileSchema
        : ownerProfileSchema;
    },
    onSubmit: (values) => {
      updateSellerProfile(values);
    },
  });

  const { values, handleSubmit, setFieldValue, setValues } = Formik;

  async function updateSellerProfile(value) {
    try {
      setLoader(true);
      let response;
      if (values.i_am === "owner") {
        const {
          profilePic,
          fullName,
          city,
          phone,
          email,
          i_am,
          alternateNumber,
          notification,
        } = value;
        const data = {
          profilePic,
          fullName,
          city,
          phone,
          email,
          i_am,
          alternateNumber,
          notification,
        };
        response = await ownerProfileUpdateApi(data);
      }
      if (values.i_am === "developer") {
        const data = { ...value, logo: value?.logo || "" };
        response = await developerProfileUpdateApi(data);
      }
      const { status, message } = response.data;
      toastMessage(status, message, dispatch);
      if (status === 200) {
        dispatch(userProfileAsync());
      }
    } catch (error) {
      toastMessage(error?.response?.status, error?.response?.data?.message);
      throw error;
    } finally {
      setLoader(false);
    }
  }

  function resendEmailApi() {
    resendEmail({ email: user?.email })
      .then((res) => toast.success("Link sent to your Email"))
      .catch((err) => toast.error("Something Went Wrong! Try again"));
  }

  const uploadImage = (e) => {
    const data = new FileReader();
    data.addEventListener("load", () => {
      setFieldValue(e.target.name, data.result);
    });
    data.readAsDataURL(e.target.files[0]);
  };

  const handleDeleteImage = (name) => {
    setFieldValue(name, "");
  };

  useEffect(() => {
    if (user) {
      setValues(user);
    }
  }, [user]);

  return (
    <>
      {!user?.isEmailVerified && (
        <div className="alert m-0">
          <Alert severity="error" className="m-0">
            Your email is not verified.{" "}
            <span
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={resendEmailApi}
            >
              Click Here
            </span>{" "}
            to get verification link. (Note : If your email is already verified
            then refresh the page)
          </Alert>
        </div>
      )}
      <div className="container-fluid ovh">
        <div className="row">
          <div className="col-lg-12">
            <div
              className={`breadcrumb_content style2 ${
                user?.isEmailVerified && "mt-5"
              }`}
            >
              <h2 className="breadcrumb_title">Manage Profile</h2>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="bg-white-shadow">
              <div className="profile-wapper">
                <div className="profile-hero">
                  <img
                    className="img-fluid profile-banner w-100"
                    src={Banner}
                    alt="banner"
                  />
                  <div className="hero-content d-flex justify-content-between px-4">
                    <div className="profile-img d-flex align-itmes-start gap-2">
                      <div className="profile-img-wrapper">
                      <Tooltip title="Upload Profile Pic" placement="bottom">
                      <img
                          className="img-fluid"
                          src={
                            values?.profilePic
                              ? values?.profilePic
                              : dummyProfile
                          }
                          alt="profileImage"
                        />
                      </Tooltip>
                       
                      </div>
                      <span>
                        <label
                          htmlFor="file-profile-upload"
                          className="btn btn-profile-edit d-inline-block"
                        >
                          <img
                            className="img-fluid"
                            src={editIcon}
                            alt="editIcon"
                          />
                        </label>
                        <TextField
                          type="file"
                          id="file-profile-upload"
                          variant="outlined"
                          hidden
                          onChange={(e) => uploadImage(e)}
                          name="profilePic"
                        />
                      </span>
                      <span>
                        <button
                          onClick={() => handleDeleteImage("profilePic")}
                          type="button"
                          className="btn btn-profile-delete d-inline-block"
                        >
                          <img
                            className="img-fluid"
                            src={deleteIcon}
                            alt="deleteIcon"
                          />
                        </button>
                      </span>
                    </div>
                    <div className="hero-tabs d-flex align-items-start gap-3">
                      <h4>I am:</h4>
                      <ul
                        className="nav nav-tabs align-items-center"
                        id="myTab"
                        role="tablist"
                      >
                        <li
                          className="nav-item"
                          onClick={() => {
                            setFieldValue("i_am", "owner");
                          }}
                        >
                          <a
                            className={`nav-link ${
                              values?.i_am === "owner" ? "active" : null
                            }`}
                            data-bs-toggle="tab"
                            href="#owner"
                            role="tab"
                          >
                            Owner
                          </a>
                        </li>
                        <li
                          className="nav-item"
                          onClick={() => {
                            setFieldValue("i_am", "developer");
                          }}
                        >
                          <a
                            className={`nav-link ${
                              values?.i_am === "developer" ? "active" : null
                            }`}
                            data-bs-toggle="tab"
                            href="#developer"
                            role="tab"
                          >
                            Developer
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="profile-detail px-4 py-4">
                  <div className="tab-content" id="myTabContent2">
                    <div
                      className={`tab-pane fade  ${
                        values?.i_am === "owner" ? "active show" : null
                      }`}
                      id="owner"
                      role="tabpanel"
                    >
                      <div className="owner-detail">
                        <form className="row">
                          <ProfileForm formik={Formik} />
                        </form>

                        {loader ? (
                          <div className="text-center">
                            <OnClickLoader />
                          </div>
                        ) : (
                          <div className="col-12 text-center">
                            <button
                              type="button"
                              className="btn btn-dark rounded-3 fw-bold px-5 text-uppercase"
                              onClick={handleSubmit}
                            >
                              Save
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className={`tab-pane fade  ${
                        values?.i_am === "developer" ? "active show" : null
                      }`}
                      id="developer"
                      role="tabpanel"
                    >
                      <div className="developer-detail">
                        <form className="row">
                          <ProfileForm formik={Formik} />
                          <CompanyDetailForm formik={Formik} />
                        </form>

                        {loader ? (
                          <div className="text-center">
                            <OnClickLoader />
                          </div>
                        ) : (
                          <div className="col-12 text-center">
                            <button
                              type="submit"
                              className="btn btn-dark rounded-3 px-5 fw-bold text-uppercase"
                              onClick={handleSubmit}
                            >
                              Save
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <ChangePassword />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 text-center">
            <Support />
          </div>
        </div>
      </div>
      <ChangeEmailModal show={show} handleClose={handleClose} />
    </>
  );
}

export default ProfileMain;
