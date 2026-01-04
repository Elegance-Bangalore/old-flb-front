import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useFormik } from "formik";
import ShowError from "@/CustomCommon/Others/ShowError";
import { advertiseFormSchema } from "../AdminSchema/adminSchema";
import { advertiseFormApi } from "@/ApiRoutes/BuyersApi";
import { toastMessage } from "@/CustomServices/ToastMessage";

const names = [
  "Category Page Banner",
  "Master Head Banner",
  "Page Detail Banner",
  "Sponsor the Category/Page",
];

function AdvertiseFormModal({ show, setShow }) {
  const [loader, setLoader] = useState(false);

  const initialValues = {
    companyName: "",
    cityOfHeadQuarter: "",
    fullName: "",
    designation: "",
    businessEmailAddress: "",
    mobileNumber: "",
    spaceRequirement: [],
    description: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: advertiseFormSchema,
    onSubmit: (values) => {
      console.log(values);
      postAdvertise(values);
    },
  });

  const { values, handleChange, handleBlur, setFieldValue, touched, errors } =
    formik;

  async function postAdvertise() {
    setLoader(true);
    try {
      const response = await advertiseFormApi(values);
      toastMessage(
        200,
        "Form submitted successfully! Farmland Team will contact you soon."
      );
    } catch (error) {
      toastMessage("400", error.response.data.message);
      console.log(error);
    } finally {
      setShow(false);
      setLoader(false);
    }
  }

  const handleDropdownChange = (event) => {
    const {
      target: { value },
    } = event;

    setFieldValue(
      "spaceRequirement",
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <Dialog
        open={show}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        scroll="paper"
        disableScrollLock
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">Fill Details</DialogTitle>
        <DialogContent>
          <div className="row my-3">
            <div className="col-md-6 mb-4">
              <TextField
                label="Company/Organization Name"
                variant="outlined"
                name="companyName"
                value={values.companyName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ShowError
                touched={touched.companyName}
                message={errors.companyName}
              />
            </div>
            <div className="col-md-6 mb-4">
              <TextField
                label="City of Headquarter"
                variant="outlined"
                name="cityOfHeadQuarter"
                value={values.cityOfHeadQuarter}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ShowError
                touched={touched.cityOfHeadQuarter}
                message={errors.cityOfHeadQuarter}
              />
            </div>
            <div className="col-md-6 mb-4">
              <TextField
                label="Full Name"
                variant="outlined"
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ShowError touched={touched.fullName} message={errors.fullName} />
            </div>
            <div className="col-md-6 mb-4">
              <TextField
                label="Designation"
                variant="outlined"
                name="designation"
                value={values.designation}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ShowError
                touched={touched.designation}
                message={errors.designation}
              />
            </div>
            <div className="col-md-6 mb-4">
              <TextField
                label="Business Email Address"
                variant="outlined"
                name="businessEmailAddress"
                value={values.businessEmailAddress}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ShowError
                touched={touched.businessEmailAddress}
                message={errors.businessEmailAddress}
              />
            </div>
            <div className="col-md-6 mb-4">
              <TextField
                label="Mobile Number"
                variant="outlined"
                name="mobileNumber"
                value={values.mobileNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ShowError
                touched={touched.mobileNumber}
                message={errors.mobileNumber}
              />
            </div>
            <div className="col-md-12 mb-4">
              <FormControl className="w-100">
                <InputLabel id="demo-multiple-checkbox-label">
                  Area Requirement
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={values.spaceRequirement}
                  onChange={handleDropdownChange}
                  input={<OutlinedInput label="Area Requirement" />}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox
                        checked={values.spaceRequirement.includes(name)}
                      />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <ShowError
                touched={touched.spaceRequirement}
                message={errors.spaceRequirement}
              />
            </div>
            <div className="col-md-12">
              <TextField
                label="Describe Your Product and Requirement in Brief"
                multiline
                rows={3}
                variant="outlined"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ShowError
                touched={touched.description}
                message={errors.description}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end gap-3 mt-4">
            <button className="btn btn-danger" onClick={() => setShow(false)} >
              Cancel
            </button>
            <button className="btn btn-success" onClick={formik.handleSubmit} disabled={loader}>
              Submit
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdvertiseFormModal;
