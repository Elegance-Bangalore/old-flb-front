import React, { useEffect, useState } from "react";
import logo from "../../../../../CustomAssets/BuyerImages/Logo.png";
import {
  ArrowCircleRight2,
  Dribbble,
  Facebook,
  Instagram,
  Youtube,
} from "iconsax-react";
import { Link } from "react-router-dom";
import { footerListApi, homeFooterSeoApi } from "@/ApiRoutes/BuyersApi";
import { toast } from "react-toastify";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useInView } from "react-intersection-observer";
import { formatPropertyType } from "@/CustomServices/Constant";
import FooterSeoHomePage from "../Components/HomeComponents/FooterSeoHomePage";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { FaDotCircle } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

const BuyerFooter = () => {
  const [footerList, setFooterList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [seoData, setSeoData] = useState({});
  const [ref, inView] = useInView({ triggerOnce: true });
  const [tabValue, setTabValue] = React.useState("farmland");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  async function getFooter() {
    try {
      const response = await footerListApi("");
      setFooterList(response.data.res);
    } catch (error) {
      toast.error("Failed to get footer list.");
    } finally {
    }
  }

  async function getSeoList() {
    try {
      setLoader(true);
      const response = await homeFooterSeoApi();
      const data = response?.data?.data;
      setSeoData(data);

      if (data && Object.keys(data).length > 0) {
        const firstNonEmptyKey = Object.keys(data).find(
          (key) => data[key].length > 0
        );
        if (firstNonEmptyKey) {
          setTabValue(firstNonEmptyKey);
        } else {
          setTabValue(null);
        }
      }
    } catch (error) {
      console.log("Errors is", error);
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    if (inView) {
      getFooter();
      getSeoList();
    }
  }, [inView]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const filteredCategories = Object.keys(seoData).filter(
    (category) => seoData[category]?.length > 0
  );

  return (
    <>
      <footer className="fl-bg-dark-green pt-5" ref={ref}>
        <div className="container fl-container">
          {loader ? (
            <div className="my-4 text-center">
              <OnClickLoader />
            </div>
          ) : (
            <FooterSeoHomePage
              filteredCategories={filteredCategories}
              handleTabChange={handleTabChange}
              seoData={seoData}
              tabValue={tabValue}
            />
          )}
          <div className="row justify-content-between">
            <div className="col-md-7 mb-4">
              <div className="">
                <Link to="/" className="d-inline-block mb-4">
                  <img
                    src={logo}
                    alt="Logo"
                    className="img-fluid footer-logo"
                  />
                </Link>
                <div className="text-white">
                  {/* <p className="fw-bold text-white fs-6">
                    Why choose FarmlandBazaar?
                  </p> */}

                  <h5 className="text-white">
                  Farmland Bazaar - India’s Trusted Farmland Marketplace
                  </h5>
                  <p className="text-white fs-6">
                  Buy and sell managed farmlands, agricultural land, estates and farmhouses across India.
                  Explore verified farmland listings with ease, from premium estates to budget-friendly farm plots.
                  </p>
                </div>
                <div>
                <p className="text-white fl-ff-main fs-16 mb-1">
                  {" "}
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                    >
                      <path
                        d="M7.02417 8.51158C7.7265 9.7466 8.7534 10.7735 9.98842 11.4758L10.6518 10.5471C10.8724 10.2384 11.2887 10.143 11.6217 10.3249C12.6768 10.9012 13.8428 11.2515 15.0592 11.3478C15.4492 11.3787 15.75 11.7042 15.75 12.0954V15.4426C15.75 15.8271 15.4591 16.1493 15.0766 16.1886C14.6792 16.2295 14.2783 16.25 13.875 16.25C7.45469 16.25 2.25 11.0453 2.25 4.625C2.25 4.2217 2.27057 3.82078 2.31142 3.42332C2.35073 3.04081 2.67296 2.75 3.05749 2.75H6.40456C6.79583 2.75 7.12135 3.05078 7.15222 3.44082C7.2485 4.65716 7.59877 5.82323 8.17515 6.87833C8.35703 7.2113 8.26162 7.62766 7.95292 7.84818L7.02417 8.51158ZM5.13319 8.0189L6.55815 7.00107C6.1541 6.12885 5.87721 5.20387 5.73545 4.25H3.7568C3.75227 4.37474 3.75 4.49975 3.75 4.625C3.75 10.2169 8.28315 14.75 13.875 14.75C14.0002 14.75 14.1253 14.7478 14.25 14.7432V12.7645C13.2962 12.6228 12.3712 12.3459 11.4989 11.9419L10.4811 13.3668C10.0694 13.2069 9.6717 13.0186 9.29055 12.8046L9.24697 12.7797C7.77728 11.944 6.55601 10.7227 5.72025 9.25303L5.69545 9.20945C5.48137 8.8283 5.29316 8.43065 5.13319 8.0189Z"
                        fill="#00A76F"
                      />
                    </svg>
                  </span>{" "}
                  <a
                    className="text-white fl-ff-main "
                    href="tel: +91 7075807123"
                  >
                    {" "}
                    +91 7075807123
                  </a>{" "}
                  <a
                    className="text-white fl-ff-main d-block d-lg-inline-block mt-2 mt-lg-0"
                    href="mailto:info@farmlandbazaar.com"
                  >
                    <span className="ms-xl-5 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                      >
                        <path
                          d="M2.25 2.75H15.75C16.1642 2.75 16.5 3.08579 16.5 3.5V15.5C16.5 15.9142 16.1642 16.25 15.75 16.25H2.25C1.83579 16.25 1.5 15.9142 1.5 15.5V3.5C1.5 3.08579 1.83579 2.75 2.25 2.75ZM15 5.92844L9.05385 11.2535L3 5.91195V14.75H15V5.92844ZM3.38359 4.25L9.04642 9.2465L14.6257 4.25H3.38359Z"
                          fill="#00A76F"
                        />
                      </svg>
                    </span>{" "}
                    info@farmlandbazaar.com
                  </a>{" "}
                </p>
                <p className="text-white fl-ff-main fs-16">
                  {" "}
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M9 17.7959L4.22703 13.023C1.59099 10.3869 1.59099 6.11307 4.22703 3.47703C6.86307 0.84099 11.1369 0.84099 13.773 3.47703C16.409 6.11307 16.409 10.3869 13.773 13.023L9 17.7959ZM12.7123 11.9623C14.7625 9.91208 14.7625 6.58794 12.7123 4.53769C10.6621 2.48744 7.33794 2.48744 5.28769 4.53769C3.23744 6.58794 3.23744 9.91208 5.28769 11.9623L9 15.6746L12.7123 11.9623ZM9 9.75C8.17155 9.75 7.5 9.07845 7.5 8.25C7.5 7.42157 8.17155 6.75 9 6.75C9.82845 6.75 10.5 7.42157 10.5 8.25C10.5 9.07845 9.82845 9.75 9 9.75Z"
                        fill="#00A76F"
                      />
                    </svg>
                  </span>{" "}
                  410, Dodda Sanjeevaiah Complex, Varthur Main Road,
                  Ramagondanahalli, Whitefield, Bengaluru, Karnataka 560066
                </p>
                </div>
          
              </div>
            </div>
            <div className="col-md-5 mb-4">
              <div className="">
                <h3 className="fl-ff-main text-white mb-4">Quick Links</h3>
                <div className="row mb-3 mb-lg-5">
                  <ul
                    className="d-flex flex-wrap"
                    style={{ rowGap: "1rem", columnGap: "3rem" }}
                  >
                    {footerList?.map((element, i) => (
                      <li key={i}>
                        <Link
                          className="text-white fl-ff-main fs-18 fl-text-green-hover"
                          to={`/${element.link}`}
                        >
                          {element.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="d-flex flex-wrap mb-4 justify-content-between">
                  <div className="">
                    <h3 className="text-white fl-ff-main mb-4">Follow us</h3>
                    <ul className="d-flex gap-3 align-items-center">

                    <li>
                        <a
                          href="https://www.instagram.com/farmlandbazaar/"
                          target="_blank"
                        >
                          <InstagramIcon
                            style={{ fontSize: 30, color: "#f5b041" }}
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.facebook.com/farmlandbazaar"
                          target="_blank"
                        >
                          <Facebook size="30" color="#f5b041" variant="Bold" />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.youtube.com/channel/UCozy6ntUQTBuZI1I3IwoTCw"
                          target="_blank"
                        >
                          <Youtube size="30" color="#f5b041" variant="Bold" />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.linkedin.com/company/farmlandbazaar/"
                          target="_blank"
                        >
                          <LinkedInIcon
                            style={{ fontSize: 30, color: "#f5b041" }}
                          />
                        </a>
                      </li>
                    
                      {/* <li>
                        <a href="https://x.com/farmlandbazaar" target="_blank">
                          <XIcon style={{ fontSize: 30, color: "#f5b041" }} />
                        </a>
                      </li> */}
                     
                    </ul>
                  </div>
                  {/* <div className="">
                    <h3 className="text-white fl-ff-main mb-4">Subscribe </h3>
                    <div className="d-flex">
                      <input
                        type="text"
                        placeholder="Email"
                        className="rounded-3 form-control"
                        style={{ width: "16rem" }}
                      />
                      <button className="border-0 fl-bg-dark-green">
                        <ArrowCircleRight2
                          size="44"
                          color="#f5b041"
                          variant="Bold"
                        />
                      </button>
                    </div>
                  </div> */}
                </div>
               
              </div>
            </div>
          </div>
        </div>
        <div className="fl-bg-green text-white fl-ff-main py-2 text-center">
          <p className="text-white mb-0">
            Copyright © {new Date().getFullYear()} Evoluxar Marketing Technology
            Pvt. Ltd. All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default BuyerFooter;
