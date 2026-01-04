import React, { useState } from "react";
import { FormControl, TextField } from "@mui/material";
import Header from "@/components/common/header/dashboard/Header";
import { useFormik } from "formik";
import ShowError from "@/CustomCommon/Others/ShowError";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { useNavigate } from "react-router-dom";
import { addBlogCategoryApi } from "@/ApiRoutes/AdminApi";

function AddBlogCategory() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    category: "",
    description: "",
  };

  async function addBlogCategory(value) {
    setLoader(true);
    try {
      const response = await addBlogCategoryApi(value);
      navigate(-1);
      toast.success("Blog Category Added Successfully");
    } catch (error) {
      toast.error("Something went wrong in profile update");
    } finally {
      setLoader(false);
    }
  }

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: (values) => {
        addBlogCategory(values);
      },
    });
  return (
    <>
      <div className="container-fluid ovh">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb_content">
              <h2 className="breadcrumb_title mt-5 mb-3 pb-3">Blog Category</h2>
            </div>
            <div className="col-lg-8 ">
              <FormControl className="mb-4">
                <TextField
                  id="outlined-basic"
                  label="Category"
                  variant="outlined"
                  name="category"
                  value={values.category}
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
                  label="Description"
                  variant="outlined"
                  name="description"
                  multiline
                  rows={4}
                  value={values.description}
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

export default AddBlogCategory;
