import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  addDocumentTypeApi,
  updateDocumentTypeApi,
} from "@/ApiRoutes/AdminApi";
import { toast } from "react-toastify";

function AddDocumentTypeModal({ handleClose, editData, getDocumentType , open}) {

  const [name, setName] = useState([]);
  const [loader, setLoader] = useState(false);

  async function addDocumentType(e) {
    e.preventDefault();
    setLoader(true);
    try {
      await addDocumentTypeApi({ name });
      toast.success("Document Added Successfully");
      handleClose();
      getDocumentType();
      setName("");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoader(false);
    }
  }

  async function updateDocumentType(e) {
    e.preventDefault();
    setLoader(true);
    try {
      const data = { name: name, id: editData?._id };
      await updateDocumentTypeApi(data);
      toast.success("Document Update Successfully");
      handleClose();
      getDocumentType();
      setName("");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    if (editData) {
      setName(editData?.name);
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
            {editData ? "Update" : "Add"} Document Type
          </DialogTitle>
          <DialogContent className="p-3 mb-2">
            <div className="row gap-3">
              <div className="col-12">
                <TextField
                  id="name"
                  label="Document Name"
                  size="small"
                  variant="outlined"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                    disabled={!name}
                    className="custom-dark"
                    loading={loader}
                    loadingIndicator="Saving..."
                    variant="outlined"
                    onClick={(e) =>
                      editData ? updateDocumentType(e) : addDocumentType(e)
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

export default AddDocumentTypeModal;
