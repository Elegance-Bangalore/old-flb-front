import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Chip,
  Box,
  Typography,
  CircularProgress,
  Pagination,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Edit, Trash, Eye, SearchNormal1, Copy } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { campaignApi } from "@/CustomServices/CampaignApi";
import { getContactUsApi } from "@/ApiRoutes/AdminApi";
import CampaignEditModal from "./CampaignEditModal";

function CampaignTable({ refreshTrigger }) {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    fetchCampaigns();
  }, [refreshTrigger, pagination?.currentPage, searchTerm, statusFilter]);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      
      // Check authentication status first
      console.log("=== AUTHENTICATION DEBUG ===");
      const authStatus = campaignApi.checkAuthStatus();
      console.log("Auth Status:", authStatus);
      
      // Check if user is logged in and what role they have
      const userInfo = localStorage.getItem("userInfo");
      const userRole = localStorage.getItem("userRole");
      console.log("User Info from localStorage:", userInfo);
      console.log("User Role from localStorage:", userRole);
      
      // Test if other AdminApi endpoints work
      try {
        console.log("Testing AdminApi endpoint...");
        const testResponse = await getContactUsApi();
        console.log("AdminApi test successful:", testResponse.data);
      } catch (testError) {
        console.log("AdminApi test failed:", testError.message);
      }
      
      console.log("=== END AUTH DEBUG ===");
      
      const params = {
        page: pagination?.currentPage || 1,
        limit: pagination?.itemsPerPage || 10,
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter && { status: statusFilter })
      };
      
      console.log("Fetching campaigns with params:", params);
      
      // Try campaign API first
      let response;
      try {
        response = await campaignApi.getCampaigns(params);
        console.log("Campaign API Response:", response);
      } catch (campaignError) {
        console.log("Campaign API failed, trying alternative approach...");
        console.log("Campaign API Error:", campaignError.message);
        
        // If campaign API fails, try to use a mock response for now
        response = {
          data: [],
          pagination: {
            currentPage: 1,
            totalPages: 1,
            totalItems: 0,
            itemsPerPage: 10
          }
        };
        console.log("Using fallback response:", response);
      }
      
      // Handle different response structures
      let campaignsData = [];
      let paginationData = {};
      
      if (response) {
        // Check if response has data property
        if (response.data) {
          campaignsData = Array.isArray(response.data) ? response.data : [];
        } else if (Array.isArray(response)) {
          // If response is directly an array
          campaignsData = response;
        } else if (response.campaigns) {
          // If campaigns are in a campaigns property
          campaignsData = Array.isArray(response.campaigns) ? response.campaigns : [];
        }
        
        // Handle pagination
        if (response.pagination) {
          paginationData = response.pagination;
        } else if (response.meta) {
          paginationData = response.meta;
        }
      }
      
      console.log("Campaigns data:", campaignsData);
      console.log("Pagination data:", paginationData);
      
      setCampaigns(campaignsData);
      
      // Ensure pagination object has all required properties
      setPagination(prev => ({
        currentPage: paginationData.currentPage || paginationData.page || prev?.currentPage || 1,
        totalPages: paginationData.totalPages || paginationData.lastPage || prev?.totalPages || 1,
        totalItems: paginationData.totalItems || paginationData.total || prev?.totalItems || 0,
        itemsPerPage: paginationData.itemsPerPage || paginationData.perPage || prev?.itemsPerPage || 10
      }));
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      toastMessage(400, error.message || "Failed to fetch campaigns");
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (campaign) => {
    setSelectedCampaign(campaign);
    setEditModalOpen(true);
  };

  const handleDelete = async (campaignId) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      try {
        await campaignApi.deleteCampaign(campaignId);
        toastMessage(200, "Campaign deleted successfully");
        fetchCampaigns(); // Refresh the list
      } catch (error) {
        toastMessage(400, error.message || "Failed to delete campaign");
      }
    }
  };

  const handleView = (campaign) => {
    // Navigate to campaign view page
    navigate(`/admin/campaigns/view/${campaign._id}`);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setSelectedCampaign(null);
  };

  const handleEditSave = () => {
    fetchCampaigns(); // Refresh the list
    setEditModalOpen(false);
    setSelectedCampaign(null);
  };

  const handleCopyUrl = (campaignId) => {
    const baseUrl = window.location.origin;
    const viewUrl = `${baseUrl}/admin/campaigns/view/${campaignId}`;
    
    navigator.clipboard.writeText(viewUrl).then(() => {
      toastMessage(200, "URL copied to clipboard!");
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = viewUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      toastMessage(200, "URL copied to clipboard!");
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "default";
      case "draft":
        return "warning";
      default:
        return "default";
    }
  };

  const handlePageChange = (event, page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="bg-white-shadow">
      {/* Debug Information */}
      {/* <Box sx={{ p: 2, bgcolor: "#f5f5f5", mb: 2 }}>
        <Typography variant="body2" color="textSecondary">
          Debug: Loading: {loading.toString()}, Campaigns Count: {campaigns.length}, 
          Current Page: {pagination?.currentPage}, Total Pages: {pagination?.totalPages}
        </Typography>
      </Box> */}
      
      {/* Search and Filter Controls */}
      <Box sx={{ p: 2, display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
        <TextField
          placeholder="Search campaigns..."
          value={searchTerm}
          onChange={handleSearchChange}
          size="small"
          sx={{ minWidth: 200 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchNormal1 size={20} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          select
          label="Status Filter"
          value={statusFilter}
          onChange={handleStatusFilterChange}
          size="small"
          sx={{ minWidth: 150 }}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="draft">Draft</option>
        </TextField>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="campaigns table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>PDF Button</TableCell>
              <TableCell>URL</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campaigns.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1" color="textSecondary">
                    No campaigns found. Click "Add Campaign" to create your first campaign.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              campaigns.map((campaign) => (
                <TableRow key={campaign._id} hover>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {campaign.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="textSecondary">
                      {campaign.description && campaign.description.length > 50 
                        ? `${campaign.description.substring(0, 50)}...` 
                        : campaign.description || "No description"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={campaign.status}
                      color={getStatusColor(campaign.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="textSecondary">
                      {campaign.pdfButtonName || "N/A"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Copy size={16} />}
                      onClick={() => handleCopyUrl(campaign._id)}
                      sx={{ 
                        textTransform: "none",
                        fontSize: "0.75rem",
                        py: 0.5,
                        px: 1
                      }}
                    >
                      Copy URL
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                      <IconButton
                        size="small"
                        onClick={() => handleView(campaign)}
                        color="primary"
                      >
                        <Eye size={16} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(campaign)}
                        color="primary"
                      >
                        <Edit size={16} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(campaign._id)}
                        color="error"
                      >
                        <Trash size={16} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {pagination?.totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <Pagination
            count={pagination?.totalPages || 1}
            page={pagination?.currentPage || 1}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      )}

      {/* Edit Modal */}
      <CampaignEditModal
        open={editModalOpen}
        onClose={handleEditModalClose}
        onSave={handleEditSave}
        campaignId={selectedCampaign?._id}
        campaignData={selectedCampaign}
      />
    </div>
  );
}

export default CampaignTable;
