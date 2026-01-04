import React, { useEffect, useState } from "react";
import {
  FormControl,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Tooltip,
} from "@mui/material";
import { campaignApi } from "@/CustomServices/CampaignApi";
import { toastMessage } from "@/CustomServices/ToastMessage";
import CampaignDownloadsTable from "./CampaignDownloadsTable";
import DownloadIcon from '@mui/icons-material/Download';
import NewAdminSidebar from '@/MainRoles/Admin/AdminLayouts/NewAdminSidebar';

const CampaignDownloads = () => {
  const [downloads, setDownloads] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [count, setCount] = useState(0);
  const [exportLoading, setExportLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });

  async function getDownloadsList() {
    try {
      const filters = { search, sort, ...paginationModel };
      const response = await campaignApi.getCampaignDownloads(filters);
      setDownloads(response?.data || []);
      setCount(response?.pagination?.totalItems || 0);
    } catch (error) {
      toastMessage(error?.response?.status, error?.response?.data?.error);
      throw error;
    }
  }

  async function handleExport() {
    try {
      setExportLoading(true);
      
      // Get all downloads for export
      try {
        const allDownloadsResponse = await campaignApi.getCampaignDownloads({ 
          page: 0, 
          pageSize: 1000, // Get a large number to export all
          search, 
          sort 
        });
        
        if (allDownloadsResponse?.data?.length > 0) {
          // Convert to CSV format
          const csvData = allDownloadsResponse.data.map(download => ({
            'User Name': download.userName || 'N/A',
            'Email': download.userEmail || 'N/A',
            'Campaign': download.campaignName || download.campaignId?.title || download.campaignId?.name || 'N/A',
            'Download Date': download.downloadDate || download.createdAt || 'N/A',
            'Status': download.status || 'Completed'
          }));
          
          // Create CSV content
          const headers = Object.keys(csvData[0]);
          const csvContent = [
            headers.join(','),
            ...csvData.map(row => headers.map(header => `"${row[header]}"`).join(','))
          ].join('\n');
          
          // Download CSV
          const blob = new Blob([csvContent], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `campaign_downloads_${new Date().toISOString().split('T')[0]}.csv`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          toastMessage(200, "Campaign downloads exported successfully!");
        } else {
          toastMessage(400, "No data to export");
        }
      } catch (error) {
        toastMessage(500, "Export failed");
      }
    } catch (error) {
      toastMessage(error?.response?.status || 500, error?.response?.data?.error || "Export failed");
    } finally {
      setExportLoading(false);
    }
  }

  useEffect(() => {
    setPaginationModel({ ...paginationModel, page: 0 });
  }, [search]);

  useEffect(() => {
    getDownloadsList();
  }, [paginationModel, search, sort]);

  return (
    <NewAdminSidebar>
      <div className="container-fluid ovh">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb_content">
              <h2 className="breadcrumb_title pb-3">Campaign Downloads</h2>
            </div>
          </div>
          <div className="col-lg-12">
            <div>
              <form className="row">
                <div className="col-md-4">
                  <FormControl className="mb-4">
                    <TextField
                      id=""
                      label="Search by Name or Email"
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
                    <Select labelId="" label="Sort" value={sort} onChange={(e) => setSort(e.target.value)} MenuProps={{
                      disableScrollLock: true,
                    }}>
                      <MenuItem value="newest">Newest</MenuItem>
                      <MenuItem value="oldest">Oldest</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col-md-4">
                  <div className="text-end">
                    <Tooltip title="Export campaign downloads to CSV file">
                      <Button
                        variant="contained"
                        onClick={handleExport}
                        disabled={exportLoading || !downloads?.length}
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
                  <CampaignDownloadsTable 
                    downloadsList={downloads} 
                    totalCount={count} 
                    getDownloadsList={getDownloadsList} 
                    paginationModel={paginationModel} 
                    setPaginationModel={setPaginationModel} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NewAdminSidebar>
  );
};

export default CampaignDownloads;
