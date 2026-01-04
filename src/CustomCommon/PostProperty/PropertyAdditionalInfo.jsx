import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Switch,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Autocomplete,
  Menu,
  InputAdornment,
} from "@mui/material";
import ShowError from "../Others/ShowError";
import {
  agricultureLand,
  farmhouse,
  formatNumberInCr,
} from "@/CustomServices/Constant";

function PropertyAdditionalInfo({ formik }) {
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
  const plotFacing = ["North", "East", "West", "South"];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const spanStyle = {
    textDecoration: "underline",
    display: "inline-flex",
    alignItems: "center",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "14px",
    color: "#00a76f",
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function changeFacingRoadWidth(value) {
    setFieldValue("facingWidthType", value);
    handleClose();
  }

  function handleNumbersOnly(e) {
    const { name, value } = e.target;
    if (/^\d*\.?\d*$/.test(e.target.value)) {
      setFieldValue(name, value);
    }
  }

  return (
    <>
      <div className="row mb-5">
        <div className="col-md-12">
          <div className="bg-white-shadow select-property-wrapper p-4 rounded-3 border">
            <div className="row">
              <div className="col-12">
                <h4 className="">Property Additional Details</h4>
              </div>
            </div>
            <hr />
            <div className="row">
              <div
                className="col-md-4"
                hidden={values.propertyType !== farmhouse}
              >
                <FormControl className="mb-4">
                  <TextField
                    label="Age of Property *"
                    variant="outlined"
                    name="ageOfProperty"
                    value={values.ageOfProperty}
                    onChange={handleNumbersOnly}
                    onBlur={handleBlur}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <div className="fw-bold text-success fs-20">
                            <span>{"Years"}</span>{" "}
                          </div>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <ShowError
                    touched={touched.ageOfProperty}
                    message={errors.ageOfProperty}
                  />
                </FormControl>
              </div>

              <div
                className="col-md-4 mb-4"
                hidden={values.propertyType !== agricultureLand}
              >
                <FormControl variant="outlined">
                  <InputLabel id="days-label">Facing*</InputLabel>
                  <Select
                    labelId="days-label"
                    label="Facing*"
                    name="facing"
                    value={values.facing}
                    onChange={handleChange}
                    MenuProps={{
                      disableScrollLock: true,
                    }}
                  >
                    <MenuItem value={""} disabled>
                      Select
                    </MenuItem>
                    {plotFacing?.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <ShowError touched={touched.facing} message={errors.facing} />
              </div>

              <div
                className="col-md-4 mb-4"
                hidden={values.propertyType !== agricultureLand}
              >
                <FormControl className="">
                  <TextField
                    label="Facing Road Width"
                    variant="outlined"
                    name="facingRoadWidth"
                    value={values.facingRoadWidth}
                    onChange={handleNumbersOnly}
                    onBlur={handleBlur}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <div className="fw-bold text-success fs-20">
                            <span
                              id="basic-button"
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              style={spanStyle}
                              onClick={handleClick}
                            >
                              {values.facingWidthType === "ft" ? "ft" : "mt"}
                            </span>{" "}
                          </div>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <ShowError
                    touched={touched.facingRoadWidth}
                    message={errors.facingRoadWidth}
                  />
                </FormControl>
                <p className="m-0"></p>
              </div>

              {/* <div
                className="col-md-4"
                hidden={values.propertyType !== farmhouse}
              >
                <FormControl className="mb-4">
                  <TextField
                    label="Build Up Area"
                    variant="outlined"
                    name="buildUpArea"
                    value={values.buildUpArea}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ShowError
                    touched={touched.buildUpArea}
                    message={errors.buildUpArea}
                  />
                </FormControl>
              </div> */}

              <div className="col-md-4 mb-4">
                <FormControl variant="outlined">
                  <InputLabel id="days-label">Open Sides Count</InputLabel>
                  <Select
                    labelId="days-label"
                    label="Open Sides Count"
                    name="openSidesCount"
                    value={values.openSidesCount}
                    onChange={handleChange}
                    MenuProps={{
                      disableScrollLock: true,
                    }}
                  >
                    <MenuItem value={"1"}>1</MenuItem>
                    <MenuItem value={"2"}>2</MenuItem>
                    <MenuItem value={"3"}>3</MenuItem>
                    <MenuItem value={"4"}>4</MenuItem>
                    <MenuItem value={"4+"}>4+</MenuItem>
                  </Select>
                </FormControl>
                <ShowError
                  touched={touched.openSidesCount}
                  message={errors.openSidesCount}
                />
              </div>

              <div
                className="col-md-4 mb-4"
                hidden={values.propertyType !== farmhouse}
              >
                <FormControl variant="outlined">
                  <InputLabel id="days-label">Farmhouse Status *</InputLabel>
                  <Select
                    labelId="days-label"
                    label="Farmhouse Status *"
                    name="farmhouseStatus"
                    value={values.farmhouseStatus}
                    onChange={handleChange}
                    MenuProps={{
                      disableScrollLock: true,
                    }}
                  >
                    <MenuItem value={"Ready to Move"}>Ready to Move</MenuItem>
                    <MenuItem value={"Under Construction"}>
                      Under Construction
                    </MenuItem>
                  </Select>
                </FormControl>
                <ShowError
                  touched={touched.farmhouseStatus}
                  message={errors.farmhouseStatus}
                />
              </div>

              <div
                className="col-md-4 mb-4"
                hidden={values.propertyType === agricultureLand}
              >
                <FormControl variant="outlined">
                  <InputLabel id="days-label">
                    Free Years of Maintenance
                  </InputLabel>
                  <Select
                    labelId="days-label"
                    label="Years of Maintenance"
                    name="maintainaceOfYears"
                    value={values.maintainaceOfYears}
                    onChange={handleChange}
                    MenuProps={{
                      disableScrollLock: true,
                    }}
                  >
                    <MenuItem value={"1"}>1</MenuItem>
                    <MenuItem value={"2"}>2</MenuItem>
                    <MenuItem value={"3"}>3</MenuItem>
                    <MenuItem value={"4"}>4</MenuItem>
                    <MenuItem value={"4+"}>4+</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div
                className="col-md-4 mb-4"
                hidden={values.propertyType !== farmhouse}
              >
                <FormControl variant="outlined">
                  <InputLabel id="days-label">No. of Floors</InputLabel>
                  <Select
                    labelId="days-label"
                    label="No. of Floors"
                    name="floorDetails"
                    value={values.floorDetails}
                    onChange={handleNumbersOnly}
                    MenuProps={{
                      disableScrollLock: true,
                    }}
                  >
                    <MenuItem value={"1"}>1</MenuItem>
                    <MenuItem value={"2"}>2</MenuItem>
                    <MenuItem value={"3"}>3</MenuItem>
                    <MenuItem value={"4"}>4</MenuItem>
                    <MenuItem value={"4+"}>4+</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div
                className="col-md-4 mb-4"
                hidden={values.propertyType !== farmhouse}
              >
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="demo-simple-select-label">
                    Ownership Type *
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label="Ownership Type *"
                    name="ownershipType"
                    MenuProps={{
                      disableScrollLock: true,
                    }}
                    value={values.ownershipType}
                    onChange={handleChange}
                  >
                    <MenuItem value={""} disabled>
                      Select Type
                    </MenuItem>
                    <MenuItem value={"Freehold"}>Freehold</MenuItem>
                    <MenuItem value={"Leasehold"}>Leasehold</MenuItem>
                    <MenuItem value={"Co-operative Society"}>
                      Co-operative Society
                    </MenuItem>
                    <MenuItem value={"Power of Attorney"}>
                      Power of Attorney
                    </MenuItem>
                  </Select>

                  <ShowError
                    touched={touched.ownershipType}
                    message={errors.ownershipType}
                  />
                </FormControl>
              </div>

              <div className="col-md-4 mb-4">
                <FormControl variant="outlined">
                  <InputLabel id="">Transaction Type *</InputLabel>
                  <Select
                    label="Transaction Type *"
                    name="transactionType"
                    value={values.transactionType}
                    onChange={handleChange}
                    MenuProps={{
                      disableScrollLock: true,
                    }}
                  >
                    <MenuItem value={"New"}>New</MenuItem>
                    <MenuItem value={"Resale"}>Resale</MenuItem>
                  </Select>
                  <ShowError
                    touched={touched.transactionType}
                    message={errors.transactionType}
                  />
                </FormControl>
              </div>

              <div
                className="col-md-4 mb-3"
                hidden={values.propertyType !== farmhouse}
              >
                <FormControl variant="outlined">
                  <Autocomplete
                    id="bedroom-autocomplete"
                    options={["1", "2", "3", "4"].map((element) => element)}
                    getOptionLabel={(option) => option}
                    value={values.bedrooms}
                    onChange={(event, newValue) => {
                      setFieldValue("bedrooms", newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Number of Bedrooms"
                        variant="outlined"
                        name="bedrooms"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    )}
                  />
                  <ShowError
                    touched={touched.bedrooms}
                    message={errors.bedrooms}
                  />
                </FormControl>
              </div>

              <div
                className="col-md-4 mb-3"
                hidden={values.propertyType !== farmhouse}
              >
                <FormControl variant="outlined">
                  <Autocomplete
                    id="bathroom-autocomplete"
                    options={["1", "2", "3", "4"].map((element) => element)}
                    getOptionLabel={(option) => option}
                    value={values.bathrooms}
                    onChange={(event, newValue) => {
                      setFieldValue("bathrooms", newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Number of Bathrooms"
                        variant="outlined"
                        name="bathrooms"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    )}
                  />
                  <ShowError
                    touched={touched.bathrooms}
                    message={errors.bathrooms}
                  />
                </FormControl>
              </div>

              <div
                className="col-md-4 mb-3"
                hidden={values.propertyType !== farmhouse}
              >
                <FormControl variant="outlined">
                  <InputLabel id="days-label">Numbers of Balconies</InputLabel>
                  <Select
                    labelId="days-label"
                    label="Numbers of Balconies"
                    name="balconies"
                    value={values.balconies}
                    onChange={handleChange}
                    MenuProps={{
                      disableScrollLock: true,
                    }}
                  >
                    <MenuItem value={"1"}>1</MenuItem>
                    <MenuItem value={"2"}>2</MenuItem>
                    <MenuItem value={"3"}>3</MenuItem>
                    <MenuItem value={"4"}>4</MenuItem>
                    <MenuItem value={"4+"}>4+</MenuItem>
                  </Select>
                </FormControl>
                <ShowError
                  touched={touched.balconies}
                  message={errors.balconies}
                />
              </div>

              <div
                className="col-md-4 col-12 mb-3"
                hidden={values.propertyType === agricultureLand}
              >
                <div
                  className={` ${
                    values.manageFarms === "Yes"
                      ? "bg-border-light-green"
                      : "bg-border-light-grey"
                  }  swtich-container`}
                >
                  <FormControlLabel
                    control={<Switch checked={values.manageFarms === "Yes"} />}
                    label="Managed Farms"
                    labelPlacement="start"
                    name="manageFarms"
                    onChange={(event) =>
                      setFieldValue(
                        "manageFarms",
                        event.target.checked ? "Yes" : "No"
                      )
                    }
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div
                  className={` ${
                    values.negotiablePrice === "Yes"
                      ? "bg-border-light-green"
                      : "bg-border-light-grey"
                  }  swtich-container mb-4`}
                >
                  <FormControlLabel
                    control={
                      <Switch checked={values.negotiablePrice === "Yes"} />
                    }
                    label="Is Price Negotiable?"
                    labelPlacement="start"
                    onChange={(event) =>
                      setFieldValue(
                        "negotiablePrice",
                        event.target.checked ? "Yes" : "No"
                      )
                    }
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div
                  className={` ${
                    values.boundWallMade === "Yes"
                      ? "bg-border-light-green"
                      : "bg-border-light-grey"
                  }  swtich-container mb-4`}
                >
                  <FormControlLabel
                    control={
                      <Switch checked={values.boundWallMade === "Yes"} />
                    }
                    label="Property has Boundary Walls"
                    labelPlacement="start"
                    name="boundWallMade"
                    onChange={(event) =>
                      setFieldValue(
                        "boundWallMade",
                        event.target.checked ? "Yes" : "No"
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        disableScrollLock
      >
        <MenuItem onClick={() => changeFacingRoadWidth("ft")}>ft</MenuItem>
        <MenuItem onClick={() => changeFacingRoadWidth("mt")}>mt</MenuItem>
      </Menu>
    </>
  );
}

export default PropertyAdditionalInfo;
