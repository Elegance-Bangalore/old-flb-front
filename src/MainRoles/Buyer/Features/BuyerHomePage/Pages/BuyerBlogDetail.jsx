import React, { useEffect, useState } from "react";
import BuyerHeader from "../Layouts/BuyerHeader";
import DefaultMobileMenu from "../Layouts/DefaultMobileMenu";
import BuyerFooter from "../Layouts/BuyerFooter";
import { Link, useParams } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import XIcon from "@mui/icons-material/X";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { toast } from "react-toastify";
import {
  getBlogDetailApi,
  getSubCategoryBlogsApi,
} from "@/ApiRoutes/BuyersApi";
import {
  formatTitleForUrl,
  handleFacebookShare,
  handleTwitterShare,
  handleWhatsAppShare,
} from "@/CustomServices/Constant";
import { getBlogCategoryApi } from "@/ApiRoutes/AdminApi";
import BlogCard from "../Components/CommonComponent/BlogCard";
import MetaComponent from "@/components/common/MetaComponent";

const BuyerBlogDetail = () => {
  const [blogDetail, setBlogDetail] = useState("");
  const [blogCategoryData, setBlogCategoryData] = useState([]);
  const param = useParams();
  const blogTitle = blogDetail?.title || "Blog Title";
  const apiurl = import.meta.env.VITE_BASE_API_URL;
  const blogImage = blogDetail?.logo || "";
  const pageUrl = `https://www.farmlandbazaar.com/blog/${`${formatTitleForUrl(
    blogDetail?.slug || blogDetail?.title
  )}/${param?.blogId}`}`;

  const metaUrl = `${window.location.origin}/blog/${blogDetail?.slug || blogDetail?.title}/${param?.blogId}`;


  // const metaUrl = `${window.location.origin}/blog/gl/${ blogDetail?.slug || blogDetail?.title
  // )}/${param?.blogId}``;

  // const metaUrl = `${apiurl}/page-meta?imageUrl=${encodeURIComponent(
  //   blogImage
  // )}&title=${encodeURIComponent(blogTitle)}&pageUrl=${encodeURIComponent(
  //   pageUrl
  // )}`;

  async function getBlogDetail() {
    try {
      const response = await getBlogDetailApi(param.blogId);
      setBlogDetail(response?.data?.res);
      getBlogByCategory(response?.data?.res?.subCategory?._id);
    } catch (error) {
      console.error("Failed to fetch blog detail:", error);
    }
  }

  async function getBlogByCategory(id) {
    try {
      const response = await getSubCategoryBlogsApi(id);
      const data = response?.data?.blog;
      const filteredData = data?.filter((item) => item?._id !== param?.blogId);
      setBlogCategoryData(filteredData);
    } catch (error) {
      console.log("Error", error);
    }
  }
  // Copy Link
  const handleCopyLink = (event) => {
    event.preventDefault();
    navigator.clipboard
      .writeText(pageUrl)
      .then(() => {
        toast.success("URL copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy URL: ", error);
      });
  };

  useEffect(() => {
    getBlogDetail();
  }, [param?.blogId]);

  const metadata = {
    title: `${blogDetail?.title}`,
    description: `${blogDetail.meta}`
  }

  return (
    <>
      <MetaComponent meta={metadata} />
      <main className="buyers-main">
        <BuyerHeader headerHide={true} />
        <DefaultMobileMenu />
        <section className="fl-heading-banner fl-heading-big">
          <div className="container fl-container">
            <div className="row">
              <div className="col-md-9">
                <h1 className="fl-banner-heading fl-text-dark-green blog-heading">
                  {blogTitle}
                </h1>
              </div>
            </div>
          </div>
        </section>
        <section className="pt-5">
          <div className="container fl-container">
            <div className="col-12 mb-4">
              <ul className="fl-property-list-breadcrumbs flex-wrap">
                <li>
                  <Link to={"/blog"}>Blogs</Link>
                </li>
                <li className="text-capitalize">{blogTitle}</li>
              </ul>
            </div>
            <div className="row pt-2 mb-5">
              <div className="col-md-7 col-lg-8 col-xl-9 ">
                <div className="mb-lg-4 blog-detail-img">
                  <img
                    src={blogImage}
                    className="img-fluid border-raidus-10 w-100 fl-img-4-2"
                    alt="blog-img"
                    hidden={blogDetail?.youtubeLink}
                  />
                  {blogDetail?.youtubeLink && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: blogDetail.youtubeLink,
                      }}
                    />
                  )}
                </div>
                <div className="blog-detail-content">
                  <div
                    dangerouslySetInnerHTML={{ __html: blogDetail?.content }}
                  />
                </div>
              </div>
              <div className="col-md-5 col-lg-4 col-xl-3 mb-4">
                <div className="border fl-card-border border-raidus-10">
                  <div className="px-4 py-3 fl-bg-light-dark">
                    <h4 className="fl-text-dark text-uppercase mb-0 fl-fs-22">
                      Share this article
                    </h4>
                  </div>
                  <div className="p-3">
                    <ul className="mb-0 d-flex justify-content-between blog-share-list">
                      <li>
                        <Link
                          to=""
                          onClick={(event) =>
                            handleFacebookShare(event, metaUrl, blogTitle)
                          }
                        >
                          <FacebookIcon style={{ fontSize: "1.8rem" }} />
                        </Link>
                      </li>
                      <li>
                        <Link
                          to=""
                          onClick={(event) =>
                            handleWhatsAppShare(event, metaUrl, blogTitle)
                          }
                        >
                          <WhatsAppIcon style={{ fontSize: "1.8rem" }} />
                        </Link>
                      </li>
                      <li>
                        <Link
                          to=""
                          onClick={(event) =>
                            handleTwitterShare(event, metaUrl, blogTitle)
                          }
                        >
                          <XIcon style={{ fontSize: "1.8rem" }} />
                        </Link>
                      </li>
                      <li>
                        <Link to="" onClick={handleCopyLink}>
                          <ContentCopyIcon style={{ fontSize: "1.8rem" }} />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {blogCategoryData?.length > 0 ? (
                  <div className="row mt-4">
                    <h3 className="mb-4">Related Content</h3>
                    {blogCategoryData?.slice(0, 3).map((item, index) => (
                      <div className="col-12 mb-3" key={index}>
                        <BlogCard blog={item} />
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
        <BuyerFooter />
      </main>
    </>
  );
};

export default BuyerBlogDetail;
