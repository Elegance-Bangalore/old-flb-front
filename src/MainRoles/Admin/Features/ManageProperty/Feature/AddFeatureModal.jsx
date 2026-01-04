import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {
  Autocomplete,
  DialogActions,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { toast } from "react-toastify";
import {
  createFeatureApi,
  propertyDropdownApi,
  updateFeatureApi,
} from "@/ApiRoutes/AdminApi";
import { useFormik } from "formik";
import SingleImageUpload from "@/CustomCommon/PostProperty/SingleImageUpload";
import { LoadingButton } from "@mui/lab";
import ShowError from "@/CustomCommon/Others/ShowError";
import { featuredPropertySchema } from "@/MainRoles/Admin/AdminSchema/adminSchema";
import { capitalizeArray } from "@/CustomServices/Constant";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { citiesData } from "@/CustomServices/Data/stateCities";

const AddFeatureModal = ({ open, handleClose, getFeature, editData }) => {
  const [loader, setLoader] = useState(false);
  const cityNames = citiesData.map(city => city.name);
  const capitalizedCities = capitalizeArray(cityNames);

  const initialValues = {
    title: "",
    desktopImage: "",
    mobileImage: "",
    propertyId: null,
    url: "",
    city: [],
    caouselExpires: "",
  };

  const Formik = useFormik({
    initialValues: initialValues,
    validationSchema: featuredPropertySchema,
    onSubmit: (values) => {
      if (editData) {
        updateFeature(values);
      } else {
        addFeature(values);
      }
    },
  });

  const {
    values,
    resetForm,
    setValues,
    handleChange,
    handleBlur,
    errors,
    handleSubmit,
    setFieldValue,
    touched,
  } = Formik;

  async function addFeature(value) {
    setLoader(true);
    try {
      const res = await createFeatureApi(value);
      toast.success("Feature Added Successfully");
      handleClose();
      getFeature();
      resetForm();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoader(false);
    }
  }

  async function updateFeature(value) {
    try {
      setLoader(true);
      const response = await updateFeatureApi(value);
      toast.success("Feature Updated Successfully");
      handleClose();
      getFeature();
      resetForm();
    } catch (error) {
      console.log("Error", error);
      toastMessage(error?.response?.status, error?.response?.data?.error);
    } finally {
      setLoader(false);
    }
  }

  const handleDateChange = (newDate) => {
    const formattedDate = newDate ? dayjs(newDate).format("YYYY-MM-DD") : "";
    setFieldValue("caouselExpires", formattedDate);
  };

  const handleCitiesChange = (event, value) => {
    setFieldValue("city", value);
  };

  useEffect(() => {
    if (editData) {
      setValues(editData);
    } else {
      resetForm();
    }
  }, [editData, open]);

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        scroll="paper"
        disableScrollLock
      >
        <DialogTitle id="alert-dialog-title">Property Feature</DialogTitle>
        <DialogContent className="p-3 mb-2">
          <form className="row">
            <div className="col-12 mb-4">
              <TextField
                id="title"
                label="Title"
                variant="outlined"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ShowError touched={touched.title} message={errors.title} />
            </div>
            <div className="col-12 mb-4">
              <TextField
                id="url"
                label="Url"
                variant="outlined"
                name="url"
                value={values.url}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ShowError touched={touched.url} message={errors.url} />
            </div>

            <div className="col-12 mb-3">
              <FormControl>
                <Autocomplete
                  multiple
                  options={capitalizedCities}
                  value={values.city}
                  onChange={handleCitiesChange}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Cities" />
                  )}
                  getOptionLabel={(option) => option} // Display city names
                  renderOption={(props, option) => (
                    <li {...props} key={option}>
                      {option}
                    </li>
                  )}
                />
              </FormControl>
            </div>

            <div className="col-12 mb-3">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Select Expiry Date"
                    value={
                      values.caouselExpires
                        ? dayjs(values.caouselExpires)
                        : null
                    }
                    onChange={handleDateChange}
                    format="DD-MM-YYYY"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>

            <div className="col-6 mb-2">
              <Typography>Desktop Banner</Typography>
              <SingleImageUpload
                name="desktopImage"
                formik={Formik}
                show={false}
                height="12rem"
              />
              <ShowError
                touched={touched.desktopImage}
                message={errors.desktopImage}
              />
            </div>
            <div className="col-6 mb-2">
              <Typography>Mobile Banner</Typography>
              <SingleImageUpload
                name="mobileImage"
                formik={Formik}
                show={false}
                height="12rem"
              />
              <ShowError
                touched={touched.mobileImage}
                message={errors.mobileImage}
              />
            </div>
          </form>
        </DialogContent>

        <DialogActions>
          <div className="col-12">
            <div className="text-end mt-2">
              <Button
                variant="outlined"
                color="warning"
                className="me-3"
                onClick={handleClose}
              >
                Close
              </Button>
              <LoadingButton
                variant="contained"
                type="submit"
                color="success"
                className="me-3"
                loading={loader}
                onClick={handleSubmit}
              >
                {editData ? "Update" : "Save"}
              </LoadingButton>
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddFeatureModal;
