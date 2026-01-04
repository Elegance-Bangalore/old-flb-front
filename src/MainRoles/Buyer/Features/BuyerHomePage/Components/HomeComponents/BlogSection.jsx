import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { blogCategoryWiseApi, getBlogListApi } from "@/ApiRoutes/BuyersApi";
import { useInView } from "react-intersection-observer";
import Slider from "react-slick";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { toast } from "react-toastify";
import { FaPlayCircle, FaRegFileAlt } from "react-icons/fa";
import { blogVideosSlider } from "@/CustomServices/sliderSetting";
import {
  formatTitleForUrl,
  industaryUpdates,
  knowledgeHub,
  trendingVideos,
} from "@/CustomServices/Constant";
import { FaArrowRightLong, FaRegCirclePlay } from "react-icons/fa6";
import BlogModal from "../CommonComponent/BlogModal";
import { IoIosPlayCircle } from "react-icons/io";
import usePageSEO from "@/Seo";

const BlogSection = ({ settings }) => {
  const [ref, inView] = useInView({ triggerOnce: true });
  const [loader, setLoader] = useState(true);
  const [tabValue, setTabValue] = React.useState("1");
  const [allBlogs, setAllBlogs] = useState([]);
  const [trendingVideosData, settrendingVideosDataData] = useState([]);
  const [knowledgeHubData, setknowledgeHubDataData] = useState([]);
  const [industaryUpdatesData, setindustaryUpdatesDataData] = useState([]);

  const [ids, setIds] = useState({
    trendingId: "",
    knowledgeId: "",
    industaryId: "",
  });

  async function getBlogListNew() {
    try {
      setLoader(true);
      const response = await blogCategoryWiseApi();
      const data = response?.data?.categories || [];
      const trendingVideosData = data?.find(
        (item) => item.category === trendingVideos
      );
      const knowledgeHubData = data?.find(
        (item) => item.category === knowledgeHub
      );
      const tips = data?.find((item) => item.category === industaryUpdates);
      const ids = {
        trendingId: trendingVideosData?._id,
        knowledgeId: knowledgeHubData?._id,
        industaryId: tips?._id,
      };
      setIds(ids);
      settrendingVideosDataData(trendingVideosData?.blogs || []);
      setknowledgeHubDataData(knowledgeHubData?.blogs.slice(0, 5) || []);
      setindustaryUpdatesDataData(tips?.blogs.slice(0, 2) || []);
      setAllBlogs(data);
      setTabValue(data[0]?._id);
    } catch (error) {
      console.log("Error", error);
      toast.error("Failed to get blog list");
    } finally {
      setLoader(false);
    }
  }

  usePageSEO({
    title: "Farmland Bazaar – Buy & Sell Farmland Across India",
    description: "India's largest marketplace for managed farmlands, agriculture land, estates. Explore verified listings across regions.",
    keywords: ["Farmland Bazaar", "Farmland Bazaar", "Farmland Bazaar"],
    ogTitle: "Farmland Bazaar",
    ogDescription: "Farmland Bazaar",
    ogImage: "https://flb-public.s3.ap-south-1.amazonaws.com/2Geqhte2sdxuKmoZqqyjg.jpeg",
    ogUrl: "https://farmlandbazaar.com/blog",
  })

  useEffect(() => {
    if (inView) {
      getBlogListNew();
    }
  }, [inView]);

  return (
    <div ref={ref}>
      {loader ? (
        <div className="text-center my-5">
          <OnClickLoader />
        </div>
      ) : allBlogs.length > 0 ? (
        <section className="home-blog-section fl-bg-light-green fl-property-slide-container my-5">
          <div className="container fl-container">
            <div className="row my-lg-5">
              <div className="col-lg-6 col-md-8 mx-auto">
                <div className="text-center">
                  <h2 className="fl-ff-main fl-text-dark fl-heading-2">
                    The Farm Journal
                  </h2>
                  <p className="fl-ff-main fl-text-dark fw-semi-bold fs-22 mb-5">
                    Discover Stories, Tips, and Trends from the Land
                  </p>
                </div>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-lg-4 col-sm-6 mb-4 mb-md-2">
                    <VideoCard
                      trendingVideosData={trendingVideosData}
                      ids={ids}
                    />
                  </div>
                  <div className="col-lg-4 col-sm-6 mb-4 mb-md-2">
                    <KnowlengeHubCard
                      knowledgeHubData={knowledgeHubData}
                      ids={ids}
                    />
                  </div>
                  <div className="col-lg-4 col-sm-6 mb-4 mb-md-2">
                    <IndustaryUpdateCard
                      industaryUpdatesData={industaryUpdatesData}
                      ids={ids}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link className="text-white" to="/blog" state={{ categoryId: "" }}>
            {" "}
            <div className="explore-cta-property text-center">
              <button className="fl-btn-dark">Explore All Blogs</button>
            </div>
          </Link>
        </section>
      ) : null}
    </div>
  );
};

