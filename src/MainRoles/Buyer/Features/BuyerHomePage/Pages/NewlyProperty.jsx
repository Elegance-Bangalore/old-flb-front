import React from "react";
import PropertyCard from "../Components/CommonComponent/PropertyCard";
import Slider from "react-slick";
import { Link } from "react-router-dom";

function NewlyProperty({ settings, propertiesListCategoryWise }) {
  // Check if propertiesListCategoryWise and newlyadded exist before accessing them
  const newlyAddedProperties = propertiesListCategoryWise?.newlyadded || [];

  return (
    <section>
      <div className="fl-home-property-slide-heading-green text-center heading-stoke-red">
        <h2>new</h2>
        <h3>Newly Launched Properties </h3>
      </div>
      <div className="fl-bg-light-green py-5 fl-property-slide-container">
        <div className="container fl-container mb-lg-4">
          <Slider {...settings}>
            {newlyAddedProperties[0]?.properties?.map((element, index) => (
              <div className="slide-item" key={index}>
                <PropertyCard property={element} index={index} />
              </div>
            ))}
          </Slider>
        </div>
        <div className="explore-cta-property text-center">
          <button className="fl-btn-dark">
            <Link to="/property-list" className="text-white">
              Explore Hot Properties
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}

export default NewlyProperty;
