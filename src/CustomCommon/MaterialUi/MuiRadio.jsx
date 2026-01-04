import React from "react";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
} from "@mui/material";

function MuiRadio({ formLabel, radioValues, name, value, handleChange }) {
  return (
    <div>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">{formLabel}</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name={name}
          value={value}
          onChange={handleChange}
          row
        >
          {radioValues?.map((item, index) => {
            return (
              <FormControlLabel
                key={index}
                value={item.value}
                control={<Radio />}
                label={item.label}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default MuiRadio;
