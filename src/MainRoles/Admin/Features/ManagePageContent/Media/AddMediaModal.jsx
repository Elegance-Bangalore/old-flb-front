import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {
  Autocomplete,
  DialogActions,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { toast } from "react-toastify";
import {
  createFeatureApi,
  propertyDropdownApi,
  updateMediaApi,
} from "@/ApiRoutes/AdminApi";
import { useFormik } from "formik";
import SingleImageUpload from "@/CustomCommon/PostProperty/SingleImageUpload";
import { LoadingButton } from "@mui/lab";
import ShowError from "@/CustomCommon/Others/ShowError";
import { addMediaApi } from "@/ApiRoutes/AdminApi";
import { mediaSchema } from "@/MainRoles/Admin/AdminSchema/adminSchema";

const AddMediaModal = ({ open, handleClose, getMedia, editData }) => {
  const [loader, setLoader] = useState(false);

  const initialValues = {
    link: "",
    mediaImage: "",
  };

  const Formik = useFormik({
    initialValues: initialValues,
    validationSchema: mediaSchema,
    onSubmit: (values) => {
      if (editData) {
        updateMedia(values);
      } else {
        addMedia(values);
      }
    },
  });

  const {
    values,
    resetForm,
    setValues,
    handleChange,
    handleBlur,
    errors,
    handleSubmit,
    setFieldValue,
    touched,
  } = Formik;

  async function addMedia(value) {
    setLoader(true);
    try {
      const res = await addMediaApi(value);
      toast.success("Media Added Successfully");
      handleClose();
      getMedia();
      resetForm();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoader(false);
    }
  }

  async function updateMedia(value) {
    try {
      setLoader(true);
      const response = await updateMediaApi(value);
      toast.success("Feature Updated Successfully");
      handleClose();
      getMedia();
      resetForm();
    } catch (error) {
      toastMessage(error?.response?.status, error?.response?.data?.error);
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    if (editData) {
      setValues(editData);
    } else {
      resetForm();
    }
  }, [editData, open]);

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        scroll="paper"
        disableScrollLock
      >
        <DialogTitle id="alert-dialog-title">Add Media</DialogTitle>
        <DialogContent className="p-3 mb-2">
          <form className="row">
            <div className="col-12 mb-4">
              <TextField
                id="url"
                label="Url"
                variant="outlined"
                name="link"
                value={values.link}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ShowError touched={touched.link} message={errors.link} />
            </div>
            <div className="col-12 mb-2">
              <Typography>Media Logo</Typography>
              <SingleImageUpload
                name="mediaImage"
                formik={Formik}
                show={false}
                height="12rem"
              />
              <ShowError
                touched={touched.mediaImage}
                message={errors.mediaImage}
              />
            </div>
          </form>
        </DialogContent>

        <DialogActions>
          <div className="col-12">
            <div className="text-end mt-2">
              <Button
                variant="outlined"
                color="warning"
                className="me-3"
                onClick={handleClose}
              >
                Close
              </Button>
              <LoadingButton
                variant="contained"
                type="submit"
                color="success"
                className="me-3"
                loading={loader}
                onClick={handleSubmit}
              >
                {editData ? "Update" : "Save"}
              </LoadingButton>
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddMediaModal;
