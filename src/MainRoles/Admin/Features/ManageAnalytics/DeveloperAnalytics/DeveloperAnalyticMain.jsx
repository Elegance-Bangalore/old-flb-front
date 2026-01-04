import { developerAnalyticsApi } from "@/ApiRoutes/AdminApi";
import TimeFilters from "@/CustomCommon/AllRoles/TimeFilters";
import useAnalyticsState from "@/CustomServices/Hooks/useAnalyticsStates";
import { toastMessage } from "@/CustomServices/ToastMessage";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DeveloperAnalyticsTable from "./DeveloperAnalyticsTable";

function DeveloperAnalyticsMain() {
  const state = useAnalyticsState();
  const [developerData, setDeveloperData] = useState({});
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    state.setPaginationModel({ ...state.paginationModel, page: 0 });
  };

  async function developerAnalyticsData() {
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
      const response = await developerAnalyticsApi({
        ...filters,
        ...state.paginationModel,
      });
      setDeveloperData(response?.data);
    } catch (error) {
      toastMessage();
      console.log("Error", error);
      toastMessage();
    } finally {
      state.setLoader(false);
    }
  }

  useEffect(() => {
    developerAnalyticsData();
  }, [state.startDate, state.endDate, state.paginationModel]);

  return (
    <div className="container-fluid ovh">
      <div className="row" style={{ marginBottom: "3rem" }}>
        <div className="col-md-4 d-flex align-items-center">
          <div className="breadcrumb_content">
            <h2 className="breadcrumb_title m-0 ">Developer Analytics</h2>
          </div>
        </div>
        <div className="col-md-8">
          <TimeFilters state={state} />
        </div>
      </div>

      <div>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  label={`Signups - ${developerData?.developers?.count || 0}`}
                  value="1"
                />
                <Tab
                  label={`Profile Created - ${
                    developerData?.profileCompleted?.count || 0
                  }`}
                  value="2"
                />
                <Tab
                  label={`Profile Pending - ${
                    developerData?.pendingProfile?.count || 0
                  }`}
                  value="3"
                />
              </TabList>
            </Box>
            <TabPanel value="1" className="p-0">
              <DeveloperAnalyticsTable
                developers={developerData?.developers?.data}
                count={developerData?.developers?.count}
                paginationModel={state.paginationModel}
                setPaginationModel={state.setPaginationModel}
                loader={state.loader}
              />
            </TabPanel>
            <TabPanel value="2" className="p-0">
              <DeveloperAnalyticsTable
                developers={developerData?.profileCompleted?.data}
                count={developerData?.profileCompleted?.count}
                paginationModel={state.paginationModel}
                setPaginationModel={state.setPaginationModel}
                loader={state.loader}
              />
            </TabPanel>
            <TabPanel value="3" className="p-0">
              <DeveloperAnalyticsTable
                developers={developerData?.pendingProfile?.data}
                count={developerData?.pendingProfile?.count}
                paginationModel={state.paginationModel}
                setPaginationModel={state.setPaginationModel}
                loader={state.loader}
              />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
}

export default DeveloperAnalyticsMain;
