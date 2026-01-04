import { acceptVisitRequestApi } from "@/ApiRoutes/SellerApis";
import { convertTo12HourFormat, formatDate, navigateToDetail } from "@/CustomServices/Constant";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import propertiesImage from "@/public/assets/images/manage-property/property.png";
import adds from "@/public/assets/images/profile/promotional-banners.png";
import profile from "@/public/assets/images/profile/profile-img.png";
import directionIcon from "@/public/assets/images/manage-property/direction-arrow.svg";
import chat from "@/public/assets/images/profile/chat.svg";
import callIcon from "@/public/assets/images/profile/call.svg";
import call from "@/public/assets/images/profile/call-calling.svg";
import sms from "@/public/assets/images/profile/sms-edit.svg";
import time from "@/public/assets/images/icons/time.svg";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import {
  setPropertyId,
  setPropertyName,
  setSenderId,
  setSenderName,
  setShowModal,
} from "@/Redux/Chat/chatSlice";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { styled } from "@mui/system";
import { getRequestApi } from "@/ApiRoutes/BuyersApi";
import { toastMessage } from "@/CustomServices/ToastMessage";
import RectangleSkeleton from "@/CustomCommon/MaterialUi/RectangleSkeleton";
import CustomPagination from "@/CustomCommon/MaterialUi/CustomPagination";
import NewPagination from "@/CustomCommon/MaterialUi/NewPagination";
import Support from "@/CustomCommon/AllRoles/Support";
import { Avatar } from "@mui/material";
import { selectUser } from "@/Redux/Auth/authSlice";

function OwnersMeetingTab() {

  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState(true)
  const [requestList, setRequestList] = useState([]);
  const [anchor, setAnchor] = React.useState(null);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const user = useSelector(selectUser);


  async function getRequest() {
    try {
      const response = await getRequestApi(page);
      setRequestList(response.data.data);
      setCount(response.data.count)
    } catch (error) {
      toastMessage();
    }
    finally {
      setLoader(false)
    }
  }
 
  function chatClick(sender, property, name, propertyName) {
    dispatch(setSenderId(sender));
    dispatch(setPropertyId(property));
    dispatch(setSenderName(name));
    dispatch(setPropertyName(propertyName));
    dispatch(setShowModal(true));
  }


  const handleClick = (event) => {
    setAnchor(anchor ? null : event.currentTarget);
  };
  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
  };
  const PopupBody = styled("div")(
    ({ theme }) => `
    width: max-content;
    padding: 12px 16px;
    margin: 8px;
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    box-shadow: ${theme.palette.mode === "dark"
        ? `0px 4px 8px rgb(0 0 0 / 0.7)`
        : `0px 4px 8px rgb(0 0 0 / 0.1)`
      };
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    z-index: 1;
  `
  );
  const open = Boolean(anchor);
  const id = open ? "simple-popper" : undefined;


  useEffect(() => {
    getRequest()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page])


  return (
    <div>
      <div className="mx-md-4 mx-1">
        {loader ? <RectangleSkeleton /> : (
          <div className="row mt-4">
            <div className="col-md-9 mb-4 mb-md-0">
              {requestList?.length ? (
                <>
                  {requestList?.map((item, index) => (
                    <div
                      className="row bg-white-shadow align-items-center px-1 py-3 px-md-3 py-md-3 mb-3"
                      key={item._id}
                    >
                      <div className="col-md-9">
                        <div className="meeting-details">
                          <div className="meeting-content mb-3">
                            <Link
                              to={navigateToDetail(item?.properties?.propertyType, item?.properties?.propertyTitle, item?.properties?.propertyCode)} target="_blank">
                              <h3 className="mb-0">
                                {item?.properties?.propertyTitle}{" "}
                                <span>
                                  {" "}
                                  <a href="">
                                    <img src={directionIcon} alt="icon" />
                                  </a>{" "}
                                </span>
                              </h3>
                            </Link>

                            <h5 className="text-medium-grey fs-20">
                              {item?.properties?.city}
                            </h5>

                          </div>
                          <div className="d-flex align-items-center mb-3 gap-3 border-top border-bottom py-2 w-100">
                            <div className="d-inline-block">
                            { item?.properties?.postedBy?.profilePic ? (  <img src={item?.properties?.postedBy?.profilePic} alt="profile" className="meeting-profile-img img-fluid" style={{ width: "5rem" }}
                              />) : ( <Avatar sx={{ bgcolor: "#F4F6F8", color: "#919EAB", border: "1px solid #919EAB",}}>{user?.fullName?.slice(0, 1)}</Avatar> )}</div>
                            <div className="">
                              <h5 className="mb-0 fs-20">
                                {item?.properties?.postedBy?.fullName}
                              </h5>
                              <p className="mb-0 text-medium-grey fs-16">
                                {item?.properties?.postedBy?.phone} |{" "}
                                {item?.properties?.postedBy?.email}
                              </p>
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
                              {formatDate(item.selectDate)} - {convertTo12HourFormat(item.slot?.slot)}
                            </h4>
                            <div className="meeting-action d-flex gap-3">
                              {item.accepted ? (
                                <button className="btn-ligt-green">Accepted</button>
                              ) : (
                                <button className="btn-ligt-red">Pending</button>
                              )}
                              <span>
                                <button
                                  className="btn btn-light-gold d-inline-block"
                                  onClick={() =>
                                    chatClick(
                                      item?.properties?.postedBy?._id,
                                      item?.properties?._id,
                                      item?.properties?.postedBy?.fullName,
                                      item?.properties?.propertyTitle
                                    )
                                  }
                                >
                                  <img
                                    className="img-fluid"
                                    src={chat}
                                    alt="chat"
                                  />
                                </button>
                              </span>
                              <span>
                                <button
                                  className="btn btn-light-green d-inline-block"
                                  aria-describedby={id}
                                  type="button"
                                  onClick={handleClick}
                                >
                                  <img
                                    className="img-fluid"
                                    src={callIcon}
                                    alt="callIcon"
                                  />
                                </button>
                                <BasePopup id={id} open={open} anchor={anchor}>
                                  <PopupBody>{item?.properties?.postedBy?.phone}</PopupBody>
                                </BasePopup>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="properties-image">
                          <img
                            src={item?.properties?.heroImage}
                            alt="pro"
                            className="img-fluid w-100 rounded-3 "
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <NewPagination count={count} page={page} setPage={setPage} />
                </>
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
        )}



      </div>
    </div>
  );
}

export default OwnersMeetingTab;
