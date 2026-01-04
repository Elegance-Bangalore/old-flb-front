import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { TextField } from "@mui/material";
import {
  addBlogSubCategoryApi,
  createBlogTagsApi,
  updateBlogSubCategoryApi,
  updateBlogTagsApi,
} from "@/ApiRoutes/AdminApi";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";
import { values } from "lodash";

function AddSubCategoryModal({
  open,
  handleClose,
  editData = null,
  getBlogSubCategories,
}) {
  const [loader, setLoader] = useState(false);
  const [subCategoryValues, setSubCategoryValues] = useState({
    subCategory: "",
    description: "",
  });

  async function addBlogtags(e) {
    e.preventDefault();
    setLoader(true);
    try {
      const res = await addBlogSubCategoryApi(subCategoryValues);
      toast.success("Sub Category Added Successfully");
      handleClose();
      getBlogSubCategories();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoader(false);
    }
  }

  async function updateBlogtags(e) {
    e.preventDefault();
    setLoader(true);
    try {
      const res = await updateBlogSubCategoryApi(
        subCategoryValues,
        subCategoryValues?._id
      );
      toast.success("Sub Category Update Successfully");
      handleClose();
      getBlogSubCategories();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoader(false);
    }
  }

  function handleValueChange(e) {
    const { name, value } = e.target;
    setSubCategoryValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  useEffect(() => {
    if (editData) {
      setSubCategoryValues(editData);
    } else {
      setSubCategoryValues({ subCategory: "", description: "" });
    }
  }, [open]);

  return (
    <div>
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          disableScrollLock
        >
          <DialogTitle id="alert-dialog-title">
            {editData ? "Update Category" : "Add Category"}
          </DialogTitle>
          <DialogContent className="p-3 mb-2">
            <div className="row gap-3">
              <div className="col-12">
                <TextField
                  id="subCategory"
                  label="Sub Category"
                  size="small"
                  variant="outlined"
                  name="subCategory"
                  value={subCategoryValues.subCategory}
                  onChange={handleValueChange}
                />
              </div>
              <div className="col-12">
                <TextField
                  id="description"
                  label="Description"
                  multiline
                  rows={3}
                  size="small"
                  variant="outlined"
                  name="description"
                  value={subCategoryValues.description}
                  onChange={handleValueChange}
                />
              </div>
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
                    disabled={!subCategoryValues.subCategory}
                    className="custom-dark"
                    loading={loader}
                    loadingIndicator="Saving..."
                    variant="outlined"
                    onClick={(e) =>
                      editData ? updateBlogtags(e) : addBlogtags(e)
                    }
                    type="button"
                  >
                    {editData ? "Update" : "Save"}
                  </LoadingButton>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </div>
  );
}

export default AddSubCategoryModal;
