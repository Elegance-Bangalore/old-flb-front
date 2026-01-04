import React, { useEffect, useState } from "react";
import Banner from "@/public/assets/images/profile/profile-banner.png";
import CompanyDetailForm from "@/CustomCommon/ProfilePage/CompanyDetailForm";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import ShowError from "@/CustomCommon/Others/ShowError";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import {
  addDeveloperApi,
  manageSubscriptionApi,
  updateDeveloperApi,
} from "@/ApiRoutes/AdminApi";
import { Link, useLocation } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
// import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from "react-router-dom";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { adminDeveloperProfile } from "@/MainRoles/Buyer/Schemas/profileSchema";
import Support from "@/CustomCommon/AllRoles/Support";
import dummyProfile from "@/CustomAssets/BuyerImages/Dummy-profile.png";
import RecentlyAdded from "@/CustomCommon/Dashboard/RecentlyAdded";
import { getDeveloperPropertyApi } from "@/ApiRoutes/BuyersApi";
import { subscriptionPlanListApi } from "@/ApiRoutes/SellerApis";
import SubscriptionByAdmin from "./SubscriptionByAdmin";
import { update } from "lodash";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function DeveloperAddPage() {
  const [loader, setLoader] = useState(false);
  const [propertyList, setPropertyList] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const { state } = useLocation();
  const navigate = useNavigate();
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const initialValues = {
    fullName: "",
    about: "",
    email: "",
    phone: "",
    interested: "sell",
    i_am: "developer",
    city: "",
    companyName: "",
    website: "",
    address: "",
    logo: "",
    profilePic: "",
    alternateNumber: "",
    isActive: true,
    establishedYear: "",
    subscription: false,
    expiresAt: "",
    plan: "",
    price: "",
    password: "",
  };

  const Formik = useFormik({
    initialValues,
    validationSchema: adminDeveloperProfile,
    onSubmit: (values) => {
      updateDeveloper(values);
    },
  });

  const {
    values,
    handleSubmit,
    setFieldValue,
    setValues,
    handleChange,
    handleBlur,
    touched,
    errors,
  } = Formik;

  async function developerPropertyList() {
    try {
      const response = await getDeveloperPropertyApi({
        developerId: state._id,
      });
      setPropertyList(response?.data?.properties);
    } catch (error) {
      toastMessage();
    }
  }

  async function updateDeveloper(values) {
    try {
      setLoader(true);
      const payload = {
        ...values,
        logo: values?.logo || "",
        userId: values._id,
      };
      const response = await updateDeveloperApi(payload);
      navigate(-1);
    } catch (error) {
      console.log("Error", error);
      toastMessage(error?.response?.status, error?.response?.data?.error);
    } finally {
      setLoader(false);
    }
  }

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  const updateSubscription = async () => {
    try {
      const payload = {
        subscription: values.subscription,
        expiresAt: values.expiresAt,
        plan: values.plan,
        price: values.price,
      };
      const response = await manageSubscriptionApi(values._id, payload);
      toastMessage(response?.status, response?.data?.message);
      navigate("/admin/developer-profile");
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    if (state) {
      setValues({ ...state, ...state?.sellerSubscription , password : "" });
      developerPropertyList();
    }
    if (state?.scrollBottom) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [state]);

  return (
    <>
      <div className="container-fluid ovh">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb_content style2 mt-5">
              <h2 className="breadcrumb_title">Manage Profile 1</h2>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="bg-white-shadow">
              <div className="profile-wapper">
                <div className="profile-hero">
                  <img
                    className="img-fluid profile-banner w-100"
                    src={Banner}
                    alt="banner"
                  />
                  <div className="text-end mt-3">
                    <FormControlLabel
                      control={
                        <IOSSwitch sx={{ m: 1 }} checked={values.isActive} />
                      }
                      label="Status"
                      onChange={() =>
                        setFieldValue("isActive", !values.isActive)
                      }
                    />
                  </div>
                  <div className="hero-content d-flex justify-content-between px-4">
                    <div className="profile-img d-flex align-itmes-start gap-2">
                      <div className="profile-img-wrapper">
                        <img
                          className="img-fluid"
                          src={
                            Formik.values.profilePic
                              ? Formik.values.profilePic
                              : dummyProfile
                          }
                          alt="profileImage"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="profile-detail px-4 py-4">
                  <div className="owner-detail">
                    <form className="row">
                      <h4 className="text-medium-grey text-uppercase mt-3 mb-4">
                        Personal Details 
                      </h4>
                      <div className="col-md-6">
                        <FormControl className="mb-4">
                          <TextField
                            id="full-name"
                            label="Full Name"
                            variant="outlined"
                            name="fullName"
                            value={values.fullName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <ShowError
                            touched={touched.fullName}
                            message={errors.fullName}
                          />
                        </FormControl>
                      </div>
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-12">
                            <FormControl className="mb-4">
                              <TextField
                                id="mobile"
                                label="Mobile Number"
                                variant="outlined"
                                name="phone"
                                value={values.phone}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                              <ShowError
                                touched={touched.phone}
                                message={errors.phone}
                              />
                            </FormControl>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-12">
                            <FormControl className="mb-4">
                              <TextField
                                id="email"
                                label="Email"
                                variant="outlined"
                                name="email"
                                value={values.email}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                              <ShowError
                                touched={touched.email}
                                message={errors.email}
                              />
                            </FormControl>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <FormControl variant="outlined">
                          <InputLabel>Seller Type</InputLabel>
                          <Select
                            label="Seller Type"
                            name="i_am"
                            value={values.i_am}
                            onChange={handleChange}
                            MenuProps={{
                              disableScrollLock: true,
                            }}
                          >
                            <MenuItem value={"developer"}>Developer</MenuItem>
                            <MenuItem value="owner">Owner</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      <div className="col-md-6">
                        <FormControl className="mb-4 ">
                          <TextField
                            id=""
                            label="Alternate Mobile Number (Optional)"
                            variant="outlined"
                            name="alternateNumber"
                            value={values.alternateNumber}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          <ShowError />
                        </FormControl>
                      </div>
                      <div className="col-md-6">
                        <FormControl className="mb-4">
                          <TextField
                            id="city"
                            label="City"
                            variant="outlined"
                            name="city"
                            value={values.city}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </FormControl>
                      </div>

                      <div className="col-md-6 ">
                        <FormControl variant="outlined">
                          <InputLabel htmlFor="outlined-adornment-password">
                            New Password
                          </InputLabel>
                          <OutlinedInput
                            type={showPassword ? "text" : "password"}
                            value={values.password}
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="New Password"
                          />
                          <ShowError
                            touched={touched.password}
                            message={errors.password}
                          />
                        </FormControl>
                      </div>

                      <CompanyDetailForm formik={Formik} />
                    </form>

                    <div className="col-12 text-center mt-3 mb-2">
                      <LoadingButton
                        loading={loader}
                        loadingPosition="start"
                        // color="success"
                        variant="contained"
                        style={{ backgroundColor: "black" }}
                        onClick={Formik.handleSubmit}
                      >
                        Update
                      </LoadingButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <h4 className="text-medium-grey text-uppercase m4-3">
            Manage Subscription
          </h4>

          <SubscriptionByAdmin formik={Formik} />

          <div className="col-12 text-center mt-3 mb-4">
            <LoadingButton
              loading={loader}
              loadingPosition="start"
              variant="contained"
              style={{ backgroundColor: "black" }}
              onClick={updateSubscription}
            >
              Update Subscription
            </LoadingButton>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="bg-white-shadow card-hover-green p-3">
              <div className="d-flex align-items-center justify-content-between">
                <h3>{state?.companyName || state?.fullName}</h3>
              </div>
            
              <RecentlyAdded
                propertyList={propertyList}
                setPropertyList={setPropertyList}
                link="/seller/property-list"
                role="admin"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeveloperAddPage;