export default BlogSection;

function VideoCard({ trendingVideosData, ids }) {
  const [currentBlogData, setCurrentBlogData] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (videoData) => {
    setCurrentBlogData(videoData); // Set the specific video data for the clicked video
    setOpen(true); // Open the modal
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentBlogData(null); // Reset the modal data after closing
  };

  return (
    <>
      <div className="fl-dev-card d-flex flex-column justify-content-between  p-3 fl-card-shadow border fl-card-border mb-3 h-100">
        <div className="">
          <h3 className="mt-2 mb-3">Trending Videos</h3>
          <div className="blog-iframe-wrapper-slide">
            <Slider {...blogVideosSlider}>
              {trendingVideosData?.map((element, index) => (
                <div className="" key={index}>
                  <div
                    className="blog-iframe-wrapper position-relative"
                    role="button"
                    onClick={() => handleClickOpen(element)}
                  >
                    <img
                      className="img-fluid"
                      src={element.logo}
                      alt={element.title}
                    />
                    <span
                      className="blog-iframe-wrapper-overlay position-absolute"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <IoIosPlayCircle
                        className="bg-white rounded-circle"
                        size={"2.3rem"}
                        color="#00a76f"
                      />
                    </span>
                  </div>
                  <h5 className="fl-fw-500 fl-fs-16 mt-2 Knowledge-text truncate-2">
                    <Link
                      to={`/blog/${formatTitleForUrl(
                        element?.slug || element?.title
                      )}/${element?._id}`}
                      className="fl-text-green-hover"
                    >
                      {element?.title}
                    </Link>
                  </h5>
                </div>
              ))}
            </Slider>

            {/* Render Modal only when open */}
            {open && currentBlogData && (
              <BlogModal
                open={open}
                handleClose={handleClose}
                blogData={currentBlogData}
              />
            )}
          </div>
        </div>
        <div className="">
          <Link
            to="/blog"
            state={{ categoryId: ids?.trendingId }}
            className="fl-text-green text-decoration-underline fl-fw-600 fl-fs-16"
          >
            See all <FaArrowRightLong />
          </Link>
        </div>
      </div>
    </>
  );
}

function IndustaryUpdateCard({ industaryUpdatesData, ids }) {
  return (
    <div className="fl-dev-card d-flex flex-column justify-content-between  p-3 fl-card-shadow border fl-card-border mb-3 h-100">
      <div className="">
        <h3 className="mt-2 mb-3">Industry Updates & Reads</h3>

        {industaryUpdatesData?.map((element, index) => (
          <div key={index} className="legal-update-card row mb-3">
            <div className="legal-update-card-img col-5 col-md-4">
              <img className="" alt="icons" src={element?.logo} />
            </div>
            <div className="legal-update-card-text col-7 col-md-8">
              <p className="fl-fs-16 fl-fw-500 ">{element.title}</p>
              <Link
                className="fl-text-green text-decoration-underline fl-fw-500 fl-fs-14"
                to={`/blog/${formatTitleForUrl(
                  element?.slug || element?.title
                )}/${element?._id}`}
              >
                Read Article <FaArrowRightLong />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Link
          className="fl-text-green text-decoration-underline fl-fw-600 fl-fs-16"
          to="/blog"
          state={{ categoryId: ids?.industaryId }}
        >
          See all <FaArrowRightLong />
        </Link>
      </div>
    </div>
  );
}

function KnowlengeHubCard({ knowledgeHubData, ids }) {
  return (
    <div className="fl-dev-card d-flex flex-column justify-content-between  p-3 fl-card-shadow border fl-card-border mb-3 h-100">
      <div className="">
        <h3 className="mt-2 mb-3">Knowledge Hub</h3>
        <ul>
          {knowledgeHubData?.map((element, index) => (
            <li key={index} className="pt-2 border-bottom mb-1">
              <p className="fl-fs-16 text-capitalize Knowledge-text fl-text-green-hover">
                <Link
                  to={`/blog/${formatTitleForUrl(
                    element?.slug || element?.title
                  )}/${element?._id}`}
                  className="fl-text-green-hover"
                >
                  <span className="me-2">
                    <FaRegFileAlt className="text-success" />
                  </span>
                  {element?.title}
                </Link>
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Link
          className="fl-text-green text-decoration-underline fl-fw-600 fl-fs-16"
          to="/blog"
          state={{ categoryId: ids?.knowledgeId }}
        >
          See all <FaArrowRightLong />
        </Link>
      </div>
    </div>
  );
}
