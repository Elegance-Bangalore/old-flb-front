// useURLFilters.js
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useAdminURLFilters = () => {
  const location = useLocation();
  const search = new URLSearchParams(location.search);

  const [filters, setFilters] = useState({
    search: "",
    page: 1,
    limit: 50,
    propertyType: "",
    availabilityStatus: "",
    i_am: "",
    subscribed: "",
    featured: "",
    propertyApproval: "",
    city: "",
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const parsedFilters = {
      search: searchParams.get("search") || "",
      page: parseInt(searchParams.get("page")) || 1,
      limit: parseInt(searchParams.get("limit")) || 50,
      propertyType: searchParams.get("propertyType") || "",
      availabilityStatus: searchParams.get("availabilityStatus") || "",
      i_am: searchParams.get("i_am") || "",
      subscribed: searchParams.get("subscribed") || "",
      featured: searchParams.get("featured") || "",
      propertyApproval: searchParams.get("propertyApproval") || "",
      city: searchParams.get("city") || "",
    };
    setFilters(parsedFilters);
  }, [location.search]);

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    const searchParams = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (newFilters[key]) {
        if (Array.isArray(newFilters[key])) {
          searchParams.set(key, newFilters[key].join(","));
        } else {
          searchParams.set(key, newFilters[key]);
        }
      }
    });
    const newSearch = searchParams.toString();
    return newSearch;
  };

  return [filters, updateFilters];
};

export default useAdminURLFilters;
