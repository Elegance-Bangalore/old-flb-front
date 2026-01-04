import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { TextField } from "@mui/material";
import {
  addPropertyCategoryApi,
  createBlogTagsApi,
  editPropertyCategoryAdmin,
  updateBlogTagsApi,
} from "@/ApiRoutes/AdminApi";
import LoadingButton from "@mui/lab/LoadingButton";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { toast } from "react-toastify";

function AddTagsModal({ open, handleClose, editData = null, getBlogTags }) {
  const [tags, setTags] = useState("");
  const [loader, setLoader] = useState(false);

  async function addBlogtags(e) {
    e.preventDefault();
    setLoader(true);
    try {
      const res = await createBlogTagsApi({ tags });
      toast.success("Tag Added Successfully");
      handleClose();
      getBlogTags();
      setTags("");
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
      const data = { tags: tags, id: editData?._id };
      const res = await updateBlogTagsApi(data);
      toast.success("Tag Update Successfully");
      handleClose();
      getBlogTags();
      setTags("");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    if (editData) {
      setTags(editData?.tags);
    } else {
      setTags("");
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
          <DialogTitle id="alert-dialog-title">Add Tags</DialogTitle>
          <DialogContent className="p-3 mb-2">
            <div className="row gap-3">
              <div className="col-12">
                <TextField
                  id="tags"
                  label="Tags Title"
                  size="small"
                  variant="outlined"
                  name="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
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
                    disabled={!tags}
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

export default AddTagsModal;
