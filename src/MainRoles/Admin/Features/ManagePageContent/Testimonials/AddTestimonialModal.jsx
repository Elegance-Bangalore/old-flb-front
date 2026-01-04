import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import ProfilePicture from "@/CustomCommon/AllRoles/ProfilePicture";
import { addTestimonialApi, updateTestimonialApi } from "@/ApiRoutes/AdminApi";
import { LoadingButton } from "@mui/lab";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { toast } from "react-toastify";
import ShowError from "@/CustomCommon/Others/ShowError";
import { testimonialSchema } from "@/MainRoles/Admin/AdminSchema/adminSchema";

function AddTestimonialModal({
  editData = null,
  open,
  handleClose,
  getTestimonials,
}) {
  const [loader, setLoader] = useState(false);

  const initialValues = {
    name: "",
    type: "Review",
    description: "",
    image: {},
    youTubeLink: "",
    ratings: "",
  };

  const {
    values,
    handleChange,
    setFieldValue,
    handleSubmit,
    resetForm,
    setValues,
    handleBlur,
    touched,
    errors,
  } = useFormik({
    initialValues,
    validationSchema: testimonialSchema,
    onSubmit: (values) => {
      editData ? updateTestimonial(values) : addTestimonial(values);
    },
  });

  const addTestimonial = async (values) => {
    try {
      setLoader(true);
      const response = await addTestimonialApi(values);
      toast.success("Testimonial Added Successfully");
      getTestimonials();
      handleClose();
      resetForm();
    } catch (error) {
      console.log("Error", error);
      toastMessage();
    } finally {
      setLoader(false);
    }
  };

  const updateTestimonial = async (values) => {
    try {
      setLoader(true);
      const response = await updateTestimonialApi(values);
      toast.success("Testimonial Updated Successfully");
      getTestimonials();
      handleClose();
      resetForm();
    } catch (error) {
      console.log("Error", error);
      toastMessage();
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (editData) {
      setValues(editData);
    } else {
      resetForm();
    }
  }, [editData, open]);

  const isButtonDisabled = () => {
    if (values.type === "Link") {
      return !values.youTubeLink;
    } else if (values.type === "Review") {
      return !values.name || !values.description;
    }
    return false;
  };

  return (
    <div>
      <div>
        <React.Fragment>
          <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            disableScrollLock
          >
            <DialogTitle id="alert-dialog-title">Add Testimonials</DialogTitle>
            <DialogContent className="p-3 mb-2" >
              <div className="row gap-3">
                <div className="col-12" hidden={values.type === "Link"}>
                  <ProfilePicture
                    setFieldValue={setFieldValue}
                    inputName="image"
                    profilePic={values.image?.Location}
                  />
                </div>

                <div className="col-12">
                  <FormControl variant="outlined">
                    <InputLabel id="days-label">Testimonial Type</InputLabel>
                    <Select
                      labelId="days-label"
                      label="Testimonial Type"
                      name="type"
                      value={values.type}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      MenuProps={{
                        disableScrollLock: true,
                      }}
                    >
                      <MenuItem value={"Link"}>Link</MenuItem>
                      <MenuItem value={"Review"}>Review</MenuItem>
                    </Select>
                  </FormControl>
                  <ShowError touched={touched.type} message={errors.type} />
                </div>

                <div className="col-12" hidden={values.type === "Link"}>
                  <FormControl variant="outlined">
                    <InputLabel id="">Ratings</InputLabel>
                    <Select
                      labelId=""
                      label="Rating"
                      name="ratings"
                      onBlur={handleBlur}
                      value={values.ratings}
                      onChange={handleChange}
                      MenuProps={{
                        disableScrollLock: true,
                      }}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Select>
                  </FormControl>
                  <ShowError
                    touched={touched.ratings}
                    message={errors.ratings}
                  />
                </div>
                <div className="col-12" hidden={values.type === "Link"}>
                  <TextField
                    id="Username"
                    label="Username"
                    variant="outlined"
                    name="name"
                    onBlur={handleBlur}
                    value={values.name}
                    onChange={handleChange}
                  />
                  <ShowError touched={touched.name} message={errors.name} />
                </div>
                <div className="col-12" hidden={values.type === "review"}>
                  <TextField
                    id="youtubeLink"
                    label="Youtube Link"
                    variant="outlined"
                    name="youTubeLink"
                    onBlur={handleBlur}
                    value={values.youTubeLink}
                    onChange={handleChange}
                  />
                  <ShowError
                    touched={touched.youTubeLink}
                    message={errors.youTubeLink}
                  />
                </div>

                <div className="col-12" hidden={values.type === "Link"}>
                  <TextField
                    id=""
                    label="Review"
                    multiline
                    rows={4}
                    onBlur={handleBlur}
                    variant="outlined"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                  />
                  <ShowError
                    touched={touched.description}
                    message={errors.description}
                  />
                </div>
              </div>
            </DialogContent>
            <div className="col-12 p-3">
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
                  className="custom-dark"
                  loading={loader}
                  loadingIndicator="Saving..."
                  disabled={loader || isButtonDisabled()}
                  variant="outlined"
                  onClick={handleSubmit}
                  type="button"
                >
                  {editData ? "Update" : "Save"}
                </LoadingButton>
              </div>
            </div>
          </Dialog>
        </React.Fragment>
      </div>
    </div>
  );
}

export default AddTestimonialModal;
