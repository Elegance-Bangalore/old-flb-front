import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import star from "@/CustomAssets/BuyerImages/star.svg";
import starFill from "@/CustomAssets/BuyerImages/star-fill.svg";
import client from "@/CustomAssets/BuyerImages/client.png";
import {
  mediaSlider,
  testimonial,
  testimonialVideo,
} from "@/CustomServices/sliderSetting";
import { getMediaApi, getTestimonialApi } from "@/ApiRoutes/AdminApi";
import { Rating } from "@mui/material";
import dummyProfile from "@/CustomAssets/BuyerImages/Dummy-profile.png";

const Testimonials = ({heading,subheading}) => {
  const [reviews, setReviews] = useState([]);
  const [ytLink, setYtLink] = useState([]);
  const [loader, setLoader] = useState(true);

  async function getTestimonials() {
    try {
      setLoader(true);
      const response = await getTestimonialApi();
      const testimonails = response?.data?.testimonials || [];
      setReviews(testimonails.filter((item) => item.type === "Review"));
      setYtLink(testimonails.filter((item) => item.type === "Link"));
    } catch (error) {
      throw error;
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    getTestimonials();
  }, []);

  if (ytLink.length < 3 && reviews.length < 2) {
    return null;
  }

  return (
    <>
      <section className="home-blog-section">
        <div className="container fl-container">
          <div className="row ">
            <div className="col-lg-6 col-md-8 mx-auto">
              <div className="text-center">
                <h2 className="fl-ff-main fl-text-dark fl-heading-2">
                  {(heading) ? heading : "Our Customers Loves us"}
                </h2>
                <p className="fl-ff-main fl-text-dark fw-semi-bold fs-22 mb-5">
                  {(subheading === null) ? subheading : "And It Shows!"}
                </p>
              </div>
            </div>

            {ytLink?.length > 2 ? (
              <div className="py-4">
                <Slider {...testimonialVideo}>
                  {ytLink?.map((element, index) => (
                    <div
                      className="testimonial-video-card px-4 px-md-0"
                      key={index}
                      dangerouslySetInnerHTML={{ __html: element.youTubeLink }}
                    />
                  ))}
                </Slider>
              </div>
            ) : null}

            {reviews.length > 1 ? (
              <div className="py-4">
                <Slider {...testimonial}>
                  {reviews?.map((element, index) => (
                    <div
                      className="fl-card-shadow fl-testimonial-card"
                      key={index}
                    >
                      <div className="upper-content mb-3 flex-wrap gap-2">
                        <div className="profile">
                          <span className="profile-img">
                            <img
                              className="img-fluid"
                              src={element?.image?.Location || dummyProfile}
                              alt="icons"
                            />
                          </span>
                          <h5 className="fl-fs-16">{element.name}</h5>
                        </div>
                        <div className="">
                          <Rating
                            name="read-only"
                            value={Number(element.ratings)}
                            readOnly
                          />
                        </div>
                      </div>
                      <p className="mb-0 fl-text-dark px-2">
                        {element.description}
                      </p>
                    </div>
                  ))}
                </Slider>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
