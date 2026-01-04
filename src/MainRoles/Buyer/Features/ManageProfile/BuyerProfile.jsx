import React, { useEffect, useState } from "react";
import Header from "../../../../components/common/header/dashboard/Header";
import MobileMenu from "../../../../components/common/header/MobileMenu";
import adds from "@/public/assets/images/profile/promotional-banners.png";
import Banner from "@/public/assets/images/profile/profile-banner.png";
import editIcon from "@/public/assets/images/profile/profile-edit.svg";
import deleteIcon from "@/public/assets/images/profile/delete-profile.svg";
import { FormControl, TextField, InputAdornment } from "@mui/material";
import BuyerSidebarMenu from "../../BuyerLayout/BuyerSidebarMenu";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, userProfileAsync } from "@/Redux/Auth/authSlice";
import { useFormik } from "formik";
import { updateBuyerProfileApi } from "@/ApiRoutes/BuyersApi";
import { toast } from "react-toastify";
import { buyerProfileSchema } from "@/Schemas/userProfileSchema";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import ProfileForm from "@/CustomCommon/ProfilePage/ProfileForm";
import ChangePassword from "@/CustomCommon/ProfilePage/ChangePassword";
import dummyProfile from "@/CustomAssets/BuyerImages/Dummy-profile.png"
import Communication from "@/CustomCommon/ProfilePage/Communication";


const BuyerProfile = () => {
  // State to store the selected image file

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [loader, setLoader] = useState(false);


  const initialValues = {
    fullName: user?.fullName,
    email: user?.email,
    phone: user?.phone,
    interested: user?.interested,
    city: user?.city,
    profilePic: user?.profilePic,
    notification: user?.notification,
    alternateNumber: user?.alternateNumber
  };


  // Function to handle file change
  const handleFileChange = (event) => {
    const data = new FileReader();
    data.addEventListener("load", () => {
      Formik.setFieldValue("profilePic", data.result);
    });
    data.readAsDataURL(event.target.files[0]);
  };
  // Function to handle delete button click
  const handleDelete = () => {
    // Clear the image file state
    Formik.setFieldValue("profilePic", "");
  };



  const Formik = useFormik({
    initialValues,
    validationSchema: buyerProfileSchema,
    onSubmit: (values) => {
      updateBuyerProfile(values);
    },
  });

  async function updateBuyerProfile(value) {
    setLoader(true);
    try {
      const response = await updateBuyerProfileApi(value);
      dispatch(userProfileAsync());
      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error("Something went wrong in profile update");
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    if (user) {
      Formik.setValues(user)
    }
  }, [user])


  return (
    <>
      <div className="container-fluid ovh">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb_content style2">
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
                        <img
                          className="img-fluid"
                          src={Formik.values.profilePic ? Formik.values.profilePic : dummyProfile}
                          alt="profileImage"
                        />
                      </div>
                      <span>
                        <label
                          htmlFor="file-upload"
                          className="btn btn-profile-edit d-inline-block"
                        >
                          <img
                            className="img-fluid"
                            src={editIcon}
                            alt="editIcon"
                          />
                          <TextField
                            type="file"
                            id="file-upload"
                            variant="outlined"
                            hidden
                            onChange={handleFileChange}
                          />
                        </label>
                      </span>
                      <span>
                        <button
                          onClick={handleDelete}
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
                  </div>
                </div>
                <div className="profile-detail px-4 py-4">
                  <div className="owner-detail">
                    <form className="row">
                      <ProfileForm formik={Formik} />
                      <Communication formik={Formik} />
                    </form>

                    <div className="col-12 text-center mt-3 mb-2">
                      {loader ? (
                        <OnClickLoader />
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-dark rounded-3 fw-bold px-5 text-uppercase"
                          onClick={Formik.handleSubmit}
                        >
                          Save
                        </button>
                      )}
                    </div>

                    <ChangePassword />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 text-center">
            <div className="card-shadow adds-imgs">
              <img className="img-fluid w-100" src={adds} alt="add" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyerProfile;
