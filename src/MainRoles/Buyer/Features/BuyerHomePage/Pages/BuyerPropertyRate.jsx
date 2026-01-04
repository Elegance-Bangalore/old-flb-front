import React, { useEffect, useState } from "react";
import BuyerHeader from "../Layouts/BuyerHeader";
import DefaultMobileMenu from "../Layouts/DefaultMobileMenu";
import BuyerFooter from "../Layouts/BuyerFooter";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import map from "@/CustomAssets/BuyerImages/map.png";
import LineChart from "../Components/CommonComponent/LineChart";
import SmallChart from "../Components/CommonComponent/SmallChart";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { cityPriceRangeApi, statePriceRangeApi } from "@/ApiRoutes/BuyersApi";
import {
  agricultureLand,
  Estates,
  farmhouse,
  farmland,
  formatNumberInCr,
  formatPropertyType,
} from "@/CustomServices/Constant";
import { useNavigate } from "react-router-dom";
import useURLFilters from "@/CustomServices/useURLFilters";
import UrlPaginationCustom from "@/CustomCommon/MaterialUi/UrlPaginationCustom";
import Skeleton from "@mui/material/Skeleton";
import { Tooltip } from "@mui/material";

const BuyerPropertyRate = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filters, setFilters] = useURLFilters();
  const [totalCount, setTotalCount] = useState(0);
  const [timer, setTimer] = useState(null);
  const [loader, setLoader] = useState(true);

  async function rateList() {
    try {
      setLoader(true);
      console.group("[BuyerPropertyRate] rateList");
      console.log("Filters used:", filters);
      let response;
      if (filters.filterBy === "State") {
        response = await statePriceRangeApi(filters);
      } else {
        response = await cityPriceRangeApi(filters);
      }
      console.log("Raw API response:", response?.data);
      const grouped = response?.data?.groupedProperties || [];
      console.log("Items received:", grouped.length);
      setData(grouped);
      setTotalCount(response?.data?.totalCount);
    } catch (error) {
      console.error("[BuyerPropertyRate] rateList error:", error);
      throw error;
    } finally {
      setLoader(false);
      console.groupEnd();
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`[BuyerPropertyRate] handleChange: ${name} ->`, value);
    const newFilters = { ...filters, [name]: value, page: 1 };
    const newSearch = setFilters(newFilters);
    navigate(`?${newSearch}`);
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function navigateToList(e, city, state) {
    e.stopPropagation();

    const capitalizedCity = city ? capitalizeFirstLetter(city) : "";
    const capitalizedState = state ? capitalizeFirstLetter(state) : "";

    console.log("[BuyerPropertyRate] navigateToList", {
      city: capitalizedCity,
      state: capitalizedState,
      propertyType: filters.propertyType,
    });

    if (state) {
      navigate(
        `/property-list?search=${capitalizedState}&propertyType=${filters.propertyType}`
      );
    } else {  
      navigate(
        `/property-list?Scity=${capitalizedCity}&propertyType=${filters.propertyType}`
      );
    }
  }
  useEffect(() => {
    clearTimeout(timer);
    const delay = setTimeout(() => {
      rateList();
    }, 500);
    setTimer(delay);
    return () => clearTimeout(delay);
  }, [filters]);

  // Summarize monthly trend arrays whenever new data loads
  useEffect(() => {
    if (!data || data.length === 0) return;
    console.group("[BuyerPropertyRate] Monthly Trend Summary");
    data.forEach((item, idx) => {
      const id = item?.city || item?.state || `#${idx + 1}`;
      const trend = item?.averagePricesCurrentYear;
      const isArray = Array.isArray(trend);
      const length = isArray ? trend.length : 0;
      const first = isArray && length > 0 ? trend[0] : undefined;
      const last = isArray && length > 0 ? trend[length - 1] : undefined;
      console.log(`Item: ${id}`, {
        averagePrice: item?.averagePrice,
        minPrice: item?.minPrice,
        maxPrice: item?.maxPrice,
        monthsCount: length,
        firstMonth: first,
        lastMonth: last,
        trendSample: isArray ? trend : "not-an-array",
      });
    });
    console.groupEnd();
  }, [data]);

  return (
    <>
      <main className="buyers-main">
        <BuyerHeader headerHide={true} />
        <DefaultMobileMenu />
        <section className="fl-heading-banner">
          <div className="container fl-container">
            <h1 className="fl-banner-heading fl-text-dark-green">
              Property Rates & Price Trends
            </h1>
            <p className="fl-banner-heading-normal fl-text-dark-green fw-semi-bold">
              Your Guide to Real Estate Trends and Investment Strategies
            </p>
          </div>
        </section>
        <section>
          <div className="container fl-container fl-mt-n-6">
            <div className="row pt-2 mb-5">
              <div className="col-md-3 mb-3">
                <div className="form-group">
                  <select
                    className="form-control rounded-4 border-success"
                    type="text"
                    name="propertyType"
                    placeholder="Search Property"
                    value={filters.propertyType}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Filter By Property Type
                    </option>
                    <option value="">All</option>
                    <option value={farmland}>
                      {formatPropertyType(farmland)}
                    </option>
                    <option value={farmhouse}>
                      {formatPropertyType(farmhouse)}
                    </option>
                    <option value={Estates}>
                      {formatPropertyType(Estates)}
                    </option>
                    <option value={agricultureLand}>
                      {formatPropertyType(agricultureLand)}
                    </option>
                  </select>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="form-group">
                  <select
                    className="form-control rounded-4 border-success"
                    type="text"
                    name="filterBy"
                    value={filters.filterBy}
                    onChange={handleChange}
                  >
                    <option value="State">Filter by State</option>
                    <option value="City">Filter by City</option>
                  </select>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="form-group">
                  <input
                    className="form-control rounded-4 border-success"
                    type="text"
                    placeholder="Search by City or State"
                    name="search"
                    value={filters.search}
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
            </div>
            <div>
              {loader ? (
                <SkeletonLoader />
              ) : (
                <>
                  {data?.map((rateData, index) => (
                    <Accordion
                      className="mb-3 fl-card-shadow border-0"
                      key={index}
                    >
                      <AccordionSummary
                        expandIcon={
                          <ArrowDropDownIcon
                            className="border rounded-circle border-2 fl-card-border fl-text-dark"
                            style={{ fontSize: "2.5rem" }}
                          />
                        }
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <div className="row w-100 align-items-center">
                          <div className="col-md-4">
                            <div className="d-flex  gap-3 align-items-center">
                              <img
                                className="img-fluid fl-img-1-1 border-raidus-10"
                                style={{ width: "6rem" }}
                                src={map}
                                alt="rate"
                              />
                              <div className="">
                                {rateData?.city ? (
                                  <>
                                    <h3 className="fl-text-dark fl-fw-500">
                                      {rateData?.city}
                                    </h3>
                                    <p className="fl-fs-16 lh-normal mb-0">
                                      {rateData?.state}
                                    </p>
                                  </>
                                ) : (
                                  <div>
                                    <h3 className="fl-text-dark fl-fw-500">
                                      {rateData?.state}
                                    </h3>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-8">
                            <div className="mt-4 mt-md-0 d-flex gap-4 flex-wrap  justify-content-between align-items-center w-100">
                              <div className="price-range-wrapper">
                                <h6 className="fl-fw-500 fl-text-gary fl-fs-14">
                                  Avg. Price&nbsp;

                                  <Tooltip title="Calculated based on the per sq.ft prices of properties posted by sellers on the Farmland Bazaar platform last month." arrow>
                                    <i className="fl-text-green">
                                      <InfoOutlinedIcon
                                        style={{ fontSize: "1rem" }}
                                      />
                                    </i>
                                  </Tooltip>
                                </h6>
                                <h5 className="fl-fw-500 fl-text-dark fl-fs-18">
                                  {formatNumberInCr(rateData?.averagePrice)} /
                                  Sq. ft.
                                </h5>
                              </div>
                              <div className="">
                                <h6 className="fl-fw-500 fl-text-gary fl-fs-14">
                                  Price range
                                </h6>
                                <h5 className="fl-fw-500 fl-text-dark fl-fs-18">
                                  {formatNumberInCr(rateData?.minPrice)} -
                                  {formatNumberInCr(rateData?.maxPrice)}
                                </h5>
                              </div>
                              <div className="align-self-start">
                                <SmallChart
                                  chartData={rateData?.averagePricesCurrentYear}
                                />
                              </div>
                              <div className="">
                                <button
                                  className="fl-btn-green"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigateToList(
                                      e,
                                      rateData?.city,
                                      rateData?.state
                                    );
                                  }}
                                >
                                  See All Properties
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <LineChart
                          chartData={rateData?.averagePricesCurrentYear}
                        />
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </>
              )}
            </div>
          </div>

          <div className="text-center" style={{ display: "block ruby" }}>
            <UrlPaginationCustom
              count={totalCount}
              page={filters.page}
              setFilters={setFilters}
              filters={filters}
              perPage={10}
            />
          </div>
        </section>
        <BuyerFooter />
      </main>
    </>
  );
};

export default BuyerPropertyRate;

function SkeletonLoader() {
  return (
    <div className="row">
      {Array.from({ length: 10 }).map((_, index) => (
        <div className="col-12 mb-3" key={index}>
          <div className="mx-lg-2 mb-lg-3">
            <Skeleton variant="rectangular" width="100%" height={135} />
          </div>
        </div>
      ))}
    </div>
  );
}
