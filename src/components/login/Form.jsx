import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { loginSchema } from "@/Schemas/LoginSignupSchema";
import ShowError from "@/CustomCommon/Others/ShowError";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserAsync,
  selectPreviousUrl,
  setLogout,
  setStatus,
} from "@/Redux/Auth/authSlice";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { useNavigate, useLocation } from "react-router-dom";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { useEffect, useState, useRef } from "react";
import { sendOtpApi, verifyOtpApi } from "@/ApiRoutes/AuthApi";
import { toast } from "react-toastify";
import axios from "axios";
import ShowPasswordInput from "@/CustomCommon/MaterialUi/ShowPasswordInput";
import ClipLoader from "react-spinners/ClipLoader";

const Form = () => {
  const disptach = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [resendLoader, setResendLoader] = useState(false);
  const navigate = useNavigate();
  const [sentOtp, setSentOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [otpCounter, setOtpCounter] = useState(0);
  const [ip, setIp] = useState({});
  const previousUrl = useSelector(selectPreviousUrl);

  const initialValues = {
    email: "",
    password: "",
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        try {
          setLoading(true);
          const response = await disptach(loginUserAsync(values)).unwrap();
          if (response.status === 200) {
            const { token, role } = response?.data;
            // const phone = response?.data?.phone;
            // setPhone(phone);
            // sendOtp(phone);
            // verifyOtp(phone);
            disptach(setStatus(true));
            const expirationDate = new Date();
            expirationDate.setMonth(expirationDate.getMonth() + 2);
            const secureFlag = "Secure;";
            const sameSiteFlag = "SameSite=None;";
            const cookieString = `token=${token}; expires=${expirationDate.toUTCString()}; path=/; ${secureFlag} ${sameSiteFlag}`;
            document.cookie = cookieString;
            
            // Check role and subscription status
            try {
              const subscriptionRes = await fetch("/user/role-subscription", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              if (subscriptionRes.ok) {
                const { user } = await subscriptionRes.json();
                const isSellerOrDeveloper = user.role === "seller" || user.role === "developer";
                const hasActivePlan = user.subscription && user.subscription.active;
                
                if (isSellerOrDeveloper && !hasActivePlan) {
                  navigate("/subscription-plan");
                } else {
                  let destination = "/";
                  if (role === "seller") {
                    destination = "/seller/dashboard";
                  } else if (
                    response?.data?.interested === "admin" ||
                    response?.data?.interested === "user"
                  ) {
                    destination = "/admin/dashboard";
                  }
                  if (previousUrl) {
                    navigate(previousUrl);
                  } else {
                    navigate(destination);
                  }
                }
              } else {
                // Fallback to original logic if subscription check fails
                let destination = "/";
                if (role === "seller") {
                  destination = "/seller/dashboard";
                } else if (
                  response?.data?.interested === "admin" ||
                  response?.data?.interested === "user"
                ) {
                  destination = "/admin/dashboard";
                }
                if (previousUrl) {
                  navigate(previousUrl);
                } else {
                  navigate(destination);
                }
              }
            } catch (subscriptionError) {
              // Fallback to original logic
              let destination = "/";
              if (role === "seller") {
                destination = "/seller/dashboard";
              } else if (
                response?.data?.interested === "admin" ||
                response?.data?.interested === "user"
              ) {
                destination = "/admin/dashboard";
              }
              if (previousUrl) {
                navigate(previousUrl);
              } else {
                navigate(destination);
              }
            }
          } else {
            toastMessage(response?.status, response?.message);
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
          throw error;
        }finally{
          setLoading(false);
        }
      },
    });

  async function sendOtp(phone) {
    try {
      setResendLoader(true);
      const sendOtp = await sendOtpApi({
        phone,
        // is_login: true,
      });
      const { status, message } = sendOtp.data;
      toastMessage(status, message);
      // setSentOtp(true);

      if (status === 200) {
        // setSentOtp(true);
        setOtpCounter(60);
      }
    } catch (error) {
      toast.error("Some server error in Sending OTP");
      throw error;
    } finally {
      setLoading(false);
      setResendLoader(false);
    }
  }

  async function verifyOtp(phone) {
    // e.preventDefault();
    try {
      setLoading(true);
      const sendData = {
        otp: "005298",
        phone,
        is_login: true,
        ip: ip,
        browser: navigator.userAgent,
      };
      const response = await verifyOtpApi(sendData);
      const { status, message, data } = response?.data;
      toastMessage(status, message);
      if (status === 200) {
        const { token } = response?.data?.data;
        disptach(setStatus(true));
        const expirationDate = new Date();
        expirationDate.setMonth(expirationDate.getMonth() + 2);
        const secureFlag = "Secure;";
        const sameSiteFlag = "SameSite=None;";
        const cookieString = `token=${token}; expires=${expirationDate.toUTCString()}; path=/; ${secureFlag} ${sameSiteFlag}`;
        document.cookie = cookieString;
        
        // Check role and subscription status
        try {
          const subscriptionRes = await fetch("/user/role-subscription", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (subscriptionRes.ok) {
            const { user } = await subscriptionRes.json();
            const isSellerOrDeveloper = user.role === "seller" || user.role === "developer";
            const hasActivePlan = user.subscription && user.subscription.active;
            
            if (isSellerOrDeveloper && !hasActivePlan) {
              navigate("/subscription-plan");
            } else {
              let destination = "/";
              if (data?.interested === "sell") {
                destination = "/seller/dashboard";
              } else if (
                data?.interested === "admin" ||
                data?.interested === "user"
              ) {
                destination = "/admin/dashboard";
              }
              if (previousUrl) {
                navigate(previousUrl);
              } else {
                navigate(destination);
              }
            }
          } else {
            // Fallback to original logic if subscription check fails
            let destination = "/";
            if (data?.interested === "sell") {
              destination = "/seller/dashboard";
            } else if (
              data?.interested === "admin" ||
              data?.interested === "user"
            ) {
              destination = "/admin/dashboard";
            }
            if (previousUrl) {
              navigate(previousUrl);
            } else {
              navigate(destination);
            }
          }
        } catch (subscriptionError) {
          console.error("Error checking subscription:", subscriptionError);
          // Fallback to original logic
          let destination = "/";
          if (data?.interested === "seller") {
            destination = "/seller/dashboard";
          } else if (
            data?.interested === "admin" ||
            data?.interested === "user"
          ) {
            destination = "/admin/dashboard";
          }
          if (previousUrl) {
            navigate(previousUrl);
          } else {
            navigate(destination);
          }
        }
      }
    } catch (error) {
      toastMessage(
        error?.response?.data?.status,
        error?.response?.data?.message
      );
    } finally {
      setLoading(false);
    }
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

  useEffect(() => {
    disptach(setLogout());
  }, [disptach]);

  const getUserIp = async () => {
    try {
      const ip = await axios.get("https://ipapi.co/json");
      console.log("Ip", ip);
      setIp(ip.data.ip);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getUserIp();
  }, []);

  return (
    <div className="login-form">
      {sentOtp ? (
        <>
          <div className="heading text-center">
            <h3>OTP is sent to your phone</h3>
            <div className="input-group my-2 mr-sm-2">
              <TextField
                id="standard-basic"
                label="OTP"
                variant="standard"
                name="otp"
                inputProps={{ maxLength: 6 }}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div className="input-group my-2 mr-sm-2">
              <TextField
                id="phone-input"
                label="Phone Number"
                variant="standard"
                name="phone"
                inputProps={{ maxLength: 10 }}
                value={phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  setPhone(value);
                }}
              />
            </div>
            {resendLoader ? (
              <button
                className="bg-transparent text-red border-0 fw-bold p-0"
                disabled
              >
                <OnClickLoader />
              </button>
            ) : otpCounter === 0 ? (
              <div className="text-start">
                <button
                  className="bg-transparent text-red border-0 fw-bold p-0"
                  onClick={() => sendOtp(phone)}
                  disabled={phone.length !== 10}
                  style={{ opacity: phone.length === 10 ? 1 : 0.5, pointerEvents: phone.length === 10 ? 'auto' : 'none' }}
                >
                  Resend OTP
                </button>
              </div>
            ) : (
              <div className="text-start">
                <p className="m-0 text-red">
                  Resend OTP in {otpCounter} second
                </p>
              </div>
            )}

            <button
              type="submit"
              onClick={(e) => verifyOtp(e)}
              className="btn btn-log w-100 btn-thm my-3"
              disabled={otp.length !== 6 || loading}
            >
              {loading ? <OnClickLoader color="white" /> : "Verify OTP"}
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="heading text-center">
            <h3>Login to your account</h3>
            <p className="text-center">
              Dont have an account?{" "}
              <Link to="/register" className="text-thm fw-bold">
                Sign Up!
              </Link>
            </p>
          </div>
          {/* End .heading */}

          <div className="input-group my-2 mr-sm-2">
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ShowError touched={touched.email} message={errors.email} />
          </div>
          <div className="input-group my-2 mr-sm-2">
            <ShowPasswordInput
              name="password"
              value={values.password}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            <ShowError touched={touched.password} message={errors.password} />
          </div>
          {/* End .input-group */}

          <div className="form-group form-check custom-checkbox mb-3">
            <Link className="btn-fpswd float-end fw-bold" to="/forgot-password">
              Forgot&nbsp;password?
            </Link>
          </div>
          {/* End .form-group */}
          <div className="mt-3">
            <button
              type="submit"
              className="btn btn-log w-100 btn-thm mt-3"
              disabled={loading}
            >
              {loading ? <OnClickLoader color="white" /> : "Log In"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Form;
