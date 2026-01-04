import { propertyCategoryListApi } from "@/ApiRoutes/AdminApi";
import IosSwitch from "@/CustomCommon/MaterialUi/IosSwitch";
import {
  agricultureLand,
  capitalizeArray,
  Estates,
  farmhouse,
  farmland,
} from "@/CustomServices/Constant";
import { selectFilter } from "@/features/properties/propertiesSlice";
import graph from "@/CustomAssets/BuyerImages/graph-shape.svg";
import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Slider,
  TextField,
  Tooltip,
} from "@mui/material";
import { Refresh } from "iconsax-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function valuetext(value) {
  return `${value.toLocaleString()} ₹`;
}

function valueLabelFormat(value) {
  return `${(value / 100000).toFixed(2)} Lakh ₹`;
}

function BuyerFilters({
  filters,
  handleFilterChange,
  priceRange,
  clearFilters,
}) {
  const { cities } = useSelector(selectFilter);
  const capitalizedCities = capitalizeArray(cities);
  const [categoryList, setCategoryList] = useState([]);

  async function getCategoryList() {
    try {
      const response = await propertyCategoryListApi();
      setCategoryList(response?.data?.response);
    } catch (error) {
      throw error;
    }
  }

  const handleCityChange = (event, newValue) => {
    const newFilters = { ...filters, city: newValue, page: 1 };
    handleFilterChange({ target: { name: "city", value: newValue } });
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <>
      <div className="fl-property-list-filer-hero fl-property-card rounded-3">
        <div className="d-flex justify-content-between p-3 align-items-center">
          <div className="">
            <h4 className="fl-text-dark mb-0">Filters</h4>
            <p className="fl-text-gray fl-fs-16 mb-0 mb-0"></p>
          </div>
          <div className="">
            <Tooltip title="Clear Filters">
              <button
                className="fl-btn-green py-1 px-2"
                onClick={clearFilters}
              >
                Clear
              </button>
            </Tooltip>
          </div>
        </div>
        <div className="border-top py-4 px-3">
          <div className="mb-4 pb-lg-2">
            <TextField
              label="Search by name, location, budget, property type"
              id="outlined-size-small"
              size="small"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
            />
          </div>

          <div className="mb-4 pb-lg-2">
            <FormControl variant="outlined">
              <Autocomplete
                id="bedroom-autocomplete"
                options={capitalizedCities?.map((element) => element)}
                getOptionLabel={(option) => option}
                value={filters.city}
                size="small"
                onChange={handleCityChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Cities"
                    variant="outlined"
                    name="cities"
                    size="small"
                    onChange={handleFilterChange}
                  />
                )}
              />
            </FormControl>
          </div>

          <div className="mb-4 pb-lg-2">
            <h4 className="text-uppercase fl-fs-16">Property Type</h4>
            <div className="row">
              <div className="col-md-6">
                <FormControlLabel
                  control={
                    <Checkbox
                      value={farmland}
                      checked={filters.propertyType === farmland}
                      onChange={handleFilterChange}
                      name="propertyType"
                      className="ps-2 pe-1"
                    />
                  }
                  label="Farmland"
                />
              </div>

              <div className="col-md-6">
                <FormControlLabel
                  control={
                    <Checkbox
                      value={Estates}
                      checked={filters.propertyType === Estates}
                      onChange={handleFilterChange}
                      name="propertyType"
                      className="ps-2 pe-1"
                    />
                  }
                  label="Estates"
                />
              </div>
              <div className="col-md-6">
                <FormControlLabel
                  control={
                    <Checkbox
                      value={farmhouse}
                      checked={filters.propertyType === farmhouse}
                      onChange={handleFilterChange}
                      name="propertyType"
                      className="ps-2 pe-1"
                    />
                  }
                  label="Farmhouse"
                />
              </div>
              <div className="col-md-6">
                <FormControlLabel
                  control={
                    <Checkbox
                      value={agricultureLand}
                      checked={filters.propertyType === agricultureLand}
                      onChange={handleFilterChange}
                      name="propertyType"
                      className="ps-2 pe-1"
                    />
                  }
                  label="Agriculture&nbsp;Land"
                />
              </div>
            </div>
          </div>
          <div className="mb-4 pb-lg-2">
            <h4 className="text-uppercase fl-fs-16">Price Range </h4>
            <div className="">
              <div className="w-100">
                <img className="w-100" src={graph} alt="rang-graph" />
              </div>
              <Slider
                getAriaLabel={() => "Price range"}
                onChange={handleFilterChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                valueLabelFormat={valueLabelFormat}
                name="price"
                min={0}
                max={50000000}
                value={priceRange}
              />
            </div>
            <div className="row">
              <div className="col-md-6 mb-4 mb-md-0">
                <TextField
                  id=""
                  label="From"
                  variant="outlined"
                  name="priceMin"
                  value={priceRange[0]}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-md-6 mb-4 mb-md-0">
                <TextField
                  id=""
                  label="To"
                  variant="outlined"
                  name="priceMax"
                  value={priceRange[1]}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
          </div>

          <div className="mb-4 pb-lg-2">
            <h4 className="text-uppercase fl-fs-16">Project Size</h4>
            <div className="row">
              <div className="col-md-6">
                <FormControlLabel
                  control={
                    <Checkbox
                      value="30"
                      checked={filters.totalAcre === "30"}
                      onChange={handleFilterChange}
                      name="totalAcre"
                      className="ps-2 pe-1"
                    />
                  }
                  label="Under 30 Acres"
                />
              </div>
              <div className="col-md-6">
                <FormControlLabel
                  control={
                    <Checkbox
                      value="30-60"
                      checked={filters.totalAcre === "30-60"}
                      onChange={handleFilterChange}
                      name="totalAcre"
                      className="ps-2 pe-1"
                    />
                  }
                  label="30-60 Acres"
                />
              </div>
              <div className="col-md-6">
                <FormControlLabel
                  control={
                    <Checkbox
                      value="60-90"
                      checked={filters.totalAcre === "60-90"}
                      onChange={handleFilterChange}
                      name="totalAcre"
                      className="ps-2 pe-1"
                    />
                  }
                  label="60-90 Acre"
                />
              </div>
              <div className="col-md-6">
                <FormControlLabel
                  control={
                    <Checkbox
                      value="above"
                      checked={filters.totalAcre === "above"}
                      onChange={handleFilterChange}
                      name="totalAcre"
                      className="ps-2 pe-1"
                    />
                  }
                  label="Above 90 Acres"
                />
              </div>
            </div>
          </div>

          <div className="mb-5">
            <h4 className="text-uppercase fl-fs-16">Amenities</h4>
            <div className="row">
              <div className="col-md-6">
                <FormControlLabel
                  control={
                    <Checkbox
                      value="Water Supply"
                      className="ps-2 pe-1"
                      name="aminities"
                      onChange={handleFilterChange}
                      checked={filters.aminities.includes("Water Supply")}
                    />
                  }
                  label="Water Supply"
                />
              </div>
              <div className="col-md-6">
                <FormControlLabel
                  control={
                    <Checkbox
                      value="Electricity"
                      name="aminities"
                      className="ps-2 pe-1"
                      onChange={handleFilterChange}
                      checked={filters.aminities.includes("Electricity")}
                    />
                  }
                  label="Electricity"
                />
              </div>
              <div className="col-md-6">
                <FormControlLabel
                  control={
                    <Checkbox
                      value="Security Guard"
                      name="aminities"
                      className="ps-2 pe-1"
                      onChange={handleFilterChange}
                      checked={filters.aminities.includes("Security Guard")}
                    />
                  }
                  label="Security Guard"
                />
              </div>
              <div className="col-md-6">
                <FormControlLabel
                  control={
                    <Checkbox
                      value="Swimming Pool"
                      name="aminities"
                      className="ps-2 pe-1"
                      onChange={handleFilterChange}
                      checked={filters.aminities.includes("Swimming Pool")}
                    />
                  }
                  label="Swimming Pool"
                />
              </div>
              <div className="col-md-6">
                <FormControlLabel
                  control={
                    <Checkbox
                      value="Sewage"
                      name="aminities"
                      className="ps-2 pe-1"
                      onChange={handleFilterChange}
                      checked={filters.aminities.includes("Sewage")}
                    />
                  }
                  label="Sewage"
                />
              </div>
              <div className="col-md-6">
                <FormControlLabel
                  control={
                    <Checkbox
                      value="Kids Play Area"
                      name="aminities"
                      className="ps-2 pe-1"
                      onChange={handleFilterChange}
                      checked={filters.aminities.includes("Kids Play Area")}
                    />
                  }
                  label="Kids Play Area"
                />
              </div>
              <div className="col-md-6">
                <FormControlLabel
                  control={
                    <Checkbox
                      value="Garden"
                      name="aminities"
                      className="ps-2 pe-1"
                      onChange={handleFilterChange}
                      checked={filters.aminities.includes("Garden")}
                    />
                  }
                  label="Garden"
                />
              </div>
              <div className="col-md-6">
                <FormControlLabel
                  control={
                    <Checkbox
                      value="Internal Road"
                      name="aminities"
                      className="ps-2 pe-1"
                      onChange={handleFilterChange}
                      checked={filters.aminities.includes("Internal Road")}
                    />
                  }
                  label="Internal Road"
                />
              </div>
              <div className="col-md-6">
                <FormControlLabel
                  control={
                    <Checkbox
                      value="Club House"
                      name="aminities"
                      onChange={handleFilterChange}
                      checked={filters.aminities.includes("Club House")}
                      className="ps-2 pe-1"
                    />
                  }
                  label="Club House"
                />
              </div>
            </div>
          </div>

          <div className="mb-4 pb-lg-2">
            <h4 className="text-uppercase fl-fs-16">Category</h4>
            <div className="row">
              {categoryList.map((element) => (
                <div className="col-12" key={element._id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={element._id}
                        checked={filters.categoryId === element._id}
                        onChange={handleFilterChange}
                        name="categoryId"
                      />
                    }
                    label={element.name}
                    className="text-capitalize"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BuyerFilters;
