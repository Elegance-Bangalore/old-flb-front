import React, { useEffect, useState } from "react";
import BuyerHeader from "../Layouts/BuyerHeader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import PropertyCard from "../Components/CommonComponent/PropertyCard";
import { Refresh } from "iconsax-react";
import BuyerFooter from "../Layouts/BuyerFooter";
import { bannerCountApi, propertyCategoryListApi } from "@/ApiRoutes/AdminApi";
import useURLFilters from "@/CustomServices/useURLFilters";
import { useSelector } from "react-redux";
import { selectFilter } from "@/features/properties/propertiesSlice";
import { capitalizeArray, formatPropertyType, capitalizeFirstLetter } from "@/CustomServices/Constant";
import SkeletonLoader from "@/CustomCommon/MaterialUi/SkeletonLoader";
import UrlPaginationCustom from "@/CustomCommon/MaterialUi/UrlPaginationCustom";
import DefaultMobileMenu from "../Layouts/DefaultMobileMenu";
import NoSearchResult from "@/components/common/header/NoSearchResult";
import BuyerFilters from "../Components/BuyerFilters";
import { buyerPropertyListApi } from "@/ApiRoutes/SellerApis";
import useBreakpoint from "@/CustomServices/Hooks/useBreakpoint";
import PropertyFullCard from "../Components/CommonComponent/PropertyFullCard";
import banner from "@/CustomAssets/BuyerImages/FLB-Banner.png";
import { getBannerListApi, getMidBannerApi } from "@/ApiRoutes/BuyersApi";
import { IoIosArrowForward } from "react-icons/io";
import AdvertiseFormModal from "@/MainRoles/Admin/Modals/AdvertiseFormModal";
import MetaComponent from "@/components/common/MetaComponent";

