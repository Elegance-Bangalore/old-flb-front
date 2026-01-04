import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { selectFilter, setPage } from "@/features/properties/propertiesSlice";
import { useDispatch, useSelector } from "react-redux";
import { valuesIn } from "lodash";

function NewPagination({ count, page, setPage, perPage = 6 }) {

    const noOfPage = Math.ceil(count / perPage);

    const handleChange = (event, value) => {
        setPage(value)
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
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

export default NewPagination;
