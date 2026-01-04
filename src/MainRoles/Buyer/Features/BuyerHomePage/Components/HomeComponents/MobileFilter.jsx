import React, { useEffect, useState, useRef } from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ArrowDown2 } from "iconsax-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Checkbox,
    FormControl,
    FormControlLabel, 
    InputLabel,
    MenuItem,
    Select,
    Slider,
    TextField, 
    Typography,
} from "@mui/material"; 
import { propertyCategoryListApi } from "@/ApiRoutes/AdminApi";
import useURLFilters from "@/CustomServices/useURLFilters";
import { useSelector } from "react-redux";
import { selectFilter } from "@/features/properties/propertiesSlice";
import { buyerPropertyListApi } from "@/ApiRoutes/SellerApis";
import { agricultureLand, capitalizeArray, Estates, farmhouse, farmland } from "@/CustomServices/Constant";
import graph from "@/CustomAssets/BuyerImages/graph-shape.svg";
import CitySelectionDropdown from "../../Layouts/CitySelectionDropdown";
import "../../Layouts/CitySelectionDropdown.css";


function valuetext(value) {
    return `${value.toLocaleString()} ₹`;
}

function valueLabelFormat(value) {
    return `${(value / 100000).toFixed(2)} Lakh ₹`;
}


const MobileFilter = () => {

    const [filters, setFilters] = useURLFilters();
    const [propertyList, setPropertyList] = useState([]);
    const [loader, setLoader] = useState(true);
    const [count, setCount] = useState(0)
    const location = useLocation();
    const [timer, setTimer] = useState(null);
    const state = location.state;
    const navigate = useNavigate();
    const [priceRange, setPriceRange] = useState([0, 0]);
    const { cities } = useSelector(selectFilter);
    const capitalizedCities = capitalizeArray(cities);
    const [categoryList, setCategoryList] = useState([]);
    const [saved, setSaved] = useState([]);
    
    // City dropdown state
    const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
    const cityDropdownRef = useRef(null);
    const [closeTimeout, setCloseTimeout] = useState(null);

    const handleFilterChange = (e) => {
        const { name, value, checked, type } = e.target;
        if (name === "aminities") {
            let updatedAmenities = [...filters.aminities];
            if (!updatedAmenities.includes(value)) {
                updatedAmenities.push(value);
            } else {
                updatedAmenities = updatedAmenities.filter((item) => item !== value);
            }
            const newFilters = { ...filters, aminities: updatedAmenities, page: 1 };
            const newSearch = setFilters(newFilters);
            navigate(`?${newSearch}`);
        } else if (name === "propertyType" || name === "totalAcre" || name === "categoryId") {
            const updatedPropertyType = filters[name] === value ? "" : value;
            const newFilters = { ...filters, [name]: updatedPropertyType, page: 1 };
            const newSearch = setFilters(newFilters);
            navigate(`?${newSearch}`);
        } else if (name === "price") {
            setPriceRange(value)
            const [priceMin, priceMax] = value;
            const newFilters = { ...filters, priceMin: priceMin, priceMax: priceMax, page: 1 };
            const newSearch = setFilters(newFilters);
            navigate(`?${newSearch}`);
        } else if (name === "priceMin") {
            const updatePrice = priceRange
            updatePrice[0] = value
            setPriceRange(updatePrice)
            const newFilters = { ...filters, [name]: value, page: 1 };
            const newSearch = setFilters(newFilters);
            navigate(`?${newSearch}`);
        } else if (name === "priceMax") {
            const updatePrice = priceRange
            updatePrice[1] = value
            setPriceRange(updatePrice)
            const newFilters = { ...filters, [name]: value, page: 1 };
            const newSearch = setFilters(newFilters);
            navigate(`?${newSearch}`);
        } else {
            const newFilters = { ...filters, [name]: value, page: 1 };
            const newSearch = setFilters(newFilters);
            navigate(`?${newSearch}`);
        }
    };

    // City dropdown handlers
    const openCityDropdown = () => {
        setCityDropdownOpen(true);
        if (closeTimeout) {
            clearTimeout(closeTimeout);
            setCloseTimeout(null);
        }
    };

    const closeCityDropdown = () => {
        const timeout = setTimeout(() => {
            setCityDropdownOpen(false);
        }, 200);
        setCloseTimeout(timeout);
    };

    const cancelCloseTimeout = () => {
        if (closeTimeout) {
            clearTimeout(closeTimeout);
            setCloseTimeout(null);
        }
    };

    const handleCitySelect = (city) => {
        const newFilters = { ...filters, city: city, page: 1 };
        const newSearch = setFilters(newFilters);
        navigate(`?${newSearch}`);
    };

    function redirectToList(e) {
        e.preventDefault();
        e.stopPropagation();
        const updatedFilter = { ...filters, page: 1 };
        const searchParams = new URLSearchParams();
        Object.keys(updatedFilter).forEach(key => {
            if (updatedFilter[key]) {
                if (Array.isArray(updatedFilter[key])) {
                    searchParams.set(key, updatedFilter[key].join(','));
                } else {
                    searchParams.set(key, updatedFilter[key]);
                }
            }
        });
        const newSearch = searchParams.toString();
        navigate(`/property-list/?${newSearch}`, { state: filters })
    }

    const listOfProperty = () => {
        setLoader(true);
        buyerPropertyListApi(filters)
            .then((res) => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
                setLoader(false);
                setPropertyList(res.data.res);
                setCount(res.data.filterCount);
                const saved = res.data.res.map((element) => element.saved);
                setSaved(saved);
            })
            .catch((err) => setLoader(false));
    };


    const clearFilters = () => {
        setFilters({
            search: "",
            propertyType: "",
            page: 1,
            status: "",
            city: "",
            aminities: [],
            price: "",
            totalAcre: "",
            priceMin: 0,
            priceMax: 0,
            order: ""
        })
        setPriceRange(["", ""])
        navigate("?")
    }


    useEffect(() => {
        clearTimeout(timer);
        const delay = setTimeout(() => {
            listOfProperty()
        }, 700);
        setTimer(delay);
        return () => clearTimeout(delay);

    }, [location.search, filters])

    useEffect(() => {
        if (state) {
            setFilters((prev) => ({
                ...prev, priceMax: state.priceMax, priceMin: state.priceMin
            }))
            setPriceRange([state.priceMin, state.priceMax])
        }
    }, [location.search])

    async function getCategoryList() {
        try {
            const response = await propertyCategoryListApi();
            setCategoryList(response?.data?.response)
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        getCategoryList()
    }, [])



    return (
        <>
            <main className="buyers-main">
                <div className="mobile-main-search-hero d-flex flex-column justify-content-between vh-100">
                    <div className="mobile-search-header px-4">
                        <Link to="/property-list"><ArrowBackIosIcon /></Link> <h4 className='fw-bold mb-0'>Filter</h4>
                    </div>
                    <div className="container px-1">
                        <div className="fl-property-list-filer-hero  mt-4 border-0" style={{ maxHeight: "70vh", overflowY: "scroll", overflowX: "hidden" }}>
                            <div className="py-4 px-3">
                                <div className="mb-4 pb-lg-2">
                                    <div 
                                        className="position-relative city-dropdown-wrapper"
                                        onMouseLeave={closeCityDropdown}
                                    >
                                        <button
                                            ref={cityDropdownRef}
                                            type="button"
                                            className="form-select form-control d-flex align-items-center justify-content-between mobile-city-dropdown-btn"
                                            style={{ 
                                                cursor: "pointer",
                                                border: "1px solid #ced4da",
                                                borderRadius: "0.375rem",
                                                padding: "0.375rem 0.75rem",
                                                backgroundColor: "white"
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
                                <div className="mb-4 pb-lg-2">
                                    <TextField
                                        label="Search by name, location, budget, property type"
                                        id="outlined-size-small"
                                        name="search"
                                        value={filters.search}
                                        onChange={handleFilterChange} />
                                </div>
                                <div className="mb-4 mt-5 pb-lg-2">
                                    <h4 className="fl-text-dark fl-fw-600 fs-5 mb-4">Property Type</h4>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className={`${filters.propertyType === farmland ? "fl-light-green-pill" : "fl-light-gray-pill"}  mb-4`}>
                                                <FormControlLabel
                                                    control={<Checkbox hidden />}
                                                    label={
                                                        <Typography className={`${filters.propertyType === farmland ? "fl-text-green" : ""}`} sx={{ fontSize: '.85rem' }}>
                                                            Farmland
                                                        </Typography>
                                                    }
                                                    name='propertyType'
                                                    value={farmland}
                                                    onChange={handleFilterChange}
                                                    checked={filters.property === farmland}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className={`${filters.propertyType === farmhouse ? "fl-light-green-pill" : "fl-light-gray-pill"}  mb-4`}>
                                                <FormControlLabel
                                                    control={<Checkbox hidden />}
                                                    label={
                                                        <Typography className={`${filters.propertyType === farmhouse ? "fl-text-green" : ""}`} sx={{ fontSize: '.85rem' }}>
                                                            Farmhouse
                                                        </Typography>
                                                    }
                                                    name='propertyType'
                                                    value={farmhouse}
                                                    onChange={handleFilterChange}
                                                    checked={filters.property === farmhouse}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className={`${filters.propertyType === Estates ? "fl-light-green-pill" : "fl-light-gray-pill"}  mb-4`}>
                                                <FormControlLabel
                                                    control={<Checkbox hidden />}
                                                    label={
                                                        <Typography className={`${filters.propertyType === Estates ? "fl-text-green" : ""}`} sx={{ fontSize: '.85rem' }}>
                                                             Estates
                                                        </Typography>
                                                    }
                                                    name='propertyType'
                                                    value={Estates}
                                                    onChange={handleFilterChange}
                                                    checked={filters.property === Estates}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className={`${filters.propertyType === agricultureLand ? "fl-light-green-pill" : "fl-light-gray-pill"}  mb-4`}>
                                                <FormControlLabel
                                                    control={<Checkbox hidden />}
                                                    label={
                                                        <Typography className={`${filters.propertyType === agricultureLand ? "fl-text-green" : ""}`} sx={{ fontSize: '.85rem' }}>
                                                            Agriculture Land
                                                        </Typography>
                                                    }
                                                    name='propertyType'
                                                    value={agricultureLand}
                                                    onChange={handleFilterChange}
                                                    checked={filters.property === agricultureLand}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4 pb-lg-2">
                                    <h4 className="fl-text-dark fl-fw-600 fs-5 mb-4">Price Range</h4>
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
                                        <div className="col-6 mb-4 mb-md-0">
                                            <TextField
                                                id=""
                                                label="From"
                                                variant="outlined"
                                                name="priceMin"
                                                value={priceRange[0]}
                                                onChange={handleFilterChange}
                                            />
                                        </div>
                                        <div className="col-6 mb-4 mb-md-0">
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
                                    <h4 className="fl-text-dark fl-fw-600 fs-5 mb-4">Plot Size</h4>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className={`${filters.totalAcre === "30" ? "fl-light-green-pill" : "fl-light-gray-pill"} mb-4`}>
                                                <FormControlLabel
                                                    control={<Checkbox hidden />}
                                                    label={
                                                        <Typography className={`${filters.totalAcre === "30" ? "fl-text-green" : ""}`} sx={{ fontSize: '.85rem' }}>
                                                            Under 30 Acres
                                                        </Typography>
                                                    }
                                                    name='totalAcre'
                                                    value="30"
                                                    onChange={handleFilterChange}
                                                    checked={filters.totalAcre === "30"}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className={`${filters.totalAcre === "30-60" ? "fl-light-green-pill" : "fl-light-gray-pill"} mb-4`}>
                                                <FormControlLabel
                                                    control={<Checkbox hidden />}
                                                    label={
                                                        <Typography className={`${filters.totalAcre === "30-60" ? "fl-text-green" : ""}`} sx={{ fontSize: '.85rem' }}>
                                                            30-60 Acres
                                                        </Typography>
                                                    }
                                                    name='totalAcre'
                                                    value="30-60"
                                                    onChange={handleFilterChange}
                                                    checked={filters.totalAcre === "30-60"}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className={`${filters.totalAcre === "60-90" ? "fl-light-green-pill" : "fl-light-gray-pill"} mb-4`}>
                                                <FormControlLabel
                                                    control={<Checkbox hidden />}
                                                    label={
                                                        <Typography className={`${filters.totalAcre === "60-90" ? "fl-text-green" : ""}`} sx={{ fontSize: '.85rem' }}>
                                                            60-90 Acres
                                                        </Typography>
                                                    }
                                                    name='totalAcre'
                                                    value="60-90"
                                                    onChange={handleFilterChange}
                                                    checked={filters.totalAcre === "60-90"}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className={`${filters.totalAcre === "above" ? "fl-light-green-pill" : "fl-light-gray-pill"} mb-4`}>
                                                <FormControlLabel
                                                    control={<Checkbox hidden />}
                                                    label={
                                                        <Typography className={`${filters.totalAcre === "above" ? "fl-text-green" : ""}`} sx={{ fontSize: '.85rem' }}>
                                                            Above 90 Acres
                                                        </Typography>
                                                    }
                                                    name='totalAcre'
                                                    value="above"
                                                    onChange={handleFilterChange}
                                                    checked={filters.totalAcre === "above"}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4 pb-lg-2">
                                    <h4 className="fl-text-dark fl-fw-600 fs-5 mb-4">Amenities</h4>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className={`${filters.aminities.includes("Water Supply") ? "fl-light-green-pill" : "fl-light-gray-pill"} mb-4`}>
                                                <FormControlLabel
                                                    control={<Checkbox hidden />}
                                                    label={
                                                        <Typography className={`${filters.aminities.includes("Water Supply") ? "fl-text-green" : ""}`} sx={{ fontSize: '.85rem' }}>
                                                            Water Supply
                                                        </Typography>
                                                    }
                                                    name="aminities"
                                                    value="Water Supply"
                                                    onChange={handleFilterChange}
                                                    checked={filters.aminities.includes("Water Supply")}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className={`${filters.aminities.includes("Electricity") ? "fl-light-green-pill" : "fl-light-gray-pill"} mb-4`}>
                                                <FormControlLabel
                                                    control={<Checkbox hidden />}
                                                    label={
                                                        <Typography className={`${filters.aminities.includes("Electricity") ? "fl-text-green" : ""}`} sx={{ fontSize: '.85rem' }}>
                                                            Electricity
                                                        </Typography>
                                                    }
                                                    name="aminities"
                                                    value="Electricity"
                                                    onChange={handleFilterChange}
                                                    checked={filters.aminities.includes("Electricity")}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className={`${filters.aminities.includes("Security Guard") ? "fl-light-green-pill" : "fl-light-gray-pill"} mb-4`}>
                                                <FormControlLabel
                                                    control={<Checkbox hidden />}
                                                    label={
                                                        <Typography className={`${filters.aminities.includes("Security Guard") ? "fl-text-green" : ""}`} sx={{ fontSize: '.85rem' }}>
                                                            Security Guard
                                                        </Typography>
                                                    }
                                                    name="aminities"
                                                    value="Security Guard"
                                                    onChange={handleFilterChange}
                                                    checked={filters.aminities.includes("Security Guard")}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className={`${filters.aminities.includes("Swimming Pool") ? "fl-light-green-pill" : "fl-light-gray-pill"} mb-4`}>
                                                <FormControlLabel
                                                    control={<Checkbox hidden />}
                                                    label={
                                                        <Typography className={`${filters.aminities.includes("Swimming Pool") ? "fl-text-green" : ""}`} sx={{ fontSize: '.85rem' }}>
                                                            Swimming Pool
                                                        </Typography>
                                                    }
                                                    name="aminities"
                                                    value="Swimming Pool"
                                                    onChange={handleFilterChange}
                                                    checked={filters.aminities.includes("Swimming Pool")}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className={`${filters.aminities.includes("Sewage") ? "fl-light-green-pill" : "fl-light-gray-pill"} mb-4`}>
                                                <FormControlLabel
                                                    control={<Checkbox hidden />}
                                                    label={
                                                        <Typography className={`${filters.aminities.includes("Sewage") ? "fl-text-green" : ""}`} sx={{ fontSize: '.85rem' }}>
                                                            Sewage
                                                        </Typography>
                                                    }
                                                    name="aminities"
                                                    value="Sewage"
                                                    onChange={handleFilterChange}
                                                    checked={filters.aminities.includes("Sewage")}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className={`${filters.aminities.includes("Kids Play Area") ? "fl-light-green-pill" : "fl-light-gray-pill"} mb-4`}>
                                                <FormControlLabel
                                                    control={<Checkbox hidden />}
                                                    label={
                                                        <Typography className={`${filters.aminities.includes("Kids Play Area") ? "fl-text-green" : ""}`} sx={{ fontSize: '.85rem' }}>
                                                            Kids Play Area
                                                        </Typography>
                                                    }
                                                    name="aminities"
                                                    value="Kids Play Area"
                                                    onChange={handleFilterChange}
                                                    checked={filters.aminities.includes("Kids Play Area")}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className={`${filters.aminities.includes("Garden") ? "fl-light-green-pill" : "fl-light-gray-pill"} mb-4`}>
                                                <FormControlLabel
                                                    control={<Checkbox hidden />}
                                                    label={
                                                        <Typography className={`${filters.aminities.includes("Garden") ? "fl-text-green" : ""}`} sx={{ fontSize: '.85rem' }}>
                                                            Garden
                                                        </Typography>
                                                    }
                                                    name="aminities"
                                                    value="Garden"
                                                    onChange={handleFilterChange}
                                                    checked={filters.aminities.includes("Garden")}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className={`${filters.aminities.includes("Internal Road") ? "fl-light-green-pill" : "fl-light-gray-pill"} mb-4`}>
                                                <FormControlLabel
                                                    control={<Checkbox hidden />}
                                                    label={
                                                        <Typography className={`${filters.aminities.includes("Internal Road") ? "fl-text-green" : ""}`} sx={{ fontSize: '.85rem' }}>
                                                            Internal Road
                                                        </Typography>
                                                    }
                                                    name="aminities"
                                                    value="Internal Road"
                                                    onChange={handleFilterChange}
                                                    checked={filters.aminities.includes("Internal Road")}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className={`${filters.aminities.includes("Club House") ? "fl-light-green-pill" : "fl-light-gray-pill"} mb-4`}>
                                                <FormControlLabel
                                                    control={<Checkbox hidden />}
                                                    label={
                                                        <Typography className={`${filters.aminities.includes("Club House") ? "fl-text-green" : ""}`} sx={{ fontSize: '.85rem' }}>
                                                            Club House
                                                        </Typography>
                                                    }
                                                    name="aminities"
                                                    value="Club House"
                                                    onChange={handleFilterChange}
                                                    checked={filters.aminities.includes("Club House")}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4 pb-lg-2">
                                    <h4 className="fl-text-dark fl-fw-600 fs-5 mb-4">Category</h4>

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
                                        ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mobile-filter-footer py-4 px-3">
                        <div className="d-flex gap-3">
                            <button className="fl-btn-dark w-100 text-uppercase py-3" onClick={clearFilters} style={{ fontSize: '.8rem' }}>clear</button>
                            <button onClick={redirectToList} className="fl-btn-green w-100 text-uppercase py-3 text-center" style={{ fontSize: '.8rem' }}> Search</button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default MobileFilter