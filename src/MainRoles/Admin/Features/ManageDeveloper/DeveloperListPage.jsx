import React, { useState } from "react";
import DeveloperTable from "./DeveloperTable";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";
import useAdminURLFilters from "@/CustomServices/Hooks/useAdminURLFilters";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { Download } from '@mui/icons-material';
import { getDeveloperListApi, exportDeveloperApi } from "@/ApiRoutes/AdminApi";
import { exportToCSV, formatDeveloperDataForExport } from "@/CustomServices/ExportService";
import { toastMessage } from "@/CustomServices/ToastMessage";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";

function DeveloperListPage() {
  const [filters, updateFilters] = useAdminURLFilters();
  const navigate = useNavigate();
  const [exportLoading, setExportLoading] = useState(false);

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



  // Handle export functionality
  const handleExport = async () => {
    try {
      setExportLoading(true);
      
      // Try to get export from API first
      try {
        const response = await exportDeveloperApi({
          search: filters.search,
          i_am: filters.i_am,
          subscribed: filters.subscribed,
          featured: filters.featured,
        });
        // Process CSV to remove 'About' column if present
        let csvText;
        if (typeof response.data === 'string') {
          csvText = response.data;
        } else if (response.data && typeof response.data.text === 'function') {
          csvText = await response.data.text();
        } else {
          csvText = '';
        }

        const lines = csvText.split(/\r?\n/);
        if (lines.length > 0) {
          const splitCsvLine = (line) => line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);
          const headers = splitCsvLine(lines[0]);
          const aboutIndex = headers.findIndex(h => h.trim().replace(/^"|"$/g, '') === 'About');

          let processedCsv = csvText;
          if (aboutIndex !== -1) {
            const newHeader = headers.filter((_, idx) => idx !== aboutIndex).join(',');
            const dataRows = lines.slice(1).map(row => {
              if (!row) return row;
              const cols = splitCsvLine(row);
              const filtered = cols.filter((_, idx) => idx !== aboutIndex);
              return filtered.join(',');
            });
            processedCsv = [newHeader, ...dataRows].join('\n');
          }

          const blob = new Blob([processedCsv], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `developer_profiles_${new Date().toISOString().split('T')[0]}.csv`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          toastMessage(200, 'Developer profiles exported successfully!');
        } else {
          toastMessage(400, 'No data to export');
        }
      } catch (apiError) {
        // Fallback to client-side export if API doesn't support it
        console.log("API export failed, using client-side export");
        
        // Get all developers for export (not just current page)
        const response = await getDeveloperListApi({
          page: 1, // Use 1-based page number for API
          pageSize: 1000, // Get a large number to export all
          search: filters.search,
          i_am: filters.i_am,
          subscribed: filters.subscribed,
          featured: filters.featured,
        });
        
        const developerList = response?.data?.response || [];
        
        if (developerList.length > 0) {
          const formattedData = formatDeveloperDataForExport(developerList);
          const filename = `developer_profiles_${new Date().toISOString().split('T')[0]}.csv`;
          exportToCSV(formattedData, filename);
          toastMessage(200, "Developer profiles exported successfully!");
        } else {
          toastMessage(400, "No data to export");
        }
      }
    } catch (error) {
      console.error("Export error:", error);
      toastMessage(400, "Failed to export developer profiles");
    } finally {
      setExportLoading(false);
    }
  };

  const handleMove = (index, direction) => {
    // direction: -1 for up, +1 for down
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= featuredDevs.length) return;

    // Swap orders in local state
    const updated = [...featuredDevs];
    [updated[index].featuredOrder, updated[newIndex].featuredOrder] =
      [updated[newIndex].featuredOrder, updated[index].featuredOrder];
    // Optionally, sort the array by featuredOrder after swap

    setFeaturedDevs(updated);

    // Call backend to update both
    updateOrderOnServer(updated[index]);
    updateOrderOnServer(updated[newIndex]);
  };

  return (
    <>
      <div className="container-fluid ovh">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb_content d-flex justify-content-between align-items-center">
              <h2 className="breadcrumb_title pb-3">Developer Profile </h2>
              <Button
                variant="contained"
                color="primary"
                startIcon={exportLoading ? <OnClickLoader size={20} /> : <Download />}
                onClick={handleExport}
                disabled={exportLoading}
                sx={{
                  backgroundColor: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  },
                  '&:disabled': {
                    backgroundColor: '#ccc',
                  }
                }}
              >
                {exportLoading ? 'Exporting...' : 'Export CSV'}
              </Button>
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
                <div className="col-md-3 col-12 mb-3">
                  <FormControl variant="outlined">
                    <InputLabel>Seller Type</InputLabel>
                    <Select
                      label="Seller Type"
                      name="i_am"
                      value={filters.i_am}
                      onChange={handleChange}
                      MenuProps={{
                        disableScrollLock: true,
                      }}
                    >
                      <MenuItem value={""}>All</MenuItem>
                      <MenuItem value={"developer"}>Developers</MenuItem>
                      <MenuItem value="owner">Owners</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col-md-3 col-12 mb-3">
                  <FormControl variant="outlined">
                    <InputLabel>Filter by Subscription</InputLabel>
                    <Select
                      label="Sort by Subscription"
                      name="subscribed"
                      value={filters.subscribed}
                      onChange={handleChange}
                      MenuProps={{
                        disableScrollLock: true,
                      }}
                    >
                      <MenuItem value={""}>All</MenuItem>
                      <MenuItem value={true}>Subscribed Developers</MenuItem>
                      <MenuItem value={false}>
                        Non-Subscribed Developers
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col-md-3 col-12 mb-3">
                  <FormControl variant="outlined">
                    <InputLabel>Filter By Featured</InputLabel>
                    <Select
                      label="Sort By Featured"
                      name="featured"
                      value={filters.featured}
                      onChange={handleChange}
                      MenuProps={{
                        disableScrollLock: true,
                      }}
                    >
                      <MenuItem value={""}>All</MenuItem>
                      <MenuItem value={true}>Featured Developers</MenuItem>
                      <MenuItem value={false}>Non-Featured Developers</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </form>
              <div className="row">
                <div className="col-md-12">
                  <DeveloperTable
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

export default DeveloperListPage;
