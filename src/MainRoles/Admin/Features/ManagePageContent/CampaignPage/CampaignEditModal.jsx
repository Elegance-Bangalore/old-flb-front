import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Backdrop,
  CircularProgress,
  Paper,
  Chip,
} from "@mui/material";
import { CloseCircle, DocumentUpload, Image } from "iconsax-react";
import { useFormik } from "formik";
import { toastMessage } from "@/CustomServices/ToastMessage";
import ShowError from "@/CustomCommon/Others/ShowError";
import TinyEditor from "@/CustomCommon/Others/TinyEditor";
import { campaignApi } from "@/CustomServices/CampaignApi";

function CampaignEditModal({ open, onClose, onSave, campaignId, campaignData }) {
  const [loading, setLoading] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [existingPdfFile, setExistingPdfFile] = useState(null);
  const [existingBackgroundImage, setExistingBackgroundImage] = useState(null);

  const initialValues = {
    title: campaignData?.title || "",
    description: campaignData?.description || "",
    pdfButtonName: campaignData?.pdfButtonName || "Upload PDF Document",
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true, // This allows the form to reinitialize when campaignData changes
    onSubmit: async (values) => {
      await handleSave(values);
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
  } = formik;

  useEffect(() => {
    if (campaignData) {
      setExistingPdfFile(campaignData.pdfFile);
      setExistingBackgroundImage(campaignData.backgroundImage);
    }
  }, [campaignData]);

  const handleSave = async (formValues) => {
    try {
      setLoading(true);
      
      // Create form data for file uploads
      const formData = new FormData();
      formData.append("title", formValues.title);
      formData.append("description", formValues.description);
      formData.append("pdfButtonName", formValues.pdfButtonName);
      formData.append("imageButtonName", "Upload Background Image");
      
      if (pdfFile) {
        formData.append("pdfFile", pdfFile);
      }
      
      if (backgroundImage) {
        formData.append("backgroundImage", backgroundImage);
      }

      // Call the update API
      await campaignApi.updateCampaign(campaignId, formData);
      
      toastMessage(200, "Campaign updated successfully");
      onSave();
      handleClose();
    } catch (error) {
      toastMessage(400, error.message || "Failed to update campaign");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    resetForm();
    setPdfFile(null);
    setBackgroundImage(null);
    onClose();
  };

  const handlePdfChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      toastMessage(400, "Please select a valid PDF file");
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg")) {
      setBackgroundImage(file);
    } else {
      toastMessage(400, "Please select a valid image file (JPEG, PNG)");
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        maxHeight="90vh"
        PaperProps={{
          sx: { 
            borderRadius: 2,
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column"
          }
        }}
      >
        <DialogTitle sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          borderBottom: "1px solid #e0e0e0"
        }}>
          <Typography variant="h6" fontWeight="bold">
            Edit Campaign
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseCircle size={20} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ 
          py: 3, 
          overflow: "auto",
          flex: 1,
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#c1c1c1",
            borderRadius: "4px",
            "&:hover": {
              background: "#a8a8a8",
            },
          },
        }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              fullWidth
              label="Campaign Title"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.title && Boolean(errors.title)}
              helperText={touched.title && errors.title}
              required
            />
            <ShowError error={errors.title} touched={touched.title} />

            <Box>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                Campaign Description
              </Typography>
              <TinyEditor
                content={values.description}
                setFieldValue={setFieldValue}
                name="description"
                height={300}
              />
              <ShowError error={errors.description} touched={touched.description} />
            </Box>

            {/* PDF Upload Section */}
            <Box>
              <TextField
                fullWidth
                label="PDF Button Name"
                name="pdfButtonName"
                value={values.pdfButtonName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.pdfButtonName && Boolean(errors.pdfButtonName)}
                helperText={touched.pdfButtonName && errors.pdfButtonName}
                sx={{ mb: 2 }}
              />
              <ShowError error={errors.pdfButtonName} touched={touched.pdfButtonName} />
              
              <Paper
                elevation={1}
                sx={{
                  p: 3,
                  border: "2px dashed #e0e0e0",
                  borderRadius: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#00A76F",
                    backgroundColor: "#f8f9fa",
                  },
                }}
                onClick={() => document.getElementById('pdf-upload-edit').click()}
              >
                <DocumentUpload size={48} color="#00A76F" />
                <Typography variant="h6" sx={{ mt: 1, mb: 1, fontWeight: 600 }}>
                  {values.pdfButtonName}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Click to browse or drag and drop your PDF file
                </Typography>
                <input
                  id="pdf-upload-edit"
                  type="file"
                  accept=".pdf"
                  onChange={handlePdfChange}
                  style={{ display: "none" }}
                />
                {pdfFile && (
                  <Chip
                    icon={<DocumentUpload size={16} />}
                    label={pdfFile.name}
                    color="success"
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                )}
                {existingPdfFile && !pdfFile && (
                  <Chip
                    icon={<DocumentUpload size={16} />}
                    label="Current PDF file"
                    color="info"
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                )}
              </Paper>
            </Box>

            {/* Image Upload Section */}
            <Box>
              <Paper
                elevation={1}
                sx={{
                  p: 3,
                  border: "2px dashed #e0e0e0",
                  borderRadius: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#00A76F",
                    backgroundColor: "#f8f9fa",
                  },
                }}
                onClick={() => document.getElementById('image-upload-edit').click()}
              >
                <Image size={48} color="#00A76F" />
                <Typography variant="h6" sx={{ mt: 1, mb: 1, fontWeight: 600 }}>
                  Upload Background Image
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Click to browse or drag and drop your image file
                </Typography>
                <input
                  id="image-upload-edit"
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                {backgroundImage && (
                  <Chip
                    icon={<Image size={16} />}
                    label={backgroundImage.name}
                    color="success"
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                )}
                {existingBackgroundImage && !backgroundImage && (
                  <Chip
                    icon={<Image size={16} />}
                    label="Current background image"
                    color="info"
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                )}
              </Paper>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ 
          px: 3, 
          py: 2, 
          borderTop: "1px solid #e0e0e0",
          gap: 1,
          flexShrink: 0
        }}>
          <Button 
            onClick={handleClose} 
            variant="outlined"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading}
            sx={{ 
              backgroundColor: "#00A76F",
              "&:hover": { backgroundColor: "#00A76F" }
            }}
          >
            {loading ? "Updating..." : "Update Campaign"}
          </Button>
        </DialogActions>
      </Dialog>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default CampaignEditModal;
