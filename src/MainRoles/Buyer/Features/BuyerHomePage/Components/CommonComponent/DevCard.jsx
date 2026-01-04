import React from "react";
import devImg from "../../../../../../CustomAssets/BuyerImages/developer-card.png";
import direction from "../../../../../../CustomAssets/BuyerImages/direction.svg";
import { Link } from "react-router-dom";
import { navigateToDetail, generateDeveloperSlug } from "@/CustomServices/Constant";

const DevCard = ({ developer }) => {
  const aboutText = developer?.about || "";
  const maxLength = 180; // Set a limit for characters

  return (
    <div className="fl-dev-card blog-card p-3 fl-card-shadow border fl-card-border">
      <div className="dev-header-wrapper">
        <div className="dev-img">
          <img
            className="fl-img-1-1 img-fluid fl-dev-img border-raidus-10"
            src={developer?.logo}
            alt="img"
          />
        </div>
        <div className="dev-header-heading">
          <Link to={`/developer/${generateDeveloperSlug(developer?.companyName || developer?.fullname)}/${developer?._id}`}><h3 className="fl-ff-main fl-text-dark">
            {developer?.companyName || developer?.fullname}
          </h3>
          </Link>
        </div>
      </div>
      <div
        className="my-3 dev-content">
        <p className="fl-text-justify text-truncate-3">
          {aboutText.length > maxLength
            ? `${aboutText.substring(0, maxLength)}...`
            : aboutText}
        </p>
      </div>
      <div className="d-flex justify-content-between border fl-border-green border-raidus-10 py-2 px-3">
        <div className="text-center">
          <h4 className="fl-ff-main fl-fs-22 fl-text-dark">
            {developer?.establishedYear || "---"}
          </h4>
          <p className="mb-0 fl-fs-14">Year Established</p>
        </div>
        <div className="text-center">
          <h4 className="fl-ff-main fl-fs-22 fl-text-dark">
            {developer?.ongoingProjects || "---"}
          </h4>
          <p className="mb-0 fl-fs-14">Active Properties</p>
        </div>
        <div className="text-center">
          <h4 className="fl-ff-main fl-fs-22 fl-text-dark">
            {developer?.totalProjects || developer?.ongoingProjects}
          </h4>
          <p className="mb-0 fl-fs-14">Total Properties</p>
        </div>
      </div>
      <div>
        <h5 className="text-uppercase fl-text-dark-green fl-right-border-line d-flex align-items-center mt-4 mb-3">
          <span className="d-inline-block fl-fit-content me-3">
            Popular&nbsp;Projects
          </span>
          <span className="line"></span>
        </h5>
        <ul className="list-unstyled d-flex flex-column gap-2 dev-list">
          {developer?.properties?.map((property, index) => (
            <li key={index}>
              <Link
                to={navigateToDetail(
                  property?.propertyType,
                  property?.propertyTitle,
                  property?.propertyCode
                )}
                className="d-flex align-items-center gap-1 fl-text-green-hover"
              >
                <span className="text-capitalize">
                  {property?.propertyTitle}
                </span>
                <span>
                  <img src={direction} alt="icon" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DevCard;
