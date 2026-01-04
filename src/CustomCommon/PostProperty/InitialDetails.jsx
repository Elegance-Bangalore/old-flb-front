import React, { useEffect, useState } from "react";
import {
  FormControl,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Autocomplete,
} from "@mui/material";
import ShowError from "../Others/ShowError";
import { useParams } from "react-router-dom";
import {
  agricultureLand,
  Estates,
  farmhouse,
  farmland,
} from "@/CustomServices/Constant";
import { citiesData, states } from "@/CustomServices/Data/stateCities";
import TinyEditor from "@/CustomCommon/Others/TinyEditor";

function InitialDetails({ formik }) {
  const param = useParams();
  const propertyCode = param?.propertyCode;
  const [cities, setCities] = useState([]);

  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    formik;

  useEffect(() => {
    const selectedState = states.find((state) => state.name === values.state);
    if (selectedState) {
      const citiesByState = citiesData.filter(
        (city) => city?.stateCode === selectedState?.isoCode
      );
      setCities(citiesByState);
    } else {
      setCities([]);
    }
  }, [values.state]);

  useEffect(() => {
    if (values.propertyType === Estates && !values.estateType) {
      setFieldValue("estateType", "Tea");
    }
    if (values.propertyType !== Estates && values.estateType) {
      setFieldValue("estateType", "");
    }
  }, [values.propertyType]);

  return (
    <div className="row mb-5" >
      <div className="col-12">
        <div className="bg-white-shadow select-property-wrapper p-4 rounded-3 border">
          <h4 className="mb-3">Select Property Type </h4>
          <div className="btn-frame mb-4 flex-wrap flex-md-nowrap">
            <input
              id={farmland}
              className="toggle toggle-left"
              name="propertyType"
              value={farmland}
              type="radio"
              hidden
              autoFocus
              checked={values.propertyType === farmland}
              onChange={handleChange}
            />
            <label htmlFor={farmland} className="btn-pri left">
              Farmland
            </label>

            <input
              id={farmhouse}
              className="toggle toggle-right"
              name="propertyType"
              value={farmhouse}
              type="radio"
              hidden
              checked={values.propertyType === farmhouse}
              onChange={handleChange}
            />
            <label htmlFor={farmhouse} className="btn-pri right">
              Farmhouse
            </label>

            <input
              id="coffee-estate"
              className="toggle toggle-left"
              name="propertyType"
              value={Estates}
              type="radio"
              hidden
              checked={values.propertyType === Estates}
              onChange={handleChange}
            />
            <label htmlFor="coffee-estate" className="btn-pri left">
              Estates
            </label>

            <input
              id="agriculture-land"
              className="toggle toggle-right"
              name="propertyType"
              value={agricultureLand}
              type="radio"
              hidden
              checked={values.propertyType === agricultureLand}
              onChange={(e) => {
                setFieldValue("areaType", "Sq Ft");
                handleChange(e);
              }}
            />
            <label htmlFor="agriculture-land" className="btn-pri right">
              Agriculture Land
            </label>
          </div>

          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-farmland"
              role="tabpanel"
              aria-labelledby="pills-farmland-tab"
            >
              <div className="row">
                <div className="col-md-6">
                  <FormControl className="mb-4">
                    <TextField
                      label="Property Name *"
                      variant="outlined"
                      name="propertyTitle"
                      value={values.propertyTitle}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ShowError
                      touched={touched.propertyTitle}
                      message={errors.propertyTitle}
                    />
                  </FormControl>
                </div>

                <div className="col-md-6">
                  <FormControl className="mb-4">
                    <Autocomplete
                      id="state-autocomplete"
                      options={states.map((state) => state.name)}
                      value={values.state}
                      onChange={(event, newValue) => {
                        setFieldValue("state", newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="State *"
                          variant="outlined"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      )}
                    />
                    <ShowError touched={touched.state} message={errors.state} />
                  </FormControl>
                </div>

                <div className="col-md-6">
                  <FormControl className="mb-4">
                    <Autocomplete
                      id="city-autocomplete"
                      options={cities.map((city) => city.name)}
                      value={values.city}
                      onChange={(event, newValue) => {
                        setFieldValue("city", newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="City *"
                          variant="outlined"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      )}
                    />
                    <ShowError touched={touched.city} message={errors.city} />
                  </FormControl>
                </div>
                <div className="col-md-6">
                  <FormControl className="mb-4">
                    <TextField
                      label="Locality *"
                      variant="outlined"
                      name="locality"
                      value={values.locality}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ShowError
                      touched={touched.locality}
                      message={errors.locality}
                    />
                  </FormControl>
                </div>
                <div className="col-md-12">
                  <FormControl className="mb-4">
                    <TextField
                      label="Paste Google Map Embed Link *"
                      variant="outlined"
                      name="map"
                      value={values.map}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ShowError touched={touched.map} message={errors.map} />
                  </FormControl>
                </div>
                {values.propertyType === Estates && (
                  <div className="col-md-6">
                    <FormControl className="mb-4" fullWidth>
                      <InputLabel id="estate-type-label">Select Estate Type *</InputLabel>
                      <Select
                        labelId="estate-type-label"
                        label="Select Estate Type *"
                        name="estateType"
                        value={values.estateType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <MenuItem value="Tea">Tea</MenuItem>
                        <MenuItem value="Coffee">Coffee</MenuItem>
                        <MenuItem value="Mango">Mango</MenuItem>
                        <MenuItem value="Coconut">Coconut</MenuItem>
                        <MenuItem value="Cashew">Cashew</MenuItem>
                        <MenuItem value="Sandalwood">Sandalwood</MenuItem>
                        <MenuItem value="Arecanut">Arecanut</MenuItem>
                        <MenuItem value="Orange">Orange</MenuItem>
                      </Select>
                      <ShowError
                        touched={touched.estateType}
                        message={errors.estateType}
                      />
                    </FormControl>
                  </div>
                )}
                <div className="col-md-12">
                  <FormControl className="mb-4">
                    <TinyEditor
                      content={values.propertyDescription}
                      setFieldValue={setFieldValue}
                      name="propertyDescription"
                      height={200}
                    />
                    <ShowError
                      touched={touched.propertyDescription}
                      message={errors.propertyDescription}
                    />
                  </FormControl>
                </div>

                <div className="col-md-6">
                  {propertyCode && (
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="property-status-label">Status</InputLabel>
                      <Select
                        labelId="property-status-label"
                        label="Status"
                        name="propertyStatus"
                        value={values.propertyStatus}
                        onChange={handleChange}
                      >
                        <MenuItem value={"available"}>Available</MenuItem>
                        <MenuItem value={"sold-out"}>Sold</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InitialDetails;
