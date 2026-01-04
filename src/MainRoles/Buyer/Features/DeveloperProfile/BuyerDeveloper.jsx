import React, { useState, useEffect, useRef } from "react";
import BuyerHeader from "../BuyerHomePage/Layouts/BuyerHeader";
import BuyerFooter from "../BuyerHomePage/Layouts/BuyerFooter";
import PropertyCard from "../BuyerHomePage/Components/CommonComponent/PropertyCard";
import {
  getDeveloperInfoApi,
  getDeveloperPropertyApi,
  postInquiryApi,
} from "@/ApiRoutes/BuyersApi";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { selectUser } from "@/Redux/Auth/authSlice";
import { useSelector } from "react-redux";
import DeveloperDetail from "./Components/DeveloperDetail";
import PostEnquiry from "./Components/PostEnquiry";
import DefaultMobileMenu from "../BuyerHomePage/Layouts/DefaultMobileMenu";
import PropertyEnquirySection from "../BuyersPropertyDetailPage/components/PropertyEnquirySection";

const BuyerDeveloper = () => {
  const [propertyList, setPropertyList] = useState([]);
  const param = useParams();
  const user = useSelector(selectUser);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");
  const [developerData, setDeveloperData] = useState({});
  const developerId = param?.developerId;
  const companySlug = param?.companySlug;
  const [count, setCount] = useState(0);
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  async function developerPropertyList() {
    try {
      const response = await getDeveloperPropertyApi({ developerId });
      setPropertyList(response?.data?.properties);
      setCount(response?.data?.counts);
    } catch (error) {
      toastMessage();
    }
  }

  async function getDeveloperData() {
    try {
      const response = await getDeveloperInfoApi({ developerId });
      setDeveloperData(response?.data);
    } catch (error) {
      toastMessage();
    }
  }

  useEffect(() => {
    if (developerId) {
      developerPropertyList();
      getDeveloperData();
    }
  }, []);

  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveSection(this.getAttribute("href"));
      });
    });
    window.addEventListener("scroll", () => {
      const sections = document.querySelectorAll(".content-section");
      const scrollPosition = window.scrollY;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (scrollPosition >= top && scrollPosition < bottom) {
          setActiveSection("#" + section.id);
        }
      });
    });
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener("click", () => {});
      });
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <>
      <main className="buyers-main">
        <BuyerHeader />
        <DefaultMobileMenu />
        <section className="fl-heading-banner"></section>
        <DeveloperDetail developerData={developerData}></DeveloperDetail>
        <section className="fl-bg-white">
          <div className="container fl-container">
            <div className="row">
              <div
                className="col-lg-2 fl-sticky mb-5"
                style={{ height: "100%" }}
              >
                <ul className="detail-list-group">
                  {developerData?.seller?.about && (
                    <li>
                      <a
                        className={activeSection === "#about" ? "active" : ""}
                        href="#about"
                      >
                        About
                      </a>
                    </li>
                  )}

                  <li>
                    <a
                      className={activeSection === "#projects" ? "active" : ""}
                      href="#projects"
                    >
                      Projects
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-7">
                {developerData?.seller?.about && (
                  <section className="content-section py-0" id="about">
                    <div className="detail-content-box fl-property-card rounded-3">
                      <div className=" px-3 py-3 border-bottom fl-card-border">
                        <h3 className="fl-text-dark text-uppercase mb-0">
                          About
                        </h3>
                      </div>

                      <div className="p-4">
                        <p className="fl-text-dark fl-fs-16">
                          {developerData?.seller?.about}
                        </p>
                      </div>
                    </div>
                  </section>
                )}
                <div className="content-section pb-0" id="projects">
                  <div className="">
                    <div className="py-3">
                      <h3 className="fl-text-dark text-uppercase mb-0">
                        Properties by {developerData?.seller?.companyName}
                      </h3>
                    </div>
                    <div className="mt-3">
                      <div className="">
                        <div className="row mt-5">
                          {propertyList.map((element) => (
                            <div className="col-md-6 mb-4" key={element._id}>
                              {" "}
                              <PropertyCard property={element} />{" "}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <PostEnquiry propertyList={propertyList} /> */}
              <PropertyEnquirySection
                propertyList={propertyList}
                fromDeveloperProfile={true}
                developerData={developerData?.seller}
              />
            </div>
          </div>
        </section>
        <BuyerFooter />
      </main>
    </>
  );
};

export default BuyerDeveloper;
