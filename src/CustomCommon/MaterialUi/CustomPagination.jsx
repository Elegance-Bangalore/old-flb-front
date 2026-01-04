import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { selectFilter, setPage } from "@/features/properties/propertiesSlice";
import { useDispatch, useSelector } from "react-redux";

function CustomPagination({ count }) {
  const filters = useSelector(selectFilter);
  const { page } = filters;
  const dispatch = useDispatch();

  const noOfPage = Math.ceil(count / 6);

  const handleChange = (event, value) => {
    dispatch(setPage(value));
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={noOfPage}
        page={page}
        onChange={handleChange}
        className="w-100"
      />
    </Stack>
  );
}

export default CustomPagination;
