import React, { useEffect, useRef, useState } from "react";
import { Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "react-slick";
import { useInView } from "react-intersection-observer";
import "./ImageSlider.css"; // Import the CSS file

function ImageSlider({ singleProperty, gallery, setActiveSection }) {
  function isVideo(url) {
    return /\.(mp4|ogg|webm)$/.test(url);
  }

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  // const [ref, inView] = useInView({ triggerOnce: false });

  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  const handleOpenModal = (index) => {
    setSelectedImageIndex(index);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const settingsMain = {
    dots: false,
    arrows: true,
    infinite: gallery.length >= 3 ? true : false,
    speed: 500,
    focusOnSelect: true,
    slidesToShow: 1,
    swipeToSlide: true,
    centerMode: true,
    centerPadding: "180px",
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 768, // Screen width from 576 to 768 (tablet)
        settings: {
          slidesToShow: 1,
          centerPadding: "100px", // Adjust center padding for tablet
        },
      },
      {
        breakpoint: 576, // Screen width below 576 (mobile)
        settings: {
          slidesToShow: 1,
          centerPadding: "50px", // Adjust center padding for mobile
        },
      },
    ],
  };

  const settingsMobile = {
    dots: false,
    arrows: true,
    infinite: gallery.length >= 3 ? true : false,
    speed: 500,
    focusOnSelect: true,
    slidesToShow: 1,
    swipeToSlide: true,
    centerMode: true,
    centerPadding: "180px",
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 768, // Screen width from 576 to 768 (tablet)
        settings: {
          slidesToShow: 1,
          centerPadding: "100px", // Adjust center padding for tablet
        },
      },
      {
        breakpoint: 576, // Screen width below 576 (mobile)
        settings: {
          slidesToShow: 1,
          centerPadding: "0px", // Adjust center padding for mobile
        },
      },
    ],
  };

  // Define settings for the thumbnail slider
  const settingsThumbnails = {
    dots: false,
    arrows: false,
    infinite: gallery.length >= 3 ? true : false,
    speed: 500,
    slidesToShow: 1,
    centerMode: true,
    slidesToScroll: 1,
    centerPadding: "180px",
    responsive: [
      {
        breakpoint: 768, // Screen width from 576 to 768 (tablet)
        settings: {
          slidesToShow: 2,
          centerPadding: "100px", // Adjust center padding for tablet
        },
      },
      {
        breakpoint: 576, // Screen width below 576 (mobile)
        settings: {
          slidesToShow: 3,
          centerPadding: "50px", // Adjust center padding for mobile
        },
      },
    ],
  };

  const [ref, inView, entry] = useInView({
    threshold: [0.5, 1],
    // rootMargin: '-50px 0px -50px 0px',
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && entry.isIntersecting) {
      setActiveSection("gallery");
    }
  }, [inView, entry, setActiveSection]);

  return (
    <div>
      <div className="p-3 p-md-4" ref={ref}>
        {singleProperty ? (
          <div className="detail-slider-main">
            <Slider
              {...settingsMain}
              asNavFor={nav2}
              ref={(slider) => (sliderRef1 = slider)}
            >
              {gallery?.map((element, index) => (
                <div
                  className="detail-gallery-slider"
                  key={index}
                  onClick={() => handleOpenModal(index)}
                >
                  {isVideo(element) ? (
                    <video 
                      className="img-fluid w-100" 
                      style={{
                        maxHeight: '300px',
                        objectFit: 'cover'
                      }}
                      controls
                    >
                      <source src={element} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      className="img-fluid w-100"
                      src={element}
                      alt="slide"
                    />
                  )}
                </div>
              ))}
            </Slider>
            <div className="single-img-preview mt-5">
              {/* Modal */}
              <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                disableScrollLock
              >
                <div
                  style={{
                    position: "absolute",
                    top: "54%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "80%",
                    height: "70%",
                  }}
                >
                  <Slider
                  autoplay={false}
                    className="mobile-preview-slide"
                    {...settingsMobile}
                    initialSlide={selectedImageIndex}
                  >
                    {gallery?.map((element, index) => (
                      <div key={index}>
                        {isVideo(element) ? (
                          <video 
                            className="img-fluid w-100" 
                            controls 
                            style={{
                              maxHeight: window.innerWidth <= 768 ? '250px' : '610px',
                              maxWidth: window.innerWidth <= 768 ? '100%' : '600px',
                              marginTop:
                                window.innerWidth <= 768
                                  ? '0px'
                                  : window.innerWidth <= 1366 // laptop screen case
                                  ? '113px'
                                  : '80px',
                              objectFit: 'contain'
                            }}
                          >
                            <source src={element} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <img
                            className="img-fluid fl-img-16-9 w-100 modal-media"
                            src={element}
                            alt={`modal-slide-${index}`}
                          />
                        )}
                      </div>
                    ))}
                  </Slider>
                  <IconButton
                    className="slide-cross-btn"
                    onClick={handleCloseModal}
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      color: "#fff",
                      background: "#00a76f",
                    }}
                  >
                    <CloseIcon style={{ width: "1.5em", height: "1.5em" }} />
                  </IconButton>
                </div>
              </Modal>
            </div>
          </div>
        ) : null}

        {singleProperty ? (
          <div className="detail-slider-thumbnails">
            <Slider
              {...settingsThumbnails}
              asNavFor={nav1}
              ref={(slider) => (sliderRef2 = slider)}
              slidesToShow={3}
              swipeToSlide={true}
              focusOnSelect={true}
            >
              {gallery?.map((element, index) => (
                <div className="detail-gallery-slider-mini" key={index}>
                  {isVideo(element) ? (
                    <video 
                      className="img-fluid w-100" 
                      style={{
                        maxHeight: '80px',
                        objectFit: 'cover'
                      }}
                      controls={false}
                    >
                      <source src={element} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      className="img-fluid w-100"
                      src={element}
                      alt="slide"
                    />
                  )}
                </div>
              ))}
            </Slider>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ImageSlider;
