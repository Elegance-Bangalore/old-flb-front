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
  Tooltip,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { toast } from "react-toastify";
import {
  addPromotionalBannerApi,
  editPromotedPropertyApi,
  editPromotionalBannerApi,
  propertyDropdownApi,
  togglePromotedPropertyApi,
} from "@/ApiRoutes/AdminApi";
import { useFormik } from "formik";
import SingleImageUpload from "@/CustomCommon/PostProperty/SingleImageUpload";
import {
  agricultureLand,
  capitalizeArray,
  Estates,
  farmhouse,
  farmland,
} from "@/CustomServices/Constant";
import CityAutocomplete from "@/CustomCommon/MaterialUi/CityAutocomplete";
import { useSelector } from "react-redux";
import { selectFilter } from "@/features/properties/propertiesSlice";
import ShowError from "@/CustomCommon/Others/ShowError";
import { promotionBannerSchema } from "../../AdminSchema/adminSchema";
import { citiesData } from "@/CustomServices/Data/stateCities";

const AddPromotionBanner = ({
  open,
  handleClose,
  getPromotionBannerList,
  editData,
}) => {
  const [propertyList, setPropertyList] = useState([]);
  const [loader, setLoader] = useState(false);
  const { cities } = useSelector(selectFilter);
  const uniqueCities = [...new Set(cities)];
  const cityNames = citiesData.map((city) => city.name);
  const capitalizedCities = capitalizeArray(cityNames);
  const [properties, setProperties] = useState([]);

  async function getPropertyDropwonList() {
    try {
      const response = await propertyDropdownApi();
      setPropertyList(response?.data?.properties || []);
    } catch (error) {
      throw error;
    }
  }

  const initialValues = {
    city: [],
    type: "top",
    propertyType: "",
    banner: "",
    bannerType: "List Page",
    status: true,
    url: "",
    propertyId: null,
  };

  const Formik = useFormik({
    initialValues: initialValues,
    validationSchema: promotionBannerSchema,
    onSubmit: (values) => {
      editData ? updatePromotionBanner(values) : addPromotionBanner(values);
    },
  });

  const {
    resetForm,
    handleBlur,
    handleSubmit,
    setFieldValue,
    handleChange,
    values,
    touched,
    errors,
    setValues,
  } = Formik;

  async function addPromotionBanner(value) {
    try {
      setLoader(true);
      await addPromotionalBannerApi(value);
      handleClose();
      resetForm();
      toast.success("Property Added to Promoted");
      getPromotionBannerList();
    } catch (error) {
      const { status, data } = error?.response;
      toastMessage(status, data?.message);
    } finally {
      setLoader(false);
    }
  }

  async function updatePromotionBanner(value) {
    try {
      setLoader(true);
      await editPromotionalBannerApi(value);
      handleClose();
      resetForm();
      toast.success("Updated Successfully");
      getPromotionBannerList();
    } catch (error) {
      const { status, data } = error?.response;
      toastMessage(status, data?.message);
    } finally {
      setLoader(false);
    }
  }

  const handleCitiesChange = (event, value) => {
    setFieldValue("city", value);
  };

  useEffect(() => {
    getPropertyDropwonList();
  }, []);

  useEffect(() => {
    if (editData) {
      setValues({ ...editData, propertyId: editData?.propertyId?._id });
    } else {
      resetForm();
    }
  }, [open]);

  useEffect(() => {
    handlePropertyDropdown();
  }, []);

  const handlePropertyDropdown = async () => {
    try {
      const response = await propertyDropdownApi();
      setProperties(response?.data?.properties);
    } catch (error) {
      console.log("Error", error);
      toastMessage(error?.response?.status, error?.response?.data?.error);
    }
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        scroll="paper"
        disableScrollLock
      >
        <DialogTitle id="alert-dialog-title mb-2">Promotion Banner</DialogTitle>
        <DialogContent className="p-3 mb-3">
          <form className="row" onSubmit={handleSubmit}>
            <div className="col-12 mb-3">
              <FormControl fullWidth variant="outlined">
                <InputLabel id="demo-simple-select-label">
                  Banner Type
                </InputLabel>
                <Select
                  labelId=""
                  label="Banner Type"
                  name="bannerType"
                  value={values.bannerType}
                  onChange={handleChange}
                  MenuProps={{
                    disableScrollLock: true,
                  }}
                >
                  <MenuItem value={"List Page"}>List Page</MenuItem>
                  <MenuItem value={"Detail Page - Property"}>
                    Detail Page - Property
                  </MenuItem>
                  <MenuItem value={"Detail Page - Banner Only"}>
                    Detail Page - Banner Only
                  </MenuItem>
                </Select>
              </FormControl>
              <ShowError touched={touched.bannerType} message={errors.bannerType} />
            </div>

            <div
              className="col-12 mb-3"
              hidden={values.bannerType !== "List Page"}
            >
              <FormControl fullWidth variant="outlined">
                <InputLabel id="demo-simple-select-label">
                  Property Type
                </InputLabel>
                <Select
                  labelId=""
                  label="Property Type"
                  name="propertyType"
                  value={values.propertyType}
                  onChange={handleChange}
                  MenuProps={{
                    disableScrollLock: true,
                  }}
                >
                  <MenuItem value={farmhouse}>Farmhouse</MenuItem>
                  <MenuItem value={farmland}>Farmland</MenuItem>
                  <MenuItem value={Estates}>Estates</MenuItem>
                  <MenuItem value={agricultureLand}>Agriculture Land</MenuItem>
                </Select>
              </FormControl>
              <ShowError touched={touched.propertyType} message={errors.propertyType} />
            </div>

            <div
              className="col-12 mb-4"
              hidden={values.bannerType !== "Detail Page - Property"}
            >
              <FormControl variant="outlined">
                <InputLabel id="propertyId">Property</InputLabel>
                <Select
                  label="Property"
                  name="propertyId"
                  value={values.propertyId}
                  onChange={handleChange}
                  MenuProps={{
                    disableScrollLock: true,
                  }}
                >
                  {properties?.map((property) => (
                    <MenuItem value={property._id} key={property._id}>
                      {property.propertyTitle}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <ShowError
                touched={touched.propertyId}
                message={errors.propertyId}
              />
            </div>

            <div
              className="col-12 mb-3"
            >
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
              <ShowError touched={touched.city} message={errors.city} />
            </div>

            <div className="col-12 mb-4">
              <TextField
                id="url"
                label="Url"
                variant="outlined"
                hidden={values.bannerType === "Detail Page - Property"}
                name="url"
                value={values.url}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ShowError touched={touched.url} message={errors.url} />
            </div>

            <div className="col-12">
              <Typography>Banner</Typography>
              <SingleImageUpload
                name="banner"
                formik={Formik}
                show={false}
                height="12rem"
                details={`Formats: jpg, jpeg, png | Dimension - ${
                  values.bannerType === "List Page"
                    ? "1136px * 142 px"
                    : "375px * 267 px"
                }`}
              />
              <ShowError touched={touched.banner} message={errors.banner} />
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

                <span>
                  <LoadingButton
                    variant="contained"
                    type="submit"
                    color="success"
                    className="me-3"
                    loading={loader}
                  >
                    {editData ? "Update" : "Add"}
                  </LoadingButton>
                </span>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddPromotionBanner;
