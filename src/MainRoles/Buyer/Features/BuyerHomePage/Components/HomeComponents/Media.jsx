import { getMediaApi } from "@/ApiRoutes/AdminApi";
import { mediaSlider } from "@/CustomServices/sliderSetting";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

function Media({heading}) {
  const [media, setMedia] = useState([]);
  const [loader, setLoader] = useState(true);

  async function getMedia() {
    try {
      setLoader(true);
      const res = await getMediaApi();
      setMedia(res?.data?.media || []);
    } catch (error) {
      throw error;
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    getMedia();
  }, []);

if(media?.length === 0) return null

  return (
    <section className="home-blog-section">
      <div className="container fl-container">
        <div className="row ">
          <div className="col-lg-6 col-md-8 mx-auto">
            <div className="text-center">
              <h2 className="fl-ff-main fl-text-dark fl-heading-2">{(heading) ? heading : "In Media "}</h2>
            </div>
          </div>
          <div className="py-4">
           
            <Slider {...mediaSlider}>
              {media?.map((element, index) => (
                <a href={element.link} target="_blank" key={index}>
                  <img
                    className="testimonial-video-card px-4 px-md-0"
                    src={element.mediaImage}
                    style={{width : "15rem" , height : "10rem" , objectFit : "contain"}}
                  />
                </a>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Media;
