import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function BlogModal({ open, handleClose, blogData, index }) {

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        style={{ top: "10%" }}
        disableScrollLock
        maxWidth="md"
        sx={{
          "& .MuiDialog-paper": {
            width: "100%", // Custom width
            maxWidth: "62.5rem", // Set max width
            position: "relative",
          },
        }}
        open={open}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            zIndex: 1,
            backgroundColor: "white",
            padding: 0.5,
            borderRadius: "50%",
            right: 2,
            top: 2,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <div
            style={{ height: "auto" }}
            className="blog-cards"
            key={index}
            dangerouslySetInnerHTML={{ __html: blogData.youtubeLink }}
          />
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
