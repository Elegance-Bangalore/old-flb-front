import React, { useEffect, useState } from "react";
import { FormControl, TextField } from "@mui/material";
import ShowError from "@/CustomCommon/Others/ShowError";
import ImageLableRectangle from "../AllRoles/ImageLableRectangle";

function CompanyDetailForm({ formik }) {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setValues,
  } = formik;

  const uploadImage = (e) => {
    const data = new FileReader();
    data.addEventListener("load", () => {
      setFieldValue(e.target.name, data.result);
    });
    data.readAsDataURL(e.target.files[0]);
  };

  function handleNumbersOnly(e) {
    const { name, value } = e.target;
    if (/^\d*\.?\d*$/.test(e.target.value)) {
      setFieldValue(name, value);
    }
  }

  return (
    <>
      <div className="col-12 my-3">
        <h5 className="text-medium-grey text-uppercase my-3">
          Company details
        </h5>
      </div>
      <div className="col-md-8 mb-4">
        <FormControl className="mb-4">
          <TextField
            id="company-name"
            label={<span>Company Name <span style={{color: 'red'}}>*</span></span>}
            variant="outlined"
            name="companyName"
            value={values?.companyName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ShowError
            touched={touched.companyName}
            message={errors.companyName}
          />
        </FormControl>
        <FormControl className="mb-4">
          <TextField
            label="Year of Establish"
            variant="outlined"
            name="establishedYear"
            value={values?.establishedYear}
            onChange={handleNumbersOnly}
            onBlur={handleBlur}
          />
          <ShowError
            touched={touched.establishedYear}
            message={errors.establishedYear}
          />
        </FormControl>
        <FormControl className="mb-4">
          <TextField
            id="website"
            label="Website"
            variant="outlined"
            name="website"
            value={values?.website}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ShowError touched={touched.website} message={errors.website} />
        </FormControl>
      </div>
      <div className="col-md-4">
        <ImageLableRectangle
          inputName={"logo"}
          setFieldValue={setFieldValue}
          values={values}
          touched={touched}
          errors={errors}
        />
      </div>

      <div className="col-6">
        <FormControl className="mb-4">
          <TextField
            id="totalProjects"
            label="Total Projects"
            variant="outlined"
            name="totalProjects"
            value={values?.totalProjects}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ShowError touched={touched.totalProjects} message={errors.totalProjects} />
        </FormControl>
      </div>

      {/* <div className="col-6">
        <FormControl className="mb-4">
          <TextField
            id="ongoingProjects"
            label="Active Projects"
            variant="outlined"
            name="ongoingProjects"
            disabled
            value={values?.ongoingProjects}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ShowError touched={touched.ongoingProjects} message={errors.ongoingProjects} />
        </FormControl>
      </div> */}

      <div className="col-md-12">
        <FormControl className="mb-4">
          <TextField
            id="address"
            label={<span>Address <span style={{color: 'red'}}>*</span></span>}
            variant="outlined"
            name="address"
            value={values?.address}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ShowError touched={touched.address} message={errors.address} />
        </FormControl>
      </div>
      <div className="col-md-12">
        <FormControl className="mb-4">
          <TextField
            label="About"
            variant="outlined"
            name="about"
            value={values?.about}
            onChange={handleChange}
            onBlur={handleBlur}
            multiline
            rows={3}
          />
          <ShowError touched={touched.about} message={errors.about} />
        </FormControl>
      </div>
    </>
  );
}

export default CompanyDetailForm;