const BuyerPropertyList = () => {
  const [filters, setFilters] = useURLFilters();
  const [propertyList, setPropertyList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [count, setCount] = useState(0);
  const [advertiseModal, setAdvertiseModal] = useState(false);
  const location = useLocation();
  const [topBanner, setTopBanner] = useState(null);
  const [timer, setTimer] = useState(null);
  const state = location.state;
  const [promotedPropertyList, setPromotedPropertyList] = useState([]);
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState([0, 0]);
  const { cities } = useSelector(selectFilter);
  const isBelow992 = useBreakpoint(992);
  const [showAdvertiseModal, setShowAdvertiseModal] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  async function getMidBannerList() {
    try {
      const response = await getMidBannerApi();
      console.log("[MidBanner][DEBUG] full response:", response);
      const raw = response?.data;
      const keys = raw ? Object.keys(raw) : [];
      // Try multiple shapes: {featureProperties: []} or {data: {featureProperties: []}} or {data: []}
      let data = [];
      if (Array.isArray(raw)) {
        data = raw;
      } else if (Array.isArray(raw?.featureProperties)) {
        data = raw.featureProperties;
      } else if (Array.isArray(raw?.data?.featureProperties)) {
        data = raw.data.featureProperties;
      } else if (Array.isArray(raw?.data)) {
        data = raw.data;
      } else if (Array.isArray(raw?.features)) {
        data = raw.features;
      }
      const ids = data.map((d) => d?._id || d?.id).filter(Boolean);
      console.log("[MidBanner][DEBUG] keys:", keys, "fetched:", data.length, "ids:", ids, "raw:", raw);
      if (Array.isArray(data)) {
        setPromotedPropertyList((prev) => {
          if (data.length > 0) return data;
          console.log("[MidBanner][DEBUG] empty featured -> keeping existing promotedPropertyList (len)", (prev || []).length);
          return prev && prev.length ? prev : [];
        });
      }
    } catch (error) {
      console.log("[MidBanner][DEBUG] error fetching featured:", error);
    }
  }

  async function getTopBannerList() {
    try {
      const response = await getBannerListApi(filters?.propertyType);
      console.log("[TopBanner][DEBUG] full response:", response);
      const data = response?.data?.data;
      const filteredData =
        data?.filter((item) => item.bannerType === "List Page") || [];
      const filterBanner = filteredData?.find(
        (item) => item?.propertyType === filters.propertyType
      );
      setTopBanner(filterBanner);
    } catch (error) {
      // throw error;
      console.log("[TopBanner][DEBUG] error:", error);
    }
  }

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (name === "aminities") {
      let updatedAmenities = [...filters.aminities];
      if (!updatedAmenities.includes(value)) {
        updatedAmenities.push(value);
      } else {
        updatedAmenities = updatedAmenities.filter((item) => item !== value);
      }
      const newFilters = { ...filters, aminities: updatedAmenities, page: 1 };
      const newSearch = setFilters(newFilters);
      navigate(`?${newSearch}`);
    } else if (
      name === "propertyType" ||
      name === "totalAcre" ||
      name === "categoryId"
    ) {
      const updatedPropertyType = filters[name] === value ? "" : value;
      const newFilters = { ...filters, [name]: updatedPropertyType, page: 1 };
      const newSearch = setFilters(newFilters);
      navigate(`?${newSearch}`);
    } else if (name === "price") {
      setPriceRange(value);
      const [priceMin, priceMax] = value;
      const newFilters = {
        ...filters,
        priceMin: priceMin,
        priceMax: priceMax,
        page: 1,
      };
      const newSearch = setFilters(newFilters);
      navigate(`?${newSearch}`);
    } else if (name === "priceMin") {
      const updatePrice = priceRange;
      updatePrice[0] = value;
      setPriceRange(updatePrice);
      const newFilters = { ...filters, [name]: value, page: 1 };
      const newSearch = setFilters(newFilters);
      navigate(`?${newSearch}`);
    } else if (name === "priceMax") {
      const updatePrice = priceRange;
      updatePrice[1] = value;
      setPriceRange(updatePrice);
      const newFilters = { ...filters, [name]: value, page: 1 };
      const newSearch = setFilters(newFilters);
      navigate(`?${newSearch}`);
    } else {
      const newFilters = { ...filters, [name]: value, page: 1 };
      const newSearch = setFilters(newFilters);
      navigate(`?${newSearch}`);
    }
  };

  const listOfProperty = () => {
    setLoader(true);
    buyerPropertyListApi(filters)
      .then((res) => {
        console.log("[BuyerList][DEBUG] full response:", res);
        console.log("[BuyerList][DEBUG] data keys:", Object.keys(res?.data || {}));
        console.log("[BuyerList][DEBUG] res length:", (res?.data?.res || []).length, "ids:", (res?.data?.res || []).map(p => p?._id || p?.id));
        const fp = res?.data?.featureProperties || [];
        console.log("[BuyerList][DEBUG] featureProperties length:", fp.length, "ids:", fp.map(p => p?._id || p?.id || p?.propertyId || p?.code));
        if (Array.isArray(fp)) {
          setPromotedPropertyList((prev) => {
            if (fp.length > 0) return fp;
            console.log("[BuyerList][DEBUG] featureProperties empty -> keeping existing promotedPropertyList (len)", (prev || []).length);
            return prev && prev.length ? prev : [];
          });
        }
        setLoader(false);
        setPropertyList(res.data.res);
        setCount(res.data.filterCount);
        const saved = res?.data?.res?.map((element) => element.saved);
        setSaved(saved);
      })
      .catch((err) => {
        console.log("[BuyerList][DEBUG] error:", err);
        setLoader(false);
      });
  };

  async function clickCount(id) {
    try {
      const response = await bannerCountApi(id);
    } catch (error) {
      throw error;
    }
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      propertyType: "",
      page: 1,
      status: "",
      city: "",
      aminities: [],
      price: "",
      totalAcre: "",
      priceMin: 0,
      priceMax: 0,
      order: "",
    });
    setPriceRange(["", ""]);
    navigate("?");
  };

  useEffect(() => {
    getTopBannerList();
    clearTimeout(timer);
    setLoader(true);
    const delay = setTimeout(() => {
      listOfProperty();
    }, 1000);
    setTimer(delay);
    return () => clearTimeout(delay);
  }, [location.search, filters]);

  useEffect(() => {
    if (state) {
      setFilters((prev) => ({
        ...prev,
        priceMax: state.priceMax,
        priceMin: state.priceMin,
      }));
      setPriceRange([state.priceMin, state.priceMax]);
    }
  }, [location.search]);

  useEffect(() => {
    scrollToTop();
  }, [propertyList]);

  useEffect(() => {
    getMidBannerList();
  }, []);

  const isSponsored = (p) => p?.sponsored && p?.postedBy?.subscription;
  const isManagedFarmland = (p) => p?.managed_farmland;

  // Build dynamic meta title based on selected filters (category + location)
  const metaTitle = `Farmland Bazaar – ${
    filters?.propertyType ? formatPropertyType(filters.propertyType) : "Farmland"
  } for Sale in ${
    filters?.city ? capitalizeFirstLetter(filters.city) : "India"
  }`;

  const metadata = {
    title: metaTitle,
    description:
      "India's largest marketplace for managed farmlands, agriculture land, estates, and farmhouses. Explore verified listings across regions.",
    image: "",
  };

  return (
    <>
    <MetaComponent meta={metadata}/>
      <main className="buyers-main ">
        <AdvertiseFormModal
          show={showAdvertiseModal}
          setShow={setShowAdvertiseModal}
        />
        <BuyerHeader />
        <DefaultMobileMenu />
         <div className="inner-page-default"></div>
        <section>
          <div className="container fl-container">
            <div className="row">
              <div className="col-sm-8 mb-2">
                <ul className="fl-property-list-breadcrumbs flex-wrap">
                  <li>
                    <Link className="fs-6" to={"/"}>
                      Home
                    </Link>
                  </li>
                  {filters.propertyType && (
                    <li>
                      <a className="fs-6">
                        {formatPropertyType(filters.propertyType)}
                      </a>
                    </li>
                  )}
                  {filters.city && (
                    <li>
                      <a className="fs-6">{filters.city}</a>
                    </li>
                  )}
                  <li>
                    <Link className="fs-6">Search Results</Link>
                  </li>
                </ul>
              </div>
              <div className="col-sm-4 text-end d-block d-lg-none mb-2">
                <Link to="/filter" className="fl-btn-green py-2">
                  Filter
                </Link>
              </div>
            </div>
            <div className="row">
              <div className="col-12 mb-3">
                {/* Show search summary label */}
                {(filters.propertyType || filters.city) && (
                  <h1
                    className="fs-5 fw-bold mb-2"
                    style={{
                      background: '#f0f4f8',
                      padding: '10px 18px',
                      borderRadius: '8px',
                      display: 'inline-block',
                      color: '#222',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
                    }}
                  >
                    {filters.propertyType ? formatPropertyType(filters.propertyType) : ''}
                    {filters.propertyType && filters.city ? ' > ' : ''}
                    {filters.city ? filters.city : ''}
                  </h1>
                )}
              </div>
              <div
                className={`col-lg-3  ${
                  !isBelow992 ? "buyer-filters-sticky" : ""
                }`}
              >
                <div className="property-mobile-filter d-block d-lg-none">
                  <div
                    className="offcanvas offcanvas-start"
                    tabIndex="-1"
                    id="offcanvasFilter"
                    aria-labelledby="offcanvasFilterLabel"
                    data-bs-scroll="true"
                    style={{ maxWidth: "90vw" }}
                  >
                    <div className="offcanvas-body">
                      <div className="sidebar-header">
                        <Link to="/" className="sidebar-header-inner">
                          <img
                            className="nav_logo_img img-fluid mt20"
                            src="/assets/images/header-logo3.png"
                            height={50}
                            alt="header-logo.png"
                          />
                        </Link>
                        <div
                          className="fix-icon"
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"
                        >
                          <span className="flaticon-close"></span>
                        </div>
                      </div>
                      <BuyerFilters
                        filters={filters}
                        handleFilterChange={handleFilterChange}
                        priceRange={priceRange}
                        clearFilters={clearFilters}
                      />
                    </div>
                  </div>
                </div>
                <div className="web-filter d-none d-lg-block">
                  <BuyerFilters
                    filters={filters}
                    handleFilterChange={handleFilterChange}
                    priceRange={priceRange}
                    clearFilters={clearFilters}
                  />
                </div>
              </div>
              <div className="col-lg-9  ps-lg-5">
                <div className="mt-3 mt-md-0">
                  <div className="row">
                    {topBanner ? (
                      <div
                        className="col-12 mb-5"
                        onClick={() => clickCount(topBanner._id)}
                      >
                        <a href={topBanner.url} target="_blank">
                          <img
                            // src={topBanner.banner}
                            src="/banner.png"
                            alt="product-banner"
                            className="img-fluid rounded-2"
                          />
                        </a>
                      </div>
                    ) : (
                      <div className="col-12 mb-2">
                        <img
                          // src={banner}
                          src="/banner.png"
                          alt="product-banner"
                          className="img-fluid rounded-2"
                        />
                      </div>
                    )}

                    <button
                      className="mb-5 bg-transparent border-0 text-green fw-bold text-decoration-underline"
                      onClick={() => setShowAdvertiseModal(true)}
                    >
                      Advertise with us <IoIosArrowForward />
                    </button>

                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-6 mb-3 mb-md-0">
                          <FormControl>
                            <InputLabel id="demo-simple-select-label">
                              Sort by
                            </InputLabel>
                            <Select
                              id="demo-simple-select"
                              label="Sort by"
                              name="sort"
                              onChange={handleFilterChange}
                              value={filters.sort}
                              MenuProps={{
                                disableScrollLock: true,
                              }}
                            >
                              <MenuItem value={"createdAt"}>Time</MenuItem>
                              <MenuItem value={"price"}>Price</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                        <div className="col-md-6">
                          <FormControl>
                            <InputLabel id="demo-simple-select-label">
                              Order
                            </InputLabel>
                            <Select
                              id="demo-simple-select"
                              label="Order"
                              name="order"
                              onChange={handleFilterChange}
                              value={filters.order}
                              MenuProps={{
                                disableScrollLock: true,
                              }}
                            >
                              <MenuItem value={"descending"}>
                                {filters.sort === "createdAt"
                                  ? "Newest - Oldest"
                                  : "High - Low"}
                              </MenuItem>
                              <MenuItem value={"ascending"}>
                                {filters.sort === "createdAt"
                                  ? "Oldest - Newest"
                                  : "Low - High"}
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="text-end">
                        <h4 className="fw-semi-bold fl-text-gray fl-fs-22 mt-3 mt-lg-0">
                          {count} Properties Found 
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    {loader ? (
                      <SkeletonLoader />
                    ) : propertyList.length === 0 ? (
                      <NoSearchResult />
                    ) : (
                      <div className="row mt-5">
                        {propertyList
                          .length > 0 && (() => {
                            const isSponsored = (p) => !!(p?.sponsored && p?.postedBy?.subscription);
                            const isManagedFarmland = (p) => !!p?.managed_farmland;
                            const isRecentlyAdded = (p) => {
                              if (!p?.createdAt) return false;
                              const createdDate = new Date(p.createdAt);
                              const now = new Date();
                              const diffDays = (now - createdDate) / (1000 * 60 * 60 * 24);
                              return diffDays <= 15;
                            };
                            const getGroup = (p) => {
                              if (isSponsored(p)) return 1;
                              if (isManagedFarmland(p)) return 2;
                              if (isRecentlyAdded(p)) return 3;
                              return 4;
                            };
                            const groups = [[], [], [], []];
                            propertyList.forEach((p) => {
                              const g = getGroup(p) - 1;
                              groups[g].push(p);
                            });
                            groups.forEach((g) => g.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
                            const ordered = groups.flat();

                            // Interleave one featured property after every 4th regular property
                            // Treat duplicates (in both base and featured) as featured by removing them from base first
                            const rawFeatured = Array.isArray(promotedPropertyList) ? promotedPropertyList : [];
                            const getId = (p) => p?._id || p?.id || p?.propertyId || p?.code;
                            const featureIdSet = new Set(rawFeatured.map(getId).filter(Boolean));
                            const featureProperties = rawFeatured.filter((fp, i, arr) => {
                              const id = getId(fp);
                              return id && arr.findIndex(x => getId(x) === id) === i;
                            });
                            console.log("[PropertyList][DEBUG] featureProperties resolved:", featureProperties.length, featureProperties.map(getId));
                            const baseWithoutFeatured = ordered.filter(p => !featureIdSet.has(getId(p)));

                            const merged = [];
                            const insertedPositions = [];
                            const sequence = [];
                            let featureIndex = 0;

                            for (let i = 0; i < baseWithoutFeatured.length; i++) {
                              const baseProperty = baseWithoutFeatured[i];
                              merged.push(baseProperty);
                              sequence.push('R');

                              if ((i + 1) % 4 === 0 && featureIndex < featureProperties.length) {
                                const featureProperty = featureProperties[featureIndex];
                                merged.push({ ...featureProperty, __isFeaturedInsert: true });
                                insertedPositions.push(merged.length - 1);
                                sequence.push('F');
                                featureIndex += 1;
                              }
                            }

                            // If base items end but we still have features left, do not append more; we only insert after groups of 4

                            const duplicatesCount = ordered.length - baseWithoutFeatured.length;
                            const duplicateIds = [...featureIdSet].filter(id => ordered.some(p => p?._id === id));

                            console.log("[PropertyList][DEBUG] baseCount:", ordered.length);
                            console.log("[PropertyList][DEBUG] featureCount:", featureProperties.length);
                            console.log("[PropertyList][DEBUG] duplicatesTreatedAsFeatured:", duplicatesCount, duplicateIds);
                            console.log("[PropertyList][DEBUG] mergedCount:", merged.length);
                            console.log("[PropertyList][DEBUG] insertedPositions:", insertedPositions);
                            console.log("[PropertyList][DEBUG] sequence(R/F):", sequence.join(''));

                            return merged.map((element, idx) => (
                              <div className={element?.__isFeaturedInsert ? "col-12 mb-4" : "col-sm-6 mb-4"} key={(element && element._id) ? element._id : `featured-${idx}`}>
                                <div className="mx-lg-2 mb-lg-3">
                                  {element?.__isFeaturedInsert ? (
                                    <PropertyFullCard property={element} />
                                  ) : (
                                    <PropertyCard property={element} />
                                  )}
                                </div>
                              </div>
                            ));
                          })()}
                        <UrlPaginationCustom
                          count={count}
                          page={filters.page}
                          setFilters={setFilters}
                          filters={filters}
                          perPage={12}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <BuyerFooter />
      </main>
    </>
  );
};

export default BuyerPropertyList;
