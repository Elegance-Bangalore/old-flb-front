import { acceptVisitRequestApi } from "@/ApiRoutes/SellerApis";
import {
  convertTo12HourFormat,
  formatDate,
  navigateToDetail,
} from "@/CustomServices/Constant";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import directionIcon from "@/public/assets/images/manage-property/direction-arrow.svg";
import chat from "@/public/assets/images/profile/chat.svg";
import callIcon from "@/public/assets/images/profile/call.svg";
import time from "@/public/assets/images/icons/time.svg";
import {
  setPropertyId,
  setPropertyName,
  setSenderId,
  setSenderName,
  setShowModal,
} from "@/Redux/Chat/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";
import CopyToClipboard from "react-copy-to-clipboard";
import Support from "@/CustomCommon/AllRoles/Support";
import dummyProfile from "@/CustomAssets/BuyerImages/Dummy-profile.png";
import { selectUser } from "@/Redux/Auth/authSlice";

function MeetingTab({ requestList, setShow }) {
  const [updatedList, setUpdatedList] = useState(requestList);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  async function acceptVisitRequest(itemId) {
    try {
      if (!user.subscription) {
        setShow(true);
        return;
      }
      const response = await acceptVisitRequestApi(itemId);
      const newList = updatedList.map((item) => {
        if (item._id === itemId) {
          return { ...item, requestAccepted: true };
        }
        return item;
      });
      setUpdatedList(newList);
    } catch {
      toast.error("Something went wrong, Try again later");
    }
  }

  function chatClick(senderId, propertyId, name, propertyName) {
    if (!user.subscription) {
      setShow(true);
      return;
    }
    dispatch(setPropertyId(propertyId));
    dispatch(setSenderId(senderId));
    dispatch(setSenderName(name));
    dispatch(setPropertyName(propertyName));
    dispatch(setShowModal(true));
  }

  useEffect(() => {
    setUpdatedList(requestList);
  }, [requestList]);

  return (
    <div>
      <div className="mx-4">
        <div className="row mt-4">
          <div className="col-md-9">
            {updatedList?.length ? (
              updatedList?.map((item, index) => (
                <div
                  className="row bg-white-shadow align-items-center p-3 mb-3 box-shadow-dark"
                  key={item._id}
                >
                  <div className="col-md-9">
                    <div className="meeting-details">
                      <div className="meeting-content mb-3">
                        <Link
                          to={navigateToDetail(
                            item?.propertyType,
                            item?.propertyTitle,
                            item?.propertyCode
                          )}
                        >
                          <h3 className="mb-0">
                            {item.properties.propertyTitle}{" "}
                            <span>
                              {" "}
                              <img src={directionIcon} alt="icon" />
                            </span>
                          </h3>
                        </Link>
                        <h5 className="text-medium-grey fs-20">
                          {item.properties.city}
                        </h5>
                        <p className="text-medium-grey">
                          ID: {item.properties._id}{" "}
                        </p>
                      </div>
                      <div className="d-flex align-items-center mb-3 gap-3 border-top border-bottom py-2 w-100">
                        <div className="d-inline-block">
                          <img
                            src={item?.requestedBy?.profilePic || dummyProfile}
                            alt="profile"
                            className="meeting-profile-img img-fluid"
                            style={{ width: "3.5rem" }}
                          />
                        </div>
                        <div className="">
                          <h5 className="mb-0 fs-22 text-capitalize">
                            {item.requestedBy.fullName}
                          </h5>
                          {user?.subscription ? (
                            <p className="mb-0 text-medium-grey fs-16">
                              {item.requestedBy.phone} |{" "}
                              {item.requestedBy.email}
                            </p>
                          ) : (
                            <button
                              className="btn-black mt-3 p-1 px-3"
                              onClick={() => setShow(true)}
                            >
                              Get Buyer Contact Details
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="bottom-content d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3 mb-lg-0">
                        <h4 className="mb-0">
                          <span>
                            <img
                              src={time}
                              alt="time"
                              className="me-2"
                              style={{ width: "1.8rem" }}
                            />
                          </span>{" "}
                          {formatDate(item?.selectDate)} -{" "}
                          {convertTo12HourFormat(item?.slot?.slot)}
                        </h4>
                        <div className="meeting-action d-flex gap-3">
                          {!item.requestAccepted ? (
                            <button
                              className="btn-upgrade"
                              onClick={() => acceptVisitRequest(item._id)}
                            >
                              Accept
                            </button>
                          ) : (
                            <button className="btn-ligt-gray">Accepted</button>
                          )}
                          <span
                            onClick={() =>
                              chatClick(
                                item.requestedBy._id,
                                item.properties._id,
                                item.requestedBy.fullName,
                                item.properties.propertyTitle
                              )
                            }
                          >
                            <button className="btn btn-light-gold d-inline-block">
                              <img
                                className="img-fluid"
                                src={chat}
                                alt="chat"
                              />
                            </button>
                          </span>
                          <span>
                            {user?.subscription ? (
                              <CopyToClipboard
                                text={item.requestedBy.phone}
                                onCopy={() =>
                                  toast.success("Mobile Number Copied")
                                }
                              >
                                <button className="btn btn-light-green d-inline-block">
                                  <Tooltip title={item.requestedBy.phone}>
                                    <img
                                      className="img-fluid"
                                      src={callIcon}
                                      alt="callIcon"
                                    />
                                  </Tooltip>
                                </button>
                              </CopyToClipboard>
                            ) : (
                              <Tooltip
                                title={
                                  "Contact us @info@farmlandbazaar.com to get phone number"
                                }
                              >
                                <button className="btn btn-light-green d-inline-block">
                                  <img
                                    className="img-fluid"
                                    src={callIcon}
                                    alt="callIcon"
                                  />
                                </button>
                              </Tooltip>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="properties-image">
                      <img
                        src={item.properties.heroImage}
                        alt="pro"
                        className="img-fluid w-100 rounded-3"
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="">
                <h2 className="text-center py-5">No Request</h2>
              </div>
            )}
          </div>
          <div className="col-lg-3 text-center">
            <Support />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeetingTab;
