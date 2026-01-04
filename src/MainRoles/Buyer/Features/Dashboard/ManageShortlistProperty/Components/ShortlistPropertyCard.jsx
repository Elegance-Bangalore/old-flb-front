import React, { useEffect, useState } from "react";
import heart from "@/public/assets/images/profile/heart.svg";
import directionIcon from "@/public/assets/images/manage-property/direction-arrow.svg";
import callIcon from "@/public/assets/images/profile/call.svg";
import chatBlack from "@/public/assets/images/profile/chat-black.svg";
import scale from "@/public/assets/images/profile/scale.svg";
import ruppe from "@/public/assets/images/profile/ruppe.svg";
import {
  formatDate,
  formatNumber,
  formatNumberInCr,
  navigateToDetail,
} from "@/CustomServices/Constant";
import {
  setPropertyId,
  setPropertyName,
  setSenderId,
  setSenderName,
  setShowModal,
} from "@/Redux/Chat/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";
import CopyToClipboard from "react-copy-to-clipboard";

function ShortlistPropertyCard({ property, removeProperty, index, handleClickOpen }) {

  const dispatch = useDispatch();

  function chatClick(sender, property, name, propertyName) {
    dispatch(setSenderId(sender));
    dispatch(setPropertyId(property));
    dispatch(setSenderName(name));
    dispatch(setPropertyName(propertyName));
    dispatch(setShowModal(true));
  }

  return (
    <div>
      <div
        className="row bg-white-shadow border-hover-green align-propertys-center p-3 mb-3 mt-5"
      >
        <div className="col-md-9">
          <div className="properties-details">
            <div className="upper-content d-flex align-propertys-center justify-content-between mb-3">
              <div className="">
                <button className="pill-btn-green text-uppercase fw-bold px-3">
                  Available from:
                  {formatDate(property?.properties?.possessionDate)}
                </button>
              </div>
              <div
                className=""
                onClick={() => removeProperty(property?.properties?._id)}
                style={{ cursor: "pointer" }}
              >
                <img src={heart} alt="heart" className="img-fluid heart" />
              </div>
            </div>
            <div className="properties-content mb-3">
              <h3>
                <Link
                  to={navigateToDetail(property?.properties?.propertyType, property?.properties?.propertyTitle, property?.properties?.propertyCode)}
                  target="_blank"
                >
                  {property?.properties?.propertyTitle}
                  <span className="ms-2">
                    <img src={directionIcon} alt="icon" />
                  </span>
                </Link>
              </h3>
              <h5>{property?.properties?.locality}</h5>
            </div>
            <div className="bottom-content d-flex aligin-propertys-center justify-content-between">
              <h2>{formatNumberInCr(property?.properties?.price)}</h2>
              <div className="properties-action d-flex gap-3">
                {property?.visitRequest ? (
                  property.accepted ? (
                    <button className="btn-black">Request Accepted</button>
                  ) : (
                    <button className="btn-black">Request Sent</button>
                  )
                ) : (
                  <Tooltip title={!property?.properties?.postedBy ? "Schedule Visit is not available for this property right now" : ""} arrow>
                    <button
                      className="btn-black"
                      onClick={() => handleClickOpen(index, property?.properties?._id)}
                      disabled={!property?.properties?.postedBy}
                    >
                      Send Visit Request
                    </button>
                  </Tooltip>
                )}
              </div>
            </div>
            <div className="bottom-content d-flex aligin-propertys-center justify-content-between mt-3">
              <div className="">
                {property?.properties?.totalAcre ? (
                  <h5>
                    <span>

                      <img className="img-fluid" src={scale} alt="icon" />
                    </span>
                    {property?.properties?.totalAcre} Acre •
                    <span>

                      {/* <img className="img-fluid" src={ruppe} alt="icon" /> */}
                    </span>
                    {/* {property?.properties?.pricePerSqft} / Acre */}
                  </h5>
                ) : (
                  <h5>
                    <span>

                      <img className="img-fluid" src={scale} alt="icon" />
                    </span>
                    {property?.properties?.plotLength *
                      property?.properties?.plotBreadth}
                    SF •
                    <span>

                      <img className="img-fluid" src={ruppe} alt="icon" />
                    </span>
                    {formatNumber(property?.properties?.pricePerSqft)} / SF
                  </h5>
                )}
              </div>
              {property?.properties?.postedBy && (
                <div className="d-flex gap-3">
                  <span>
                    <CopyToClipboard
                      text={property?.properties?.postedBy?.phone}
                      onCopy={() => toast.success("Text copied")}
                    >
                      <button className="btn btn-light-green d-inline-block px-4 py-0">
                        <Tooltip title={property?.properties?.postedBy?.phone}>
                          <img
                            className="img-fluid"
                            src={callIcon}
                            alt="callIcon"
                          />
                        </Tooltip>
                      </button>
                    </CopyToClipboard>
                  </span>
                  <span
                    onClick={() =>
                      chatClick(
                        property?.properties?.postedBy._id,
                        property?.properties?._id,
                        property?.properties?.postedBy.fullName,
                        property?.properties?.propertyTitle
                      )
                    }
                  >
                    <button className="btn btn-profile-edit d-inline-block px-4 py-0">
                      <img className="img-fluid" src={chatBlack} alt="chat" />
                    </button>
                  </span>
                </div>
              )}

            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="properties-image">
            <img
              src={property?.properties?.heroImage}
              alt="pro"
              className="img-fluid w-100 rounded-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShortlistPropertyCard;
