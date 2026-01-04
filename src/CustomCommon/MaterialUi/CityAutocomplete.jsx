import { capitalizeArray } from "@/CustomServices/Constant";
import { selectFilter } from "@/features/properties/propertiesSlice";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

function CityAutocomplete({ city, setValues, values }) {
  const { cities } = useSelector(selectFilter);
  const capitalizedCities = capitalizeArray(cities);
  const cityOptions = capitalizedCities?.map((city) => ({ city }));

  function handleCityChange(e, value) {
    setValues({ ...values, city: value });
  }

  return (
    <Autocomplete
      options={cityOptions}
      getOptionLabel={(option) => option.city}
      value={city || null}
      onChange={handleCityChange}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          label="City"
          placeholder="Select or enter city"
        />
      )}
    />
  );
}

export default CityAutocomplete;
