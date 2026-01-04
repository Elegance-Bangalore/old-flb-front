import React from "react";
import DeveloperTable from "./DeveloperTable";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import useAdminURLFilters from "@/CustomServices/Hooks/useAdminURLFilters";
import { useNavigate, useLocation } from "react-router-dom";
import BuyerTable from "./BuyerTable";

function BuyerListPage() {
  const [filters, updateFilters] = useAdminURLFilters();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value, page: 1 };
    const newSearch = updateFilters(newFilters);
    navigate(`?${newSearch}`);
  };

  const handlePaginationChange = (model) => {
    const newFilters = {
      ...filters,
      page: model.page + 1,
      limit: model.pageSize,
    };
    const newSearch = updateFilters(newFilters);
    navigate(`?${newSearch}`);
  };

  const paginationModel = {
    page: filters.page - 1,
    pageSize: filters.limit,
  };

  return (
    <>
      <div className="container-fluid ovh">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb_content">
              <h2 className="breadcrumb_title pb-3">Buyer Profile</h2>
            </div>
          </div>
          <div className="col-lg-12">
            <div>
              <form className="row">
                <div className="col-md-3">
                  <FormControl className="mb-4">
                    <TextField
                      id=""
                      label="Search by Name, Email, Number"
                      variant="outlined"
                      name="search"
                      value={filters.search}
                      onChange={handleChange}
                    />
                  </FormControl>
                </div>
              </form>
              <div className="row">
                <div className="col-md-12">
                  <BuyerTable
                    paginationModel={paginationModel}
                    setPaginationModel={handlePaginationChange}
                    filters={filters}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BuyerListPage;
