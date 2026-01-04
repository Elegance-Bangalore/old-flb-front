import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";

function SellerDetailModal({ show, handleClose, developerData }) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (show) {
      // Store the original overflow value
      const originalOverflow = document.body.style.overflow;
      // Disable body scroll when modal is open
      document.body.style.overflow = 'hidden';
      
      // Cleanup function to restore scroll when modal closes
      return () => {
        document.body.style.overflow = originalOverflow || 'unset';
      };
    }
  }, [show]);

  return (
    <div>
      <Dialog
        open={show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        fullWidth
        disableScrollLock={true}
        aria-describedby="alert-dialog-description"
        className="custom-modal-seller-detail"
      >
        <div className="custom-modal-sub">
          <div className="custom-modal-header"></div>
          <div className="custom-modal-content">
            <div className="text-center mb-5">
              <div className="mb-3 custom-modal-img">
                <img
                  className="img-fluid"
                  src="https://flb-public.s3.ap-south-1.amazonaws.com/check1.png"
                  alt="subscription-Image"
                />
              </div>
              <h2 className="fl-ff-main fl-text-dark">Thankyou!</h2>
              <p className="fl-fs-18 fl-text-dark lh-base">
              Your details have been securely shared with the seller.
              The seller or a Farmland Bazaar representative will contact you within one business day.
              </p>

              {/* <div className="mt-4">
                <h3 className="fw-bold mb-3 text-dark">
                  Contact Details of Seller
                </h3>

                {
                  <h4>
                    Name :{" "}
                    {developerData?.fullName ||
                      developerData?.companyName ||
                      "Team Farmland"}
                  </h4>
                }
                {<h4>Email : {developerData?.email || "info@farmlandbazaar.com"}</h4>}
                {<h4>Phone : {developerData?.phone || "7078173090"}</h4>}
              </div> */}
            </div>
            <div className="text-center">
              <button
                className="w-100 modal-btn-green text-uppercase fw-bold"
                onClick={handleClose}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default SellerDetailModal;
