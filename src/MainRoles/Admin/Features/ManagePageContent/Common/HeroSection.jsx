import React, { useState } from "react";
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
} from "@mui/material";
import { Edit2, Trash } from "iconsax-react";
import ShowError from "@/CustomCommon/Others/ShowError";

function HeroSection({ Formik }) {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setValues,
  } = Formik;

  const uploadImage = (e) => {
    const data = new FileReader();
    data.addEventListener("load", () => {
      setFieldValue(e.target.name, data.result);
    });
    data.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="row">
      <div className="col-md-6 mb-4">
        <FormControl className="mb-4">
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ShowError touched={touched.title} message={errors.title} />
        </FormControl>
      </div>
      <div className="col-md-6 mb-4">
        <FormControl className="">
          <TextField
            id="outlined-basic"
            label="Sub Title"
            variant="outlined"
            name="subtitle"
            value={values.subtitle}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ShowError touched={touched.subtitle} message={errors.subtitle} />
        </FormControl>
      </div>
      <div className="col-md-6 mb-4">
        <FormControl className="">
          <div className="file-upload">
            <img
              className="img-fluid uploaded-image"
              alt="Hero Image"
              src={values.heroImage}
            />
            <div className="upload-icon">
              <label
                htmlFor="file-upload"
                className="btn btn-profile-edit d-inline-block"
              >
                <Edit2 />
              </label>

              <span>
                <button
                  onClick={() => setFieldValue("heroImage", "")}
                  type="button"
                  className="btn btn-profile-delete d-inline-block"
                >
                  <Trash />
                </button>
              </span>
            </div>
          </div>
          <ShowError touched={touched.heroImage} message={errors.heroImage} />

          <TextField
            type="file"
            id="file-upload"
            variant="outlined"
            hidden
            onChange={(e) => uploadImage(e)}
            name="heroImage"
            accept="image/*"
          />
        </FormControl>
      </div>
    </div>
  );
}

export default HeroSection;
