import { InputAdornment } from "@mui/material";
import { TextField } from "@mui/material";
import { SearchNormal } from "iconsax-react";
import React, { useEffect, useRef } from "react";
import shortlist from "@/CustomAssets/Admin/shortlist-icon.png";
import inquiry from "@/CustomAssets/Admin/inquiry-icon.png";
import siteVisit from "@/CustomAssets/Admin/site-visit-icon.png";
import totalView from "@/CustomAssets/Admin/totalview-icon.png";
import PropertyAnalyticsTable from "./PropertyAnalyticsTable";
import { propertyAnalyticsApi } from "@/ApiRoutes/AdminApi";
import dayjs from "dayjs";
import TimeFilters from "@/CustomCommon/AllRoles/TimeFilters";
import useAnalyticsState from "@/CustomServices/Hooks/useAnalyticsStates";
import { useNavigate } from "react-router-dom";

function PropertyAnalyticsMain() {
  const state = useAnalyticsState();
  const debounceTimeoutRef = useRef(null);
  const navigate = useNavigate();

  async function getPropertyAnalytics() {
    state.setLoader(true);
    try {
      const formattedStartDate = state.startDate
        ? dayjs(state.startDate).format("YYYY-MM-DD")
        : "";
      const formattedEndDate = state.endDate
        ? dayjs(state.endDate).format("YYYY-MM-DD")
        : "";

      const filters = {
        search: state.search,
        startDate: state.search ? "" : formattedStartDate,
        endDate: state.search ? "" : formattedEndDate,
        period: state.days,
      };
      const response = await propertyAnalyticsApi({
        ...filters,
        ...state.paginationModel,
      });
      const data = response?.data;
      state.setProperties(data?.propertyAnalytics);
      state.setCount(data?.totalProperties);
      delete data?.propertyAnalytics;
      state.setAnalytics(data);
    } catch (error) {
      console.log("Error on Analytics", error);
      throw error;
    } finally {
      state.setLoader(false);
    }
  }

  const debouncedGetAnalytics = () => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      getPropertyAnalytics();
    }, 500); // 500ms debounce delay
  };

  useEffect(() => {
    debouncedGetAnalytics();
  }, [
    state.startDate,
    state.endDate,
    state.search,
    state.paginationModel,
    state.days,
  ]);

  const handleSearchChange = (e) => {
    state.updateSearch(e.target.value);
  };

  return (
    <div>
      <div className="container-fluid ovh">
        <div className="row" style={{ marginBottom: "2rem" }}>
          <div className="col-md-4 d-flex align-items-center">
            <div className="breadcrumb_content">
              <h2 className="breadcrumb_title m-0 ">Property Analytics</h2>
            </div>
          </div>
          <div className="col-md-8">
            <TimeFilters state={state} />
          </div>
        </div>
        <div className="row mb-3 ">
          <div className="col-md-12 mb-3">
            <div className="col-12 col-lg-3">
              <TextField
                variant="outlined"
                placeholder="Search Property"
                value={state.search}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchNormal size={16} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
          <div className="col-12 col-md-3 mb-3">
            <Card
              icon={totalView}
              title="Total Views"
              number={state.analytics?.totalPropertyViews}
            />
          </div>
          <div className="col-12 col-md-3 mb-3">
            <Card
              icon={shortlist}
              title={"Shortlist Properties"}
              number={state.analytics?.totalShortlisted}
            />
          </div>
          <div className="col-md-3 " style={{cursor: "pointer"}} onClick={() => navigate("/admin/enquiries")}>
          <Card
              icon={inquiry}
              title={"Total Enquiries"}
              number={state.analytics?.totalInquiries}
            />
          </div>
          <div className="col-md-3">
            <Card
              icon={siteVisit}
              title={"Site Visits"}
              number={state.analytics?.totalVisited}
            />
          </div>
        </div>
        <div className="row">
          <PropertyAnalyticsTable
            setAnalytics={state.setAnalytics}
            properties={state.properties}
            count={state.count}
            paginationModel={state.paginationModel}
            setPaginationModel={state.setPaginationModel}
            loader={state.loader}
          />
        </div>
      </div>
    </div>
  );
}

export default PropertyAnalyticsMain;

function Card({ icon, title, number }) {
  return (
    <div className="card rounded p-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h4>{title}</h4>
        <img src={icon} height={50} width={50} alt={title} />
      </div>
      <div>
        <h2>{number}</h2>
      </div>
    </div>
  );
}
