import {
  FormControl,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Autocomplete,
} from "@mui/material";
import PostPropertyListTable from "@/MainRoles/Admin/Features/ManageProperty/PostPropertyListTable";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAdminURLFilters from "@/CustomServices/Hooks/useAdminURLFilters";
import { useSelector } from "react-redux";
import { selectFilter } from "@/features/properties/propertiesSlice";
import { capitalizeArray } from "@/CustomServices/Constant";

const AllPropertyList = () => {
  const [filters, updateFilters] = useAdminURLFilters();
  const navigate = useNavigate();
  const { cities } = useSelector(selectFilter);
  const capitalizedCities = capitalizeArray(cities);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value, page: 1 };
    const newSearch = updateFilters(newFilters);
    navigate(`?${newSearch}`);
  };


  const handleCityChange = (event, newValue) => {
    const newFilters = { ...filters, city: newValue, page: 1 };
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
              <h2 className="breadcrumb_title mt-3 pb-3">Properties</h2>
            </div>
          </div>
          <div className="col-lg-12">
            <div>
              <form className="row">
                <div className="col-12 col-md-2 mb-3">
                  <FormControl fullWidth>
                    <TextField
                      label="Search by Name"
                      variant="outlined"
                      name="search"
                      value={filters.search}
                      onChange={handleChange}
                    />
                  </FormControl>
                </div>

                <div className="col-12 col-md-2 mb-3">
                  <FormControl fullWidth>
                    <Autocomplete
                      id="bedroom-autocomplete"
                      options={capitalizedCities?.map((element) => element)}
                      getOptionLabel={(option) => option}
                      value={filters.city}
                      onChange={handleCityChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Cities"
                          variant="outlined"
                          name="cities"
                          onChange={handleCityChange}
                        />
                      )}
                    />
                  </FormControl>
                </div>

                <div className="col-12 col-md-2 mb-3">
                  <FormControl fullWidth>
                    <InputLabel id="property-type-label">Property Type</InputLabel>
                    <Select
                      labelId="property-type-label"
                      label="Property Type"
                      name="propertyType"
                      value={filters.propertyType}
                      onChange={handleChange}
                      MenuProps={{ disableScrollLock: true }}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="farmhouse">Farmhouse</MenuItem>
                      <MenuItem value="farmland">Farmland</MenuItem>
                      <MenuItem value="Estates">Estates</MenuItem>
                      <MenuItem value="agricultureLand">Agriculture Land</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div className="col-12 col-md-2 mb-3">
                  <FormControl fullWidth>
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                      labelId="status-label"
                      name="availabilityStatus"
                      label="Availability"
                      value={filters.availabilityStatus}
                      onChange={handleChange}
                      MenuProps={{ disableScrollLock: true }}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="sold-out">Sold</MenuItem>
                      <MenuItem value="available">Available</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div className="col-12 col-md-2 mb-3">
                  <FormControl fullWidth>
                    <InputLabel id="approval-label">Filter By Approval</InputLabel>
                    <Select
                      labelId="approval-label"
                      name="propertyApproval"
                      label="Property Approval"
                      value={filters.propertyApproval}
                      onChange={handleChange}
                      MenuProps={{ disableScrollLock: true }}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="Resolved">Resolved</MenuItem>
                      <MenuItem value="IN_Review">In Review</MenuItem>
                      <MenuItem value="Reject">Rejected</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div className="col-12 col-md text-center text-md-end mt-md-0 mt-2 mb-4 w-100">
                  <Link to="/admin/add-property">
                    <button className="btn-upgrade w-100-mobile" type="button">
                      ADD PROPERTY
                    </button>
                  </Link>
                </div>
              </form>

              <div className="row">
                <div className="col-md-12">
                  <PostPropertyListTable
                    filters={filters}
                    paginationModel={paginationModel}
                    handlePaginationChange={handlePaginationChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllPropertyList;
