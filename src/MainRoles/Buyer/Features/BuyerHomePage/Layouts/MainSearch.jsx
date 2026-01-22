import React, { useEffect, useState, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import cross from "@/CustomAssets/BuyerImages/fl-cross.svg";
import Grow from "@mui/material/Grow";
import { SearchNormal1 } from "iconsax-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchSection from "./SearchSection";
import useURLFilters from "@/CustomServices/useURLFilters";
import { selectFilter } from "@/features/properties/propertiesSlice";
import {
  capitalizeArray,
  capitalizeFirstLetter,
} from "@/CustomServices/Constant";
import CitySelectionDropdown from "./CitySelectionDropdown";

// Backdrop component
const Backdrop = ({ show, onClick }) => {
  return show ? <div className="backdrop" onClick={onClick}></div> : null;
};

const MainSearch = ({ headerHide = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const cityDropdownRef = useRef(null);
  const { cities } = useSelector(selectFilter);
  const capitalizedCities = capitalizeArray(cities);
  const [filters, setFilters] = useURLFilters();
  const [closeTimeout, setCloseTimeout] = useState(null);
  
  const placeholders = [
    "'Managed Farms near Hyderabad'",
    "'Farmland with Clubhouse'",
    "'Gated Farmland in Bangalore'",
    "'2 BHK farmhouse near Mumbai'",
    "'Estates near me'",
    "'10 bigha Agricultural Land near Chennai'",
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const updateFilters = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const updatedFilter = { ...filters, page: 1 };
    const searchParams = new URLSearchParams();
    Object.keys(updatedFilter).forEach((key) => {
      if (updatedFilter[key]) {
        if (Array.isArray(updatedFilter[key])) {
          searchParams.set(key, updatedFilter[key].join(","));
        } else {
          searchParams.set(key, updatedFilter[key]);
        }
      }
    });
    setChecked(false);
    const newSearch = searchParams.toString();
    navigate(`/property-list/?${newSearch}`, { state: filters });
    return newSearch;
  };

  const handleGlowChange = () => {
    setChecked((prev) => !prev);
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

  const openCityDropdown = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setCityDropdownOpen(true);
  };

  const closeCityDropdown = () => {
    const timeout = setTimeout(() => {
      setCityDropdownOpen(false);
    }, 100);
    setCloseTimeout(timeout);
  };

  const cancelCloseTimeout = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {!headerHide && (
              <>
                <Backdrop show={checked} onClick={handleGlowChange} />
                <div
                  className="d-flex mx-lg-auto fl-header-search-wrapper w-100"
                  style={{ zIndex: 2 }}
                >
                  <div className="w-100 position-relative">
                    <Grow
                      orientation="horizontal"
                      in={checked}
                      style={{ transformOrigin: "0 0 0" }}
                      {...(checked ? { timeout: 800 } : {})}
                    >
                      <button
                        className="fl-bg-white rounded-circle position-absolute top-50 start-100 translate-middle ms-5"
                        style={{ width: "3rem", height: "3rem" }}
                        type="button"
                        onClick={handleGlowChange}
                      >
                        <img
                          className="img-fluid"
                          style={{ width: "35%" }}
                          src={cross}
                          alt="cross"
                        />
                      </button>
                    </Grow>
                    <form className="w-100 d-flex" onSubmit={updateFilters}>
                      <div 
                        className="position-relative me-2 city-dropdown-wrapper"
                        onMouseLeave={closeCityDropdown}
                      >
                        <button
                          ref={cityDropdownRef}
                          type="button"
                          // className="form-select d-flex align-items-center justify-content-between"
                          style={{ 
                            width: "max-content", 
                            minWidth:"10rem",
                            height:"3rem",
                            cursor: "pointer",
                            border: "1px solid #ced4da",
                            borderRadius: "0.375rem",
                            padding: "0.375rem 0.75rem",
                            backgroundColor: "white",
                            fontSize: "10px"
                          }}
                          onMouseEnter={openCityDropdown}
                        >
                          <span className={filters.city ? "text-dark" : "text-muted"} >
                            {filters.city || "Select City"}
                          </span>
                          {/* <ArrowDown2 
                            size={16} 
                            color="#6c757d"
                            className={`transition-transform ${cityDropdownOpen ? 'rotate-180' : ''}`}
                          /> */}
                        </button>
                        
                        {/* City Selection Dropdown */}
                        {cityDropdownOpen && (
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
                        )}
                      </div>

                      <div
                        onClick={handleGlowChange}
                        className="w-100 position-relative placeholder-wrapper"
                      >
                        <TransitionGroup component={null}>
                          {!filters.search && (
                            <CSSTransition
                              key={placeholderIndex}
                              classNames="placeholder-slide"
                              timeout={100}
                            >
                              <span
                                className="placeholder-text"
                                style={{ fontSize: "14px" }}
                              >
                                {placeholders[placeholderIndex]}
                              </span>
                            </CSSTransition>
                          )}
                        </TransitionGroup>
                        <input
                          className="form-control w-100"
                          type="search"
                          value={filters.search}
                          onChange={(e) =>
                            setFilters({ ...filters, search: e.target.value })
                          }
                        />
                        <button
                          className="position-absolute top-0 end-0 header-filter-search"
                          type="submit"
                          style={{ width: "3rem", height: "3rem" }}
                        >
                          <SearchNormal1 color="#00a76f"  
                            className="bg-white zoom-animation"
                            type="submit"
                            onClick={updateFilters}
                          />
                        </button>
                      </div>
                    </form>
                    <SearchSection
                      checked={checked}
                      filters={filters}
                      setFilters={setFilters}
                    />
                  </div>
                </div>
              </>
            )}
    </>
  );
};

export default MainSearch;