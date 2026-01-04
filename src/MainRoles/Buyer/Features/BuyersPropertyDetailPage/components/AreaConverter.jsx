import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { colors } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { formatPropertyLength } from "@/CustomServices/Constant";

// Conversion rates from different area types to Sq Ft
const conversionRates = {
  "Sq Ft": {
    "Sq Ft": 1,
    "Sq Mt": 0.092903, // 1 Sq Ft = 0.092903 Sq Mt
    "Sq Yards": 1 / 9, // 1 Sq Ft = 1/9 Sq Yards
    Acres: 1 / 43560, // 1 Sq Ft = 1/43560 Acres
    Hectares: 1 / 107639, // 1 Sq Ft = 1/107639 Hectares
    Bigha: 0.00002089, // 1 Sq Ft = 0.00002089 Bigha
    Kila: 0.0000513, // 1 Sq Ft = 0.0000513 Kila
    Kanal: 0.0000518, // 1 Sq Ft = 0.0000518 Kanal
  },
  "Sq Mt": {
    "Sq Ft": 10.7639, // Corrected: 1 Sq Mt = 10.7639 Sq Ft
    "Sq Mt": 1,
    "Sq Yards": 1.19599, // 1 Sq Mt = 1.19599 Sq Yards
    Acres: 0.000247105, // 1 Sq Mt = 0.000247105 Acres
    Hectares: 0.0001, // 1 Sq Mt = 0.0001 Hectares
    Bigha: 0.000223, // Corrected: 1 Sq Mt = 0.000223 Bigha
    Kila: 0.00005342, // Corrected: 1 Sq Mt = 0.00005342 Kila
    Kanal: 0.00057465, // Corrected: 1 Sq Mt = 0.00057465 Kanal
  },
  "Sq Yards": {
    "Sq Ft": 9, // 1 Sq Yard = 9 Sq Ft
    "Sq Mt": 0.836127, // Corrected: 1 Sq Yard = 0.836127 Sq Mt
    "Sq Yards": 1,
    Acres: 0.000206612, // 1 Sq Yard = 0.000206612 Acres
    Hectares: 0.0000836127, // 1 Sq Yard = 0.0000836127 Hectares
    Bigha: 0.00025, // Corrected: 1 Sq Yard = 0.00025 Bigha
    Kila: 0.00005, // Corrected: 1 Sq Yard = 0.00005 Kila
    Kanal: 0.00055, // Corrected: 1 Sq Yard = 0.00055 Kanal
  },
  Acres: {
    "Sq Ft": 43560, // 1 Acre = 43560 Sq Ft
    "Sq Mt": 4046.86, // 1 Acre = 4046.86 Sq Mt
    "Sq Yards": 4840, // 1 Acre = 4840 Sq Yards
    Acres: 1,
    Hectares: 0.404686, // 1 Acre = 0.404686 Hectares
    Bigha: 1.613, // Corrected: 1 Acre = 1.613 Bigha (this can vary regionally)
    Kila: 4, // Corrected: 1 Acre = 4 Kila
    Kanal: 8, // Corrected: 1 Acre = 8 Kanal
  },
  Hectares: {
    "Sq Ft": 107639, // 1 Hectare = 107639 Sq Ft
    "Sq Mt": 10000, // 1 Hectare = 10000 Sq Mt
    "Sq Yards": 11959.9, // 1 Hectare = 11959.9 Sq Yards
    Acres: 2.47105, // 1 Hectare = 2.47105 Acres
    Hectares: 1,
    Bigha: 3.953, // Corrected: 1 Hectare = 3.953 Bigha (can vary regionally)
    Kila: 9.884, // Corrected: 1 Hectare = 9.884 Kila
    Kanal: 19.77, // Corrected: 1 Hectare = 19.77 Kanal
  },
  Bigha: {
    "Sq Ft": 27225, // Corrected: 1 Bigha = 27225 Sq Ft (varies regionally)
    "Sq Mt": 2529.28, // Corrected: 1 Bigha = 2529.28 Sq Mt
    "Sq Yards": 3025, // Corrected: 1 Bigha = 3025 Sq Yards
    Acres: 0.62083, // Corrected: 1 Bigha = 0.62083 Acres
    Hectares: 0.25, // Corrected: 1 Bigha = 0.25 Hectares
    Bigha: 1,
    Kila: 0.4, // Corrected: 1 Bigha = 0.4 Kila
    Kanal: 3.2, // Corrected: 1 Bigha = 3.2 Kanal
  },
  Kila: {
    "Sq Ft": 43560, // Corrected: 1 Kila = 43560 Sq Ft
    "Sq Mt": 4046.86, // Corrected: 1 Kila = 4046.86 Sq Mt
    "Sq Yards": 4840, // Corrected: 1 Kila = 4840 Sq Yards
    Acres: 1, // 1 Kila = 1 Acre
    Hectares: 0.404686, // 1 Kila = 0.404686 Hectares
    Bigha: 2.5, // Corrected: 1 Kila = 2.5 Bigha
    Kila: 1,
    Kanal: 8, // Corrected: 1 Kila = 8 Kanal
  },
  Kanal: {
    "Sq Ft": 5445, // Corrected: 1 Kanal = 5445 Sq Ft
    "Sq Mt": 505.86, // Corrected: 1 Kanal = 505.86 Sq Mt
    "Sq Yards": 605, // Corrected: 1 Kanal = 605 Sq Yards
    Acres: 0.125, // Corrected: 1 Kanal = 0.125 Acres
    Hectares: 0.050586, // Corrected: 1 Kanal = 0.050586 Hectares
    Bigha: 0.3125, // Corrected: 1 Kanal = 0.3125 Bigha
    Kila: 0.125, // Corrected: 1 Kanal = 0.125 Kila
    Kanal: 1,
  },
};

