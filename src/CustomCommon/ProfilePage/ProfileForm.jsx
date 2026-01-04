import React, { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { MdVerified } from "react-icons/md";
import {
  FormControl,
  TextField,
  InputAdornment,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, userProfileAsync } from "@/Redux/Auth/authSlice";
import { toast } from "react-toastify";
import ShowError from "@/CustomCommon/Others/ShowError";
import Alert from "@mui/material/Alert";
import { resendEmail } from "@/ApiRoutes/SellerApis";
import ChangeEmailModal from "@/components/Modals/ChangeEmailModal";

function ProfileForm({ formik }) {
  const [checkedValues, setCheckedValues] = useState([]);
  const user = useSelector(selectUser);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
  } = formik;

  function resendEmailApi() {
    resendEmail({ email: user?.email })
      .then((res) => toast.success("Link sent to your Email"))
      .catch((err) => toast.error("Something Went Wrong! Try again"));
  }

  return (
    <>
      <h4 className="text-medium-grey text-uppercase mt-3 mb-4">
        Personal Details 
      </h4>
      <div className="col-md-6">
        <FormControl className="mb-4">
          <TextField
            id="full-name"
            label={<span>Full Name <span style={{color: 'red'}}>*</span></span>}
            variant="outlined"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ShowError touched={touched.fullName} message={errors.fullName} />
        </FormControl>
      </div>
      <div className="col-md-6">
        <div className="row">
          <div className="col-12">
            <FormControl className="mb-4">
              <Tooltip title="To Change Mobile No. Contact Us" arrow>
                <TextField
                  id="mobile"
                  label={<span>Mobile Number <span style={{color: 'red'}}>*</span></span>}
                  variant="outlined"
                  name="phone"
                  defaultValue={values.phone}
                  onBlur={handleBlur}
                  disabled
                  InputProps={{ readOnly: true, tabIndex: -1 }}
                />
              </Tooltip>
              <ShowError touched={touched.phone} message={errors.phone} />
            </FormControl>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        {user?.email ? (
          <div className="row">
            <div className="col-11">
              <FormControl className="mb-4">
                <TextField
                  id="email"
                  label={<span>Email <span style={{color: 'red'}}>*</span></span>}
                  variant="outlined"
                  name="email"
                  value={values.email}
                  onBlur={handleBlur}
                  disabled
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {user?.isEmailVerified ? (
                          <MdVerified className="text-success font-20" />
                        ) : (
                          <MdError className="text-danger font-20" />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />

                {!user?.isEmailVerified && (
                  <Alert className="" severity="warning">
                    <p className="m-0">
                      Verify your email
                      <button
                        className="border-0 bg-transparent text-primary fs-6 fw-bold"
                        onClick={resendEmailApi}
                        type="button"
                      >
                        Send Link
                      </button>
                    </p>
                  </Alert>
                )}
                <ShowError touched={touched.email} message={errors.email} />
              </FormControl>
            </div>
            <div className="col-1">
              <FaPencilAlt
                onClick={() => setShow(true)}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        ) : (
          <FormControl className="mb-4 ">
            <TextField
              id=""
              label="Email"
              variant="outlined"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <ShowError touched={touched.email} message={errors.email} />
          </FormControl>
        )}
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
          <ShowError
            touched={touched.alternateNumber}
            message={errors.alternateNumber}
          />
        </FormControl>
      </div>
      <div className="col-md-6">
        <FormControl className="mb-4">
          <TextField
            id="city"
            label={<span>City <span style={{color: 'red'}}>*</span></span>}
            variant="outlined"
            name="city"
            value={values.city}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <ShowError touched={touched.city} message={errors.city} />
        </FormControl>
      </div>

      <ChangeEmailModal show={show} handleClose={handleClose} />
    </>
  );
}

export default ProfileForm;
