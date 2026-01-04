import React, { useState } from "react";
import { FormControl,TextField,} from "@mui/material";
import AdminSidebarMenu from "../../AdminLayouts/AdminSidebarMenu";
import MobileMenu from "@/components/common/header/MobileMenu";
import { useFormik } from "formik";
import ShowError from "@/CustomCommon/Others/ShowError";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { useLocation, useNavigate } from "react-router-dom";
import { editBlogCategoryApi } from "@/ApiRoutes/AdminApi";
import { toast } from "react-toastify";
import Header from "@/components/common/header/dashboard/Header";

function EditBlogCategory() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const initialValues = {
    category: state.category,
    description: state.description,
  };

  async function editBlogCategory(value) {
    setLoader(true);
    try {
      await editBlogCategoryApi(state._id, value);
      navigate(-1);
      toast.success("Blog Category Updated Successfully");
    } catch (error) {
      toast.error("Something went wrong in Category update");
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
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues,
    // validationSchema: buyerProfileSchema,
    onSubmit: (values) => {
      editBlogCategory(values);
    },
  });
  return (
    <>
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb_content">
                <h2 className="breadcrumb_title pb-3">Update Blog Category</h2>
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

export default EditBlogCategory;
