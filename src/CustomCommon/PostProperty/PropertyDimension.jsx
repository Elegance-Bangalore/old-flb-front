import React, { useEffect, useState } from "react";
import {
  FormControl,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  InputAdornment,
} from "@mui/material";
import ShowError from "../Others/ShowError";
import {
  agricultureLand,
  farmhouse,
  formatNumberInCr,
} from "@/CustomServices/Constant";
import Menu from "@mui/material/Menu";
import CommonMenu from "../MaterialUi/CommonMenu";

function PropertyDimension({ formik }) {
  const { values, errors, touched, handleBlur, setFieldValue, handleChange } =
    formik;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open2 = Boolean(anchorEl2);
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

  const handlePlotArea = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl2(null);
  };

  const landMeasurementUnits = [
    { name: "Sq Ft", factor: 1 },
    { name: "Sq Mt", factor: 10.7639 },
    { name: "Sq Yards", factor: 9 },
    { name: "Acres", factor: 43560 },
    { name: "Hectares", factor: 107639 },
    { name: "Bigha", factor: 26910 },
    { name: "Kila", factor: 108900 },
    { name: "Kanal", factor: 5445 },
  ];

  const [selectedUnit, setSelectedUnit] = useState(landMeasurementUnits[0]);

  function handlePlotAreaChange(value) {
    setFieldValue("plotArea", value);
  }

  function handleNumbersOnly(e) {
    const { name, value } = e.target;
    if (/^\d*\.?\d*$/.test(e.target.value)) {
      setFieldValue(name, value);
    }
  }

  function changeUserInput(value) {
    setFieldValue("userInput", value);
    handleClose();
  }

  useEffect(() => {
    if (!values.userInput) {
      if (values.price && values.minArea) {
        let minAreaSqft = values.minArea * selectedUnit.factor;
        if (minAreaSqft) {
          const pricePerSqft = values.price / minAreaSqft;
          setFieldValue("pricePerSqft", pricePerSqft.toFixed(2));
        }
      }
    }
  }, [values.price, values.minArea, selectedUnit, values.userInput]);

  useEffect(() => {
    const unit = landMeasurementUnits.find(
      (unit) => unit.name === values.areaType
    );
    if (unit) {
      setSelectedUnit(unit);
    } else {
      setSelectedUnit(landMeasurementUnits[0]);
    }
  }, [values.areaType]);

  const menuItems = [
    { label: "Plot Area", onClick: () => changeUserInput(false) },
    { label: "User Input", onClick: () => changeUserInput(true) },
  ];

  const menuItems2 = [
    { label: "Sq.Ft", onClick: () => setFieldValue("plotArea", "sqft") },
    { label: "Acres", onClick: () => setFieldValue("plotArea", "acre") },
  ];

  return (
    <>
      <div className="row mb-5">
        <div className="col-md-12">
          <div className="bg-white-shadow select-property-wrapper p-4 rounded-3 border">
            <div className="row">
              <h4 className="mb-4">Property Dimensions & Price</h4>
              <div className="col-md-4">
                <FormControl className="mb-4">
                  <TextField
                    id=""
                    label={`Total ${
                      values.propertyType === agricultureLand
                        ? "Land"
                        : "Project"
                    } Area *`}
                    variant="outlined"
                    name="totalAcre"
                    onChange={handleNumbersOnly}
                    onBlur={handleBlur}
                    value={values.totalAcre}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <span
                            id="basic-button"
                            aria-controls={open2 ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open2 ? "true" : undefined}
                            style={spanStyle}
                            onClick={handlePlotArea}
                          >
                            {values.plotArea === "sqft" ? "Sq.Ft" : "Acres"}
                          </span>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <ShowError
                    touched={touched.totalAcre}
                    message={errors.totalAcre}
                  />
                </FormControl>
              </div>
              {/* <div className="col-md-4">
                <div className="btn-frame mb-4">
                  <input
                    id="sqft"
                    className="toggle toggle-left"
                    name="toggle"
                    value="false"
                    type="radio"
                    hidden
                    onChange={(e) => handlePlotAreaChange(e.target.id)}
                    checked={values.plotArea === "sqft"}
                  />
                  <label htmlFor="sqft" className="btn-pri left">
                    Sq.Ft
                  </label>
                  <input
                    id="acre"
                    className="toggle toggle-right"
                    name="toggle"
                    value="true"
                    type="radio"
                    hidden
                    checked={values.plotArea === "acre"}
                    onChange={(e) => handlePlotAreaChange(e.target.id)}
                  />
                  <label htmlFor="acre" className="btn-pri right">
                    Acres
                  </label>
                </div>
              </div> */}
              <div className="col-md-4">
                <FormControl className="mb-4">
                  <TextField
                    id=""
                    label={`${
                      values.propertyType === agricultureLand
                        ? "Price *"
                        : "Minimum Price *"
                    } `}
                    variant="outlined"
                    name="price"
                    value={values.price}
                    onChange={handleNumbersOnly}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <div className="fw-bold text-success fs-20">
                            {formatNumberInCr(values.price)}
                          </div>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <ShowError touched={touched.price} message={errors.price} />
                </FormControl>
              </div>

              <div
                className="col-md-4"
                hidden={values.propertyType === agricultureLand}
              >
                <FormControl className="mb-4">
                  <TextField
                    id=""
                    label="Maximum Price (optional)"
                    variant="outlined"
                    name="priceMax"
                    value={values.priceMax}
                    onChange={handleNumbersOnly}
                    onBlur={handleBlur}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <div className="fw-bold text-success fs-20">
                            {formatNumberInCr(values.priceMax)}
                          </div>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <ShowError
                    touched={touched.priceMax}
                    message={errors.priceMax}
                  />
                </FormControl>
              </div>

              <div className="col-md-4">
                <FormControl className="mb-4">
                  <TextField
                    id=""
                    label={`${
                      values.propertyType === agricultureLand
                        ? "Minimum Land Area *"
                        : "Minimum Plot Area *"
                    } `}
                    variant="outlined"
                    name="minArea"
                    value={values.minArea}
                    onChange={handleNumbersOnly}
                    onBlur={handleBlur}
                  />
                  <ShowError
                    touched={touched.minArea}
                    message={errors.minArea}
                  />
                </FormControl>
              </div>

              <div
                className="col-md-4"
                hidden={values.propertyType === agricultureLand}
              >
                <FormControl className="mb-4">
                  <TextField
                    id=""
                    label="Maximum Plot Area (optional)"
                    variant="outlined"
                    name="maxArea"
                    value={values.maxArea}
                    onChange={handleNumbersOnly}
                    onBlur={handleBlur}
                  />
                  <ShowError
                    touched={touched.maxArea}
                    message={errors.maxArea}
                  />
                </FormControl>
              </div>

              <div
                className="col-md-4"
                hidden={values.propertyType !== farmhouse}
              >
                <FormControl className="mb-4">
                  <TextField
                    id=""
                    label="Build Up Area (In Ft)"
                    variant="outlined"
                    name="buildUpArea"
                    value={values.buildUpArea}
                    onChange={handleNumbersOnly}
                    onBlur={handleBlur}
                  />
                  <ShowError
                    touched={touched.buildUpArea}
                    message={errors.buildUpArea}
                  />
                </FormControl>
              </div>

              <div className="col-md-4">
                <FormControl fullWidth className="mb-4">
                  <InputLabel id="demo-simple-select-label">
                    Area Dimension *
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Area Dimension *"
                    name="areaType"
                    MenuProps={{
                      disableScrollLock: true,
                    }}
                    value={values.areaType}
                    onChange={handleChange}
                  >
                    {landMeasurementUnits?.map((unit, index) => (
                      <MenuItem key={index} value={unit.name}>
                        {unit.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <ShowError
                    touched={touched.areaType}
                    message={errors.areaType}
                  />
                </FormControl>
              </div>

              <div className="col-md-4">
                <FormControl className="mb-4">
                  <TextField
                    id=""
                    label={`Price Per Square Feet`}
                    variant="outlined"
                    type="number"
                    name="pricePerSqft"
                    autoFocus
                    value={values.pricePerSqft}
                    aria-readonly
                    disabled={!values.userInput}
                    readOnly
                    onChange={handleNumbersOnly}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <div className="fw-bold text-success fs-20">
                            {formatNumberInCr(values.pricePerSqft)}
                          </div>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <ShowError
                    touched={touched.pricePerSqft}
                    message={errors.pricePerSqft}
                  />
                  <p className="m-0">
                    Based on{" "}
                    <span
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      style={spanStyle}
                      onClick={handleClick}
                    >
                      {values.userInput ? "User Input" : "Plot Area"}
                    </span>
                  </p>
                </FormControl>
              </div>

              <div
                className="col-md-4"
                hidden={values.propertyType !== agricultureLand}
              >
                <FormControl className="mb-4">
                  <TextField
                    id=""
                    label="Landmark"
                    variant="outlined"
                    name="landmark"
                    value={values.landmark}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ShowError
                    touched={touched.landmark}
                    message={errors.landmark}
                  />
                </FormControl>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>

      <CommonMenu
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
        menuItems={menuItems}
        ariaLabel="basic-button"
      />

      <CommonMenu
        anchorEl={anchorEl2}
        open={open2}
        handleClose={handleClose}
        menuItems={menuItems2}
        ariaLabel="basic-button"
      />
    </>
  );
}

export default PropertyDimension;
