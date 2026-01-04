import React, { useEffect, useState } from "react";
import BuyerHeader from "../Layouts/BuyerHeader";
import DefaultMobileMenu from "../Layouts/DefaultMobileMenu";
import BuyerFooter from "../Layouts/BuyerFooter";
import { Link, useNavigate } from "react-router-dom";
import { Building3, Gps, MessageFavorite } from "iconsax-react";
import Form from "@/components/register/Form";
import Testimonials from "../Components/CommonComponent/Testimonials";
import BlogCard from "../Components/CommonComponent/BlogCard";
import { toast } from "react-toastify";
import { industaryUpdates } from "@/CustomServices/Constant";
import { blogCategoryWiseApi, buyerFaqListApi } from "@/ApiRoutes/BuyersApi";
import Slider from "react-slick";
import {
  autoSlideSlider,
  mediaSlider,
  settings,
} from "@/CustomServices/sliderSetting";
import FaqTabs from "../Components/FaqTabs";
import { recentPropertiesApi } from "@/ApiRoutes/BuyersApi";
import PropertyCard from "../Components/CommonComponent/PropertyCard";
import { useSelector } from "react-redux";
import { selectUser } from "@/Redux/Auth/authSlice";

const BuyerLandingPage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [faqData, setFaqData] = useState([]);
  const [recentProperties, setRecentProperties] = useState([]);
  const user = useSelector(selectUser);

  const logoImages = [
    "https://flb-public.s3.ap-south-1.amazonaws.com/ZQ2KKPQqvnW3HnPVE_Ak0.jpeg",
    "https://flb-public.s3.ap-south-1.amazonaws.com/Vibez-logo-01-1024x799.png",
    "https://flb-public.s3.ap-south-1.amazonaws.com/q89fDAdCebD3sVdyBcCOX.jpeg",
    "https://flb-public.s3.ap-south-1.amazonaws.com/pU9yKrOHSs6mc_n0oD2oy.jpeg",
    "https://flb-public.s3.ap-south-1.amazonaws.com/Og_6RbQNo58cTZB1stpjh.jpeg",
    "https://flb-public.s3.ap-south-1.amazonaws.com/completion_3.png",
    "https://flb-public.s3.ap-south-1.amazonaws.com/aranyakaa-logo-original.png",
  ];

  async function getBlogListNew() {
    try {
      const response = await blogCategoryWiseApi();
      const data = response?.data?.categories || [];
      const tips = data?.find((item) => item.category === industaryUpdates);
      setBlogs(tips?.blogs.slice(0, 2) || []);
    } catch (error) {
      console.log("Error", error);
    } finally {
    }
  }

  async function getFaqList() {
    try {
      const data = { query: "", category: "general", page: "", limit: "" };
      const response = await buyerFaqListApi(data);
      setFaqData(response?.data?.res);
    } catch (error) {
      throw error;
    } finally {
    }
  }

  async function getRecentProperties() {
    try {
      const response = await recentPropertiesApi();
      console.log("Response", response);
      setRecentProperties(response?.data?.properties || []);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    getBlogListNew();
    getFaqList();
    getRecentProperties();
  }, []);

  if (user) {
    navigate("/");
    return;
  }

  console.log("FAQ Data", faqData);

  return (
    <>
      <main className="buyers-main">
        <BuyerHeader headerHide={true} />
        <DefaultMobileMenu />
        <section className="fl-bg-light-green">
          <div className="container fl-container">
            <div className="row">
              <div className="col-md-6">
                <h1 className="fl-banner-heading fl-text-dark-green blog-heading">
                  Sell your <span className="fl-text-green">Farmland</span>{" "}
                  property online faster with
                  <span className="fl-text-green"> Farmlandbazaar.com</span>
                </h1>
                <ul className="mt-5 fl-landing-list">
                  <li className="mb-4">
                    <h4 className="fl-fs-18 fl-fw-500 fl-text-dark">
                      List Your Property {" "}
                      {/* <span className="fl-text-green">FREE</span> */}
                    </h4>{" "}
                  </li>
                  <li className="mb-4">
                    <h4 className="fl-fs-18 fl-fw-500 fl-text-dark">
                      Connect with Verified Buyers
                    </h4>{" "}
                  </li>
                  <li className="mb-4">
                    <h4 className="fl-fs-18 fl-fw-500 fl-text-dark">
                      User-Friendly Platform
                    </h4>{" "}
                  </li>
                  <li className="mb-4">
                    <h4 className="fl-fs-18 fl-fw-500 fl-text-dark">
                      Targeted Audience Reach
                    </h4>{" "}
                  </li>
                  <li className="mb-4">
                    <h4 className="fl-fs-18 fl-fw-500 fl-text-dark">
                      Assistance with Uploading and Dashboard Management
                    </h4>{" "}
                  </li>
                </ul>
              </div>
              <div className="col-md-5 px-md-5 mx-auto">
                <div className="fl-card-shadow p-4 landing-register-form ">
                  <Form />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="fl-bg-green py-4">
          <div className="container fl-container text-center py-2">
            <h3 className="text-white fl-fs-24 fw-normal">
              Give a missed call to{" "}
              <a href="tel:+917075807123" className="text-white lh-normal">
                <strong>+91 7075807123</strong>
              </a>{" "}
              get assistance with your property listing.
            </h3>
          </div>
        </section>
        <section>
          <div className="container fl-container">
            <div className="text-center pb-4">
              <h2 className="fl-ff-main fl-text-dark fl-heading-2 mb-1">
                How to Post Your Property In 3 Easy Steps
              </h2>
            </div>
            <div className="row mt-5">
              <div className="col-md-4 mb-4">
                <div className="ms-5 border-raidus-10 p-4 border fl-border-green fl-count-card h-100">
                  <div className="ps-2">
                    <h2 className="fl-ff-main fl-text-green overflow-heading">
                      1
                    </h2>
                    <h3 className="fl-ff-main fl-text-dark">Sign Up</h3>
                    <p className="fl-ff-main fl-text-dark fw-semi-bold fs-16 mb-0">
                      Register first to post your property—only verified
                      developers and owners can list. Access your personal
                      dashboard upon signing up.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="ms-5 border-raidus-10 p-4 border fl-border-green fl-count-card h-100">
                  <div className="ps-2">
                    <h2 className="fl-ff-main fl-text-green overflow-heading">
                      2
                    </h2>
                    <h3 className="fl-ff-main fl-text-dark">
                      Add Property Details
                    </h3>
                    <p className="fl-ff-main fl-text-dark fw-semi-bold fs-16 mb-0">
                      Enter basic info like project name, location, price,
                      amenities, and one owner verification proof. Upload
                      quality images and videos to attract more leads and
                      inquiries.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="ms-5 border-raidus-10 p-4 border fl-border-green fl-count-card h-100">
                  <div className="ps-2">
                    <h2 className="fl-ff-main fl-text-green overflow-heading">
                      3
                    </h2>
                    <h3 className="fl-ff-main fl-text-dark">Click Upload</h3>
                    <p className="fl-ff-main fl-text-dark fw-semi-bold fs-16 mb-0">
                      Relax while we review your property. Once approved, it
                      will go live, and inquiries will start coming in!
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="text-center mt-md-5 mt-3">
                  <div className="explore-cta-property text-center fl-free-btn">
                    <button className="fl-btn-yellow">
                      Post Your Property
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        '{" "}
        <section className="fl-bg-light-green">
          <div className="container fl-container">
            <div className="text-center pb-4">
              <h2 className="fl-ff-main fl-text-dark fl-heading-2 mb-3">
                Recently Onboarded Properties
              </h2>
              <p className="fl-ff-main fl-text-dark fw-semi-bold fs-22 mb-5">
                Newly Listed Homes Awaiting Your Discovery
              </p>
            </div>
            <div className="row">
              <Slider {...settings}>
                {recentProperties?.map((property, index) => (
                  <div className="col-md-3" key={index}>
                    <PropertyCard property={property} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </section>
        <section className="fl-bg-light-green">
          <Testimonials
            heading="What the farmland developers are saying for us"
            subheading={null}
          />
        </section>
        <section className="home-blog-section">
          <div className="container fl-container">
            <div className="row ">
              <div className="col-lg-6 col-md-8 mx-auto">
                <div className="text-center">
                  <h2 className="fl-ff-main fl-text-dark fl-heading-2">
                    {"Who are with us"}
                  </h2>
                </div>
              </div>
              <div className="py-4">
                <Slider {...mediaSlider}>
                  {logoImages?.map((element, index) => (
                    <a href={element} target="_blank" key={index}>
                      <img
                        className="testimonial-video-card px-4 px-md-0"
                        src={element}
                        style={{
                          width: "15rem",
                          height: "10rem",
                          objectFit: "contain",
                        }}
                      />
                    </a>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </section>
        <section className="fl-bg-light-green">
          <div className="container fl-container">
            <div className="text-center pb-4">
              <h2 className="fl-ff-main fl-text-dark fl-heading-2 mb-3">
                How <span className="fl-text-green">Farmlandbazaar.com </span>{" "}
                is different from other portals
              </h2>
              <p className="fl-ff-main fl-text-dark fw-semi-bold fs-22 mb-5">
                Farmland Bazaar is India’s exclusive online marketplace for
                buying and selling farmlands, farmhouses, coffee estates, and
                agricultural lands. Unlike general real estate platforms, we
                cater specifically to this niche market, offering developers a
                unique opportunity to generate leads, enhance visibility, and
                boost brand presence. Buyers can explore and compare properties
                with ease, all without brokerage fees, in a transparent and
                user-friendly environment.
              </p>
            </div>
            <div className="row mt-5">
              <div className="col-md-4 mb-4">
                <div className="border-raidus-10 p-3 border fl-border-green fl-bg-white h-100">
                  <div className="mb-2">
                    <Gps size="85" color="#00a76f" variant="Bulk" />
                  </div>
                  <h3 className="fl-ff-main fl-text-dark">
                    Targeted Lead Generation:
                  </h3>
                  <p className="fl-ff-main fl-text-dark fw-semi-bold fs-16 mb-0">
                    Our platform connects developers with verified buyers
                    actively seeking farmlands and farmhouses, ensuring more
                    than 90% of inquiries are relevant and genuine.
                  </p>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="border-raidus-10 p-3 border fl-border-green fl-bg-white h-100">
                  <div className="mb-2">
                    <Building3 size="85" color="#00a76f" variant="Bulk" />
                  </div>
                  <h3 className="fl-ff-main fl-text-dark">
                    Easy Property Browsing:
                  </h3>
                  <p className="fl-ff-main fl-text-dark fw-semi-bold fs-16 mb-0">
                    With a simple, mobile-friendly interface, buyers can
                    effortlessly browse properties, filter by budget and
                    location, and schedule visits or chat with sellers.
                  </p>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="border-raidus-10 p-3 border fl-border-green fl-bg-white h-100">
                  <div className="mb-2">
                    <MessageFavorite size="85" color="#00a76f" variant="Bulk" />
                  </div>
                  <h3 className="fl-ff-main fl-text-dark">
                    Direct Deal with Buyers:
                  </h3>
                  <p className="fl-ff-main fl-text-dark fw-semi-bold fs-16 mb-0">
                    Developers receive instant inquiry notifications, allowing
                    for direct, transparent communication with buyers—completely
                    broker-free.
                  </p>
                </div>
              </div>
              <div className="col-12 text-center mt-5">
                <p className="fl-ff-main fl-text-dark fw-semi-bold fs-22 mb-5">
                  Farmland Bazaar simplifies the farmland buying and selling
                  process, offering a convenient and transparent experience for
                  all users.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="fl-bg-green py-4 fl-property-slide-container">
          <div className="container fl-container text-center py-2">
            <h3 className="text-white fl-fs-24 fw-normal">
              Give a missed call to{" "}
              <a href="tel:+917075807123" className="text-white lh-normal">
                <strong>+91 7075807123</strong>
              </a>{" "}
              get assistance with your property listing.
            </h3>
          </div>
          <div className="">
            <div className="explore-cta-property text-center fl-free-btn">
              <button className="fl-btn-yellow">Post Your Property</button>
            </div>
          </div>
        </section>
        {faqData?.length > 0 ? (
          <section>
            <div className="container fl-container">
              <div className="text-center pb-4">
                <h2 className="fl-ff-main fl-text-dark fl-heading-2 mb-3">
                  FAQs
                </h2>
                <div className="">
                  <FaqTabs faqData={faqData} />
                </div>
              </div>
            </div>
          </section>
        ) : null}
        {blogs?.length > 0 ? (
          <section className="fl-bg-light-green">
            <div className="container fl-container">
              <div className="text-center pb-4">
                <h2 className="fl-ff-main fl-text-dark fl-heading-2 mb-3">
                  Interesting Reads
                </h2>
                <p className="fl-ff-main fl-text-dark fw-semi-bold fs-22 mb-5">
                  Discover Stories, Tips, and Trends from the Land
                </p>
              </div>
              <div className="row">
                <Slider {...autoSlideSlider}>
                  {blogs?.map((blog) => (
                    <div key={blog?._id} className="col-md-4">
                      <BlogCard blog={blog} />
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="text-center">
                <Link
                  className="text-white"
                  to="/blog"
                  state={{ categoryId: "" }}
                >
                  <div className="explore-cta-property text-center">
                    <button className="fl-btn-dark">Explore All Blogs</button>
                  </div>
                </Link>
              </div>
            </div>
          </section>
        ) : null}
        <BuyerFooter />
      </main>
    </>
  );
};

export default BuyerLandingPage;
