import React, { useEffect, useRef, useState } from "react";
import SubOverview from "@/MainRoles/Buyer/Features/BuyersPropertyDetailPage/components/SubOverview";
import SubAbout from "@/MainRoles/Buyer/Features/BuyersPropertyDetailPage/components/SubAbout";
import SubAmenities from "@/MainRoles/Buyer/Features/BuyersPropertyDetailPage/components/SubAmenities";
import SubLocation from "@/MainRoles/Buyer/Features/BuyersPropertyDetailPage/components/SubLocation";
import FullScreenImage from "@/MainRoles/Buyer/Features/BuyersPropertyDetailPage/components/FullScreenImage";
import SubDocument from "@/MainRoles/Buyer/Features/BuyersPropertyDetailPage/components/SubDocument";
import SubYoutube from "@/MainRoles/Buyer/Features/BuyersPropertyDetailPage/components/SubYoutube";
import SubMaintenace from "@/MainRoles/Buyer/Features/BuyersPropertyDetailPage/components/SubMaintenace";
import ImageSlider from "../ImageSlider";
import LocationMap from "./LocationMap";
import SubNearBy from "./SubNearBy";
import AdditionalGallery from "./AdditionalGallery";
import { farmhouse } from "@/CustomServices/Constant";

function PropertyOverview({ singleProperty, fullWidht, setActiveSection }) {
  return (
    <div className={`${!fullWidht ? "col-lg-7" : "col-12"}`}>
      <SubOverview
        singleProperty={singleProperty}
        setActiveSection={setActiveSection}
      />

      <SubAbout
        singleProperty={singleProperty}
        setActiveSection={setActiveSection}
      />

      <SubAmenities
        singleProperty={singleProperty}
        setActiveSection={setActiveSection}
      />

      <SubNearBy
        setActiveSection={setActiveSection}
        singleProperty={singleProperty}
      />

      <section className="content-section pb-0" id="gallery">
        <div className="detail-content-box fl-property-card rounded-3">
          <div className="px-3 py-3 border-bottom fl-card-border">
            <h3 className="fl-text-dark text-uppercase mb-0">Gallery </h3>
          </div>
          {/* Anchan */}
          {singleProperty && (
            <ImageSlider
              singleProperty={singleProperty}
              gallery={[...singleProperty?.images, ...singleProperty?.videos]}
              images="images"
              setActiveSection={setActiveSection}
            />
          )}
        </div>
      </section>

      {singleProperty?.propertyType === farmhouse && (
        <AdditionalGallery
          singleProperty={singleProperty}
          setActiveSection={setActiveSection}
        />
      )}
      {singleProperty?.layoutMap?.length > 0 && (
        <div className="content-section pb-0" id="gallery">
          <div className="detail-content-box fl-property-card rounded-3">
            <div className="px-3 py-3 border-bottom fl-card-border">
              <h3 className="fl-text-dark text-uppercase mb-0">Layout Map </h3>
            </div>
            {singleProperty?.layoutMap.length >= 2 ? (
              <ImageSlider
                singleProperty={singleProperty}
                gallery={singleProperty?.layoutMap}
                setActiveSection={setActiveSection}
              />
            ) : (
              <SubLocation
                singleProperty={singleProperty}
                setActiveSection={setActiveSection}
              />
            )}
          </div>
        </div>
      )}

      {singleProperty?.masterPlan && (
        <section className="content-section pb-0" id="gallery">
          <div className="detail-content-box fl-property-card rounded-3">
            <div className="py-3 border-bottom fl-card-border">
              <h3 className="fl-text-dark text-uppercase mb-0">Master Plan </h3>
            </div>
            <div className="single-img-preview p-4">
              <FullScreenImage imageUrl={singleProperty?.masterPlan} />
            </div>
          </div>
        </section>
      )}

      <LocationMap
        singleProperty={singleProperty}
        setActiveSection={setActiveSection}
      />

      {singleProperty?.documentFile?.Location &&
        (fullWidht ? <SubDocument singleProperty={singleProperty} /> : "")}

      {singleProperty?.videoUrl?.length && singleProperty?.videoUrl[0] ? (
        <SubYoutube singleProperty={singleProperty} />
      ) : null}
    </div>
  );
}

export default PropertyOverview;
