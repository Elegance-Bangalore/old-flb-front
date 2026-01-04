import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { toast } from "react-toastify";
import { createFooterSeoApi, updateFooterSeoApi } from "@/ApiRoutes/AdminApi";
import { useFormik } from "formik";
import {
  agricultureLand,
  capitalizeArray,
  Estates,
  farmhouse,
  farmland,
} from "@/CustomServices/Constant";
import { useSelector } from "react-redux";
import { selectFilter } from "@/features/properties/propertiesSlice";
import { footerSeoSchema } from "@/MainRoles/Admin/AdminSchema/adminSchema";
import ShowError from "@/CustomCommon/Others/ShowError";
import CityAutocomplete from "@/CustomCommon/MaterialUi/CityAutocomplete";

const AddFooterSeoModal = ({ open, handleClose, getFooterSeo, editData }) => {
  const [loader, setLoader] = useState(false);
  const { cities } = useSelector(selectFilter);
  const capitalizedCities = capitalizeArray(cities);
  const [selectedCity, setSelectedCity] = useState(null);

  const initialValues = {
    title: "",
    propertyType: "",
    city: "",
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: footerSeoSchema,
    onSubmit: (values) => {
      if (editData) {
        updateFooterSeo(values);
      } else {
        addFooterSeo(values);
      }
    },
  });

  async function addFooterSeo(value) {
    try {
      const res = await createFooterSeoApi({ ...value, city: value.city.city });
      toast.success("Seo Added Successfully");
      handleClose();
      getFooterSeo();
      resetForm();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoader(false);
    }
  }

  async function updateFooterSeo(value) {
    try {
      setLoader(true);
      const response = await updateFooterSeoApi({
        ...value,
        city: value.city.city,
      });
      handleClose();
      getFooterSeo();
    } catch (error) {
      toastMessage(error?.response?.status, error?.response?.data?.error);
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    if (editData) {
      const city = capitalizedCities?.find((city) => city === editData.city);
      setValues({ ...editData, city: { city } || null });
      setSelectedCity({ city });
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
        fullWidth
        disableScrollLock
      >
        <DialogTitle id="alert-dialog-title">Add Footer Seo</DialogTitle>
        <DialogContent className="p-3 mb-2">
          <form className="row" onSubmit={handleSubmit}>
            <div className="col-12 mb-4">
              <TextField
                id="SeoTitle"
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
              <FormControl variant="outlined">
                <InputLabel id=" ">Property Type</InputLabel>
                <Select
                  labelId=""
                  label="Property Type"
                  value={values.propertyType}
                  name="propertyType"
                  onChange={handleChange}
                  MenuProps={{
                    disableScrollLock: true,
                  }}
                >
                  <MenuItem value={""}>All</MenuItem>
                  <MenuItem value={farmhouse}>Farmhouse</MenuItem>
                  <MenuItem value={farmland}>Farmland</MenuItem>
                  <MenuItem value={Estates}>Estates</MenuItem>
                  <MenuItem value={agricultureLand}>Agriculture Land</MenuItem>
                </Select>
              </FormControl>
              <ShowError
                touched={touched.propertyType}
                message={errors.propertyType}
              />
            </div>
            <div className="col-12 mb-4">
              <CityAutocomplete
                city={values.city}
                setValues={setValues}
                values={values}
              />
              <ShowError touched={touched.city} message={errors.city} />
            </div>
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
                <Button
                  variant="contained"
                  type="submit"
                  color="success"
                  className="me-3"
                >
                  Save
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddFooterSeoModal;
