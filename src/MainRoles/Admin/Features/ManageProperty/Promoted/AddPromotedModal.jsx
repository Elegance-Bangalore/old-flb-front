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
  editPromotedPropertyApi,
  propertyDropdownApi,
  togglePromotedPropertyApi,
} from "@/ApiRoutes/AdminApi";
import { useFormik } from "formik";
import SingleImageUpload from "@/CustomCommon/PostProperty/SingleImageUpload";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { capitalizeArray } from "@/CustomServices/Constant";
import { citiesData } from "@/CustomServices/Data/stateCities";

const AddPromotedModal = ({
  open,
  handleClose,
  curatedDealsList,
  editData,
}) => {
  const [propertyList, setPropertyList] = useState([]);
  const [loader, setLoader] = useState(false);
  const cityNames = citiesData.map(city => city.name);
  const capitalizedCities = capitalizeArray(cityNames);


  async function getPropertyDropwonList() {
    try {
      const response = await propertyDropdownApi();
      setPropertyList(response?.data?.properties || []);
    } catch (error) {
      throw error;
    }
  }

  const initialValues = {
    propertyId: null,
    propertyAds: "",
    type: "add",
    promoteExpires: "",
    prmotionType: "",
    promotionCity: [],
  };

  const Formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      editData ? updateProperty(values) : addProperty(values);
    },
  });

  const {
    resetForm,
    handleBlur,
    handleSubmit,
    setFieldValue,
    handleChange,
    values,
    setValues,
  } = Formik;

  async function addProperty(value) {
    try {
      setLoader(true);
      await togglePromotedPropertyApi({ ...value, type: "add" });
      handleClose();
      resetForm();
      toast.success("Property Added to Promoted");
      curatedDealsList();
    } catch (error) {
      const { status, data } = error?.response;
      toastMessage(status, data?.message);
    } finally {
      setLoader(false);
    }
  }

  async function updateProperty(value) {
    try {
      setLoader(true);
      const payload = {
        propertyId: values.propertyId,
        propertyAds: values.propertyAds,
        promoteExpires: values.promoteExpires,
        prmotionType: values.prmotionType,
        type: "add",
        promotionCity: values.promotionCity,
      };
      await editPromotedPropertyApi(payload);
      handleClose();
      resetForm();
      toast.success("Updated Successfully");
      curatedDealsList();
    } catch (error) {
      const { status, data } = error?.response;
      toastMessage(status, data?.message);
    } finally {
      setLoader(false);
    }
  }

  const handlePropertyChange = (event, value) => {
    setFieldValue("propertyId", value ? value._id : "");
  };

  const handleDateChange = (newDate) => {
    const formattedDate = newDate ? dayjs(newDate).format("YYYY-MM-DD") : "";
    setFieldValue("promoteExpires", formattedDate);
  };

  const handleCitiesChange = (event, value) => {
    setFieldValue("promotionCity", value);
  };
  useEffect(() => {
    getPropertyDropwonList();
  }, []);

  useEffect(() => {
    if (editData) {
      setValues({ ...editData, propertyId: editData._id });
    } else {
      resetForm();
    }
  }, [open]);

  const isButtonDisabled =
    !values?.propertyId ||
    !values?.propertyAds ||
    !values?.promoteExpires ||
    !values?.prmotionType ||
    values?.promotionCity.length === 0;

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        scroll="paper"
        disableScrollLock
      >
        <DialogTitle id="alert-dialog-title mb-2">
          Add Property Promoted
        </DialogTitle>
        <DialogContent className="p-3 mb-3">
          <form className="row" onSubmit={handleSubmit}>
            <div className="col-12 mb-3">
              <FormControl fullWidth variant="outlined">
                <InputLabel id="demo-simple-select-label">
                  Promotion Type
                </InputLabel>
                <Select
                  labelId=""
                  label="Promotion Type"
                  name="prmotionType"
                  value={values.prmotionType}
                  onChange={handleChange}
                  MenuProps={{
                    disableScrollLock: true,
                  }}
                >
                  <MenuItem value={"Curated Deal"}>
                    Featured Property Homepage
                  </MenuItem>
                  <MenuItem value={"Add On"}>
                    Featured Property Listing Page
                  </MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="col-12 mb-3">
              <FormControl>
                <Autocomplete
                  options={propertyList}
                  key={propertyList.map((property) => property._id).join("-")}
                  getOptionLabel={(option) => option.propertyTitle}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Property"
                      disabled={editData}
                    />
                  )}
                  value={
                    propertyList.find(
                      (property) => property._id === values.propertyId
                    ) || null
                  }
                  renderOption={(props, option) => (
                    <li {...props} key={option._id}>
                      {option.propertyTitle}
                    </li>
                  )}
                  onChange={handlePropertyChange}
                  onBlur={handleBlur}
                />
              </FormControl>
            </div>

            <div className="col-12 mb-3">
              <FormControl>
                <Autocomplete
                  multiple
                  options={capitalizedCities}
                  value={values.promotionCity}
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
                      values.promoteExpires
                        ? dayjs(values.promoteExpires)
                        : null
                    }
                    onChange={handleDateChange}
                    format="DD-MM-YYYY"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>

            <div className="col-12 mb-2">
              <Typography>Banner</Typography>
              <SingleImageUpload
                name="propertyAds"
                formik={Formik}
                show={false}
                height="12rem"
              />
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
                <Tooltip
                  title={
                    isButtonDisabled
                      ? "Property, Banner, Promotion Type or Expiry Date is missing"
                      : ""
                  }
                >
                  <span>
                    <LoadingButton
                      variant="contained"
                      type="submit"
                      color="success"
                      className="me-3"
                      loading={loader}
                      disabled={isButtonDisabled}
                    >
                      {editData ? "Update" : "Add"}
                    </LoadingButton>
                  </span>
                </Tooltip>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddPromotedModal;
