import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Radio,
} from "@mui/material";
import { signupSchema } from "@/Schemas/LoginSignupSchema";
import ShowError from "@/CustomCommon/Others/ShowError";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { registerUserApi, sendOtpApi, verifyOtpApi } from "@/ApiRoutes/AuthApi";
import { toast } from "react-toastify";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { toastMessage } from "@/CustomServices/ToastMessage";
import ShowPasswordInput from "@/CustomCommon/MaterialUi/ShowPasswordInput";
import { useDispatch } from "react-redux";
import { loginUserAsync, setStatus } from "@/Redux/Auth/authSlice";
import axios from "axios";

const Form = () => {
  //// States /////
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [otpCounter, setOtpCounter] = useState(0);
  const [sendOtpLoader, setSendOtpLoader] = useState(false);
  const [verifyOtpLoader, setVerifyOtpLoader] = useState(false);
  const [registerFormLoader, setRegisterFormLoader] = useState(false);

  //// Constant Variable ////
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();

  //// Initail Values for Register form ////
  const initialValues = {
    fullName: "",
    email: "",
    interested: state?.interested || "",
    phone: "",
    password: "",
    confirmPassword: "",
    i_am: "",
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: signupSchema,
    onSubmit: (values) => {
      if (!verifyOtp) {
        toast.error("Please verify your phone number with OTP before registering.");
        return;
      }
      registerUser(values);
    },
  });

  //// Send OTP ////
  async function sendOtp() {
    try {
      setSendOtpLoader(true);
      const phone = values.phone;
      const response = await sendOtpApi({ phone, is_login: false });
      const { status, message } = response?.data;
      if (status === 200) {
        setOtpSent(true);
        setOtpCounter(60);
      }
      toastMessage(status, message);
    } catch (error) {
      toast.error("Something went wrong in sending OTP");
      throw error;
    } finally {
      setSendOtpLoader(false);
    }
  }

  //// Verify OTP ////
  async function submitOtp() {
    try {
      setVerifyOtpLoader(true);
      const otpData = {
        otp,
        phone: values.phone,
        is_login: false,
      };
      const response = await verifyOtpApi(otpData);
      const { status, message } = response?.data;
      if (status === 200) {
        setVerifyOtp(true);
      }
      toastMessage(status, message);
    } catch (error) {
      if (error) {
        toastMessage(
          error?.response?.data?.status,
          error?.response?.data?.message
        );
        throw error;
      }
    } finally {
      setVerifyOtpLoader(false);
    }
  }

  //// Register User ////
  async function registerUser(userData) {
    try {
      setRegisterFormLoader(true);
      // submitOtp("005298")
      const response = await registerUserApi(userData);
      const { status, message } = response?.data;
      if (status === 201) {
        // Auto-login after successful signup
        try {
          const loginCredentials = {
            email: userData.email,
            password: userData.password
          };
          
          const loginResponse = await dispatch(loginUserAsync(loginCredentials)).unwrap();
          
          if (loginResponse.status === 200) {
            const { token, role } = loginResponse?.data;
            
            dispatch(setStatus(true));
            const expirationDate = new Date();
            expirationDate.setMonth(expirationDate.getMonth() + 2);
            const secureFlag = "Secure;";
            const sameSiteFlag = "SameSite=None;";
            const cookieString = `token=${token}; expires=${expirationDate.toUTCString()}; path=/; ${secureFlag} ${sameSiteFlag}`;
            document.cookie = cookieString;
            
            // For new signups, redirect based on role
            // Sellers/developers go to subscription page (they won't have active plans yet)
            // Others go to their respective dashboards
            const isSellerOrDeveloper = userData.interested === "sell";
            
            if (isSellerOrDeveloper) {
              navigate("/subscription-plan");
            } else {
              let destination = "/";
              if (role === "sell") {
                destination = "/seller/dashboard";
              } else if (userData.interested === "admin" || userData.interested === "user") {
                destination = "/admin/dashboard";
              }
              navigate(destination);
            }
          } else {
            // If auto-login fails, redirect based on signup form data
            const isSellerOrDeveloper = userData.interested === "sell";
            if (isSellerOrDeveloper) {
              navigate("/subscription-plan");
            } else {
              navigate("/login");
            }
          }
        } catch (loginError) {
          // If auto-login fails, redirect based on signup form data
          const isSellerOrDeveloper = userData.interested === "sell";
          if (isSellerOrDeveloper) {
            navigate("/subscription-plan");
          } else {
            navigate("/login");
          }
        }
      }

      toastMessage(status, message);
    } catch (error) {
      toast.error("Something went wrong");
      throw error;
    } finally {
      setRegisterFormLoader(false);
    }
  }

  function customInterestedInChange(value) {
    setFieldValue("interested", value);
    setFieldValue("i_am", "");
  }

  function phoneNoChange(value) {
    if (/^\d*\.?\d*$/.test(value)) {
      setFieldValue("phone", value);
    }

    setOtpSent(false);
    // setVerifyOtp(false);
    setOtp("");
  }

  useEffect(() => {
    let intervalId;
    if (otpCounter > 0) {
      intervalId = setInterval(() => {
        setOtpCounter((prevCounter) => prevCounter - 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [otpCounter]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="heading text-center">
        <h3>Register to your account </h3>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-thm fw-bold">
            Login
          </Link>
        </p>
      </div>
      {/* End .heading */}

      <div className="row">
        <div className="col-12">
          <div className="input-group my-2 mr-sm-2">
            <TextField
              id="standard-basic"
              label="Full Name"
              variant="standard"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.fullName && errors.fullName ? true : false}
            />
            <ShowError touched={touched.fullName} message={errors.fullName} />
          </div>
        </div>
        <div className="col-12">
          <div className="input-group my-2 mr-sm-2">
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.fullName && errors.fullName ? true : false}
            />
            <ShowError touched={touched.email} message={errors.email} />
          </div>
        </div>
        <div className="col-12">
          <div className="row">
            <div className={`${otpSent ? "col-12" : "col-sm-12"}`}>
              <div className="input-group my-2 mr-sm-2">
                <TextField
                  id="standard-basic"
                  label="Phone"
                  variant="standard"
                  name="phone"
                  inputProps={{ maxLength: 10 }}
                  disabled={verifyOtp}
                  value={values.phone}
                  onChange={(e) => phoneNoChange(e.target.value)}
                  onBlur={handleBlur}
                  error={touched.phone && errors.phone ? true : false}
                />
                <ShowError touched={touched.phone} message={errors.phone} />
              </div>
            </div>

            {/* Only show Send OTP button when phone is entered and valid */}
            {!otpSent && values.phone && !errors.phone && (
              <div className="col-sm-4">
                {sendOtpLoader ? (
                  <div className="d-flex align-items-center justify-content-center h-100">
                    <OnClickLoader />
                  </div>
                ) : (
                  <div className="d-flex align-items-end justify-content-start">
                    <button
                      className="btn btn-log btn-thm m-0 p-2 w-75 h-auto" style={{fontSize:"10px"}}
                      onClick={sendOtp}
                      type="button"
                    >
                      Send OTP
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>{" "}
        </div>

        {otpSent && !verifyOtp && (
          <div className="col-12">
            <div className="row">
              <div className="col-8">
                <div className="input-group my-2 mr-sm-2">
                  <TextField
                    id="standard-basic"
                    label="OTP"
                    variant="standard"
                    inputProps={{ maxLength: 6 }}
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-4">
                {verifyOtpLoader ? (
                  <div className="d-flex align-items-center justify-content-center h-100">
                    <OnClickLoader />
                  </div>
                ) : (
                  <div className="d-flex align-items-end justify-content-end">
                    <button
                      className="btn btn-log w-100 btn-thm m-0"
                      onClick={() => {
                        submitOtp();
                      }}
                      type="button"
                      disabled={!otp}
                    >
                      Verify OTP
                    </button>
                  </div>
                )}
              </div>
            </div>
            {otpCounter === 0 ? (
              <div>
                <button
                  className="bg-transparent text-red border-0 fw-bold p-0"
                  onClick={sendOtp}
                >
                  Resend OTP
                </button>
              </div>
            ) : (
              <div>
                <p className="m-0 text-red">
                  Resend OTP in {otpCounter} second
                </p>
              </div>
            )}
          </div>
        )}

        <div className="col-12 mb-3" hidden={state?.interested === "sell"}>
          <div className="input-group mt-3 mr-sm-2">
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Interested In
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={values.interested}
                name="interested"
                row
                readOnly
                onBlur={handleBlur}
                onChange={(e) => customInterestedInChange(e.target.value)}
              >
                <FormControlLabel value="buy" control={<Radio />} label="Buy" />
                <FormControlLabel
                  value="sell"
                  control={<Radio />}
                  label="Sell"
                />
              </RadioGroup>
            </FormControl>
            <ShowError
              touched={touched.interested}
              message={errors.interested}
            />
          </div>
        </div>
        <div className="col-12" hidden={values.interested !== "sell"}>
          <div className="input-group mr-sm-2 mt-2">
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">I am</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={values.i_am}
                name="i_am"
                row
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <FormControlLabel
                  value="owner"
                  control={<Radio />}
                  label="Owner"
                />
                <FormControlLabel
                  value="developer"
                  control={<Radio />}
                  label="Developer"
                />
              </RadioGroup>
            </FormControl>
            <ShowError touched={touched.i_am} message={errors.i_am} />
          </div>
        </div>
        <div className="col-12 mb-2">
          <ShowPasswordInput
            name="password"
            value={values.password}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
          <ShowError touched={touched.password} message={errors.password} />
        </div>
        <div className="col-12">
          <ShowPasswordInput
            name="confirmPassword"
            value={values.confirmPassword}
            handleChange={handleChange}
            handleBlur={handleBlur}
            inputLabel="Confirm Password"
          />
          <ShowError
            touched={touched.confirmPassword}
            message={errors.confirmPassword}
          />
        </div>
      </div>

      <div className="mt-3">
        {verifyOtp ? (
          registerFormLoader ? (
            <div className="d-flex align-items-center justify-content-center h-100">
              <OnClickLoader />
            </div>
          ) : (
            <button type="submit" className="btn btn-log w-100 btn-thm my-3">
              Register
            </button>
          )
        ) : (
          <OverlayTrigger overlay={<Tooltip id="tooltip-disabled"></Tooltip>}>
            <span className="">
              <button type="submit" className="btn btn-log w-100 btn-thm my-3">
                Register
              </button>
            </span>
          </OverlayTrigger>
        )}
      </div>
    </form>
  );
};

export default Form;
