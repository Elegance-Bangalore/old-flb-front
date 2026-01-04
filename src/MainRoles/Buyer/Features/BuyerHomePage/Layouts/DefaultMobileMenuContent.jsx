import {
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { selectUser, setLogout, setUser } from "@/Redux/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import rupee from "../../../../../CustomAssets/BuyerImages/fl-rupee.svg";
import scale from "../../../../../CustomAssets/BuyerImages/fl-scale.svg";
import Slider from "react-slick";
import { Checkbox, FormControlLabel } from "@mui/material";
import { ArrowLeft2, HambergerMenu, SearchNormal1, User } from "iconsax-react";
import { selectFilter } from "@/features/properties/propertiesSlice";
import useURLFilters from "@/CustomServices/useURLFilters";
import { admin, buy, capitalizeArray, navigateToDetail, sell, subAdmin } from "@/CustomServices/Constant";
import { farmhouse, Estates, agricultureLand, farmland, formatNumberInCr } from '@/CustomServices/Constant';
import { mostSearchedPropertyApi } from '@/ApiRoutes/BuyersApi';
import { toastMessage } from '@/CustomServices/ToastMessage';
import { toast } from "react-toastify";


const DefaultMobileMenuContent = () => {
  const [checked, setChecked] = useState(false);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const { cities } = useSelector(selectFilter);
  const capitalizedCities = capitalizeArray(cities);
  const [filters, setFilters] = useURLFilters();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false)

  const [mostSearched, setMostSearched] = useState([]);

  function getPerAcre(price, area) {
    const perAcre = Number(price) / Number(area).toFixed(2)
    return formatNumberInCr(perAcre)
  }

  const updateFilters = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const searchParams = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        if (Array.isArray(filters[key])) {
          searchParams.set(key, filters[key].join(','));
        } else {
          searchParams.set(key, filters[key]);
        }
      }
    });
    // setChecked(false)
    const newSearch = searchParams.toString();
    navigate(`/property-list/?${newSearch}`, { state: filters })
    return newSearch;
  };

  async function mostSearchedCities() {
    try {
      const response = await mostSearchedPropertyApi(filters.propertyType);
      setMostSearched(response.data.mostSearched)
    } catch (error) {
      toastMessage()
    } finally {

    }
  }

  function handleFiltersChange(e) {
    const { name, value } = e.target;
    if (name === "aminities") {
      const index = filters[name].indexOf(value);
      if (index === -1) {
        setFilters(prev => ({
          ...prev,
          [name]: [...prev[name], value]
        }));
      } else {
        setFilters(prev => ({
          ...prev,
          [name]: prev[name].filter(item => item !== value)
        }));
      }
    } else if (name === "propertyType" || name === "totalAcre" || name === "price") {
      const updatedPropertyType = filters[name] === value ? "" : value;
      const newFilters = { ...filters, [name]: updatedPropertyType, page: 1 };
      setFilters(newFilters);
    }
    else {
      setFilters(prev => ({
        ...prev,
        [name]: value
      }));
    }
  }

  function handlePriceChange(min, max) {
    if (filters.priceMin === min && filters.priceMax === max) {
      setFilters((prev) => ({
        ...prev, priceMin: "", priceMax: ""
      }));
    } else {
      setFilters((prev) => ({
        ...prev, priceMin: min, priceMax: max
      }));
    }
  }


  useEffect(() => {
    if (filters.propertyType) {
      mostSearchedCities()
    }
  }, [checked, filters.propertyType])

  const postProperty = () => {
    console.log("Clicked" , user)
    if (!user) {
      toast.success("Please make a seller account first");
      navigate("/post-your-property", { state: { interested: "sell" } });
    } else if (user.interested === buy) {
      toast.info("Please login as seller");
    } else if (user.interested === admin || user.interested === subAdmin) {
      navigate("/admin/add-property");
    } else if (user.interested === sell) {
      navigate("/seller/post-property");
    }
  }


  const setting3 = {
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true, // Enable center mode
    centerPadding: "0", // Adjust spacing between slides
    responsive: [
      {
        breakpoint: 768, // Adjust the breakpoint according to your design needs
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="sidebar-header px-0">
        <div className="d-flex align-items-center gap-2">
          <div className="fix-icon "
            data-bs-dismiss="offcanvas"
            aria-label="Close">
            <ArrowLeft2 size="32" />
          </div>
          <Link to="/" className="sidebar-header-inner">
            <img className="nav_logo_img img-fluid mt20"
              src="/assets/images/header-logo3.png" alt="header-logo.png" style={{ height: "3.3rem", width: "10rem" }} />
          </Link>
        </div>
        <div className="">
          <div className="dropdown">
            <a className="nav-link dropdown-toggle me-2 fl-btn-green px-2"
              id="userDrop"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <User className="fl-text-white" size="25" />
            </a>
            <ul className="dropdown-menu border-radius-10"
              aria-labelledby="userDrop"
            >
              {user && user?.interested === "admin" || user?.interested === "user" ? (
                <>
                  <li className="px-2">
                    <Link to="/admin/dashboard" className="fl-ff-main text-white">
                      <button className="fl-btn-green mt-2 w-100">
                        Dashboard
                      </button>
                    </Link>
                  </li>
                  <li className="px-2">
                    <button className="fl-btn-dark mt-2 w-100" onClick={() => setOpen(true)}>
                      Logout
                    </button>
                  </li>
                </>
              ) : user && user?.interested === "buy" ? (
                <>
                  <li className="px-2">
                    <Link
                      to="/my-profile"
                      className="fl-ff-main text-white"
                    >
                      <button className="fl-btn-green mt-2 w-100">
                        My Profile
                      </button>
                    </Link>

                    <button className="fl-btn-dark mt-2 w-100" onClick={() => setOpen(true)}>
                      Logout
                    </button>
                  </li>
                </>
              ) : user && user?.interested === "sell" ? (
                <>
                  <li className="px-2">
                    <Link
                      to="/seller/dashboard"
                      className="fl-ff-main text-white"
                    >
                      <button className="fl-btn-green mt-2 w-100">
                        Dashboard
                      </button>
                    </Link>

                    <button className="fl-btn-dark mt-2 w-100" onClick={() => setOpen(true)}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="px-2">
                    <Link to="/login" className="fl-ff-main text-white">
                      <button className="fl-btn-green mt-2 w-100">
                        Login
                      </button>
                    </Link>
                  </li>
                  <li className="px-2">
                    <Link
                      to="/register"
                      className="fl-ff-main text-white"
                    >
                      <button className="fl-btn-dark mt-2 w-100">
                        Sign Up
                      </button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="px-2">
        <ul className="d-flex flex-column gap-4">
          <li className="px-2">
            <Link className="fl-text-dark fl-fs-20 fw-semi-bold" to="/about">
              About Us
            </Link>
          </li>
          <li className="px-2">
            <Link className="fl-text-dark fl-fs-20 fw-semi-bold" to="/blog">
              Blogs
            </Link>
          </li>
          <li className="px-2">
            <Link className="fl-text-dark fl-fs-20 fw-semi-bold" to="/faq">
              FAQs
            </Link>
          </li>
          <li className="px-2">
            <Link className="fl-text-dark fl-fs-20 fw-semi-bold" to="/contact">
              Contact Us
            </Link>
          </li>
          <li className="px-2">
            <Link
              className="fl-text-dark fl-fs-20 fw-semi-bold"
              to="/terms"
            >
              Terms and Conditions
            </Link>
          </li>
          <li className="px-2">
            <Link
              className="fl-text-dark fl-fs-20 fw-semi-bold"
              to="/privacy-policy"
            >
              Privacy Policy
            </Link>
          </li>
          <li className="px-2">
            <button className="fl-btn-yellow mt-2" onClick={postProperty}>
              <Link to="#" className="fl-ff-main fl-text-dark">
                Post Your Property
              </Link>
            </button>
          </li>
        </ul>
      </div>

    </>
  );
};

export default DefaultMobileMenuContent;
