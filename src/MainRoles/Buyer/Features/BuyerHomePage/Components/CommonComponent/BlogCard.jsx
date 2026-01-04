import React, { useState } from "react";
import { Calendar, User } from "iconsax-react";
import { Link } from "react-router-dom";
import shareIcon from "../../../../../../CustomAssets/BuyerImages/share.svg";
import Popover from "@mui/material/Popover";
import Grid from "@mui/material/Grid";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import XIcon from "@mui/icons-material/X";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { toast } from "react-toastify";
import {
  formatDate,
  formatTitleForUrl,
  handleFacebookShare,
  handleTwitterShare,
  handleWhatsAppShare,
} from "@/CustomServices/Constant";

const BlogCard = ({ blog }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "social-share-popover" : undefined;
  const blogTitle = blog?.title;
  const blogImage = blog?.logo || "";
  const pageUrl = `https://www.farmlandbazaar.com/blog/${`${formatTitleForUrl(
    blog?.slug || blog?.title
  )}/${blog?._id}`}`;
  const apiurl = import.meta.env.VITE_BASE_API_URL;
  const metaUrl = `${window.location.origin}/blog/${blog?.slug || blog?.title}/${blog?._id}`;

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
    <>
      <div
        className="blog-cards border fl-card-border border-raidus-10 mb-4"
        style={{ overflow: "hidden" }}
      >
        <div className="position-relative">
          <Link
            to={`/blog/${formatTitleForUrl(blog?.slug || blog?.title)}/${
              blog?._id
            }`}
            target="_blank"
          >
            {blog?.youtubeLink ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: blog.youtubeLink,
                }}
                className="fl-img-16-10"
              />
            ) : (
              <img
                className="fl-property-card-img w-100 fl-img-16-10"
                src={blog?.logo}
                alt="Blog Image"
              />
            )}
          </Link>
          <div
            className="position-absolute end-0 bottom-0 me-4"
            style={{ marginBottom: "-1.2rem" }}
          >
            <button
              className="fl-btn-circle-white grid-place-center"
              id="share"
              aria-describedby={id}
              onClick={handleClick}
            >
              <img
                className="blog-share-icon"
                src={shareIcon}
                alt="share-icon"
              />
            </button>
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
                className="p-2"
              >
                <Grid item>
                  <ul className="mb-0 d-flex gap-3 justify-content-between blog-share-list">
                    <li>
                      <Link
                        to=""
                        onClick={(event) =>
                          handleFacebookShare(event, metaUrl, blogTitle)
                        }
                      >
                        <FacebookIcon style={{ fontSize: "1.8rem" }} />
                      </Link>
                    </li>
                    <li>
                      <Link
                        to=""
                        onClick={(event) =>
                          handleWhatsAppShare(event, metaUrl, blogTitle)
                        }
                      >
                        <WhatsAppIcon style={{ fontSize: "1.8rem" }} />
                      </Link>
                    </li>
                    <li>
                      <Link
                        to=""
                        onClick={(event) =>
                          handleTwitterShare(event, metaUrl, blogTitle)
                        }
                      >
                        <XIcon style={{ fontSize: "1.8rem" }} />
                      </Link>
                    </li>
                    <li>
                      <Link to="" onClick={handleCopyLink}>
                        <ContentCopyIcon style={{ fontSize: "1.8rem" }} />
                      </Link>
                    </li>
                  </ul>
                </Grid>
              </Grid>
            </Popover>
          </div>
        </div>
        <div className="bg-white">
          <div className="px-3 px-lg-4 py-3">
            <Link
              to={`/blog/${formatTitleForUrl(blog?.slug || blog?.title)}/${
                blog?._id
              }`}
              target="_blank"
              title={blog?.title}
            >
              <h3 className="card-title fl-ff-main fl-text-dark fl-text-green-hover fl-fw-600 mb-3 mb-lg-5" style={{ whiteSpace: "normal", overflow: "hidden", textOverflow: "clip", wordBreak: "break-word", display: "block", lineHeight: "1.4", minHeight: "2.8em", maxHeight: "2.8em" }}>
                {blog?.title}
              </h3>
            </Link>
            <div className="d-flex justify-content-between align-items-end">
              <div className="">
                <p className="mb-0 fl-ff-main fl-text-dark fl-fs-16 fw-semi-bold">
                  <span className="fl-text-green">
                    <User size="20" />
                  </span>{" "}
                  <span
                    style={{ verticalAlign: "sub" }}
                    className="text-capitalize"
                  >
                    Team Farmland
                  </span>
                </p>
              </div>
              <div className="">
                <p className="mb-0 fl-ff-main fl-text-dark fl-fs-16 fw-semi-bold">
                  <span className="fl-text-green">
                    <Calendar size="20" />
                  </span>{" "}
                  <span style={{ verticalAlign: "sub" }}>
                    {formatDate(blog?.selectDate)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
