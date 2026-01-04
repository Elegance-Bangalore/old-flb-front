import React, { useEffect, useState } from "react";
import BuyerHeader from "../Layouts/BuyerHeader";
import BuyerFooter from "../Layouts/BuyerFooter";
import aboutImage from "../../../../../CustomAssets/BuyerImages/about.png";
import DefaultMobileMenu from "../Layouts/DefaultMobileMenu";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { getAboutUsApi } from "@/ApiRoutes/AdminApi";

const BuyerAbout = () => {
  const [aboutContent, setAboutContent] = useState({});

  async function getContent(value) {
    try {
      const response = await getAboutUsApi(value);
      if (response?.data?.about?.length) {
        setAboutContent(response?.data?.about[0]);
      }
    } catch (error) {
      toastMessage();
    }
  }

  useEffect(() => {
    getContent();
  }, []);


  return (
    <>
      <main className="buyers-main">
        <BuyerHeader headerHide={true} />
        <DefaultMobileMenu />
        <section
          className="fl-about-banner-hero"
          style={{ backgroundImage: `url(${aboutContent?.heroImage})` }}
        >
          <div className="container fl-container">
            <h1 className="text-white fl-banner-heading">
              {aboutContent?.title}
            </h1>
            <h2 className="text-white fw-normal fl-banner-heading-normal">
              {aboutContent?.subtitle}
            </h2>
          </div>
        </section>
        <section>
          <div className="container fl-container">
            <div className="row">
              <div className="col-md-8 mb-lg-0 order-1 order-md-0">
                <div className="pe-lg-5">
                  <div className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="60"
                      height="60"
                      viewBox="0 0 60 60"
                      fill="none"
                    >
                      <path
                        d="M11.4585 43.3028C8.8829 40.5685 7.5 37.5 7.5 32.5258C7.5 23.7772 13.6413 15.9342 22.5765 12.058L24.8082 15.502C16.4701 20.0135 14.8404 25.865 14.1891 29.555C15.5316 28.8608 17.2889 28.6165 19.0118 28.7763C23.5227 29.1945 27.078 32.8975 27.078 37.5C27.078 42.3325 23.1604 46.25 18.3279 46.25C15.6452 46.25 13.0799 45.0238 11.4585 43.3028ZM36.4585 43.3028C33.883 40.5685 32.5 37.5 32.5 32.5258C32.5 23.7772 38.6412 15.9342 47.5765 12.058L49.8082 15.502C41.47 20.0135 39.8405 25.865 39.189 29.555C40.5315 28.8608 42.289 28.6165 44.0117 28.7763C48.5227 29.1945 52.078 32.8975 52.078 37.5C52.078 42.3325 48.1605 46.25 43.328 46.25C40.6452 46.25 38.08 45.0238 36.4585 43.3028Z"
                        fill="#00A76F"
                      />
                    </svg>
                  </div>
                  <div className="about-detail-content">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: aboutContent?.content,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4 order-0 order-md-1">
                <div className="border p-2 fl-fit-content rounded-4 fl-border-green">
                  <img
                    className="img-fluid w-100 aspect-1-1"
                    src={aboutContent?.logo}
                    alt="about"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container fl-container">
            <div className="row">
              {aboutContent?.mission?.map((item, index) => (
                <div className="col-md-6 mb-4 mb-lg-0" key={index}>
                  <div className="d-flex flex-wrap flex-md-nowrap gap-4 align-items-center fl-property-card p-3 border-raidus-10 h-100">
                    <div className="about-mission-icon">
                      <img
                        className="img-fluid w-100"
                        src={item.icon}
                        alt="about-icon"
                      />
                    </div>
                    <div className="fl-bg-light-green border-raidus-10 p-4">
                      <h2 className="fl-text-dark-green fw-semi-bold">
                        {item.heading}
                      </h2>
                      <p className="fl-text-dark-green fl-fs-16">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <BuyerFooter />
      </main>
    </>
  );
};

export default BuyerAbout;
