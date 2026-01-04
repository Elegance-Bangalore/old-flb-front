import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Switch,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
} from "@mui/material";
import {
  propertyCategoryListApi,
  sellerDropdownApi,
} from "@/ApiRoutes/AdminApi";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";
import ShowError from "../Others/ShowError";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "react-toastify";
import axios from "axios";
import { Trash } from "iconsax-react";
import { getSinglePropertyApi } from "@/ApiRoutes/SellerApis";



const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 3,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 100,
});

function AdminInputs({ formik }) {
  const [sellerList, setSellerList] = useState([]);
  const [category, setCategory] = useState([]);
  const [subscription, setSubscription] = useState(false);
  const param = useParams();
  const propertyCode = param?.propertyCode;
  const [postedBy, setPostedBy] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiurl = import.meta.env.VITE_BASE_API_URL;
  const url = `${apiurl}/admin/blog/upload/image`;

  async function getSellerList() {
    try {
      const response = await sellerDropdownApi();
      setSellerList(response?.data?.response);
    } catch (error) {
      throw error;
    }
  }
  
  async function fetchSubscription() {
    try {
      const response = await getSinglePropertyApi(propertyCode);
      console.log("getSinglePropertyApi response ->1", response?.data);
      const subscription_status = response?.data?.data?.postedBy?.subscription;
      console.log("subscription_status response ->", subscription_status);
      setSubscription(!!subscription_status);
    } catch (error) {
      throw error;
    }
  }

  async function getCategoryList() {
    try {
      const response = await propertyCategoryListApi();
      setCategory(response?.data?.response);
    } catch (error) {
      throw error;
    }
  }

  const uploadBroucher = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        const fileUrl = response.data.data;
        setFieldValue("broucher", fileUrl);
        toast.success("File uploaded successfully");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file");
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    getSellerList();
    getCategoryList();
  }, []);

  useEffect(() => {
    if (propertyCode) {
      fetchSubscription();
    }
  }, [propertyCode]);

  useEffect(() => {
    if (!subscription) {
      setFieldValue('sponsored', false);
    }
  }, [subscription, setFieldValue]);

  useEffect(() => {
    if (postedBy) {
      return;
    }
    const findId = sellerList.find(
      (seller) => seller?._id === values?.postedBy?._id
    );
    if (findId) setPostedBy(findId);
  }, [values]);

  return (
    <>
      <div className="row mb-5">
        <div className="col-md-12">
          <div className="bg-white-shadow select-property-wrapper p-4 rounded-3 border">
            <div className="row mb-3">
              <div className="col-12">
                <h4 className="">Admin Inputs</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 mb-4">
                <Autocomplete
                  id="autocomplete"
                  options={sellerList}
                  value={postedBy}
                  key={sellerList.map((seller) => seller._id).join("-")}
                  getOptionLabel={(option) => option.fullName}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Seller *" />
                  )}
                  renderOption={(props, option) => (
                    <li {...props} key={option._id}>
                      {option.fullName}
                    </li>
                  )}
                  onChange={(event, value) => {
                    setPostedBy(value);

                    setFieldValue("sellerId", value ? value._id : "");
                  }}
                  onBlur={handleBlur}
                />
                <ShowError
                  touched={touched.sellerId}
                  message={errors.sellerId}
                />
              </div>
              <div className="col-md-4 mb-4">
                <FormControlLabel
                  control={
                    <Switch
                      checked={values.manageFarmland || false}
                      onChange={e => setFieldValue('manageFarmland', e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Manage Farmland "
                />
              </div>
             
                {subscription && (
                <div className="col-md-4 mb-4">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={values.sponsored || false}
                        onChange={e => setFieldValue('sponsored', e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Sponsored"
                  />
                </div>
                )}
              
              <div className="col-md-4 mb-4">
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="demo-simple-select-label">
                    Availability
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label="Availability"
                    name="availability"
                    MenuProps={{
                      disableScrollLock: true,
                    }}
                    value={values.availability}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value={"active"}>Active</MenuItem>
                    <MenuItem value={"inActive"}>InActive</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-4 mb-4">
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label="Status"
                    name="propertyStatus"
                    MenuProps={{
                      disableScrollLock: true,
                    }}
                    value={values.propertyStatus}
                    onChange={handleChange}
                  >
                    <MenuItem value={"available"}>Available</MenuItem>
                    <MenuItem value={"sold-out"}>Sold</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="col-md-4 mb-4">
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="demo-simple-select-label">
                    Approval
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label="Approval"
                    name="propertyApproval"
                    MenuProps={{
                      disableScrollLock: true,
                    }}
                    value={values.propertyApproval}
                    onChange={handleChange}
                  >
                    <MenuItem value={"IN_Review"}>In Review</MenuItem>
                    <MenuItem value={"Resolved"}>Approved</MenuItem>
                    <MenuItem value={"Reject"}>Reject</MenuItem>
                  </Select>
                </FormControl>
              </div>

              {category?.map((item) => (
                <div className="col-md-4" key={item._id}>
                  <div
                    className={` ${
                      values.categoryId === item._id
                        ? "bg-border-light-green"
                        : "bg-border-light-grey"
                    }  swtich-container mb-4`}
                  >
                    <FormControlLabel
                      control={
                        <Switch checked={values?.categoryId === item._id} />
                      }
                      label={item.name}
                      name="categoryId"
                      labelPlacement="start"
                      onChange={(event) =>
                        setFieldValue(
                          "categoryId",
                          event.target.checked ? item._id : ""
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="row mb-5">
        <div className="col-md-12">
          <div className="bg-white-shadow select-property-wrapper p-4 rounded-3 border">
            <div className="row">
              <div className="col-md-4">
                <div
                  className={`${
                    values.isPropertyPromoted
                      ? "bg-border-light-green"
                      : "bg-border-light-grey"
                  }  swtich-container mb-4`}
                >
                  <FormControlLabel
                    control={<Switch checked={values.isPropertyPromoted} />}
                    label="Promoted"
                    name="isPropertyPromoted"
                    labelPlacement="start"
                    onChange={() =>
                      setFieldValue(
                        "isPropertyPromoted",
                        !values.isPropertyPromoted
                      )
                    }
                  />
                </div>
              </div>

              <SingleImageUpload formik={formik} name={"propertyAds"} />
            </div>
          </div>
        </div>
      </div> */}

      <div className="row mb-5">
        <div className="col-md-12">
          <div className="bg-white-shadow select-property-wrapper p-4 rounded-3 border">
            <div className="row gap-3">
              <div className="col-md-4">
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={
                    loading ? (
                      <CircularProgress size={24} />
                    ) : (
                      <CloudUploadIcon />
                    )
                  }
                  disabled={loading}
                >
                  {loading ? "Uploading..." : "Upload Brochure"}
                  <VisuallyHiddenInput
                    type="file"
                    accept=".pdf"
                    onChange={uploadBroucher}
                  />
                </Button>
              </div>

              <div className="col-md-4">
                {values.broucher && (
                  <div className="d-flex gap-3">
                    <a
                      className="fw-bold"
                      href={values.broucher.Location}
                      target="_blank"
                    >
                      {values.broucher.key}
                    </a>
                    <Trash
                      size="25"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setFieldValue("broucher", "");
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminInputs;
