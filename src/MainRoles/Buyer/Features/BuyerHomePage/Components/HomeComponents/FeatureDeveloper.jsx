import React, { useEffect, useState } from "react";
import DevCard from "../CommonComponent/DevCard";
import { Link } from "react-router-dom";
import { featuredDevelopersApi } from "@/ApiRoutes/BuyersApi";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import Slider from "react-slick";
import { autoSlideSlider } from "@/CustomServices/sliderSetting";

const FeatureDeveloper = () => {
  const [featuredDeveloperList, setFeaturedDeveloperList] = useState([]);
  const [loader, setLoader] = useState(false);

  async function featuredDevelopers() {
    try {
      setLoader(true);
      const response = await featuredDevelopersApi();
      setFeaturedDeveloperList(response?.data?.developers);
    } catch (error) {
      throw error;
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    featuredDevelopers();
  }, []);

  if (loader) {
    return (
      <div className="text-center my-5">
        <OnClickLoader />
      </div>
    );
  }

  if (featuredDeveloperList.length === 0) {
    return null;
  }

  return (
    <section className="fl-property-slide-container my-5">
      <div className="container fl-container">
        <div className="text-center pb-4">
          <h2 className="fl-ff-main fl-text-dark fl-heading-2 mb-1">
            Featured Developers
          </h2>
          <p className="fl-ff-main fl-text-dark fw-semi-bold fs-22 mb-5">
            Most Popular Developers
          </p>
        </div>
        <div className="row">
          <Slider {...autoSlideSlider}>
            {featuredDeveloperList.map((developer) => (
              <div className="col-md-4" key={developer._id}>
                <DevCard developer={developer} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <Link className="text-white" to="/developer-directory"> 
        <div className="explore-cta-property text-center">
          <button className="fl-btn-dark">Explore More</button>
        </div>
      </Link>
    </section>
  );
};

export default FeatureDeveloper;
