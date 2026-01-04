import { Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import axios from "axios";

function GetFileUrl({ buttonContent = "Upload", formik, inputName }) {
  const [loading, setLoading] = useState(false);
  const { setFieldValue } = formik;
  const apiurl = import.meta.env.VITE_BASE_API_URL;
  const url = `${apiurl}/admin/blog/upload/image`;

  // Styled component for visually hidden input
  const VisuallyHiddenInput = styled("input")({
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    border: 0,
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
  });

  const uploadFile = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        const fileUrl = response?.data?.data;
        setFieldValue(inputName, fileUrl);
        toast.success("File uploaded successfully");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        component="label"
        variant="contained"
        startIcon={
          loading ? <CircularProgress size={24} /> : <CloudUploadIcon />
        }
        disabled={loading}
      >
        {loading ? "Uploading..." : buttonContent}
        <VisuallyHiddenInput
          type="file"
          onChange={uploadFile}
          accept=".pdf, image/*"
        />
      </Button>
    </div>
  );
}

export default GetFileUrl;
