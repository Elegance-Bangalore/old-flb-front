import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import ShowError from "@/CustomCommon/Others/ShowError";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { useFormik } from "formik";
import { resetPasswordSchema } from "@/Schemas/LoginSignupSchema";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { checkUrlApi, resetPasswordApi } from "@/ApiRoutes/AuthApi";
import { toast } from "react-toastify";

function Form() {
  const [loading, setLoading] = useState(false);
  const [pageLoad, setPageLoad] = useState(false);
  const [tokenExpire, setTokenExpire] = useState(false);
  const param = useParams();
  const navigate = useNavigate();
  const token = param?.token;

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: resetPasswordSchema,
      onSubmit: (values) => {
        resetPassword(values);
      },
    });

  async function resetPassword(value) {
    setLoading(true);
    try {
      const response = await resetPasswordApi(value, token);
      const { status, message } = response.data;
      if (status === 200) {
        navigate("/login");
      }
      toastMessage(status, message);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function checkUrl() {
    try {
      const response = await checkUrlApi(token);
      const { message } = response.data;
      if (message === "Token is invalid") {
        setTokenExpire(true);
        toast.error("This url is expired");
        navigate("/login");
      }
    } catch (error) {
      throw error;
    } finally {
      setPageLoad(false);
    }
  }

  useEffect(() => {
    checkUrl();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="heading text-center">
          <h3>Reset Password</h3>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="input-group mb-2 mr-sm-2">
              <TextField
                id="standard-basic"
                label="Password"
                variant="standard"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && errors.password ? true : false}
              />
              <ShowError touched={touched.password} message={errors.password} />
            </div>
          </div>
          <div className="col-12">
            <div className="input-group my-2 mr-sm-2">
              <TextField
                id="standard-basic"
                label="Confirm Password"
                variant="standard"
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.confirmPassword && errors.confirmPassword
                    ? true
                    : false
                }
              />
              <ShowError
                touched={touched.confirmPassword}
                message={errors.confirmPassword}
              />
            </div>
          </div>
        </div>

        <div className=" mt-3">
          {loading ? (
            <div className="text-center">
              <OnClickLoader />
            </div>
          ) : (
            <button type="submit" className="btn btn-log w-100 btn-thm">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Form;
