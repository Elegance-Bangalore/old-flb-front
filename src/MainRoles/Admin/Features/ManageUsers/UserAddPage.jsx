import React, { useState } from "react";
import {
  TextField,
  FormControl,
  FormControlLabel,
  Switch,
} from "@mui/material";
import Header from "@/components/common/header/dashboard/Header";
import { useFormik } from "formik";
import ShowError from "@/CustomCommon/Others/ShowError";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { useNavigate } from "react-router-dom";
import { addUserApi, updateFaqApi, updateUserApi } from "@/ApiRoutes/AdminApi";
import {
  faqSchema,
  userSchema,
  userSchemaUpdate,
} from "../../AdminSchema/adminSchema";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CryptoJS from "crypto-js";
const decryptKey = "EVOKEY@111";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";

function UserAddPage() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const { state } = useLocation();
  const decryptPassword = (encryptedPassword) => {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, decryptKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const initialValues = {
    username: "",
    email: "",
    password: "",
    phone: "",
    status: true,
    manageProperty: false,
    manageDeveloperProfile: false,
    manageEnquiry: false,
    manageUsers: false,
    manageBlogs: false,
    manageBlogCategory: false,
    manageFooter: false,
    manageAnalytics: false,
    managePageContent: false,
  };

  async function postUser(value) {
    setLoader(true);
    try {
      await addUserApi(value);
      navigate(-1);
      toast.success("User Added Successfully");
    } catch (error) {
      toast.error("Something went wrong! Please try again");
    } finally {
      setLoader(false);
    }
  }

  async function updateUser(value) {
    setLoader(true);
    try {
      await updateUserApi(value);
      navigate(-1);
      toast.success("User Updated Successfully");
    } catch (error) {
      toast.error("Something went wrong! Please try again");
    } finally {
      setLoader(false);
    }
  }

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    setValues,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema: state ? userSchemaUpdate : userSchema,
    onSubmit: (values) => {
      if (state) {
        updateUser(values);
        return;
      }
      postUser(values);
    },
  });

  useState(() => {
    if (state) {
      setValues({ ...state, password: decryptPassword(state.password) });
    }
  }, [state]);

  return (
    <>
      <div className="container-fluid ovh">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb_content">
              <h2 className="breadcrumb_title mt-5 mb-3 pb-3">
                {state ? "EDIT USER" : "ADD USER"}
              </h2>
            </div>
            Enter User Details
          </div>

          <div className="row mt-3">
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-6">
                  <FormControl className="mb-4">
                    <TextField
                      id="outlined-basic"
                      label="Username"
                      variant="outlined"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ShowError
                      touched={touched.username}
                      message={errors.username}
                    />
                  </FormControl>
                </div>

                <div className="col-md-6 ">
                  <FormControl className="mb-4">
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      F
                    />
                    <ShowError touched={touched.email} message={errors.email} />
                  </FormControl>
                </div>

                <div className="col-md-6 ">
                  <FormControl className="mb-4">
                    <TextField
                      id="outlined-basic"
                      label="Phone"
                      variant="outlined"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ShowError touched={touched.phone} message={errors.phone} />
                  </FormControl>
                </div>

                <div className="col-md-6 ">
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
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
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                    <ShowError
                      touched={touched.password}
                      message={errors.password}
                    />
                  </FormControl>
                </div>

                <div className="col-12 my-3 font-18">
                  SET ROLES & PERMISSION
                </div>

                <div className="col-md-6">
                  <div
                    className={` ${
                      values.manageProperty
                        ? "bg-border-light-green"
                        : "bg-border-light-grey"
                    }  swtich-container mb-4`}
                  >
                    <FormControlLabel
                      control={<Switch checked={values.manageProperty} />}
                      label="Manage Property"
                      labelPlacement="start"
                      name="manageProperty"
                      onChange={(event) =>
                        setFieldValue("manageProperty", !values.manageProperty)
                      }
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div
                    className={` ${
                      values.manageEnquiry
                        ? "bg-border-light-green"
                        : "bg-border-light-grey"
                    }  swtich-container mb-4`}
                  >
                    <FormControlLabel
                      control={<Switch checked={values.manageEnquiry} />}
                      label="Manage Enquiry"
                      labelPlacement="start"
                      name="manageEnquiry"
                      onChange={(event) =>
                        setFieldValue("manageEnquiry", !values.manageEnquiry)
                      }
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div
                    className={` ${
                      values.manageDeveloperProfile
                        ? "bg-border-light-green"
                        : "bg-border-light-grey"
                    }  swtich-container mb-4`}
                  >
                    <FormControlLabel
                      control={
                        <Switch checked={values.manageDeveloperProfile} />
                      }
                      label="Manage Developer Profile"
                      labelPlacement="start"
                      name="manageDeveloperProfile"
                      onChange={(event) =>
                        setFieldValue(
                          "manageDeveloperProfile",
                          !values.manageDeveloperProfile
                        )
                      }
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div
                    className={` ${
                      values.manageBlogCategory
                        ? "bg-border-light-green"
                        : "bg-border-light-grey"
                    }  swtich-container mb-4`}
                  >
                    <FormControlLabel
                      control={<Switch checked={values.manageBlogCategory} />}
                      label="Manage Blog Category"
                      labelPlacement="start"
                      name="manageBlogCategory"
                      onChange={(event) =>
                        setFieldValue(
                          "manageBlogCategory",
                          !values.manageBlogCategory
                        )
                      }
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div
                    className={` ${
                      values.manageBlogs
                        ? "bg-border-light-green"
                        : "bg-border-light-grey"
                    }  swtich-container mb-4`}
                  >
                    <FormControlLabel
                      control={<Switch checked={values.manageBlogs} />}
                      label="Manage Blog"
                      labelPlacement="start"
                      name="manageBlogs"
                      onChange={(event) =>
                        setFieldValue("manageBlogs", !values.manageBlogs)
                      }
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div
                    className={` ${
                      values.manageFooter
                        ? "bg-border-light-green"
                        : "bg-border-light-grey"
                    }  swtich-container mb-4`}
                  >
                    <FormControlLabel
                      control={<Switch checked={values.manageFooter} />}
                      label="Manage Footer and FAQs"
                      labelPlacement="start"
                      name="manageFooter"
                      onChange={(event) =>
                        setFieldValue("manageFooter", !values.manageFooter)
                      }
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div
                    className={` ${
                      values.manageAnalytics
                        ? "bg-border-light-green"
                        : "bg-border-light-grey"
                    }  swtich-container mb-4`}
                  >
                    <FormControlLabel
                      control={<Switch checked={values.manageAnalytics} />}
                      label="Manage Analytics"
                      labelPlacement="start"
                      name="manageAnalytics"
                      onChange={(event) =>
                        setFieldValue(
                          "manageAnalytics",
                          !values.manageAnalytics
                        )
                      }
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div
                    className={` ${
                      values.managePageContent
                        ? "bg-border-light-green"
                        : "bg-border-light-grey"
                    }  swtich-container mb-4`}
                  >
                    <FormControlLabel
                      control={<Switch checked={values.managePageContent} />}
                      label="Manage Page Content"
                      labelPlacement="start"
                      name="managePageContent"
                      onChange={(event) =>
                        setFieldValue(
                          "managePageContent",
                          !values.managePageContent
                        )
                      }
                    />
                  </div>
                </div>

                <div className="col-12 mt-1 mb-2">
                  <LoadingButton
                    className="btn btn-dark rounded-3 fw-bold px-5 text-uppercase text-light border-dark"
                    loading={loader}
                    loadingIndicator="Loading…"
                    variant="outlined"
                    onClick={handleSubmit}
                  >
                    Save
                  </LoadingButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserAddPage;

