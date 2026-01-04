import React, { useState } from "react";
import { Popover, Grid, IconButton, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import XIcon from "@mui/icons-material/X";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  handleFacebookShare,
  handleTwitterShare,
  handleWhatsAppShare,
  navigateToDetail,
} from "@/CustomServices/Constant";

const ShareButtons = ({ property }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const apiurl = import.meta.env.VITE_BASE_API_URL;

  const open = Boolean(anchorEl);
  const id = open ? "social-share-popover" : undefined;
  const pageUrl = `https://www.farmlandbazaar.com${navigateToDetail(
    property?.propertyType,
    property?.propertyTitle,
    property?.propertyCode
  )}`;
  const metaUrl = `${apiurl}/page-meta?imageUrl=${encodeURIComponent(
    property?.heroImage
  )}&title=${encodeURIComponent(
    property?.propertyTitle
  )}&pageUrl=${encodeURIComponent(pageUrl)}`;

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(metaUrl)
      .then(() => {
        toast.success("URL copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy URL: ", error);
      });
  };

  return (
    <div>
      <button
        className="fl-btn-outline-dark px-3"
        id="share"
        aria-describedby={id}
        onClick={handleClick}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M10.9338 14.1856L7.43473 12.277C6.82645 12.927 5.96083 13.3333 5.00033 13.3333C3.15938 13.3333 1.66699 11.8409 1.66699 9.99996C1.66699 8.15901 3.15938 6.66663 5.00033 6.66663C5.96078 6.66663 6.82637 7.07284 7.43464 7.72284L10.9338 5.81423C10.8684 5.55363 10.8337 5.28085 10.8337 4.99996C10.8337 3.15901 12.3261 1.66663 14.167 1.66663C16.0079 1.66663 17.5003 3.15901 17.5003 4.99996C17.5003 6.84091 16.0079 8.33329 14.167 8.33329C13.2065 8.33329 12.3409 7.92705 11.7326 7.27701L8.23347 9.18563C8.29891 9.44621 8.33366 9.71904 8.33366 9.99996C8.33366 10.2809 8.29892 10.5536 8.2335 10.8142L11.7327 12.7229C12.3409 12.0729 13.2065 11.6666 14.167 11.6666C16.0079 11.6666 17.5003 13.159 17.5003 15C17.5003 16.8409 16.0079 18.3333 14.167 18.3333C12.3261 18.3333 10.8337 16.8409 10.8337 15C10.8337 14.719 10.8684 14.4462 10.9338 14.1856ZM5.00033 11.6666C5.9208 11.6666 6.66699 10.9205 6.66699 9.99996C6.66699 9.07946 5.9208 8.33329 5.00033 8.33329C4.07985 8.33329 3.33366 9.07946 3.33366 9.99996C3.33366 10.9205 4.07985 11.6666 5.00033 11.6666ZM14.167 6.66663C15.0875 6.66663 15.8337 5.92043 15.8337 4.99996C15.8337 4.07948 15.0875 3.33329 14.167 3.33329C13.2465 3.33329 12.5003 4.07948 12.5003 4.99996C12.5003 5.92043 13.2465 6.66663 14.167 6.66663ZM14.167 16.6666C15.0875 16.6666 15.8337 15.9205 15.8337 15C15.8337 14.0795 15.0875 13.3333 14.167 13.3333C13.2465 13.3333 12.5003 14.0795 12.5003 15C12.5003 15.9205 13.2465 16.6666 14.167 16.6666Z"
              fill="#212B36"
            />
          </svg>
        </span>
      </button>{" "}
      <Popover
        disableScrollLock
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          style={{ padding: "1rem" }}
        >
          <Grid item>
            <IconButton aria-label="share on Facebook">
              <Link
                to=""
                onClick={(event) =>
                  handleFacebookShare(event, metaUrl, property?.propertyTitle)
                }
              >
                <FacebookIcon style={{ fontSize: "2rem", color: "#1877f2" }} />
              </Link>
            </IconButton>
            <Typography className="fl-fs-16">Facebook</Typography>
          </Grid>
          <Grid item>
            <IconButton aria-label="share on WhatsApp">
              <Link
                to=""
                onClick={(event) =>
                  handleWhatsAppShare(event, metaUrl, property?.propertyTitle)
                }
              >
                <WhatsAppIcon style={{ fontSize: "2rem", color: "#00a884" }} />
              </Link>
            </IconButton>
            <Typography className="fl-fs-16">WhatsApp</Typography>
          </Grid>
          <Grid item>
            <IconButton aria-label="share on WhatsApp">
              <Link
                to=""
                onClick={(event) =>
                  handleTwitterShare(event, metaUrl, property?.propertyTitle)
                }
              >
                <XIcon style={{ fontSize: "2rem", color: "#000000" }} />
              </Link>
            </IconButton>
            <Typography className="fl-fs-16">Twitter</Typography>
          </Grid>
          <Grid item>
            <IconButton aria-label="copy link">
              <Link to="" onClick={handleCopyLink}>
                <ContentCopyIcon style={{ fontSize: "2rem" }} />
              </Link>
            </IconButton>
            <Typography className="fl-fs-16">Copy Link</Typography>
          </Grid>
        </Grid>
      </Popover>
    </div>
  );
};

export default ShareButtons;
