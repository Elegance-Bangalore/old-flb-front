import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  TextField,
  Box,
  Backdrop,
  CircularProgress,
  Button,
  Typography,
} from "@mui/material";
import { toastMessage } from "@/CustomServices/ToastMessage";
import ShowError from "@/CustomCommon/Others/ShowError";

function CampaignForm() {
  const [loader, setLoader] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);
  const [update, setUpdate] = useState(false);

  const initialValues = {
    title: "",
    subtitle: "",
    description: "",
    campaignImage: "",
    startDate: "",
    endDate: "",
    isActive: false,
  };

  const Formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      if (update) {
        updateContent(values);
        return;
      }
      addContent(values);
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setValues,
  } = Formik;

  async function addContent(value) {
    try {
      setLoader(true);
      // TODO: Replace with actual API call
      // await createCampaignApi(value);
      console.log("Creating campaign:", value);
      toastMessage(200, "Campaign Created Successfully");
    } catch (error) {
      toastMessage();
    } finally {
      setLoader(false);
    }
  }

  async function updateContent(value) {
    try {
      setLoader(true);
      // TODO: Replace with actual API call
      // await updateCampaignApi(value);
      console.log("Updating campaign:", value);
      toastMessage(200, "Campaign Updated Successfully");
    } catch (error) {
      toastMessage();
    } finally {
      setLoader(false);
    }
  }

  async function getContent() {
    try {
      setPageLoader(true);
      // TODO: Replace with actual API call
      // const response = await getCampaignApi();
      // if (response.data.campaign.length) {
      //   setValues(response.data.campaign[0]);
      //   setUpdate(true);
      // }
    } catch (error) {
      toastMessage();
    } finally {
      setPageLoader(false);
    }
  }

  useEffect(() => {
    getContent();
  }, []);

  return (
    <>
      <div className="my-3">
        <Typography variant="h5" className="mb-3">
          Campaign Information
        </Typography>
        
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
          />
          <ShowError error={errors.title} touched={touched.title} />

          <TextField
            fullWidth
            label="Campaign Subtitle"
            name="subtitle"
            value={values.subtitle}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.subtitle && Boolean(errors.subtitle)}
            helperText={touched.subtitle && errors.subtitle}
          />
          <ShowError error={errors.subtitle} touched={touched.subtitle} />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Campaign Description"
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.description && Boolean(errors.description)}
            helperText={touched.description && errors.description}
          />
          <ShowError error={errors.description} touched={touched.description} />

          <TextField
            fullWidth
            type="url"
            label="Campaign Image URL"
            name="campaignImage"
            value={values.campaignImage}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.campaignImage && Boolean(errors.campaignImage)}
            helperText={touched.campaignImage && errors.campaignImage}
          />
          <ShowError error={errors.campaignImage} touched={touched.campaignImage} />

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              type="date"
              label="Start Date"
              name="startDate"
              value={values.startDate}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{ shrink: true }}
              error={touched.startDate && Boolean(errors.startDate)}
              helperText={touched.startDate && errors.startDate}
            />

            <TextField
              fullWidth
              type="date"
              label="End Date"
              name="endDate"
              value={values.endDate}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{ shrink: true }}
              error={touched.endDate && Boolean(errors.endDate)}
              helperText={touched.endDate && errors.endDate}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <input
              type="checkbox"
              name="isActive"
              checked={values.isActive}
              onChange={(e) => setFieldValue("isActive", e.target.checked)}
            />
            <Typography>Active Campaign</Typography>
          </Box>
        </Box>
      </div>

      <div className="my-4">
        <Button
          variant="contained"
          color="primary"
          disabled={loader}
          onClick={handleSubmit}
          sx={{ 
            backgroundColor: "#00A76F",
            "&:hover": { backgroundColor: "#00A76F" }
          }}
        >
          {loader ? "Saving..." : update ? "Update Campaign" : "Save Campaign"}
        </Button>
      </div>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={pageLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default CampaignForm;
