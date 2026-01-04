import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import ShowError from "@/CustomCommon/Others/ShowError";
import { useFormik } from "formik";
import { forgotPasswordSchema } from "@/Schemas/LoginSignupSchema";

import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { forgotPasswordApi } from "@/ApiRoutes/AuthApi";

function Form() {
  const [loading, setLoading] = useState(false);
  const [urlSent, setUrlSent] = useState(false);

  const initialValues = {
    email: "",
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: forgotPasswordSchema,
      onSubmit: async (values) => {
        forgotPassword(values);
      },
    });

  async function forgotPassword(value) {
    setLoading(true);
    try {
      const response = await forgotPasswordApi(value);
      const { status, message } = response.data;
      toastMessage(status, message);
      if (status === 200) {
        setUrlSent(true);
      }
    } catch (error) {
      throw error
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="">
      {!urlSent ? (
        <form onSubmit={handleSubmit}>
          <div className="heading text-center">
            <h3>Forgot Password</h3>
          </div>

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
          <div className="form-group form-check custom-checkbox mb-3">
            <Link className="btn-fpswd float-end" to="/login">
              Remember&nbsp;Password
            </Link>
          </div>
          <div className=" mt-3">
            {loading ? (
              <div className="text-center">
                <OnClickLoader />
              </div>
            ) : (
              <button
                type="submit"
                className="btn btn-log w-100 btn-thm"
                disabled={!values.email || errors.email}
              >
                Reset&nbsp;Password
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="heading text-center">
          <h3>Reset password link is sent to your email</h3>
        </div>
      )}
    </div>
  );
}

export default Form;
