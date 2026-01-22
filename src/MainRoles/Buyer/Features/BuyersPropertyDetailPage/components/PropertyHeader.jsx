import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  agricultureLand,
  formatNumberInCr,
  formatNumberWithoutDecimal,
  generateDeveloperSlug,
} from "@/CustomServices/Constant";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { toast } from "react-toastify";
import ScheduleVisitModal from "@/components/Modals/ScheduleVisitModal";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { requestVisitApi } from "@/ApiRoutes/BuyersApi";
import { useSelector } from "react-redux";
import { selectUser } from "@/Redux/Auth/authSlice";
import { Tooltip } from "@mui/material";
import ShareButtons from "@/CustomCommon/AllRoles/ShareButtons";
import AreaConverter from "./AreaConverter";
import DownloadBrochure from "@/CustomCommon/AllRoles/DownloadBrochure";

function PropertyHeader({
  singleProperty,
  chatModal,
  saveProperty,
  setSingleProperty,
}) {
  const [openVisitModal, setOpenVisitModal] = useState(false);
  const [showSlots, setShowSlots] = useState(false);
  const [loader, setLoader] = useState(false);
  const propertyId = singleProperty?._id;
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    if (!user) {
      toast.success("Please login first");
      navigate("/login");
      return;
    }
    if (user?.interested !== "buy") {
      toast.info("Please login as buyer");
      return;
    }

    setOpenVisitModal(true);
  };
  const handleCloseModal = () => {
    setOpenVisitModal(false);
    setShowSlots(false);
  };

  async function makeVisitRequest(selectedTime, selectedDate) {
    try {
      setLoader(true);
      await requestVisitApi(propertyId, {
        slot: { slot: selectedTime },
        selectDate: selectedDate,
      });
      toastMessage(200, "Visit request sent successfully");
      handleCloseModal();
      setSingleProperty({ ...singleProperty, visitRequest: true, saved: true });
    } catch (err) {
      toastMessage(err?.response?.status, err?.response?.data?.error);
    } finally {
      setLoader(false);
    }
  }

  return (
    <>
      <section className="">
        <div className="container fl-container ">
          <div className="explore-wrapper fl-glass-bg property-detail-wrapper rounded-5 p-2">
            <div className="d-flex d-flex flex-column flex-lg-row">
              <div className="w-auto mb-3 mb-md-0 text-center">
                <img
                  className="detail-property-img-main img-fluid fl-img-1-1"
                  src={singleProperty?.logo}
                  alt="detail-img"
                />
              </div>
              <div className="w-100">
                <div className="rounded-start-0 bg-white  w-100 py-3 px-3 px-lg-4">
                  <div className="d-flex align-items-center gap-2 gap-md-4 jutify-content-between">
                    <div className="w-100">
                      <div className="row">
                        <div className="col-md-3 col-lg-3 align-self-center">
                          <div className="">
                            <h3 className="fl-text-dark mb-1">
                              {singleProperty?.propertyTitle}
                            </h3>
                            <p className="fl-text-dark fl-fs-18 m-0">
                              {singleProperty?.locality}, {singleProperty?.city}
                              ,
                            </p>
                            <p className="fl-text-dark fl-fs-18">
                              {singleProperty?.state}
                            </p>
                          </div>
                        </div>
                        <div className="col-md-9 col-lg-9">
                          <div className="d-flex justify-content-center align-items-center h-100">
                            <div className="border rounded-4 fl-border-green p-3 p-lg-4 w-100">
                              <div className="row">
                                <div
                                  className={`${
                                    singleProperty?.minArea
                                      ? "col-md-4 col-sm-6"
                                      : "col-md-6"
                                  } mb-3 mb-lg-0 text-center`}
                                >
                                  {singleProperty?.price &&
                                  singleProperty?.priceMax &&
                                  singleProperty?.propertyType !==
                                    agricultureLand ? (
                                    <h3 className="fl-text-dark mb-1 fs-4">
                                      {formatNumberInCr(singleProperty?.price)}{" "}
                                      -{" "}
                                      {formatNumberInCr(
                                        singleProperty?.priceMax
                                      )}
                                    </h3>
                                  ) : (
                                    <h3 className="fl-text-dark mb-1 fs-4">
                                      {formatNumberInCr(singleProperty?.price)}{" "}
                                      <span className="fs-6">Onwards</span>
                                    </h3>
                                  )}

                                  <p className="fl-text-dark fl-fs-18 m-0">
                                    <span>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="19"
                                        viewBox="0 0 18 19"
                                        fill="none"
                                      >
                                        <path
                                          d="M9 6.5H6.00075L6 15.5H4.5V6.5H1.5L5.25 2.75L9 6.5ZM16.5 12.5L12.75 16.25L9 12.5H12V3.5H13.5V12.5H16.5Z"
                                          fill="#00A76F"
                                        />
                                      </svg>
                                    </span>{" "}
                                    {singleProperty?.priceMax
                                      ? "Price Range"
                                      : "Price"}
                                  </p>
                                </div>

                                <div
                                  className={`${
                                    singleProperty?.minArea
                                      ? "col-md-4 col-sm-6"
                                      : "col-md-6"
                                  } mb-3 mb-lg-0 text-center`}
                                >
                                  {singleProperty?.minArea &&
                                  singleProperty?.maxArea &&
                                  singleProperty?.propertyType !==
                                    agricultureLand ? (
                                    <AreaConverter
                                      singleProperty={singleProperty}
                                    />
                                  ) : singleProperty?.minArea ? (
                                    <AreaConverter
                                      singleProperty={singleProperty}
                                      minOnly={true}
                                    />
                                  ) : (
                                    <h3 className="fl-text-dark mb-1 text-capitalize fs-4">
                                      {singleProperty?.minArea ||
                                        singleProperty?.totalAcre}{" "}
                                      {singleProperty?.plotArea}
                                    </h3>
                                  )}

                                  <p className="fl-text-dark fl-fs-18 m-0">
                                    <span>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="19"
                                        height="19"
                                        viewBox="0 0 19 19"
                                        fill="none"
                                      >
                                        <path
                                          d="M13.25 14.75H14.75V11H8V4.25H4.25V5.75H5.75V7.25H4.25V8.75H6.5V10.25H4.25V11.75H5.75V13.25H4.25V14.75H5.75V13.25H7.25V14.75H8.75V12.5H10.25V14.75H11.75V13.25H13.25V14.75ZM9.5 9.5H15.5C15.9142 9.5 16.25 9.83577 16.25 10.25V15.5C16.25 15.9142 15.9142 16.25 15.5 16.25H3.5C3.08579 16.25 2.75 15.9142 2.75 15.5V3.5C2.75 3.08579 3.08579 2.75 3.5 2.75H8.75C9.16423 2.75 9.5 3.08579 9.5 3.5V9.5Z"
                                          fill="#00A76F"
                                        />
                                      </svg>
                                    </span>{" "}
                                    {singleProperty?.propertyType ===
                                    agricultureLand
                                      ? "Land Area"
                                      : singleProperty?.maxArea
                                      ? "Plot Area"
                                      : singleProperty?.minArea
                                      ? "Plot Area"
                                      : "Project Size"}
                                  </p>
                                </div>

                                {singleProperty?.minArea && (
                                  <div
                                    className={`col-md-4 col-sm-6 mb-3 mb-lg-0 text-center`}
                                  >
                                    <h3 className="fl-text-dark mb-1 text-capitalize fs-4">
                                      {formatNumberWithoutDecimal(
                                        singleProperty?.pricePerSqft
                                      )}
                                    </h3>
                                    <p className="fl-text-dark fl-fs-18 m-0">
                                      <span>
                                        <svg
                                          width="15"
                                          height="15"
                                          viewBox="0 0 15 15"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M13.5002 7.49991C13.5002 4.1862 10.814 1.49991 7.50024 1.49991C4.18653 1.49991 1.50024 4.1862 1.50024 7.49991C1.50024 10.8136 4.18653 13.4999 7.50024 13.4999C10.814 13.4999 13.5002 10.8136 13.5002 7.49991ZM15.0002 7.49991C15.0002 11.642 11.6423 14.9999 7.50024 14.9999C3.35811 14.9999 0.000244141 11.642 0.000244141 7.49991C0.000244141 3.35777 3.35811 -9.15527e-05 7.50024 -9.15527e-05C11.6423 -9.15527e-05 15.0002 3.35777 15.0002 7.49991ZM8.62547 4.49991C8.87109 4.82695 9.04712 5.20929 9.13149 5.62491H10.5002V6.74991H9.13149C8.87087 8.03368 7.73589 8.99991 6.37524 8.99991H6.23327L9.02297 11.7897L8.22752 12.5851L4.50024 8.85793V7.87491H6.37524C7.11002 7.87491 7.73507 7.40533 7.96674 6.74991H4.50024V5.62491H7.96674C7.73507 4.96949 7.11002 4.49991 6.37524 4.49991H4.50024V3.37491H10.5002V4.49991H8.62547Z"
                                            fill="#00A76F"
                                          />
                                        </svg>
                                      </span>{" "}
                                      Price Per Sq. Ft.
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-2 align-items-center px-3">
                  <div className="col-md-3">
                    <p
                      className="fl-text-dark fl-fs-22 mt-3"
                      style={{ fontWeight: "600" }}
                    >
                      {singleProperty?.postedBy && (
                        <Link
                          to={`/developer/${generateDeveloperSlug(singleProperty?.postedBy?.companyName || singleProperty?.postedBy?.fullName)}/${singleProperty?.postedBy?._id}`}
                          className="fl-text-green-hover"
                        >
                          <span className="me-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                            >
                              <path
                                d="M15.75 14.9999H17.25V16.4999H0.75V14.9999H2.25V2.24988C2.25 1.83567 2.58579 1.49988 3 1.49988H15C15.4142 1.49988 15.75 1.83567 15.75 2.24988V14.9999ZM14.25 14.9999V2.99988H3.75V14.9999H14.25ZM6 8.24988H8.25V9.74988H6V8.24988ZM6 5.24988H8.25V6.74988H6V5.24988ZM6 11.2499H8.25V12.7499H6V11.2499ZM9.75 11.2499H12V12.7499H9.75V11.2499ZM9.75 8.24988H12V9.74988H9.75V8.24988ZM9.75 5.24988H12V6.74988H9.75V5.24988Z"
                                fill="#637381"
                              />
                            </svg>
                          </span>
                          {singleProperty?.postedBy?.companyName
                            ? singleProperty?.postedBy?.companyName
                            : singleProperty?.postedBy?.fullName}
                          <span className="ms-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M6.66667 4V5.33333H3.33333V12.6667H10.6667V9.33333H12V13.3333C12 13.7015 11.7015 14 11.3333 14H2.66667C2.29848 14 2 13.7015 2 13.3333V4.66667C2 4.29848 2.29848 4 2.66667 4H6.66667ZM14 2V8L11.4707 5.47133L7.4714 9.4714L6.52859 8.5286L10.528 4.52867L8 2H14Z"
                                fill="#00A76F"
                              />
                            </svg>
                          </span>
                        </Link>
                      )}
                    </p>
                  </div>
                  <div className="col-md-9 d-flex flex-wrap gap-2 gap-md-4 justify-content-md-end mt-3 mt-lg-0 social-cta">
                    <div className="">
                      <Tooltip
                        title={
                          !singleProperty?.postedBy
                            ? "Schedule Visit is not available for this property right now"
                            : "Schedule Visit"
                        }
                        arrow
                      >
                        <button
                          className="fl-btn-green"
                          onClick={handleClickOpen}
                          disabled={
                            singleProperty?.visitRequest ||
                            !singleProperty?.postedBy
                          }
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
                                d="M7.50033 0.833374V2.50004H12.5003V0.833374H14.167V2.50004H17.5003C17.9606 2.50004 18.3337 2.87314 18.3337 3.33337V16.6667C18.3337 17.127 17.9606 17.5 17.5003 17.5H2.50033C2.04009 17.5 1.66699 17.127 1.66699 16.6667V3.33337C1.66699 2.87314 2.04009 2.50004 2.50033 2.50004H5.83366V0.833374H7.50033ZM16.667 9.16671H3.33366V15.8334H16.667V9.16671ZM5.83366 4.16671H3.33366V7.50004H16.667V4.16671H14.167V5.83337H12.5003V4.16671H7.50033V5.83337H5.83366V4.16671Z"
                                fill="white"
                              />
                            </svg>
                          </span>{" "}
                          <span className="d-none d-sm-inline-block">
                            {singleProperty?.visitRequest
                              ? "Request Sent"
                              : "Schedule Visit"}
                          </span>
                        </button>
                      </Tooltip>
                    </div>

                    <div className="">
                      <Tooltip
                        title={
                          !singleProperty?.postedBy
                            ? "Chat is not available for this property right now"
                            : "Chat with Seller"
                        }
                        arrow
                      >
                        <button
                          className="fl-btn-yellow"
                          onClick={chatModal}
                          disabled={!singleProperty?.postedBy}
                        >
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="21"
                              height="20"
                              viewBox="0 0 21 20"
                              fill="none"
                            >
                              <path
                                d="M5.04513 12.5L1.33301 15.4166V2.49996C1.33301 2.03973 1.70611 1.66663 2.16634 1.66663H14.6663C15.1266 1.66663 15.4997 2.03973 15.4997 2.49996V12.5H5.04513ZM4.46869 10.8333H13.833V3.33329H2.99967V11.9875L4.46869 10.8333ZM7.16634 14.1666H15.6973L17.1663 15.3209V6.66663H17.9997C18.4599 6.66663 18.833 7.03973 18.833 7.49996V18.75L15.1209 15.8333H7.99967C7.53944 15.8333 7.16634 15.4602 7.16634 15V14.1666Z"
                                fill="black"
                              />
                            </svg>
                          </span>
                          <span className="d-none d-sm-inline-block">
                            Chat with Seller {" "}
                          </span>
                        </button>
                      </Tooltip>
                    </div>
                    <div className="" onClick={saveProperty}>
                      <Tooltip title={"Shortlist"} arrow>
                        <button
                          className="fl-btn-outline-dark"
                        >
                          <span>
                            <Checkbox
                              className="p-0"
                              checked={singleProperty?.saved}
                              icon={<FavoriteBorder />}
                              checkedIcon={
                                <Favorite style={{ color: "red" }} />
                              }
                            />
                          </span>
                          <span className="d-none d-sm-inline-block">
                            Shortlist
                          </span>
                        </button>
                      </Tooltip>
                    </div>
                    <div className="">
                      <div>
                        <Tooltip title={"Share"} arrow>
                          <ShareButtons
                            title={singleProperty.title}
                            city={singleProperty.city}
                            price={singleProperty.price}
                            property={singleProperty}
                          />
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ScheduleVisitModal
        openVisitModal={openVisitModal}
        handleCloseModal={handleCloseModal}
        singleProperty={singleProperty}
        showSlots={showSlots}
        setShowSlots={setShowSlots}
        makeVisitRequest={makeVisitRequest}
        loader={loader}
      />
    </>
  );
}

export default PropertyHeader;
