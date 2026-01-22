import React from "react";
import PropertyCard from "../CommonComponent/PropertyCard";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import cat0 from "@/CustomAssets/BuyerImages/cat-hot.png";
import cat1 from "@/CustomAssets/BuyerImages/cat-loc.png";
import cat2 from "@/CustomAssets/BuyerImages/cat-star.png";
import CategoryLoader from "@/CustomCommon/MaterialUi/CategoryLoader";

const categoryImages = [cat0, cat1, cat2];

const getCategoryImage = (index) => {
  return categoryImages[index] || cat2;
};

function HighlyRecommendedProperty({
  settings,
  propertiesListCategoryWise,
  index,
  loader
}) {


  const repeatedIndex = index > 2 ? index % 3 : index;

  return (
    <>
      {propertiesListCategoryWise?.properties?.length > 2 ? (
        <section className="property-category-wrapper px-4 py-0">
          <div className="row">
            <div className="col-12 col-md-6 d-flex align-items-center ">
                   <div
            className={`fl-home-property-slide-heading text-center`}
          >
            <h2>{propertiesListCategoryWise?.name?.match(/\S+/)}</h2>
            <h3>{propertiesListCategoryWise?.name}</h3>
          </div>
          
            </div>
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-end">
               <div className="explore-cta-property text-center">
              <Link to={`/property-list?categoryId=${propertiesListCategoryWise._id}`} className="text-white">
                <button className="explore-btn">
                  <span> View All &#x203A; </span>
                  <span className="title"> {propertiesListCategoryWise?.name}</span>
                 
                </button>
              </Link>
            </div>
            </div>
          
          </div>
        
          <div
            className={`fl-property-slide-container`}
          >
            <div className="">
              <Slider {...settings}>
                {propertiesListCategoryWise?.properties?.map(
                  (element, index) => (
                    <div className="slide-item" key={index}>
                      <PropertyCard property={element} />
                    </div>
                  )
                )}
              </Slider>
            </div>
           
          </div>
        </section>
      ) : propertiesListCategoryWise?.properties?.length ? (
        <section className="property-category-wrapper">
          <img className="property-category-icon" src={getCategoryImage(repeatedIndex)} alt="cat-bg" />
          <div
            className={`fl-home-property-slide-heading-${repeatedIndex} text-center`}
          >
            <h2>{propertiesListCategoryWise?.name?.match(/\S+/)}</h2>
            <h3>{propertiesListCategoryWise?.name}</h3>
          </div>
          <div
            className={`fl-bg-light-${repeatedIndex} py-5 fl-property-slide-container`}
          >
            <div className="container fl-container mb-lg-4">
              <div className="row justify-content-center">
                {propertiesListCategoryWise?.properties?.map(
                  (element, index) => (
                    <div className="slide-item col-md-6 col-lg-4" key={index}>
                      <PropertyCard property={element} index={index} />
                    </div>
                  )
                )}{" "}
              </div>
            </div>
            <div className="explore-cta-property text-center">
            <Link to={`/property-list?categoryId=${propertiesListCategoryWise._id}`} className="text-white text-uppercase">
              <button className="fl-btn-dark">  
                  Explore {propertiesListCategoryWise?.name}
              </button>
              </Link>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

export default HighlyRecommendedProperty;
