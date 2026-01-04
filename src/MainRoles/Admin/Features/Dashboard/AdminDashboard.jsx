import { adminDashboardNewApi } from "@/ApiRoutes/AdminApi";
import { useEffect, useState } from "react";
import BackdropLoader from "@/CustomCommon/MaterialUi/BackdropLoader";
import totalProperty from "@/CustomAssets/Admin/shortlist-icon.png";
import inquiry from "@/CustomAssets/Admin/inquiry-icon.png";
import totalSeller from "@/CustomAssets/Admin/total-seller-icon.png";
import AdminDashboardCard from "@/CustomCommon/Dashboard/AdminDashboardCard";
import upOne from "@/CustomAssets/Admin/upfour.svg";
import downTwo from "@/CustomAssets/Admin/downtwo.svg";
import DashboardChart from "@/CustomCommon/Dashboard/DashboardChart";
import { DashboardPieChart } from "@/CustomCommon/Dashboard/DashboardPieChart";
import TimeFilters from "@/CustomCommon/AllRoles/TimeFilters";
import useAnalyticsState from "@/CustomServices/Hooks/useAnalyticsStates";
import dayjs from "dayjs";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const state = useAnalyticsState();

  async function adminDashboardData() {
    try {
      setOpenBackdrop(true);
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
      const response = await adminDashboardNewApi({
        ...filters,
        ...state.paginationModel,
      });
      setDashboardData(response?.data?.response);
    } catch (error) {
      console.log("Errors", error);
    } finally {
      setOpenBackdrop(false);
    }
  }

  useEffect(() => {
    adminDashboardData();
  }, [state.startDate, state.endDate, state.days]);

  return (
    <>
      <div className="container-fluid ovh">
        <div className="row" style={{marginBottom : "3rem"}}>
          <div className="col-md-4 d-flex align-items-center">
            <div className="breadcrumb_content">
              <h2 className="breadcrumb_title m-0 ">Dashboard</h2>
            </div>
          </div>
          <div className="col-md-8">
            <TimeFilters state={state} />
          </div>
        </div>
        <div className="row">
          <AdminDashboardCard
            data={dashboardData?.totalProperties}
            heading={"Total Properties"}
            icon={totalProperty}
            graphIcon={
              dashboardData?.totalProperties?.status === "down"
                ? downTwo
                : upOne
            }
          />
          <AdminDashboardCard
            data={dashboardData?.totalSellers}
            heading={"Total Sellers"}
            icon={totalSeller}

            graphIcon={
              dashboardData?.totalSellers?.status === "down" ? downTwo : upOne
            }
          />
          <AdminDashboardCard
            data={dashboardData?.totalBuyers}
            heading={"Total Buyers"}
            icon={totalProperty}
            graphIcon={
              dashboardData?.totalBuyers?.status === "down" ? downTwo : upOne
            }
          />
          <AdminDashboardCard
            data={dashboardData?.inquiry}
            heading={"Total Inquiry"}
            icon={inquiry}
            graphIcon={
              dashboardData?.inquiry?.status === "down" ? downTwo : upOne
            }
          />
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <DashboardChart />
          </div>
          <div className="col-md-6">
            <DashboardPieChart pieChartData={dashboardData?.data || []} />
          </div>
        </div>
      </div>
      <BackdropLoader openBackdrop={openBackdrop} />
    </>
  );
};

export default AdminDashboard;
