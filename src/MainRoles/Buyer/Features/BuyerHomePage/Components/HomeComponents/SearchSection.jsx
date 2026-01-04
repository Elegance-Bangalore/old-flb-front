import React, { useEffect, useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import Slider from "react-slick";
import cardSmall from "../../../../../CustomAssets/BuyerImages/small-card.png";
import rupee from "../../../../../CustomAssets/BuyerImages/fl-rupee.svg";
import scale from "../../../../../CustomAssets/BuyerImages/fl-scale.svg";
import Grow from "@mui/material/Grow";
import {
  farmhouse,
  Estates,
  agricultureLand,
  farmland,
  formatNumberInCr,
  navigateToDetail,
} from "@/CustomServices/Constant";
import { mostSearchedPropertyApi } from "@/ApiRoutes/BuyersApi";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { Link } from "react-router-dom";

function SearchSection({ checked, filters, setFilters }) {
  const [mostSearched, setMostSearched] = useState([]);
  const setting3 = {
    slidesToShow: 3,
    slidesToScroll: 1,
    centerPadding: "0",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function getPerAcre(price, area) {
    const perAcre = Number(price) / Number(area).toFixed(2);
    return formatNumberInCr(perAcre);
  }

  async function mostSearchedProperties() {
    try {
      const response = await mostSearchedPropertyApi(filters.propertyType);
      setMostSearched(response.data.mostSearched);
    } catch (error) {
      toastMessage("Error in fetching most searched properties");
    } finally {
    }
  }

  function handleFiltersChange(e) {
    const { name, value } = e.target;
    if (name === "aminities") {
      const index = filters[name].indexOf(value);
      if (index === -1) {
        setFilters((prev) => ({
          ...prev,
          [name]: [...prev[name], value],
        }));
      } else {
        setFilters((prev) => ({
          ...prev,
          [name]: prev[name].filter((item) => item !== value),
        }));
      }
    } else if (
      name === "propertyType" ||
      name === "totalAcre" ||
      name === "price"
    ) {
      const updatedPropertyType = filters[name] === value ? "" : value;
      const newFilters = { ...filters, [name]: updatedPropertyType, page: 1 };
      setFilters(newFilters);
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  function handlePriceChange(min, max) {
    if (filters.priceMin === min && filters.priceMax === max) {
      setFilters((prev) => ({
        ...prev,
        priceMin: "",
        priceMax: "",
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        priceMin: min,
        priceMax: max,
      }));
    }
  }

  useEffect(() => {
    if (checked) {
      mostSearchedProperties();
    }
  }, [checked, filters.propertyType]);

  return (
    <Grow
      in={checked}
      style={{ transformOrigin: "0 0 0" }}
      {...(checked ? { timeout: 800 } : {})}
    >
      <div className="fl-bg-white mt-3 border-raidus-10 p-3 position-absolute w-100 search-section">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-md-3">
                <div
                  className={`${
                    filters.propertyType === farmland
                      ? "fl-light-green-pill"
                      : "fl-light-gray-pill"
                  }  mb-4`}
                >
                  <FormControlLabel
                    control={<Checkbox hidden />}
                    label="Farmland"
                    name="propertyType"
                    value={farmland}
                    onChange={handleFiltersChange}
                    checked={filters.property === farmland}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div
                  className={`${
                    filters.propertyType === farmhouse
                      ? "fl-light-green-pill"
                      : "fl-light-gray-pill"
                  }  mb-4`}
                >
                  <FormControlLabel
                    control={<Checkbox hidden />}
                    label="Farmhouse"
                    name="propertyType"
                    value={farmhouse}
                    onChange={handleFiltersChange}
                    checked={filters.property === farmhouse}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div
                  className={`${
                    filters.propertyType === Estates
                      ? "fl-light-green-pill"
                      : "fl-light-gray-pill"
                  }  mb-4`}
                >
                  <FormControlLabel
                    control={<Checkbox hidden />}
                    label="Estates"
                    name="propertyType"
                    value={Estates}
                    onChange={handleFiltersChange}
                    checked={filters.property === Estates}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div
                  className={`${
                    filters.propertyType === agricultureLand
                      ? "fl-light-green-pill"
                      : "fl-light-gray-pill"
                  }  mb-4`}
                >
                  <FormControlLabel
                    control={<Checkbox hidden />}
                    label="Agriculture Land"
                    name="propertyType"
                    value={agricultureLand}
                    onChange={handleFiltersChange}
                    checked={filters.property === agricultureLand}
                  />
                </div>
              </div>
            </div>
          </div>
          {mostSearched?.length ? (
            <div className="col-12">
              <h5 className="text-uppercase fl-text-dark-green fl-right-border-line d-flex align-items-center my-3">
                {" "}
                <span className="d-inline-block fl-fit-content me-3">
                  Most&nbsp;Searched&nbsp;{filters.propertyType}
                </span>{" "}
                <span className="line"></span>
              </h5>
            </div>
          ) : (
            ""
          )}

          <div className="col-12 mb-4">
            <div className="header-card-slider-list">
              {mostSearched?.length < 3 ? (
                <div className="row">
                  {mostSearched.map((property, index) => (
                    <div className="col-md-4" key={index}>
                      <div className="item">
                        <div className="fl-small-card fl-border border-raidus-10">
                          <div className="mb-3 small-card-img-wrapper">
                            <div className="small-card-img">
                              <img
                                className="img-fluid w-100 fl-img-16-9"
                                src={property.heroImage}
                                alt="cardsmall"
                              />
                            </div>
                            <h3 className="text-white position-absolute position-absolute bottom-0 start-0 ms-2">
                              {formatNumberInCr(property.price)}  <span className="fs-6 font-normal">Onwards</span>
                            </h3>
                          </div>
                          <div className="px-2 fl-small-card-detail">
                            <h4 className="fl-text-dark fw-semi-bold">
                              {property.propertyTitle}
                            </h4>
                            <p className="mb-1">
                              <span className="d-inline-block">
                                <img className="" src={scale} alt="icon" />
                              </span>{" "}
                              <span>
                                {property.totalAcre}{" "}
                                {property?.plotArea
                                  ? property?.plotArea
                                  : "acre"}{" "}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Render Slider component
                <Slider {...setting3}>
                  {mostSearched?.map((property, index) => (
                    <div className="col-md-4" key={index}>
                      <div className="item">
                        <div className="fl-small-card fl-border border-raidus-10">
                          <div className="mb-3 small-card-img-wrapper">
                            <div className="small-card-img">
                              <Link
                                to={navigateToDetail(
                                  property?.propertyType,
                                  property?.propertyTitle,
                                  property?.propertyCode
                                )}
                                target="_blank"
                              >
                                <img
                                  className="img-fluid w-100 fl-img-16-9"
                                  src={property.heroImage}
                                  alt="cardsmall"
                                />
                              </Link>
                            </div>
                            <h3 className="text-white position-absolute position-absolute bottom-0 start-0 ms-2">
                              {formatNumberInCr(property.price)}  <span className="fs-6 font-normal">Onwards</span>
                            </h3>
                          </div>
                          <div className="px-2 fl-small-card-detail">
                            <Link
                              to={navigateToDetail(
                                property?.propertyType,
                                property?.propertyTitle,
                                property?.propertyCode
                              )}
                              target="_blank"
                            >
                              <h4 className="fl-text-dark fw-semi-bold">
                                {property.propertyTitle}
                              </h4>
                            </Link>
                            <p className="mb-1">
                              <span className="d-inline-block">
                                <img className="" src={scale} alt="icon" />
                              </span>{" "}
                              <span>
                                {property.totalAcre}{" "}
                                {property?.plotArea
                                  ? property?.plotArea
                                  : "acre"}{" "}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          </div>
          <div className="col-12">
            <h5 className="text-uppercase fl-text-dark-green fl-right-border-line d-flex align-items-center my-3">
              {" "}
              <span className="d-inline-block fl-fit-content me-3">
                Search&nbsp;by
              </span>{" "}
              <span className="line"></span>
            </h5>
          </div>
          <div className="col-12">
            <div className="row">
              <div className="col-md-4">
                <h5 className="fl-text-dark-green text-uppercase">
                  Project Size
                </h5>
                <ul className="text-start">
                  <li>
                    <p
                      className={`fs-6 mb-1 ${
                        filters.totalAcre === "30" && "text-success"
                      }`}
                    >
                      <FormControlLabel
                        className="m-0"
                        control={<Checkbox hidden />}
                        label="Under 30 acres"
                        value={"30"}
                        name="totalAcre"
                        onChange={handleFiltersChange}
                        checked={filters.totalAcre === "30"}
                      />
                    </p>
                  </li>
                  <li>
                    <p
                      className={`fs-6 mb-1 ${
                        filters.totalAcre === "30-60" && "text-success"
                      }`}
                    >
                      <FormControlLabel
                        className="m-0"
                        control={<Checkbox hidden />}
                        label="30 - 60 acres"
                        value={"30-60"}
                        name="totalAcre"
                        onChange={handleFiltersChange}
                        checked={filters.totalAcre === "30-60"}
                      />
                    </p>
                  </li>
                  <li>
                    <p
                      className={`fs-6 mb-1 ${
                        filters.totalAcre === "60-90" && "text-success"
                      }`}
                    >
                      <FormControlLabel
                        className="m-0"
                        control={<Checkbox hidden />}
                        label="60 - 90 acres"
                        value={"60-90"}
                        name="totalAcre"
                        onChange={handleFiltersChange}
                        checked={filters.totalAcre === "60-90"}
                      />
                    </p>
                  </li>
                  <li>
                    <p
                      className={`fs-6 mb-1 ${
                        filters.totalAcre === "above" && "text-success"
                      }`}
                    >
                      <FormControlLabel
                        className="m-0"
                        control={<Checkbox hidden />}
                        label="Above 90 acres"
                        value={"above"}
                        name="totalAcre"
                        onChange={handleFiltersChange}
                        checked={filters.totalAcre === "above"}
                      />
                    </p>
                  </li>
                </ul>
              </div>
              <div className="col-md-4">
                <h5 className="fl-text-dark-green text-uppercase">Amenities</h5>
                <ul>
                  <li>
                    <p className="fs-6 mb-1">
                      <FormControlLabel
                        className={`m-0 ${
                          filters.aminities.includes("Electricity") &&
                          "text-success"
                        }`}
                        control={<Checkbox hidden />}
                        label="Electricity"
                        name="aminities"
                        value="Electricity"
                        onChange={handleFiltersChange}
                        checked={filters.aminities.includes("Electricity")}
                      />
                    </p>
                  </li>
                  <li>
                    <p className="fs-6 mb-1">
                      <FormControlLabel
                        className={`m-0 ${
                          filters.aminities.includes("Swimming Pool") &&
                          "text-success"
                        }`}
                        control={<Checkbox hidden />}
                        label="Swimming Pool"
                        name="aminities"
                        value="Swimming Pool"
                        onChange={handleFiltersChange}
                        checked={filters.aminities.includes("Swimming Pool")}
                      />
                    </p>
                  </li>
                  <li>
                    <p className="fs-6 mb-1">
                      <FormControlLabel
                        className={`m-0 ${
                          filters.aminities.includes("Garden") && "text-success"
                        }`}
                        control={<Checkbox hidden />}
                        label="Garden"
                        value="Garden"
                        name="aminities"
                        onChange={handleFiltersChange}
                        checked={filters.aminities.includes("Garden")}
                      />
                    </p>
                  </li>
                  <li>
                    <p className="fs-6 mb-1">
                      <FormControlLabel
                        className={`m-0 ${
                          filters.aminities.includes("Club House") &&
                          "text-success"
                        }`}
                        control={<Checkbox hidden />}
                        label="Club House"
                        value="Club House"
                        name="aminities"
                        onChange={handleFiltersChange}
                        checked={filters.aminities.includes("Club House")}
                      />
                    </p>
                  </li>
                </ul>
              </div>
              <div className="col-md-4">
                <h5 className="fl-text-dark-green text-uppercase">Budget</h5>
                <ul>
                  <li>
                    <p className="fs-6 mb-1">
                      <FormControlLabel
                        className={`m-0 ${
                          Number(filters.priceMin) >= 1 &&
                          Number(filters.priceMax) <= "5000000" &&
                          "text-success"
                        }`}
                        control={<Checkbox hidden />}
                        label="under ₹50 Lakhs"
                        value={"50lac"}
                        name="price"
                        onChange={(e) => handlePriceChange("1", "5000000")}
                        checked={
                          filters.priceMin >= "1" &&
                          filters.priceMax <= "5000000"
                        }
                      />
                    </p>
                  </li>
                  <li>
                    <p className="fs-6 mb-1">
                      <FormControlLabel
                        className={`m-0 ${
                          Number(filters.priceMin) >= 5000000 &&
                          Number(filters.priceMax) <= 7000000 &&
                          "text-success"
                        }`}
                        control={<Checkbox hidden />}
                        label="₹50 - 70 Lakhs"
                        value={"50lac-70lac"}
                        name="price"
                        onChange={(e) =>
                          handlePriceChange("5000000", "7000000")
                        }
                        checked={
                          filters.priceMin >= "5000000" &&
                          filters.priceMax <= "5000000"
                        }
                      />
                    </p>
                  </li>
                  <li>
                    <p className="fs-6 mb-1">
                      <FormControlLabel
                        className={`m-0 ${
                          Number(filters.priceMin) >= 7000000 &&
                          Number(filters.priceMax) <= "9000000" &&
                          "text-success"
                        }`}
                        control={<Checkbox hidden />}
                        label="₹70 - 90 Lakhs"
                        value={"70lac-90lac"}
                        name="price"
                        onChange={(e) =>
                          handlePriceChange("7000000", "9000000")
                        }
                        checked={
                          filters.priceMin >= "7000000" &&
                          filters.priceMax <= "9000000"
                        }
                      />
                    </p>
                  </li>
                  <li>
                    <p className="fs-6 mb-1">
                      <FormControlLabel
                        className={`m-0 ${
                          Number(filters.priceMin) >= 10000000 &&
                          filters.priceMax <= 20000000 &&
                          "text-success"
                        }`}
                        control={<Checkbox hidden />}
                        label="₹1 - 2 Crores"
                        value={"1cr-2cr"}
                        name="price"
                        onChange={(e) =>
                          handlePriceChange("10000000", "20000000")
                        }
                        checked={
                          filters.priceMin >= "10000000" &&
                          filters.priceMax <= "20000000"
                        }
                      />
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Grow>
  );
}

export default SearchSection;
