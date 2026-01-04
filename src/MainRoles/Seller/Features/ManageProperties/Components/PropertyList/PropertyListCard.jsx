import React from "react";
import editIcon from "@/public/assets/images/profile/profile-edit.svg";
import deleteIcon from "@/public/assets/images/profile/delete-profile.svg";
import scale from "@/public/assets/images/profile/scale.svg";
import ruppe from "@/public/assets/images/profile/ruppe.svg";
import directionIcon from "@/public/assets/images/manage-property/direction-arrow.svg";
import premium from "@/public/assets/images/manage-property/premium.svg";
import {
  formatDate,
  formatNumber,
  formatNumberInCr,
  navigateToDetail,
} from "@/CustomServices/Constant";
import { Link, useNavigate } from "react-router-dom";

function PropertyListCard({ property, setDeleteId, setShow, onPromoteClick }) {
  const navigate = useNavigate();
  const getValidityDate = (createdAt) => {
    if (createdAt) {
      const postDate = new Date(property.createdAt);
      const validityDate = new Date(postDate);
      validityDate.setMonth(validityDate.getMonth() + 1);
      const day = validityDate.getDate().toString().padStart(2, "0");
      const month = (validityDate.getMonth() + 1).toString().padStart(2, "0");
      const year = validityDate.getFullYear();
      return `${day}-${month}-${year}`;
    }
  };

  function getPerAcre(price, area) {
    const perAcre = Number(price) / Number(area).toFixed(2);
    return formatNumberInCr(perAcre);
  }

  return (
    <div className="row bg-white-shadow border-hover-green align-propertys-center p-3 mb-3">
      <div className="col-md-9">
        <div className="properties-details">
          <div className="upper-content d-flex align-propertys-center justify-content-between mb-3">
            <div className="">
              <button
                className={`pill-btn-${
                  property?.propertyApproval === "Resolved"
                    ? "green"
                    : property?.propertyApproval === "Reject"
                    ? "red"
                    : "warning"
                } me-3 px-4 text-uppercase fw-bold`}
                style={{ cursor: "default" }}
              >
                {property?.propertyApproval === "Resolved"
                  ? "Active"
                  : property?.propertyApproval === "IN_Review"
                  ? "In Review"
                  : "Reject"}
              </button>
              {property?.subscription?.isActive ? (
                <button
                  className="pill-btn-gold me-3 px-4 text-uppercase fw-bold"
                  style={{ cursor: "default" }}
                >
                  <img src={premium}></img>
                </button>
              ) : (
                <button
                  className="pill-btn-gray px-4 text-uppercase fw-bold"
                  style={{ cursor: "default" }}
                >
                  Free
                </button>
              )}
            </div>
            <div className="">
              {!property?.subscription?.isActive && (
                <button className="pill-btn-red px-2">Low Visibility</button>
              )}
            </div>
          </div>
          <div className="properties-content mb-3">
            <h3 className="text-capitalize mb-1">
              <Link
                to={navigateToDetail(
                  property?.propertyType,
                  property?.propertyTitle,
                  property?.propertyCode
                )}
                target="_blank"
              >
                {property.propertyTitle}
                <span className="ms-2">
                  <img src={directionIcon} alt="icon" />{" "}
                </span>
              </Link>
            </h3>
            <h5>
              {property.locality}, {property.city}, {property.state}
            </h5>
            <p>
              Id: {property._id} &nbsp; Posted: {formatDate(property.createdAt)}
            </p>
          </div>
          <div className="bottom-content d-flex aligin-propertys-center justify-content-between">
            <h2>{formatNumberInCr(property.price)}</h2>
            {!property?.subscription?.isActive ? (
              <button
                className="btn-upgrade px-5"
                onClick={() => navigate("/subscription-plan")}
              >
                Subscription
                <img src={premium} alt="premium" style={{ verticalAlign: 'middle', marginLeft: 6, height: '1.2em' }} />
              </button>
            ) : (
              <button
                className={`${
                  property?.isPropertyPromoted
                    ? "pill-btn-gray"
                    : "pill-btn-green"
                } me-3 px-4 text-uppercase fw-bold`}
                onClick={() => onPromoteClick(property)}
              >
                {property?.isPropertyPromoted
                  ? "Remove Promoted"
                  : "Promote Property"}
              </button>
            )}
          </div>
          <div className="bottom-content d-flex aligin-propertys-center justify-content-between mt-3">
            <div className="">
              <h5 style={{ fontSize: "1.1rem" }}>
                <span>
                  <img className="img-fluid me-2" src={scale} alt="icon" />
                </span>
                {property.totalAcre}{" "}
                {property.plotArea === "acre" ? " Acre • " : "Sq Ft"}
                <span>
                  <img className="img-fluid me-2" src={ruppe} alt="icon" />
                  {formatNumberInCr(property.pricePerSqft)}
                </span>
              </h5>
            </div>
            <div className="d-flex gap-3">
              <span>
                <Link to={`/seller/edit-property/${property.propertyCode}`}>
                  <button className="btn btn-profile-edit d-inline-block px-4 py-0">
                    <img className="img-fluid" src={editIcon} alt="editIcon" />
                  </button>
                </Link>
              </span>
              <span>
                <button
                  className="btn btn-profile-delete d-inline-block px-4 py-0"
                  onClick={() => {
                    setDeleteId(property._id), setShow(true);
                  }}
                >
                  <img src={deleteIcon} alt="delete" className="img-fluid" />
                  {/* <Trash  /> */}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="properties-image h-100">
          {property.heroImage ? (
            <img
              src={property.heroImage}
              alt="pro"
              className="img-fluid w-100 rounded-3 h-100"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default PropertyListCard;
