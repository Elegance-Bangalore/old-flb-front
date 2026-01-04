import React, { useEffect, useState, useRef } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { selectUser, setLogout, setUser } from "@/Redux/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import rupee from "../../../../../../CustomAssets/BuyerImages/fl-rupee.svg";
import scale from "../../../../../../CustomAssets/BuyerImages/fl-scale.svg";
import Slider from "react-slick";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { HambergerMenu, SearchNormal1, User, ArrowDown2 } from "iconsax-react";
import { selectFilter } from "@/features/properties/propertiesSlice";
import useURLFilters from "@/CustomServices/useURLFilters";
import {
  capitalizeArray,
  formatPropertyType,
  navigateToDetail,
  capitalizeFirstLetter,
} from "@/CustomServices/Constant";
import {
  farmhouse,
  Estates,
  agricultureLand,
  farmland,
  formatNumberInCr,
} from "@/CustomServices/Constant";
import { mostSearchedPropertyApi } from "@/ApiRoutes/BuyersApi";
import { toastMessage } from "@/CustomServices/ToastMessage";
import CitySelectionDropdown from "../../Layouts/CitySelectionDropdown";
import "../../Layouts/CitySelectionDropdown.css";

const MobileSearch = () => {
  const [checked, setChecked] = useState(false);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const { cities } = useSelector(selectFilter);
  const capitalizedCities = capitalizeArray(cities);
  const [filters, setFilters] = useURLFilters();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const [mostSearched, setMostSearched] = useState([]);
  
  // City dropdown state
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const cityDropdownRef = useRef(null);
  const [closeTimeout, setCloseTimeout] = useState(null);

  function getPerAcre(price, area) {
    const perAcre = Number(price) / Number(area).toFixed(2);
    return formatNumberInCr(perAcre);
  }

  const updateFilters = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const searchParams = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        if (Array.isArray(filters[key])) {
          searchParams.set(key, filters[key].join(","));
        } else {
          searchParams.set(key, filters[key]);
        }
      }
    });
    // setChecked(false)
    const newSearch = searchParams.toString();
    navigate(`/property-list/?${newSearch}`, { state: filters });
    return newSearch;
  };

  async function mostSearchedCities() {
    try {
      const response = await mostSearchedPropertyApi(filters.propertyType);
      setMostSearched(response.data.mostSearched);
    } catch (error) {
      toastMessage();
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

  // City dropdown handlers
  const openCityDropdown = () => {
    // Clear any existing timeout
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setCityDropdownOpen(true);
  };

  const closeCityDropdown = () => {
    const timeout = setTimeout(() => {
      setCityDropdownOpen(false);
    }, 200); // 200ms delay
    setCloseTimeout(timeout);
  };

  const cancelCloseTimeout = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
  };

  const handleCitySelect = (city) => {
    setFilters({ ...filters, city: city });
    
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("city", capitalizeFirstLetter(city));
    
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  useEffect(() => {
    if (filters.propertyType) {
      mostSearchedCities();
    }
  }, [checked, filters.propertyType]);


  const postProperty = () => {
    if (!user) {
      toast.success("Please make a seller account first");
      navigate("/register");
    } else if (user.interested === buy) {
      toast.info("Please login as seller");
    } else if (user.interested === admin || user.interested === subAdmin) {
      navigate("/admin/add-property");
    } else if (user.interested === sell) {
      navigate("/seller/post-property");
    }
  };

  const setting3 = {
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true, // Enable center mode
    centerPadding: "0", // Adjust spacing between slides
    responsive: [
      {
        breakpoint: 768, // Adjust the breakpoint according to your design needs
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <style>
        {`
          /* Mobile-specific city dropdown adjustments */
          @media (max-width: 768px) {
            .city-dropdown-backdrop {
              padding-top: 20px;
              padding-left: 10px;
              padding-right: 10px;
            }
            
            .city-dropdown-backdrop .city-dropdown-container {
              min-width: 90vw;
              max-width: 90vw;
            }
            
            .city-dropdown-container {
              min-width: 90vw !important;
              max-width: 90vw !important;
              max-height: 70vh;
            }
            
            .other-cities-grid {
              grid-template-columns: repeat(2, 1fr);
            }
            
            .city-grid {
              grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
            }
          }
        `}
      </style>
      <main className="buyers-main">
        <div className="mobile-main-search-hero">
          <div className="mobile-search-header px-4">
            <Link to="/">
              <ArrowBackIosIcon />
            </Link>{" "}
            <h4 className="fw-bold mb-0">Search</h4>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="mt-3 px-2">
                  <form className="w-100" onSubmit={updateFilters}>
                    <div className="form-group mb-4">
                      <div 
                        className="position-relative city-dropdown-wrapper"
                        onMouseLeave={closeCityDropdown}
                      >
                        <button
                          ref={cityDropdownRef}
                          type="button"
                          className="form-select form-control d-flex align-items-center justify-content-between"
                          style={{ 
                            cursor: "pointer",
                            border: "1px solid #ced4da",
                            borderRadius: "0.375rem",
                            padding: "0.375rem 0.75rem",
                            backgroundColor: "white",
                            fontSize: "14px"
                          }}
                          onClick={openCityDropdown}
                        >
                          <span className={filters.city ? "text-dark" : "text-muted"} >
                            {filters.city || "Select City"}
                          </span>
                          <ArrowDown2 
                            size={16} 
                            color="#6c757d"
                            className={`transition-transform ${cityDropdownOpen ? 'rotate-180' : ''}`}
                          />
                        </button>
                        
                        {/* City Selection Dropdown */}
                        {cityDropdownOpen && (
                          <div style={{ position: 'relative', zIndex: 1001 }}>
                            <CitySelectionDropdown
                              isOpen={cityDropdownOpen}
                              onClose={() => setCityDropdownOpen(false)}
                              onCitySelect={handleCitySelect}
                              selectedCity={filters.city}
                              allCities={capitalizedCities}
                              triggerRef={cityDropdownRef}
                              onMouseEnter={cancelCloseTimeout}
                              onMouseLeave={closeCityDropdown}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="form-group mb-4 position-relative">
                      <input
                        className="form-control"
                        type="search"
                        placeholder="Search by location, property type"
                        value={filters.search}
                        onChange={(e) =>
                          setFilters({ ...filters, search: e.target.value })
                        }
                      />
                      <button
                        className="border-0 bg-transparent position-absolute end-0 top-50 translate-middle-y"
                        type="submit"
                        onClick={updateFilters}
                      >
                        <SearchNormal1
                          className="mb-1"
                          size="20"
                          color="#00a76f"
                          type="submit"
                        />
                      </button>
                    </div>
                    <div className="">
                    <div className="d-flex justify-content-end">
                    <button
                        className="fl-btn-green btn mb-3"
                        type="submit"
                        onClick={updateFilters}
                      >
                        Search&nbsp;
                      </button>
                    </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-12">
                <div className="mt-2 px-2">
                  <div className="row mobile-category-tab">
                    <div className="col-12">
                      <h4 className="fl-text-green mb-4">
                        Explore Farm Categories
                      </h4>
                    </div>
                    <div className="col-12">
                      <div className="row">
                        <div className="col-6">
                          <div
                            className={`${
                              filters.propertyType === farmland
                                ? "fl-light-green-pill"
                                : "fl-light-gray-pill"
                            }  mb-4`}
                          >
                            <FormControlLabel
                              control={<Checkbox hidden />}
                              label={
                                <Typography
                                  className={`${
                                    filters.propertyType === farmland
                                      ? "fl-text-green"
                                      : " "
                                  }`}
                                  sx={{ fontSize: ".85rem" }}
                                >
                                  Farmland
                                </Typography>
                              }
                              name="propertyType"
                              value={farmland}
                              onChange={handleFiltersChange}
                              checked={filters.property === farmland}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div
                            className={`${
                              filters.propertyType === farmhouse
                                ? "fl-light-green-pill"
                                : "fl-light-gray-pill"
                            }  mb-4`}
                          >
                            <FormControlLabel
                              control={<Checkbox hidden />}
                              label={
                                <Typography
                                  className={`${
                                    filters.propertyType === farmhouse
                                      ? "fl-text-green"
                                      : " "
                                  }`}
                                  sx={{ fontSize: ".85rem" }}
                                >
                                  Farmhouse
                                </Typography>
                              }
                              name="propertyType"
                              value={farmhouse}
                              onChange={handleFiltersChange}
                              checked={filters.property === farmhouse}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div
                            className={`${
                              filters.propertyType === Estates
                                ? "fl-light-green-pill"
                                : "fl-light-gray-pill"
                            }  mb-4`}
                          >
                            <FormControlLabel
                              control={<Checkbox hidden />}
                              label={
                                <Typography
                                  className={`${
                                    filters.propertyType === Estates
                                      ? "fl-text-green"
                                      : " "
                                  }`}
                                  sx={{ fontSize: ".85rem" }}
                                >
                                   Estates
                                </Typography>
                              }
                              name="propertyType"
                              value={Estates}
                              onChange={handleFiltersChange}
                              checked={filters.property === Estates}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div
                            className={`${
                              filters.propertyType === agricultureLand
                                ? "fl-light-green-pill"
                                : "fl-light-gray-pill"
                            }  mb-4`}
                          >
                            <FormControlLabel
                              control={<Checkbox hidden />}
                              label={
                                <Typography
                                  className={`${
                                    filters.propertyType === agricultureLand
                                      ? "fl-text-green"
                                      : " "
                                  }`}
                                  sx={{ fontSize: ".85rem" }}
                                >
                                  Agriculture Land
                                </Typography>
                              }
                              name="propertyType"
                              value={agricultureLand}
                              onChange={handleFiltersChange}
                              checked={filters.property === agricultureLand}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {mostSearched.length ? (
                      <>
                        <div className="col-12">
                          <h4 className="fl-text-green mb-4">
                            
                            Most Searched{" "}
                            {formatPropertyType(filters.propertyType)}
                          </h4>
                        </div>
                        <div className="col-12 mb-4">
                          <div className="header-card-slider-list">
                            {mostSearched.length < 3 ? (
                              // Render images directly without Slider
                              <div className="row">
                                {mostSearched.map((property, index) => (
                                  <div className="col-md-4" key={index}>
                                    <div className="item">
                                      <div className="fl-small-card fl-border border-raidus-10">
                                        <div className="mb-3 small-card-img-wrapper">
                                          <div className="small-card-img">
                                            <img
                                              className="img-fluid w-100 fl-img-16-9"
                                              src={property?.heroImage}
                                              alt="cardsmall"
                                            />
                                          </div>
                                          <h3 className="text-white position-absolute position-absolute bottom-0 start-0 ms-2">
                                            {formatNumberInCr(property.price)}
                                          </h3>
                                        </div>
                                        <div className="px-2 fl-small-card-detail">
                                          <h4 className="fl-text-dark fw-semi-bold">
                                            {property.propertyTitle}
                                          </h4>
                                          <p className="mb-1">
                                            <span className="d-inline-block">
                                              <img
                                                className=""
                                                src={scale}
                                                alt="icon"
                                              />
                                            </span>
                                            {property.plotArea === "acre" ? (
                                              <span>
                                                {property.totalAcre} Acre
                                              </span>
                                            ) : (
                                              <span>{property.totalAcre} </span>
                                            )}
                                          </p>
                                          <p>
                                            <span className="d-inline-block">
                                              <img
                                                className=""
                                                src={rupee}
                                                alt="icon"
                                              />
                                            </span>
                                            <span>
                                              {property?.pricePerSqft
                                                ? formatNumberInCr(
                                                    property?.pricePerSqft
                                                  )
                                                : getPerAcre(
                                                    property.price,
                                                    property.totalAcre
                                                  )}{" "}
                                              /{" "}
                                              {property?.plotArea
                                                ? property?.plotArea
                                                : "acre"}
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
                                {mostSearched.map((property, index) => (
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
                                                src={property?.heroImage}
                                                alt="cardsmall"
                                              />
                                            </Link>
                                          </div>
                                          <h3 className="text-white position-absolute position-absolute bottom-0 start-0 ms-2">
                                            {formatNumberInCr(property.price)}
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
                                              <img
                                                className=""
                                                src={scale}
                                                alt="icon"
                                              />
                                            </span>
                                            {property.plotArea === "acre" ? (
                                              <span>
                                                {property.totalAcre} Acre
                                              </span>
                                            ) : (
                                              <span>{property.totalAcre} </span>
                                            )}
                                          </p>
                                          <p>
                                            <span className="d-inline-block">
                                              <img
                                                className=""
                                                src={rupee}
                                                alt="icon"
                                              />
                                            </span>
                                            <span>
                                              {property?.pricePerSqft
                                                ? formatNumberInCr(
                                                    property?.pricePerSqft
                                                  )
                                                : getPerAcre(
                                                    property.price,
                                                    property.totalAcre
                                                  )}{" "}
                                              /{" "}
                                              {property?.plotArea
                                                ? property?.plotArea
                                                : "acre"}
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
                      </>
                    ) : null}

                    {/* <div className="col-12">
                      <h4 className="fl-text-green mb-4">Search by</h4>
                    </div>
                    <div className="col-12">
                      <div className="row">
                        <div className="col-6">
                          <h5 className="fl-text-dark fl-fs-14 text-uppercase">
                            Plot Size
                          </h5>
                          <ul className="text-start">
                            <li>
                              <p
                                className={`fs-6 mb-1 ${
                                  filters.totalAcre === "30" && "fl-text-green"
                                }`}
                              >
                                <FormControlLabel
                                  className="m-0"
                                  control={<Checkbox hidden />}
                                  label={
                                    <Typography
                                      className={`${
                                        filters.totalAcre === "30" &&
                                        "fl-text-green"
                                      }`}
                                      sx={{ fontSize: ".85rem" }}
                                    >
                                      Under 30 acres
                                    </Typography>
                                  }
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
                                  filters.totalAcre === "30-60" &&
                                  "fl-text-green"
                                }`}
                              >
                                <FormControlLabel
                                  className="m-0"
                                  control={<Checkbox hidden />}
                                  label={
                                    <Typography
                                      className={`${
                                        filters.totalAcre === "30-60" &&
                                        "fl-text-green"
                                      }`}
                                      sx={{ fontSize: ".85rem" }}
                                    >
                                      30 - 60 acres
                                    </Typography>
                                  }
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
                                  filters.totalAcre === "60-90" &&
                                  "fl-text-green"
                                }`}
                              >
                                <FormControlLabel
                                  className="m-0"
                                  control={<Checkbox hidden />}
                                  label={
                                    <Typography
                                      className={`${
                                        filters.totalAcre === "60-90" &&
                                        "fl-text-green"
                                      }`}
                                      sx={{ fontSize: ".85rem" }}
                                    >
                                      60 - 90 acres
                                    </Typography>
                                  }
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
                                  filters.totalAcre === "above" &&
                                  "fl-text-green"
                                }`}
                              >
                                <FormControlLabel
                                  className="m-0"
                                  control={<Checkbox hidden />}
                                  label={
                                    <Typography
                                      className={`${
                                        filters.totalAcre === "above" &&
                                        "fl-text-green"
                                      }`}
                                      sx={{ fontSize: ".85rem" }}
                                    >
                                      Above 90 acres
                                    </Typography>
                                  }
                                  value={"above"}
                                  name="totalAcre"
                                  onChange={handleFiltersChange}
                                  checked={filters.totalAcre === "above"}
                                />
                              </p>
                            </li>
                          </ul>
                        </div>
                        <div className="col-6">
                          <h5 className="fl-text-dark fl-fs-14 text-uppercase">
                            Amenities 
                          </h5>
                          <ul>
                            <li>
                              <p className="fs-6 mb-1">
                                <FormControlLabel
                                  className={`m-0 ${
                                    filters.aminities.includes("Electricity") &&
                                    "fl-text-green"
                                  }`}
                                  control={<Checkbox hidden />}
                                  label={
                                    <Typography
                                      className={`${
                                        filters.aminities.includes(
                                          "Electricity"
                                        ) && "fl-text-green"
                                      }`}
                                      sx={{ fontSize: ".85rem" }}
                                    >
                                      Electricity
                                    </Typography>
                                  }
                                  name="aminities"
                                  value="Electricity"
                                  onChange={handleFiltersChange}
                                  checked={filters.aminities.includes(
                                    "Electricity"
                                  )}
                                />
                              </p>
                            </li>
                            <li>
                              <p className="fs-6 mb-1">
                                <FormControlLabel
                                  className={`m-0 ${
                                    filters.aminities.includes(
                                      "Swimming Pool"
                                    ) && "fl-text-green"
                                  }`}
                                  control={<Checkbox hidden />}
                                  label={
                                    <Typography
                                      className={`${
                                        filters.aminities.includes(
                                          "Swimming Pool"
                                        ) && "fl-text-green"
                                      }`}
                                      sx={{ fontSize: ".85rem" }}
                                    >
                                      Swimming Pool
                                    </Typography>
                                  }
                                  name="aminities"
                                  value="Swimming Pool"
                                  onChange={handleFiltersChange}
                                  checked={filters.aminities.includes(
                                    "Swimming Pool"
                                  )}
                                />
                              </p>
                            </li>
                            <li>
                              <p className="fs-6 mb-1">
                                <FormControlLabel
                                  className={`m-0 ${
                                    filters.aminities.includes("Garden") &&
                                    "fl-text-green"
                                  }`}
                                  control={<Checkbox hidden />}
                                  label={
                                    <Typography
                                      className={`${
                                        filters.aminities.includes("Garden") &&
                                        "fl-text-green"
                                      }`}
                                      sx={{ fontSize: ".85rem" }}
                                    >
                                      Garden
                                    </Typography>
                                  }
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
                                    "fl-text-green"
                                  }`}
                                  control={<Checkbox hidden />}
                                  label={
                                    <Typography
                                      className={`${
                                        filters.aminities.includes(
                                          "Club House"
                                        ) && "fl-text-green"
                                      }`}
                                      sx={{ fontSize: ".85rem" }}
                                    >
                                      Club House
                                    </Typography>
                                  }
                                  value="Club House"
                                  name="aminities"
                                  onChange={handleFiltersChange}
                                  checked={filters.aminities.includes(
                                    "Club House"
                                  )}
                                />
                              </p>
                            </li>
                          </ul>
                        </div>
                        <div className="col-6">
                          <h5 className="fl-text-dark fl-fs-14 text-uppercase">
                            Budget
                          </h5>
                          <ul>
                            <li>
                              <p className="fs-6 mb-1">
                                <FormControlLabel
                                  className={`m-0 ${
                                    filters.priceMin >= "1" &&
                                    filters.priceMax <= "5000000" &&
                                    "fl-text-green"
                                  }`}
                                  control={<Checkbox hidden />}
                                  label={
                                    <Typography
                                      className={`${
                                        filters.priceMin >= "1" &&
                                        filters.priceMax <= "5000000" &&
                                        "fl-text-green"
                                      }`}
                                      sx={{ fontSize: ".85rem" }}
                                    >
                                      under ₹50 Lakhs
                                    </Typography>
                                  }
                                  value={"50lac"}
                                  name="price"
                                  onChange={(e) =>
                                    handlePriceChange("1", "5000000")
                                  }
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
                                    filters.priceMin >= "5000000" &&
                                    filters.priceMax <= "7000000" &&
                                    "fl-text-green"
                                  }`}
                                  control={<Checkbox hidden />}
                                  label={
                                    <Typography
                                      className={`${
                                        filters.priceMin >= "5000000" &&
                                        filters.priceMax <= "7000000" &&
                                        "fl-text-green"
                                      }`}
                                      sx={{ fontSize: ".85rem" }}
                                    >
                                      ₹50 - 70 Lakhs
                                    </Typography>
                                  }
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
                                    filters.priceMin >= "7000000" &&
                                    filters.priceMax <= "9000000" &&
                                    "fl-text-green"
                                  }`}
                                  control={<Checkbox hidden />}
                                  label={
                                    <Typography
                                      className={`${
                                        filters.priceMin >= "7000000" &&
                                        filters.priceMax <= "9000000" &&
                                        "fl-text-green"
                                      }`}
                                      sx={{ fontSize: ".85rem" }}
                                    >
                                      ₹70 - 90 Lakhs
                                    </Typography>
                                  }
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
                                    filters.priceMin >= "10000000" &&
                                    filters.priceMax <= "20000000" &&
                                    "fl-text-green"
                                  }`}
                                  control={<Checkbox hidden />}
                                  label={
                                    <Typography
                                      className={`${
                                        filters.priceMin >= "10000000" &&
                                        filters.priceMax <= "20000000" &&
                                        "fl-text-green"
                                      }`}
                                      sx={{ fontSize: ".85rem" }}
                                    >
                                      ₹1 - 2 Crores
                                    </Typography>
                                  }
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
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MobileSearch;
