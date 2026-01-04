import React, { useState } from "react";
import {
  FormControl,
  TextField,
} from "@mui/material";

import Header from "@/components/common/header/dashboard/Header";
import { useFormik } from "formik";
import ShowError from "@/CustomCommon/Others/ShowError";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { useNavigate } from "react-router-dom";
import { addFooterApi } from "@/ApiRoutes/AdminApi";
import AdminMobileMenu from "../../AdminLayouts/AdminMobileMenu";
import AdminSidebarMenu from "../../AdminLayouts/AdminSidebarMenu";

function AddFooter() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    selectPage: "",
    title: "",
    link: ""
  };

  async function addFooter(value) {
    setLoader(true);
    try {
      const response = await addFooterApi(value);
      navigate(-1)
      toast.success("Footer Added Successfully");
    } catch (error) {
      toast.error("Something went wrong in Footer Added");
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
    handleSubmit,
  } = useFormik({
    initialValues,
    // validationSchema: buyerProfileSchema,
    onSubmit: (values) => {
      addFooter(values);
    },
  });
  return (
    <>
      <div className="container-fluid ovh">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb_content">
              <h2 className="breadcrumb_title mt-5 mb-3 pb-3">Manage Footer</h2>
            </div>
            <div className="col-lg-8 ">
              <FormControl className="mb-4">
                <TextField
                  id="outlined-basic"
                  label="Enter Page Name"
                  variant="outlined"
                  name="selectPage"
                  value={values.selectPage}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ShowError
                  touched={touched.fullName}
                  message={errors.fullName}
                />
              </FormControl>
            </div>

            <div className="col-lg-8 ">
              <FormControl className="mb-4">
                <TextField
                  id="outlined-basic"
                  label="Page Title"
                  variant="outlined"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ShowError
                  touched={touched.fullName}
                  message={errors.fullName}
                />
              </FormControl>
            </div>
            <div className="col-lg-8 ">
              <FormControl className="mb-4">
                <TextField
                  id="outlined-basic"
                  label="Link"
                  variant="outlined"
                  name="link"
                  value={values.link}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ShowError
                  touched={touched.fullName}
                  message={errors.fullName}
                />
              </FormControl>
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

export default AddFooter;
