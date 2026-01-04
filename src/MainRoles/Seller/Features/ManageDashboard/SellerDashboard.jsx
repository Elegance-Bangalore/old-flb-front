import { useEffect, useState } from "react";
import { Carousel, Alert } from "react-bootstrap"; // Import Carousel from react-bootstrap
import {
  getSellerAnalytics,
  resendEmail,
  sellerDashboardApi,
} from "@/ApiRoutes/SellerApis";
import DashboardCard from "../../../../CustomCommon/Dashboard/DashboardCard";
import { useSelector } from "react-redux";
import { selectSubscription, selectUser } from "@/Redux/Auth/authSlice";
import { toast } from "react-toastify";
import BackdropLoader from "@/CustomCommon/MaterialUi/BackdropLoader";
import { Link } from "react-router-dom";
import totalProperty from "@/CustomAssets/Admin/shortlist-icon.png";
import inquiry from "@/CustomAssets/Admin/inquiry-icon.png";
import totalSeller from "@/CustomAssets/Admin/total-seller-icon.png";
import upOne from "@/CustomAssets/Admin/upfour.svg";
import downTwo from "@/CustomAssets/Admin/downtwo.svg";
import UpgradePlan from "./UpgradePlan";

const SellerDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [propertyList, setPropertyList] = useState([]);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const user = useSelector(selectUser);
  const subscription = useSelector(selectSubscription);


  async function adminDashboardData() {
    try {
      setOpenBackdrop(true);
      const response = await sellerDashboardApi();
      setDashboardData(response.data.response);
      setPropertyList(response?.data?.response.recentProperties);
    } catch (error) {
    } finally {
      setOpenBackdrop(false);
    }
  }

  function resendEmailApi() {
    resendEmail({ email: user?.email })
      .then((res) => toast.success("Link sent to your Email"))
      .catch((err) => toast.error("Something Went Wrong! Try again"));
  }

  useEffect(() => {
    adminDashboardData();
  }, []);

  const plans = [
    {
      name: "Silver",
      visibility: "44",
      position: "30%",
      benefits: [
        "Multiple Project uploads",
        "Full access to Dashboard",
        "Social Media Upload",
      ],
    },
    {
      name: "Gold",
      visibility: "70",
      position: "50%",
      benefits: [
        "Higher position on the Website",
        "Brand story",
        "Social Media Promotion",
      ],
    },
    {
      name: "Platinum",
      visibility: "92",
      position: "75%",
      benefits: [
        "Multiple Premium Positions on Website",
        "Industry Leadership Positioning",
        "Extensive Social Media Promotions",
      ],
    },
  ];

  return (
    <>
      {!user?.isEmailVerified && (
        <div className="alert">
          <Alert variant="danger">
            Your email is not verified.{" "}
            <span
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={resendEmailApi}
            >
              Click Here
            </span>{" "}
            to get verification link. (Note : If your email is already verified
            then refresh the page)
          </Alert>
        </div>
      )}

      <div className="container-fluid ovh">
        <div className="row mb-5">
          <div className="col-lg-12">
            <div className="breadcrumb_content">
              <h2 className="breadcrumb_title pb-3">Dashboard</h2>
            </div>
          </div>
          <DashboardCard
            data={dashboardData?.totalProperties}
            heading={"Total Properties"}
            icon={totalProperty}
            label="Properties"
            graphIcon={
              dashboardData?.totalProperties?.status === "down"
                ? downTwo
                : upOne
            }
          />
          <DashboardCard
            data={dashboardData?.totalViews}
            heading={"Total Views"}
            label="Views"
            icon={totalSeller}
            graphIcon={
              dashboardData?.totalViews?.status === "down" ? downTwo : upOne
            }
          />
          <DashboardCard
            data={dashboardData?.totalEnquiries}
            heading={"Total Enquiries"}
            icon={inquiry}
            label="Enquiries"
            graphIcon={
              dashboardData?.totalEnquiries?.status === "down" ? downTwo : upOne
            }
          />
          <DashboardCard
            data={dashboardData?.propertiesSold}
            heading={"Shortlisted Properties"}
            icon={totalProperty}
            label="Properties"
            graphIcon={
              dashboardData?.propertiesSold?.status === "down" ? downTwo : upOne
            }
          />
        </div>
        {
          !user?.subscription && (
            <>
              <div className="mb-5">
                <Carousel
                  interval={3000}
                  indicators={false}
                  controls={false}
                  pause="hover"
                  className="h-auto"
                >
                  {plans.map((plan, index) => (
                    <Carousel.Item key={index} className="my-1">
                      <UpgradePlan plan={plan} position={"40%"} />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            </>
          )
        }
      </div>

      <BackdropLoader openBackdrop={openBackdrop} />
    </>
  );
};

export default SellerDashboard;
