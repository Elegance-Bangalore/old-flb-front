import {
  FormControl,
  Autocomplete,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Tooltip,
} from "@mui/material";
import Header from "@/components/common/header/dashboard/Header";
import { useEffect, useState } from "react";
import { adminEnquiryApi, exportEnquiryApi } from "@/ApiRoutes/AdminApi";
import { toastMessage } from "@/CustomServices/ToastMessage";
import AdminSidebarMenu from "@/MainRoles/Admin/AdminLayouts/AdminSidebarMenu";
import AdminMobileMenu from "@/MainRoles/Admin/AdminLayouts/AdminMobileMenu";
import EnquiresTable from "./EnquiresTable";
import { exportToCSV, formatEnquiryDataForExport } from "@/CustomServices/ExportService";
import DownloadIcon from '@mui/icons-material/Download';


const Enquiries = () => {

  const [enquiryList, setEnquiryList] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest")
  const [count, setCount] = useState(0)
  const [exportLoading, setExportLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });


  async function getEnquiryList() {
    try {
      const filters = { search, sort, ...paginationModel }
      const response = await adminEnquiryApi(filters)
      setEnquiryList(response?.data?.data)
      setCount(response?.data?.data?.pageMeta.total)
    }
    catch (error) {
      toastMessage(error?.response?.status, error?.response?.data?.error)
      throw error
    }
  }

  async function handleExport() {
    try {
      setExportLoading(true);
      
      // Try to get all data from API first
      try {
        const response = await exportEnquiryApi({ search, sort });
        const blob = new Blob([response.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `enquiries_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        toastMessage(200, "Enquiries exported successfully!");
      } catch (apiError) {
        // Fallback to client-side export if API doesn't support it
        console.log("API export failed, using client-side export");
        
        // Get all enquiries for export (not just current page)
        try {
          const allEnquiriesResponse = await adminEnquiryApi({ 
            page: 0, 
            pageSize: 1000, // Get a large number to export all
            search, 
            sort 
          });
          
          const formattedData = formatEnquiryDataForExport(allEnquiriesResponse?.data?.data);
          if (formattedData.length > 0) {
            exportToCSV(formattedData, `enquiries_${new Date().toISOString().split('T')[0]}.csv`);
            toastMessage(200, "Enquiries exported successfully!");
          } else {
            toastMessage(400, "No data to export");
          }
        } catch (fallbackError) {
          // If that fails too, use current page data
          const formattedData = formatEnquiryDataForExport(enquiryList);
          if (formattedData.length > 0) {
            exportToCSV(formattedData, `enquiries_${new Date().toISOString().split('T')[0]}.csv`);
            toastMessage(200, "Enquiries exported successfully! (Current page only)");
          } else {
            toastMessage(400, "No data to export");
          }
        }
      }
    } catch (error) {
      toastMessage(error?.response?.status || 500, error?.response?.data?.error || "Export failed");
    } finally {
      setExportLoading(false);
    }
  }



  useEffect(() => {
    setPaginationModel({ ...paginationModel, page: 0 })
  }, [search])

  useEffect(() => {
    getEnquiryList()
  }, [paginationModel, search, sort])

  return (
    <>
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb_content">
                <h2 className="breadcrumb_title pb-3">Enquires</h2>
              </div>
            </div>
            <div className="col-lg-12">
              <div>
                <form className="row">
                  <div className="col-md-4">
                    <FormControl className="mb-4">
                      <TextField
                        id=""
                        label="Search by Name"
                        variant="outlined"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </FormControl>
                  </div>
                  <div className="col-md-4 col-12 mb-3">
                    <FormControl variant="outlined">
                      <InputLabel id=" ">
                        Sort
                      </InputLabel>
                      <Select labelId="" label="Availability" value={sort} onChange={(e) => setSort(e.target.value)} MenuProps={{
                        disableScrollLock: true,
                      }}>
                        <MenuItem value="newest">Newest</MenuItem>
                        <MenuItem value="oldest">Oldest</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-md-4">
                    <div className="text-end">
                      <Tooltip title="Export enquiries to CSV file">
                        <Button
                          variant="contained"
                          onClick={handleExport}
                          disabled={exportLoading || !enquiryList?.data?.length}
                          startIcon={<DownloadIcon />}
                          sx={{
                            backgroundColor: '#1976d2',
                            '&:hover': {
                              backgroundColor: '#1565c0',
                            },
                            '&:disabled': {
                              backgroundColor: '#e0e0e0',
                              color: '#9e9e9e',
                            }
                          }}
                        >
                          {exportLoading ? 'Exporting...' : 'EXPORT'}
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                </form>
                <div className="row">
                  <div className="col-md-12">
                    <EnquiresTable enquiryList={enquiryList} totalCount={count} getEnquiryList={getEnquiryList} paginationModel={paginationModel} setPaginationModel={setPaginationModel} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default Enquiries;
