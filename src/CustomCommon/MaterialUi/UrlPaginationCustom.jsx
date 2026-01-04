import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";


function UrlPaginationCustom({ count, page, setFilters, filters , perPage=6}) {
  const noOfPage = Math.ceil(count / perPage);
  const navigate = useNavigate()

  const handleChange = (event, value) => {
    const newFilters = { ...filters, page: value, };
    const newSearch = setFilters(newFilters);
    navigate(`?${newSearch}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={noOfPage}
        page={page}
        name="page"
        onChange={handleChange}
        className="w-100"
      />
    </Stack>
  );
}

export default UrlPaginationCustom;
