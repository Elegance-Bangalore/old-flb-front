import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keyword: "",
  propertyType: "",
  location: "",
  price: {
    min: 0,
    max: 0,
  },
  amenities: [],
  status: "",
  bathrooms: "",
  bedrooms: "",
  garages: "",
  yearBuilt: "",
  page: 1,
  area: {
    min: "",
    max: "",
  },
  length: 0,
  dashboardSearch: "",
  dashboardPropertyType: "",
  enquiryFilter: "weekly",
  enquirySearch: "",
  enquiryPage: 1,
  city: "",
  cities: [],
};

export const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    addKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    addPropertyType: (state, action) => {
      state.propertyType = action.payload;
    },
    addLocation: (state, action) => {
      state.location = action.payload;
    },
    addPrice: (state, action) => {
      state.price.min = action.payload.min;
      state.price.max = action.payload.max;
    },
    addAmenities: (state, action) => {},
    resetAmenities: (state, action) => {
      state.amenities = [];
    },
    setAminities: (state, action) => {
      state.amenities = action.payload;
    },
    addStatus: (state, action) => {
      state.status = action.payload;
    },
    addBathrooms: (state, action) => {
      state.bathrooms = action.payload;
    },
    addBedrooms: (state, action) => {
      state.bathrooms = action.payload;
    },
    addGarages: (state, action) => {
      state.garages = action.payload;
    },
    addYearBuilt: (state, action) => {
      state.yearBuilt = action.payload;
    },
    addAreaMin: (state, action) => {
      state.area.min = action.payload;
    },
    addAreaMax: (state, action) => {
      state.area.max = action.payload;
    },
    addLength: (state, action) => {
      state.length = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setDashboardSearch: (state, action) => {
      state.dashboardSearch = action.payload;
    },
    setDashboardPropertyType: (state, action) => {
      state.dashboardPropertyType = action.payload;
    },
    setEnquiryFilter: (state, action) => {
      state.enquiryFilter = action.payload;
    },
    setEnquirySearch: (state, action) => {
      state.enquirySearch = action.payload;
    },
    setEnquiryPage: (state, action) => {
      state.enquiryPage = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setCities: (state, action) => {
      state.cities = action.payload;
    },
    clearAllFilters: (state) => {
      state.keyword = "";
      state.propertyType = "";
      state.location = "";
      state.price = { min: 0, max: 0 };
      state.amenities = [];
      state.status = "";
      state.bathrooms = "";
      state.city = "";
      state.bedrooms = "";
      state.garages = "";
      state.yearBuilt = "";
      state.page = 1;
      state.area = { min: "", max: "" };
      state.length = 0;
      state.dashboardSearch = "";
      state.dashboardPropertyType = "";
      state.enquiryFilter = "weekly";
      state.enquirySearch = "";
      state.enquiryPage = 1;
    },
  },
});

export const {
  addKeyword,
  addPropertyType,
  addLocation,
  addPrice,
  addAmenities,
  addStatus,
  addBathrooms,
  addBedrooms,
  addGarages,
  addYearBuilt,
  addAreaMin,
  addAreaMax,
  addLength,
  resetAmenities,
  setPage,
  setDashboardPropertyType,
  setDashboardSearch,
  setEnquiryFilter,
  setEnquirySearch,
  setCity,
  setAminities,
  setCities,
  clearAllFilters,
} = propertiesSlice.actions;

export const selectFilter = (state) => state.properties;
export default propertiesSlice.reducer;
