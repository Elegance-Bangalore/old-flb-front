import React, { useEffect, useState } from "react";
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
} from "@mui/material";
import Header from "@/components/common/header/dashboard/Header";
import { useFormik } from "formik";
import ShowError from "@/CustomCommon/Others/ShowError";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { useNavigate } from "react-router-dom";
import { postFaqApi, updateFaqApi } from "@/ApiRoutes/AdminApi";
import AdminMobileMenu from "@/MainRoles/Admin/AdminLayouts/AdminMobileMenu";
import AdminSidebarMenu from "@/MainRoles/Admin/AdminLayouts/AdminSidebarMenu";
import { faqSchema } from "../../AdminSchema/adminSchema";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import TinyEditor from "@/CustomCommon/Others/TinyEditor";
import UploadFileButton from "@/CustomCommon/MaterialUi/UploadFileButton";

function FaqAddPage(props) {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  // const location = useLocation();
  const { state } = useLocation();

  const initialValues = {
    category: "",
    question: "",
    answers: "",
  };

  async function postFaq(value) {
    setLoader(true);
    try {
      await postFaqApi(value);
      navigate(-1);
      toast.success("Faq Added Successfully");
    } catch (error) {
      toast.error("Something went wrong! Please try again");
    } finally {
      setLoader(false);
    }
  }

  async function updateFaq(value) {
    setLoader(true);
    try {
      delete value.id;
      await updateFaqApi(value);
      navigate(-1);
      toast.success("Faq Updated Successfully");
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
    setValues,
    handleSubmit,
    setFieldValue
  } = useFormik({
    initialValues,
    validationSchema: faqSchema,
    onSubmit: (values) => {
      if (state) {
        updateFaq(values);
        return;
      }
      postFaq(values);
    },
  });

  useEffect(() => {
    if (state) {
      setValues(state);
    }
  }, [state]);

  return (
    <>
      <div className="container-fluid ovh">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb_content">
              <h2 className="breadcrumb_title mt-5 mb-3 pb-3">
                {state ? "Edit Faq" : "Add Faq"}
              </h2>
            </div>
            <div className="col-lg-12 mb-4">
              <FormControl fullWidth variant="outlined">
                <InputLabel id="demo-simple-select-label">
                  Select Categoty
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  label="Select Categoty"
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  MenuProps={{
                    disableScrollLock: true,
                  }}
                >
                  <MenuItem value={"general"}>General</MenuItem>
                  <MenuItem value={"account"}>Account</MenuItem>
                  <MenuItem value={"buyer"}>Buyer</MenuItem>
                  <MenuItem value={"seller"}>Seller</MenuItem>
                </Select>
                <ShowError
                  touched={touched.category}
                  message={errors.category}
                />
              </FormControl>
            </div>

            <div className="col-md-12 ">
              <FormControl className="mb-4">
                <TextField
                  id="outlined-basic"
                  label="Enter Question"
                  variant="outlined"
                  name="question"
                  multiline
                  rows={3}
                  value={values.question}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ShowError
                  touched={touched.question}
                  message={errors.question}
                />
              </FormControl>
            </div>

            <div className="col-md-12 ">
              {/* <FormControl className="mb-4">
                <TextField
                  id="outlined-basic"
                  label="Enter Answer"
                  variant="outlined"
                  name="answers"
                  multiline
                  rows={3}
                  value={values.answers}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ShowError touched={touched.answers} message={errors.answers} />
              </FormControl> */}

              <div className="col-md-12 mb-4">
                <TinyEditor
                  content={values.answers}
                  setFieldValue={setFieldValue}
                  name="answers"
                  height={200}
                />
                <ShowError touched={touched.answers} message={errors.answers} />
              </div>
              <div className="col-12 text-end">
                <UploadFileButton />
              </div>
            </div>
            <div className="col-12 mt-1 mb-2">
              {loader ? (
                <OnClickLoader />
              ) : (
                <button
                  type="button"
                  className="btn btn-dark rounded-3 fw-bold px-5 text-uppercase"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FaqAddPage;
