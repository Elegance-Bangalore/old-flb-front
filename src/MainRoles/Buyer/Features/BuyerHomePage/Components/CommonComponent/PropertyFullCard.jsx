import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  formatNumberInCr,
  formatPropertyType,
  navigateToDetail,
  generateDeveloperSlug,
} from "@/CustomServices/Constant";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { toogleSavePropertyApi } from "@/ApiRoutes/BuyersApi";
import { useSelector } from "react-redux";
import { selectUser } from "@/Redux/Auth/authSlice";
import { toast } from "react-toastify";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { parseISO, differenceInDays } from "date-fns";
import { fontGrid } from "@mui/material/styles/cssUtils";

const PropertyFullCard = ({ property }) => {
  const [saved, setSaved] = useState(property?.saved);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  // if (!property.createdAt) {
  //   return null;
  // }

  const createdDate = parseISO(property?.createdAt || "");
  const currentDate = new Date();
  const isNew = differenceInDays(currentDate, createdDate) <= 15;
  const badgeStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    padding: "8px",
    fontSize : "14px"
  };

  console.log("Property on Full CArd");

  async function toogleSaveProperty(id) {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    if (user?.interested === "sell") {
      toast.info("Please login as Buyer");
      return;
    }

    try {
      const response = await toogleSavePropertyApi(id);
      setSaved(!saved);
    } catch (error) {
      toastMessage();
    }
  }

  function getPerAcre(price, area) {
    const perAcre = Number(price) / Number(area).toFixed(2);
    return formatNumberInCr(perAcre);
  }

  useEffect(() => {
    setSaved(property?.saved);
  }, [property]);

  return (
    <>
      <div
        className="fl-property-card border fl-card-border border-raidus-10 relative fl-bg-light-2"
        style={{ overflow: "hidden" }}
      >
        {/* <span className="badge bg-success" style={badgeStyle}>
          FEATURED
        </span> */}
        <div className="row">
          <div className="col-md-5 align-self-center order-1">
            <div className="fl-bg-light-2">
              <div className="px-4 px-lg-4 py-3 text-center">
                <Link
                  to={navigateToDetail(
                    property?.propertyType,
                    property?.propertyTitle,
                    property?.propertyCode
                  )}
                  target="_blank"
                  title={property?.propertyTitle}
                >
                  <h3 className="card-title fl-ff-main fl-text-dark  fl-text-green-hover fl-fs-20 text-center" style={{fontSize:"25px"}}>
                    {property?.propertyTitle}
                  </h3>
                </Link>

                <p
                  className="fl-ff-main fl-text-dark fl-fs-16 fw-normal text-capitalize text-center"
                  title={`${property?.locality} , ${property?.city}`}
                >
                  {property?.locality}, {property?.city}, {property?.state}
                </p>
                <div className="mb-4">
                  <p className="fl-ff-main fl-text-dark fl-fs-14 fw-normal mb-0 text-center">
                    <span className="me-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M12.2497 11.6667H13.4163V12.8334H0.583008V11.6667H1.74967V1.75008C1.74967 1.42792 2.01084 1.16675 2.33301 1.16675H11.6663C11.9885 1.16675 12.2497 1.42792 12.2497 1.75008V11.6667ZM11.083 11.6667V2.33341H2.91634V11.6667H11.083ZM4.66634 6.41675H6.41634V7.58342H4.66634V6.41675ZM4.66634 4.08342H6.41634V5.25008H4.66634V4.08342ZM4.66634 8.75008H6.41634V9.91675H4.66634V8.75008ZM7.58301 8.75008H9.33301V9.91675H7.58301V8.75008ZM7.58301 6.41675H9.33301V7.58342H7.58301V6.41675ZM7.58301 4.08342H9.33301V5.25008H7.58301V4.08342Z"
                          fill="#637381"
                        />
                      </svg>
                    </span>
                    {property?.postedBy && (
                      <Link to={`/developer/${generateDeveloperSlug(property?.postedBy?.companyName || property?.postedBy?.fullName)}/${property?.postedBy?._id}`}>
                        <span>
                          {property?.postedBy?.companyName
                            ? property?.postedBy?.companyName
                            : property?.postedBy?.fullName}
                        </span>
                        <span className="ms-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M5 3V4H2.5V9.5H8V7H9V10C9 10.2761 8.77615 10.5 8.5 10.5H2C1.72386 10.5 1.5 10.2761 1.5 10V3.5C1.5 3.22386 1.72386 3 2 3H5ZM10.5 1.5V6L8.603 4.1035L5.60355 7.10355L4.89644 6.39645L7.896 3.3965L6 1.5H10.5Z"
                              fill="#00A76F"
                            />
                          </svg>
                        </span>
                      </Link>
                    )}
                  </p>
                </div>
                <div className="d-flex justify-content-center align-items-end mb-3 mb-md-5">
                  <div className="">
                    <h2 className="fl-ff-main fl-text-dark fw-bold mb-1 text-center">
                      {formatNumberInCr(property?.price)}{" "}
                      <span className="fs-6" style={{ fontWeight: "600" }}>
                        Onwards
                      </span>
                    </h2>
                    <p className="mb-0 fl-ff-main fl-text-dark fl-fs-14 fw-semi-bold text-center">
                      <span className="me-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="19"
                          viewBox="0 0 18 19"
                          fill="none"
                        >
                          <path
                            d="M12.75 14.75H14.25V11H7.5V4.25H3.75V5.75H5.25V7.25H3.75V8.75H6V10.25H3.75V11.75H5.25V13.25H3.75V14.75H5.25V13.25H6.75V14.75H8.25V12.5H9.75V14.75H11.25V13.25H12.75V14.75ZM9 9.5H15C15.4142 9.5 15.75 9.83577 15.75 10.25V15.5C15.75 15.9142 15.4142 16.25 15 16.25H3C2.58579 16.25 2.25 15.9142 2.25 15.5V3.5C2.25 3.08579 2.58579 2.75 3 2.75H8.25C8.66423 2.75 9 3.08579 9 3.5V9.5Z"
                            fill="#00A76F"
                          />
                        </svg>
                      </span>
                      <span className="text-capitalize">
                        Project Area -{property?.totalAcre} {property?.plotArea}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <Link
                    to={navigateToDetail(
                      property?.propertyType,
                      property?.propertyTitle,
                      property?.propertyCode
                    )}
                    target="_blank"
                    title={property?.propertyTitle}
                  >
                    <button className="fl-btn-yellow">Explore more</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7 order-md-1">
            <Link
              to={navigateToDetail(
                property?.propertyType,
                property?.propertyTitle,
                property?.propertyCode
              )}
              target="_blank"
            >
              <img
                className="fl-property-card-img w-100 fl-img-4-2 border-raidus-10"
                src={property?.propertyAds || property?.heroImage}
                alt="proptery"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyFullCard;
