import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  CircularProgress,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardContent,
  Divider,
  Avatar,
  Stack,
} from "@mui/material";
import { ArrowLeft, DocumentDownload, Calendar, Edit, User, Message, ArrowDown2 } from "iconsax-react";
import { useNavigate, useParams } from "react-router-dom";
import { campaignApi } from "@/CustomServices/CampaignApi";
import { toastMessage } from "@/CustomServices/ToastMessage";

function CampaignViewPage() {
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: ''
  });
  const [downloading, setDownloading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchCampaign();
    }
  }, [id]);

  const fetchCampaign = async () => {
    try {
      setLoading(true);
      const response = await campaignApi.getCampaignById(id);
      setCampaign(response.data || response);
    } catch (error) {
      console.error("Error fetching campaign:", error);
      toastMessage(400, error.message || "Failed to fetch campaign");
      navigate("/admin/campaign-page");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    // Navigate to edit page or open edit modal
    navigate(`/admin/campaigns/edit/${id}`);
  };

  const handleDownloadClick = () => {
    if (campaign?.pdfFile) {
      setDownloadModalOpen(true);
    } else {
      toastMessage(400, "No PDF file available for download");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleDownloadPdf = async () => {
    if (!userDetails.name.trim() || !userDetails.email.trim()) {
      toastMessage(400, "Please fill in all required fields");
      return;
    }

    if (!validateEmail(userDetails.email)) {
      toastMessage(400, "Please enter a valid email address");
      return;
    }

    try {
      setDownloading(true);
      
      console.log("Campaign ID from URL:", id);
      console.log("User Details:", userDetails);
      
      // Save user details and download request to backend
      await campaignApi.saveDownloadRequest(id, userDetails);
      
      // Download the PDF file
      const link = document.createElement('a');
      link.href = campaign.pdfFile;
      link.download = campaign.pdfButtonName || 'campaign-document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toastMessage(200, "PDF downloaded successfully! Your details have been saved.");
      setDownloadModalOpen(false);
      setUserDetails({ name: '', email: '' });
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toastMessage(400, error.message || "Failed to download PDF");
    } finally {
      setDownloading(false);
    }
  };

  const handleCloseModal = () => {
    setDownloadModalOpen(false);
    setUserDetails({ name: '', email: '' });
  };

  const handleInputChange = (field) => (event) => {
    setUserDetails(prev => ({
      ...prev,
      [field]: event.target.value
    }));
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

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        sx={{ bgcolor: "#f5f5f5" }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!campaign) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box textAlign="center">
          <Typography variant="h4" color="textSecondary">
            Campaign not found
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate("/admin/campaign-page")}
            sx={{ mt: 2 }}
          >
            Back to Campaigns
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
      {/* Enhanced Header */}
      <Box sx={{ 
        bgcolor: "white", 
        p: 3, 
        borderBottom: "1px solid #e2e8f0",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
      }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              {/* <IconButton 
                onClick={() => navigate("/admin/campaign-page")}
                sx={{ 
                  bgcolor: "#f1f5f9", 
                  color: "#475569",
                  "&:hover": { 
                    bgcolor: "#e2e8f0",
                    transform: "translateX(-2px)"
                  },
                  transition: "all 0.2s ease"
                }}
              >
                <ArrowLeft size={20} />
              </IconButton> */}
              <Box>
                <Typography variant="h5" fontWeight="700" color="#1e293b">
                  Campaign Details
                </Typography>
                <Typography variant="body2" color="#64748b" sx={{ mt: 0.5 }}>
                  View and manage campaign information
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Chip
                label={campaign.status?.toUpperCase()}
                color={getStatusColor(campaign.status)}
                size="small"
                sx={{ 
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              />
              <Button
                variant="contained"
                startIcon={<Edit size={16} />}
                onClick={handleEdit}
                sx={{ 
                  bgcolor: "#00a76f",
                  "&:hover": { 
                    bgcolor: "#00a76f",
                    transform: "translateY(-1px)",
                    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)"
                  },
                  transition: "all 0.2s ease",
                  fontWeight: "600",
                  px: 3,
                  py: 1
                }}
              >
                Edit Campaign
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {/* Main Content Card */}
          <Grid item xs={12} lg={8}>
            <Card 
              elevation={0}
              sx={{ 
                borderRadius: 3,
                bgcolor: "white",
                border: "1px solid #e2e8f0",
                overflow: "hidden"
              }}
            >
              {/* Background Image Section */}
              {campaign.backgroundImage && (
                <Box sx={{ 
                  height: { xs: 250, md: 350 },
                  backgroundImage: `url(${campaign.backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2))",
                  }
                }}>
                  <Box sx={{ 
                    position: "absolute", 
                    bottom: 24, 
                    left: 24, 
                    right: 24,
                    zIndex: 1
                  }}>
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        color: "white", 
                        fontWeight: "800",
                        textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
                        lineHeight: 1.2
                      }}
                    >
                      {campaign.title}
                    </Typography>
                  </Box>
                </Box>
              )}

              <CardContent sx={{ p: 4 }}>
                {/* Title (if no background image) */}
                {!campaign.backgroundImage && (
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontWeight: "800", 
                      mb: 3,
                      color: "#1e293b",
                      lineHeight: 1.2
                    }}
                  >
                    {campaign.title}
                  </Typography>
                )}

                {/* Campaign Info Cards */}
          

                {/* Description */}
                <Box sx={{ mb: 4 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: "700", 
                      mb: 3,
                      color: "#1e293b",
                      display: "flex",
                      alignItems: "center",
                      gap: 1
                    }}
                  >
                    📝 Description
                  </Typography>
                  <Box 
                    sx={{ 
                      bgcolor: "#f8fafc", 
                      p: 4, 
                      borderRadius: 3,
                      border: "1px solid #e2e8f0",
                      "& p": { margin: 0, lineHeight: 1.7 },
                      "& h1, & h2, & h3, & h4, & h5, & h6": { 
                        color: "#1e293b",
                        fontWeight: "600"
                      }
                    }}
                    dangerouslySetInnerHTML={{ 
                      __html: campaign.description || "No description available" 
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Download Section */}
          <Grid item xs={12} lg={4}>
            <Card 
              elevation={0}
              sx={{ 
                borderRadius: 3,
                bgcolor: "white",
                border: "1px solid #e2e8f0",
                height: "fit-content",
                position: "sticky",
                top: 100
              }}
            >
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <Box sx={{ 
                  bgcolor: "#f0f9ff", 
                  borderRadius: "50%", 
                  width: 80, 
                  height: 80, 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  mx: "auto",
                  mb: 3
                }}>
                  <DocumentDownload size={32} color="#00a76f" />
                </Box>
                
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: "700", 
                    mb: 2,
                    color: "#1e293b"
                  }}
                >
                  Download Document
                </Typography>
                
                <Typography 
                  variant="body2" 
                  color="#64748b" 
                  sx={{ mb: 4, lineHeight: 1.6 }}
                >
                  Get access to the complete campaign document by providing your details below.
                </Typography>
                
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ArrowDown2 size={20} />}
                  onClick={handleDownloadClick}
                  disabled={!campaign.pdfFile}
                  sx={{ 
                    bgcolor: "#00a76f",
                    "&:hover": { 
                      bgcolor: "#00a76f",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)"
                    },
                    transition: "all 0.3s ease",
                    px: 4,
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: "600",
                    borderRadius: 2,
                    width: "100%"
                  }}
                >
                Download PDF
                </Button>
                
                {!campaign.pdfFile && (
                  <Typography 
                    variant="body2" 
                    color="error" 
                    sx={{ mt: 2, fontWeight: "500" }}
                  >
                    ⚠️ No PDF file available
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Download Modal */}
      <Dialog 
        open={downloadModalOpen} 
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }
        }}
      >
        <DialogTitle sx={{ 
          pb: 2, 
          textAlign: "center",
          bgcolor: "#f8fafc",
          borderBottom: "1px solid #e2e8f0"
        }}>
          <Box sx={{ 
            bgcolor: "#00a76f", 
            borderRadius: "50%", 
            width: 60, 
            height: 60, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            mx: "auto",
            mb: 2
          }}>
            <ArrowDown2 size={24} color="white" />
          </Box>
          <Typography variant="h6" fontWeight="700" color="#1e293b">
            Download Campaign Document
          </Typography>
          <Typography variant="body2" color="#64748b" sx={{ mt: 1 }}>
            Please provide your details to download the document. Your information will be saved for campaign tracking.
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                value={userDetails.name}
                onChange={handleInputChange('name')}
                variant="outlined"
                required
                InputProps={{
                  startAdornment: <User size={20} color="#64748b" style={{ marginRight: 8 }} />
                }}
                style={{marginTop:"10px"}}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#00a76f',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#00a76f',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#3b82f6',
                  },
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={userDetails.email}
                onChange={handleInputChange('email')}
                variant="outlined"
                required
                InputProps={{
                  startAdornment: <Message size={20} color="#64748b" style={{ marginRight: 8 }} />
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#3b82f6',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#3b82f6',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#3b82f6',
                  },
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ 
          p: 3, 
          bgcolor: "#f8fafc",
          borderTop: "1px solid #e2e8f0",
          gap: 2
        }}>
          <Button
            onClick={handleCloseModal}
            variant="outlined"
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              borderColor: "#d1d5db",
              color: "#6b7280",
              "&:hover": {
                borderColor: "#9ca3af",
                bgcolor: "#f9fafb"
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDownloadPdf}
            variant="contained"
            disabled={downloading || !userDetails.name.trim() || !userDetails.email.trim()}
            startIcon={downloading ? <CircularProgress size={16} /> : <ArrowDown2 size={16} />}
            sx={{
              bgcolor: "#3b82f6",
              "&:hover": { 
                bgcolor: "#2563eb",
                transform: "translateY(-1px)",
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)"
              },
              "&:disabled": {
                bgcolor: "#9ca3af",
                color: "white"
              },
              transition: "all 0.2s ease",
              borderRadius: 2,
              px: 3,
              py: 1,
              fontWeight: "600"
            }}
          >
            {downloading ? "Downloading..." : "Download PDF"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CampaignViewPage;
