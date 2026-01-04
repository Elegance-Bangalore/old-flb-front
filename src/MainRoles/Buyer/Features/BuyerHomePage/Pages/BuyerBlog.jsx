import React, { useEffect, useState } from "react";
import BuyerHeader from "../Layouts/BuyerHeader";
import DefaultMobileMenu from "../Layouts/DefaultMobileMenu";
import BuyerFooter from "../Layouts/BuyerFooter";
import BlogCard from "../Components/CommonComponent/BlogCard";
import {
  getBlogListApi,
  getBlogCategoriesApi,
  getBlogSubCategoriesApi,
  getBlogsByCategoryApi,
  getBlogsBySubCategoryApi,
} from "@/ApiRoutes/BuyersApi";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import NewPagination from "@/CustomCommon/MaterialUi/NewPagination";
import { toast } from "react-toastify";
import usePageSEO from "@/Seo";

const BuyerBlog = () => {
  const { state } = useLocation();
  const [blogList, setBlogList] = useState([]); 
  const [search, setSearch] = useState("");
  const [timer, setTimer] = useState(null);
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const [activeCategory, setActiveCategory] = useState("");
  const [activeSubCategory, setActiveSubCategory] = useState("");
  const [blogCategoryData, setBlogCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);

  async function getBlogList() {
    try {
      setLoader(true);
      let response;
      if (activeCategory && !activeSubCategory) {
        response = await getBlogsByCategoryApi(activeCategory);
        setBlogList(response?.data?.data);
        setCount(response?.data?.data?.length || 1);
      } else if (activeSubCategory && !activeCategory) {
        response = await getBlogsBySubCategoryApi(activeSubCategory);
        setBlogList(response?.data?.data);
        setCount(response?.data?.data?.length || 1);
      } else {
        // If both or neither are selected, fallback to original API
        const filters = {
          page: page,
          search: search,
          catId: activeCategory,
          subCatId: activeSubCategory,
        };
        response = await getBlogListApi(filters);
        setBlogList(response?.data?.res);
        setCount(response?.data?.count);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoader(false);
    }
  }

  async function getBlogCategory() {
    try {
      const response = await getBlogCategoriesApi();
      setBlogCategoryData(response.data.data);
    } catch (error) {
      toast.error("Something went wrong in Blog Category List");
    }
  }

  async function getAllSubCategories() {
    try {
      const response = await getBlogSubCategoriesApi();
      setSubCategoryData(response?.data?.data || []);
    } catch (error) {
      // handle error
    }
  }

  usePageSEO({
    title: "Blog - Farmland Bazaar | Expert Agriculture Insights & Trends",
    description: "Discover expert advice, latest trends, and insights in agriculture, farming, and land management. Stay updated with Farmland Bazaar's comprehensive blog.",
    keywords: ["agriculture blog", "farming insights", "land management", "agriculture trends", "farmland advice", "Farmland Bazaar blog"],
    ogTitle: "Blog - Farmland Bazaar | Expert Agriculture Insights",
    ogDescription: "Discover expert advice and latest trends in agriculture, farming, and land management.",
    ogImage: "https://flb-public.s3.ap-south-1.amazonaws.com/2Geqhte2sdxuKmoZqqyjg.jpeg",
    ogUrl: "https://farmlandbazaar.com/blog",
    ogType: "website",
    twitterCard: "summary_large_image",
    twitterSite: "@FarmlandBazaar"
  })

  useEffect(() => {
    getBlogCategory();
    getAllSubCategories();
  }, []);

  useEffect(() => {
    clearTimeout(timer);
    const delay = setTimeout(() => {
      getBlogList();
    }, 500);
    setTimer(delay);
    return () => clearTimeout(delay);
  }, [search, page, activeCategory, activeSubCategory]);

  return (
    <>
      <main className="buyers-main">
        <BuyerHeader headerHide={true} />
        <DefaultMobileMenu />
        <section className="fl-heading-banner">
          <div className="container fl-container">
            <h1 className="fl-banner-heading fl-text-dark-green">Blogs</h1>
            <p className="fl-banner-heading-normal fl-text-dark-green fw-semi-bold">
              Explore Expert Advice and Latest Trends in Agriculture
            </p>
          </div>
        </section>
        <section>
          <div className="container fl-container fl-mt-n-6">
            <div className="row pt-2 mb-5">
              <div className="col-md-4 mb-2">
                <div className="form-group">
                  <input
                    className="form-control rounded-4 py-3 search_cat form-control-3rem"
                    type="text"
                    placeholder="Search Blog Articles"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-4 mb-2">
                <select
                  className="form-select rounded-4 py-3 fl-fs-18"
                  value={activeCategory}
                  onChange={(e) => {
                    setActiveCategory(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">All Categories</option>
                  {blogCategoryData?.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 mb-2">
                <select
                  className="form-select rounded-4 py-3 fl-fs-18"
                  value={activeSubCategory}
                  onChange={(e) => {
                    setActiveSubCategory(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">All Subcategories</option>
                  {subCategoryData?.map((sub) => (
                    <option key={sub._id} value={sub._id}>
                      {sub.subCategory}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              {loader ? (
                <div className="text-center">
                  <OnClickLoader />
                </div>
              ) : blogList?.length === 0 ? (
                <div className="text-center py-5">No blogs found.</div>
              ) : (
                blogList?.map((item, index) => (
                  <div className="col-lg-4 col-sm-6" key={index}>
                    <BlogCard blog={item} />
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center mt-4">
            <NewPagination
              count={count}
              page={page}
              setPage={setPage}
              perPage={12}
            />
          </div>
        </section>
        <BuyerFooter />
      </main>
    </>
  );
};

export default BuyerBlog;
