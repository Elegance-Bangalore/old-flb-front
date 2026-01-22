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

const PropertyCard = ({ property, feature = false, banner = false }) => {
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
  };

  const sponsorStyle = {
    position: "absolute",
    top: "10px",
    left: "10px",
    padding: "8px",
  };

  // Computed flags for debugging and order verification
  const subscriptionActive = !!property?.postedBy?.subscription;
  const sponsoredActive = !!(property?.sponsored && subscriptionActive);
  const owner = !!(property?.postedBy);
  const managedFarmland = !!property?.managed_farmland;
  const getGroup = () => {
    if (sponsoredActive) return 1;
    if (managedFarmland) return 2;
    if (isNew) return 3;
    return 4;
  };

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
        className="fl-property-card border PropertyCard-wrapper relative"
        style={{ overflow: "hidden" }}
      >
        {property?.propertyStatus === "sold-out" ? (
          <span className="badge bg-danger" style={badgeStyle}>
            SOLD OUT
          </span>
        ) : isNew ? (
          <span className="badge bg-success" style={badgeStyle}>
            RECENTLY ADDED
          </span>
        ) : null}


       

        {sponsoredActive && (
          <span className="badge bg-warning text-dark" style={sponsorStyle}>
            SPONSORED {" "}
          </span>
        )}
         <div className="favorite-checkbox-wrapper">
                <Checkbox
                  className="p-0 fs-3"
                  checked={saved}
                  icon={<FavoriteBorder className="property-heart" />}
                  onChange={() => toogleSaveProperty(property?._id)}
                  checkedIcon={
                    <Favorite
                      className="property-heart"
                      style={{ color: "red" }}
                    />
                  }
                />
              </div>

        <Link
          to={navigateToDetail(
            property?.propertyType,
            property?.propertyTitle,
            property?.propertyCode
          )}
          target="_blank"
          className="PropertyCard-link"
        >
          <img
            className="fl-property-card-img w-100 fl-img-4-2"
            src={banner || property?.heroImage}
            alt="proptery"
          />
          <div className="card-info">
            <div>

             <span className="property-category">
            {feature ? "FEATURED" : formatPropertyType(property?.propertyType)}
          </span>
           <h3 className="property-title">
                {property?.propertyTitle}
              </h3>
               <p
              className="property-location"
              title={`${property?.locality} , ${property?.city}`}
            >
              {property?.locality}, {property?.city}, {property?.state}
            </p>
            </div>
          </div>
          
        </Link>
       
        <div className="bg-white">
          <div className="px-3 py-2">
            <Link
              to={navigateToDetail(
                property?.propertyType,
                property?.propertyTitle,
                property?.propertyCode
              )}
              target="_blank"
              title={property?.propertyTitle}
            >
 <div className="d-flex justify-content-between">
              <div className="">
                  <span className="">
                  {" "}
                  <span className="small-title">
                    Project Area
                  </span>
                  <span className="main-info">{property?.totalAcre} {property?.plotArea}</span>
                  {" "}
                  {/* <span className="ms-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                    >
                      <path
                        d="M15 9.5C15 6.18629 12.3137 3.5 9 3.5C5.68629 3.5 3 6.18629 3 9.5C3 12.8137 5.68629 15.5 9 15.5C12.3137 15.5 15 12.8137 15 9.5ZM16.5 9.5C16.5 13.6421 13.1421 17 9 17C4.85786 17 1.5 13.6421 1.5 9.5C1.5 5.35786 4.85786 2 9 2C13.1421 2 16.5 5.35786 16.5 9.5ZM10.1252 6.5C10.3709 6.82704 10.5469 7.20938 10.6313 7.625H12V8.75H10.6313C10.3706 10.0338 9.23565 11 7.875 11H7.73303L10.5227 13.7898L9.72727 14.5852L6 10.858V9.875H7.875C8.60978 9.875 9.23482 9.40543 9.4665 8.75H6V7.625H9.4665C9.23482 6.96958 8.60978 6.5 7.875 6.5H6V5.375H12V6.5H10.1252Z"
                        fill="#00A76F"
                      />
                    </svg>
                  </span>{" "}
                  <span>{property?.pricePerSqft ? formatNumberInCr(property?.pricePerSqft) : getPerAcre(property.price, property.totalAcre)} / {property?.plotArea ? property?.plotArea : "acre"}</span> */}
                </span>

              
              </div>
              
                <div className="fl-ff-main fl-text-dark fw-bold">
                  <span className="main-info">
                  {formatNumberInCr(property?.price)}{" "}
                  </span>
                   <span className="small-title" style={{ fontWeight: "600" }}>
                    Onwards
                  </span>
                </div>
            </div>
            </Link>

             {/* Debug card for order verification  */}
             {/* <div className="border rounded p-2 mb-2" style={{ background: "#fff7e6" }}>
              <div className="fl-ff-main fl-text-dark fl-fs-14">
                <strong>Debug:</strong>
                <div>Property Sponsored: {String(property?.sponsored)}</div>
                <div>user Subscription Active: {String(subscriptionActive)}</div>
                 <div>Owner Name: {property?.postedBy?.email || property?.postedBy?.fullName || "-"}</div>

                
                <div>both Sponsored Active (sponsored && subscription): {String(sponsoredActive)}</div>
                <div>Managed Farmland: {String(managedFarmland)}</div>
                <div>Recently Added (≤15 days): {String(isNew)}</div>
                <div>Group: {getGroup()}</div>
                <div>Created At: {property?.createdAt || "-"}</div>
                <div>Property ID: {property?._id}</div>
              </div>
            </div> */}

           
         
           
          </div>
             <div className="postedBy" hidden={banner}>
              <p className="mb-0">
              
                {property?.postedBy && (
                  <Link to={`/developer/${generateDeveloperSlug(property?.postedBy?.companyName || property?.postedBy?.fullName)}/${property?.postedBy?._id}`}>
                    <span> Posted by - 
                      {" "}
                      {property?.postedBy?.companyName
                        ? property?.postedBy?.companyName
                        : property?.postedBy?.fullName}
                    </span>{" "}
                    <span className="ms-1s">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M5 3V4H2.5V9.5H8V7H9V10C9 10.2761 8.77615 10.5 8.5 10.5H2C1.72386 10.5 1.5 10.2761 1.5 10V3.5C1.5 3.22386 1.72386 3 2 3H5ZM10.5 1.5V6L8.603 4.1035L5.60355 7.10355L4.89644 6.39645L7.896 3.3965L6 1.5H10.5Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  </Link>
                )}
              </p>
            </div>
        </div>
      </div>
    </>
  );
};

export default PropertyCard;
