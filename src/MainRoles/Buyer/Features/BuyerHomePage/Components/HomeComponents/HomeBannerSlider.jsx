import { bannerCountApi } from "@/ApiRoutes/AdminApi";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import {
  featuredPropertyBannerAsync,
  selectBannerLoading,
  selectFeaturedBanner,
} from "@/Redux/Property/propertySlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const HomeBannerSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const dispatch = useDispatch();
  const featureData = useSelector(selectFeaturedBanner);
  const loading = useSelector(selectBannerLoading);

  async function clickCount(id) {
    try {
      const response = await bannerCountApi(id);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    if (featureData.length === 0) {
      dispatch(featuredPropertyBannerAsync());
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  if (loading) {
    return (
      <div
        style={{ height: "40rem" }}
        className="d-flex justify-content-center align-items-center"
      >
        <OnClickLoader />
      </div>
    );
  }

  if (featureData.length === 0) {
    return (
      <div className="fl-home-banner-hero">
        <div className="container fl-container text-center pb-5">
          <h1 className="text-white fl-banner-heading fs-1 my-3">
            India's Largest online portal to Buy, Sell and explore farmlands and
            beyond
          </h1>
          <h2 className="text-white fw-normal fl-banner-heading-normal my-3">
            #FarmlandbazaarDekhaKya <br />
          </h2>
          <h2 className="text-white fw-normal fl-banner-heading-normal">
            List, buy, or sell land anywhere in India with ease.
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="home-banner-slider">
      <Slider {...settings}>
        {featureData.map((item) => (
          <div key={item._id} onClick={()=>clickCount(item._id)}>
            <a href={item.url} target="_blank">
              <img
                src={isMobile ? item.mobileImage : item.desktopImage}
                alt={item.title}
                className="fl-home-banner-hero"
              />
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeBannerSlider;