export default function AreaConverter({ singleProperty, minOnly = false }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(singleProperty?.areaType);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function convertArea(area, fromUnit, toUnit) {
    if (!area || !fromUnit || !toUnit) return 0;
    const areaInSqFt = area * conversionRates[fromUnit][toUnit];
    return areaInSqFt;
  }

  function handlePlotAreaChange(unit) {
    setSelectedUnit(unit);
    setAnchorEl(null);
  }

  const spanStyle = {
    textDecoration: "underline",
    display: "inline-flex",
    alignItems: "center",
    cursor: "pointer",
    fontWeight: "700",
    color: "#00a76f",
  };

  return (
    <>
      {minOnly ? (
        <h3 className="fl-text-dark mb-1 text-capitalize fs-4">
          {formatPropertyLength(
            convertArea(
              singleProperty.minArea,
              singleProperty.areaType,
              selectedUnit
            ).toFixed(2)
          )}{" "}
          <span
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            style={spanStyle}
          >
            {selectedUnit}
            <ArrowDropDownIcon style={{ marginLeft: 0 }} />
          </span>
        </h3>
      ) : (
        <h3 className="fl-text-dark mb-1 text-capitalize fs-4">
          {formatPropertyLength(
            convertArea(
              singleProperty.minArea,
              singleProperty.areaType,
              selectedUnit
            ).toFixed(2)
          )}{" "}
          -{" "}
          {formatPropertyLength(
            convertArea(
              singleProperty.maxArea,
              singleProperty.areaType,
              selectedUnit
            ).toFixed(2)
          )}{" "}
          <span
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            className="fs-6"
            style={spanStyle}
          >
            {selectedUnit}
            <ArrowDropDownIcon style={{ marginLeft: 0 }} />
          </span>
        </h3>
      )}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          autoFocusItem: false, // Prevent auto-focus on the first item
        }}
        disableScrollLock
      >
        {selectedUnit &&
          Object.keys(conversionRates[selectedUnit]).map((unit, index) => (
            <MenuItem key={index} onClick={() => handlePlotAreaChange(unit)}>
              {unit}
            </MenuItem>
          ))}
      </Menu>
    </>
  );
}
