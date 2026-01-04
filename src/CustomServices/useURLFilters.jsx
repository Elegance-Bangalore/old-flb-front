// useURLFilters.js
import { selectFilter } from "@/features/properties/propertiesSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { capitalizeArray } from "./Constant";

const useURLFilters = () => {
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const { cities } = useSelector(selectFilter);
  const capitalizedCities = capitalizeArray(cities) || [];

  const [filters, setFilters] = useState({
    search: "",
    propertyType: search.get("propertyType") || "",
    page: 1,
    status: "",
    city: "",
    aminities: [],
    price: "",
    totalAcre: "",
    priceMin: search.get("priceMin") || 0,
    priceMax: search.get("priceMax") || 0,
    order: "descending",
    categoryId: "",
    sort: "createdAt",
    filterBy: "City",
    Scity : "",
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const parsedFilters = {
      search: searchParams.get("search") || "",
      propertyType: searchParams.get("propertyType") || "",
      page: parseInt(searchParams.get("page")) || 1,
      status: searchParams.get("status") || "",
      city: searchParams.get("city") || "",
      price: searchParams.get("price") || "",
      totalAcre: searchParams.get("totalAcre") || "",
      priceMin: searchParams.get("priceMin") || 0,
      priceMax: searchParams.get("priceMax") || 0,
      aminities: searchParams.get("aminities")
        ? searchParams.get("aminities").split(",")
        : [],
      order: searchParams.get("order") || "descending",
      categoryId: searchParams.get("categoryId") || "",
      sort: searchParams.get("sort") || "createdAt",
      filterBy: searchParams.get("filterBy") || "City",
      Scity : searchParams.get("Scity") || "",
    };
    setFilters(parsedFilters);
  }, [location.search]);

  // Default values for every filter key. We will omit these from the
  // generated query-string so the URL only reflects *active* filters.
  const defaultFilters = {
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
    order: "descending",
    categoryId: "",
    sort: "createdAt",
    filterBy: "City",
    Scity: "",
  };

  const isDefaultValue = (key, value) => {
    // For arrays compare length, for others do strict equality
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    return value === defaultFilters[key];
  };

  const updateFilters = (newFilters) => {
    setFilters(newFilters);

    const searchParams = new URLSearchParams();

    Object.entries(newFilters).forEach(([key, value]) => {
      if (isDefaultValue(key, value) || value === undefined || value === null) {
        return; // Skip default/undefined values
      }

      if (Array.isArray(value)) {
        if (value.length > 0) {
          searchParams.set(key, value.join(","));
        }
      } else {
        searchParams.set(key, value);
      }
    });

    const newSearch = searchParams.toString();
    return newSearch;
  };

  return [filters, updateFilters];
};

export default useURLFilters;
