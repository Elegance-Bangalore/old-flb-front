import React, { useState, useRef, useEffect } from "react";
import { capitalizeFirstLetter } from "@/CustomServices/Constant";
import { Location, SearchNormal, CloseCircle } from "iconsax-react";

const CitySelectionDropdown = ({ 
  isOpen, 
  onClose, 
  onCitySelect, 
  selectedCity, 
  allCities = [],
  triggerRef,
  onMouseEnter,
  onMouseLeave
}) => {
  const dropdownRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  // Hardcoded popular cities list
  const hardcodedPopularCities = [
    "Bengaluru",
    "Chennai", 
    "Chingleput",
    "Chikkaballapur",
    "Coimbatore",
    "Denkanikota",
    "Hyderabad",
    "Hosur",
    "Jaipur",
    "Mumbai",
    "Mysuru",
    "Noida",
    "Pune",
    "Ramanagara",
    "Rangareddi"
  ];

  // Categorize cities from API - assuming API provides categorized data
  const categorizeCities = () => {
    // Always use hardcoded popular cities
    const popular = hardcodedPopularCities;
    
    if (!allCities || allCities.length === 0) return { 
      popular, 
      nearby: [], 
      other: [] 
    };

    // If API provides categorized data, use it directly
    if (Array.isArray(allCities)) {
      const nearby = allCities.slice(0, 5);
      // Filter out popular cities from other cities
      const other = allCities.slice(5).filter(city => !popular.includes(city));
      
      return { popular, nearby, other };
    }

    // If API provides object with categories
    if (typeof allCities === 'object' && allCities.popular && allCities.nearby && allCities.other) {
      // Filter out popular cities from other cities
      const other = (allCities.other || []).filter(city => !popular.includes(city));
      return {
        popular,
        nearby: allCities.nearby || [],
        other
      };
    }

    return { popular, nearby: [], other: [] };
  };

  const { popular: popularCities, nearby: nearbyCities, other: otherCities } = categorizeCities();

  // Filter cities based on search query
  const filterCities = (cities) => {
    if (!debouncedSearchQuery.trim()) return cities;
    return cities.filter(city => 
      city.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
  };

  // Get filtered cities
  const filteredPopularCities = filterCities(popularCities);
  const filteredOtherCities = filterCities(otherCities);

  // Get nearby cities from API data
  const getNearbyCities = () => {
    return nearbyCities;
  };

  // Group other cities into columns
  const groupCitiesIntoColumns = (cities, columnsCount = 5) => {
    if (!cities || cities.length === 0) return [];
    
    const result = [];
    const citiesPerColumn = Math.ceil(cities.length / columnsCount);
    
    for (let i = 0; i < columnsCount; i++) {
      const startIndex = i * citiesPerColumn;
      const endIndex = startIndex + citiesPerColumn;
      result.push(cities.slice(startIndex, endIndex));
    }
    
    return result;
  };

  const otherCitiesColumns = groupCitiesIntoColumns(filteredOtherCities);

  // Debounce search query
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // 300ms delay

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          triggerRef.current && !triggerRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  const handleCityClick = (city) => {
    onCitySelect(city);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="city-dropdown-backdrop">
      <div 
        ref={dropdownRef}
        className="city-dropdown-container"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Header */}
        <div className="city-dropdown-header">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <Location size={20} color="#00a76f" />
              <span className="ms-2 fw-bold text-dark">INDIA</span>
            </div>
            <button
              className="btn-close-mobile"
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <CloseCircle size={24} color="#666" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="city-dropdown-content">
          {/* Search Input */}
          <div className="city-search-section">
            <div className="search-input-container">
              <SearchNormal size={18} color="#666" />
              <input
                type="text"
                placeholder="Search cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="city-search-input"
              />
            </div>
          </div>

          {/* Nearby Cities */}
          {/* {getNearbyCities().length > 0 && (
            <div className="city-section">
              <h6 className="city-section-title">Nearby Cities</h6>
              <div className="city-grid">
                {getNearbyCities().map((city, index) => (
                  <button
                    key={index}
                    className={`city-item ${selectedCity === city ? 'active' : ''}`}
                    onClick={() => handleCityClick(city)}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )} */}

          {/* Popular Cities */}
          {filteredPopularCities.length > 0 && (
            <div className="city-section">
              <h6 className="city-section-title">Popular Cities</h6>
              <div className="city-grid">
                {filteredPopularCities.map((city, index) => (
                  <button
                    key={index}
                    className={`city-item ${selectedCity === city ? 'active' : ''}`}
                    onClick={() => handleCityClick(city)}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Other Cities */}
          {filteredOtherCities.length > 0 && (
            <div className="city-section">
              <h6 className="city-section-title">Other Cities</h6>
              <div className="other-cities-grid">
                {otherCitiesColumns.map((column, columnIndex) => (
                  <div key={columnIndex} className="city-column">
                    {column.map((city, index) => (
                      <button
                        key={index}
                        className={`city-item ${selectedCity === city ? 'active' : ''}`}
                        onClick={() => handleCityClick(city)}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fallback if no cities from API */}
          {(!allCities || allCities.length === 0) && (
            <div className="city-section">
              <h6 className="city-section-title">No Cities Available</h6>
              <div className="text-center text-muted">
                <p>No cities are currently available. Please try again later.</p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Sections */}
        {/* <div className="city-dropdown-bottom">
          <div className="bottom-section">
            <div className="bottom-item">
              <div className="bottom-content">
                <h6>Owner Properties</h6>
                <button className="explore-btn">Explore →</button>
              </div>
            </div>
            <div className="bottom-item">
              <div className="bottom-content">
                <h6>Projects</h6>
                <button className="explore-btn">Explore →</button>
              </div>
            </div>
            <div className="bottom-item">
              <div className="bottom-content">
                <h6>New Homes</h6>
                <button className="explore-btn">Explore →</button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CitySelectionDropdown;
