import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import { DialogContent, Tooltip, Typography } from "@mui/material";
import SingleImageUpload from "@/CustomCommon/PostProperty/SingleImageUpload";
import { LoadingButton } from "@mui/lab";
import { sellerPromotePropertyApi } from "@/ApiRoutes/SellerApis";
import { toast } from "react-toastify";
import { toastMessage } from "@/CustomServices/ToastMessage";

function PromoteBanner({ open, handleClose, id, sellerPropertyList }) {
  const [loader, setLoader] = useState(false);

  const initialValues = {
    propertyAds: "",
    type: "add",
  };

  const Formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      promoteProperty();
    },
  });

  async function promoteProperty() {
    try {
      setLoader(true);
      const response = await sellerPromotePropertyApi(Formik.values, id);
      sellerPropertyList();
    } catch (error) {
      toastMessage(400, error?.response?.data?.message);
      throw error;
    } finally {
      setLoader(false);
      handleClose();
    }
  }

  useEffect(() => {
    Formik.resetForm();
  }, [open]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        disableScrollLock
      >
        <DialogTitle id="alert-dialog-title mb-2">
          Add Banner for this property
        </DialogTitle>
        <DialogContent className="p-3 mb-3">
          <form className="row" onSubmit={Formik.handleSubmit}>
            <div className="col-12 mb-2">
              <Typography>Banner</Typography>
              <SingleImageUpload
                name="propertyAds"
                formik={Formik}
                show={false}
                height="12rem"
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
                <Tooltip>
                  <span>
                    <LoadingButton
                      variant="contained"
                      type="submit"
                      color="success"
                      className="me-3"
                      loading={loader}
                      disabled={!Formik.values.propertyAds}
                      onClick={Formik.handleSubmit}
                    >
                      Promote
                    </LoadingButton>
                  </span>
                </Tooltip>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default PromoteBanner;
