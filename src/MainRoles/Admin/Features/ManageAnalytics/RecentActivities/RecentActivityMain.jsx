import { recentActivityApi } from "@/ApiRoutes/AdminApi";
import TimeFilters from "@/CustomCommon/AllRoles/TimeFilters";
import useAnalyticsState from "@/CustomServices/Hooks/useAnalyticsStates";
import { toastMessage } from "@/CustomServices/ToastMessage";
import React, { useEffect, useState } from "react";
import RecentActivityTable from "./RecentActivityTable";
import dayjs from "dayjs";

function RecentActivityMain() {
  const state = useAnalyticsState();
  const [activityData, setActivityData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  async function recentActivityData() {
    try {
      state.setLoader(true);
      const formattedStartDate = state.startDate
        ? dayjs(state.startDate).format("YYYY-MM-DD")
        : "";
      const formattedEndDate = state.endDate
        ? dayjs(state.endDate).format("YYYY-MM-DD")
        : "";

      const filters = {
        search: state.search,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        period: "custom",
      };
      const response = await recentActivityApi({
        ...filters,
        ...state.paginationModel,
      });
      setActivityData(response?.data?.response);
      setTotalCount(response?.data?.totalCounts);
    } catch (error) {
      console.log("Error", error);
      toastMessage();
    } finally {
      state.setLoader(false);
    }
  }

  useEffect(() => {
    recentActivityData();
  }, [state.startDate, state.endDate, state.paginationModel]);

  return (
    <div className="container-fluid ovh">
      <div className="row" style={{ marginBottom: "3rem" }}>
        <div className="col-md-4 d-flex align-items-center">
          <div className="breadcrumb_content">
            <h2 className="breadcrumb_title m-0 ">Recent Activities</h2>
          </div>
        </div>
        <div className="col-md-8">
          <TimeFilters state={state} />
        </div>
      </div>

      <div>
        <RecentActivityTable
          count={totalCount}
          activities={activityData}
          paginationModel={state.paginationModel}
          setPaginationModel={state.setPaginationModel}
          loader={state.loader}
        />
      </div>
    </div>
  );
}

export default RecentActivityMain;
