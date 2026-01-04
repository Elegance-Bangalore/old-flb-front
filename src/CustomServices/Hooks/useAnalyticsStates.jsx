import { useState } from "react";
import dayjs from "dayjs";

function useAnalyticsState() {
  const [analytics, setAnalytics] = useState({});
  const [days, setDays] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [search, setSearch] = useState("");
  const [properties, setProperties] = useState([]);
  const [loader, setLoader] = useState(false);
  const [count, setCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });

  const updateFilters = (newDays, newStartDate, newEndDate) => {
    setDays(newDays);
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setPaginationModel({ ...paginationModel, page: 0 });
  };

  const updateSearch = (newSearch) => {
    setSearch(newSearch);
    setPaginationModel({ ...paginationModel, page: 0 });
  };

  return {
    analytics,
    setAnalytics,
    days,
    startDate,
    endDate,
    search,
    properties,
    loader,
    count,
    paginationModel,
    setPaginationModel,
    updateFilters,
    updateSearch,
    setLoader,
    setProperties,
    setCount
  };
}

export default useAnalyticsState;
