import React from "react";

function PropertyNavigation({ activeSection }) {
  return (
    <div className="col-lg-2 fl-sticky mb-4 mb-lg-0">
      <ul className="detail-list-group">
        <li>
          <a
            className={activeSection === "overview" ? "active" : ""}
            href="#overview"
          >
            Overview 
          </a>
        </li>
        <li>
          <a
            className={activeSection === "about" ? "active" : ""}
            href="#about"
          >
            About
          </a>
        </li>
        <li>
          <a
            className={activeSection === "amenities" ? "active" : ""}
            href="#amenities"
          >
            Amenities
          </a>
        </li>

        {/* <li>
          <a
            className={activeSection === "nearby" ? "active" : ""}
            href="#nearby"
          >
            Nearby&nbsp;Locations
          </a>
        </li> */}
        <li>
          <a
            className={activeSection === "gallery" ? "active" : ""}
            href="#gallery"
          >
            Gallery
          </a>
        </li>
        <li>
          <a
            className={activeSection === "location" ? "active" : ""}
            href="#location"
          >
            Location
          </a>
        </li>
        {/* <li>
          <a
            className={activeSection === "#maintenance-bill" ? "active" : ""}
            href="#maintenance-bill"
          >
            Maintenance bill
          </a>
        </li>
        <li>
          <a
            className={activeSection === "#property-document" ? "active" : ""}
            href="#property-document"
          >
            Property Document
          </a>
        </li> */}
      </ul>
    </div>
  );
}

export default PropertyNavigation;
