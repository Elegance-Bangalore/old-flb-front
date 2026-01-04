import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { TickSquare } from "iconsax-react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function PaymentSuccessfullModal({
  paymentDoneModal,
  handleClose,
}) {
  const handleDashboardRedirect = () => {
    window.location.href = "/seller/dashboard"; // Redirects and refreshes the page
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={paymentDoneModal}
      >
        <div className="custom-modal-header px-4 py-3 mt-2">
          <h5 className="text-uppercase text-dark-green fw-600">
            Payment Successfully Done
          </h5>
        </div>
        <DialogContent className="px-4 pt-1">
          <div className="text-center">
            <TickSquare size="100" color="#00a76f" variant="Bulk" />
          </div>
        </DialogContent>
        <DialogActions className="justify-content-center mb-3">
          <button
            className="btn-upgrade text-capitalize px-5"
            onClick={handleDashboardRedirect}
          >
            Go to Dashboard
          </button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
