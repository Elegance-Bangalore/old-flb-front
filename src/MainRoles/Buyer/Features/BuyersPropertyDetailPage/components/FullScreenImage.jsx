import React, { useState } from "react";
import { Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Maximize4 } from "iconsax-react";

const FullScreenImage = ({ imageUrl }) => {
  const [open, setOpen] = useState(false);
  {
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <img
        className="img-fluid w-100 fl-img-4-3"
        src={imageUrl}
        alt="Popup-image"
      />
      <div className="detail-hover-btn">
        <button className="fl-btn-white text-uppercase" onClick={handleOpen}>
          <span>
            <Maximize4 size="20" />
          </span>{" "}
          view Fullscreen
        </button>
      </div>
      <Modal open={open} onClose={handleClose} disableScrollLock>
        <div
          className="fullscreen-wrapper"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            background: "none",
            boxShadow: "none",
          }}
        >
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              className="img-fluid rounded "
              src={imageUrl}
              alt="Popup"
              style={{
                display: "block",
                maxWidth: "100vw",
                maxHeight: "100vh",
                margin: 0,
              }}
            />
            <IconButton
              onClick={handleClose}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                color: "#00a76f",
                background: "none",
                boxShadow: "none",
              }}
            >
              <CloseIcon style={{ width: "2em", height: "2em" }} />
            </IconButton>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FullScreenImage;
