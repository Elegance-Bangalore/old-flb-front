import React, { useState, useEffect, useRef } from "react";
import BuyerHeader from "../../BuyerHomePage/Layouts/BuyerHeader";
import BuyerFooter from "../../BuyerHomePage/Layouts/BuyerFooter";
import { Navigate, useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropertyHeader from "./PropertyHeader";
import PropertyNavigation from "./PropertyNavigation";
import PropertyOverview from "./PropertyOverview";
import PropertyEnquirySection from "./PropertyEnquirySection";
import {
  getDetailBannerApi,
  newsavePropertyApi,
  scheduleVisitApi,
} from "@/ApiRoutes/BuyersApi";
import {
  setChatList,
  setMessageList,
  setPropertyId,
  setPropertyName,
  setSenderId,
  setSenderName,
  setShowModal,
} from "@/Redux/Chat/chatSlice";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { toast } from "react-toastify";
import { selectUser } from "@/Redux/Auth/authSlice";
import { getSinglePropertyApi } from "@/ApiRoutes/SellerApis";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import DefaultMobileMenu from "../../BuyerHomePage/Layouts/DefaultMobileMenu";
import DetailPageSuggestion from "./DetailPageSuggestion";
import usePageSEO from "@/Seo";
import MetaComponent from "@/components/common/MetaComponent";

const BuyerPropertyDetail = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const location = useLocation();
  const propertyCode = param?.propertyCode;
  // Extract property name and category from URL if present
  const propertyNameFromUrl = param?.propertyName || "";
  const categoryFromUrl = param?.category || "";
  // Extract location from query params
  const searchParams = new URLSearchParams(location.search);
  const locationFromQuery = searchParams.get("city") || searchParams.get("location") || "";
  const [sechduleVisitStatus, setSechduleVistStatus] = useState(false);
  const [singleProperty, setSingleProperty] = useState("");
  const [savePropertyStatus, setSavePropertyStatus] = useState(
    singleProperty?.saved
  );
  const user = useSelector(selectUser);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [propertyBanner, setPropertyBanner] = useState([]);
  const [banner, setBanner] = useState([]);


  // Map propertyType to user-friendly category
  const propertyTypeMap = {
    agricultureLand: "Agriculture Land",
    farmland: "Farmland",
    farmhouse: "Farmhouse",
    Estates: "Estates",
    // add more as needed
  };

  // Compose metaData dynamically from URL/query or fallback to property data
  const metaData = React.useMemo(() => {
    // Prefer URL/query params, fallback to property data
    const propertyTitle = propertyNameFromUrl || singleProperty?.propertyTitle || "Farmland Bazaar";
    const category =
      propertyTypeMap[categoryFromUrl] ||
      propertyTypeMap[singleProperty?.propertyType] ||
      categoryFromUrl ||
      singleProperty?.propertyType ||
      "Farmland";
    // Compose location string
    let locationString = locationFromQuery;
    if (!locationString) {
      const arr = [singleProperty?.locality, singleProperty?.city, singleProperty?.state].filter(Boolean);
      locationString = arr.join(", ");
    }
    return {
      title: `${propertyTitle} | ${category} - ${locationString}`,
      description: `Category: ${category} | Location: ${locationString} | Buy and Sell Farmlands, Agricultural Land, Farmhouses India`,
    };
  }, [propertyNameFromUrl, categoryFromUrl, locationFromQuery, singleProperty]);

  function singlePropertyDetail() {
    setLoader(true);
    getSinglePropertyApi(propertyCode)
      .then((res) => {
        setLoader(false);
        setSechduleVistStatus(res?.data?.data?.visitRequest);
        setSavePropertyStatus(res?.data?.data?.saved);
        setSingleProperty({ ...res?.data?.data });
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      })
      .catch((err) => {
        setLoader(false);
        toastMessage(400, "Unable to get Property. Please try again");
      });
  }

  async function getpropertyBanner() {
    try {
      const response = await getDetailBannerApi();
      const data = response?.data?.data;
      console.log("data", data);
      const filterData = data?.filter((item) => item?.propertyId) || [];
      const bannerData =
        data?.filter(
          (item) => item?.bannerType === "Detail Page - Banner Only"
        ) || [];
      setPropertyBanner(filterData);
      setBanner(bannerData);
    } catch (error) {
      console.log("Error", error);
      throw error;
    }
  }

  const scheduleVisit = () => {
    if (!user) {
      toast.success("Please login first");
      navigate("/login");
      return;
    }
    if (user?.interested === "sell") {
      toast.info("Please login as Buyer");
      return;
    }
    try {
      scheduleVisitApi(singleProperty?._id)
        .then((res) => {
          setSechduleVistStatus(true);
          setSavePropertyStatus(true);
        })
        .catch((err) =>
          toastMessage("Unable to SechduleVist.Please try again")
        );
    } catch {
      toastMessage("Unable to SechduleVist. Please try again");
    }
  };

  const chatModals = () => {
    if (!user) {
      toast.success("Please login first");
      navigate("/login");
      return;
    }
    if (user?.interested === "sell") {
      toast.info("Please login as Buyer");
      return;
    }
    dispatch(setPropertyId(singleProperty?._id));
    dispatch(setSenderId(singleProperty?.postedBy?._id));
    dispatch(setMessageList());
    dispatch(setChatList());
    dispatch(setSenderName(singleProperty?.postedBy?.fullName));
    dispatch(setShowModal(true));
    dispatch(setPropertyName(singleProperty?.propertyTitle));
  };

  function saveProperty() {
    if (!user) {
      toast.success("Please login first");
      navigate("/login");
      return;
    }
    if (user?.interested === "sell") {
      toast.info("Please login as Buyer");
      return;
    }
    newsavePropertyApi(singleProperty?._id)
      .then((res) => {
        setSingleProperty({ ...singleProperty, saved: !singleProperty?.saved });
      })
      .catch((err) => toastMessage());
  }

  usePageSEO({
    title: metaData.title,
    // description: metaData.description,
    keywords: metaData.keywords,
    ogTitle: metaData.title,
    // ogDescription: metaData.description,
  })

  useEffect(() => {
    getpropertyBanner();
    if (propertyCode) {
      singlePropertyDetail(propertyCode);
    }
  }, [propertyCode]);


  return (
    <>
      <main className="buyers-main">
        <MetaComponent meta={metaData} />

        <BuyerHeader />
        <DefaultMobileMenu />
        {!loader ? (
          <>
            <section
              className="fl-property-detail-banner py-0"
              style={{ backgroundImage: `url(${singleProperty?.heroImage})` }}
            >
              <img
                className="img-fluid w-100"
                src={singleProperty?.heroImage}
                alt="banner Image"
              />
            </section>
            <div>
              <PropertyHeader
                singleProperty={singleProperty}
                scheduleVisit={scheduleVisit}
                chatModal={chatModals}
                setSingleProperty={setSingleProperty}
                sechduleVisitStatus={sechduleVisitStatus}
                savePropertyStatus={savePropertyStatus}
                saveProperty={saveProperty}
                setActiveSection={setActiveSection}
              />
            </div>
            <section className="fl-bg-white pt-0 pt-md-5 ">
              <div className="container fl-container">
                <div className="row">
                  <PropertyNavigation
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                  />
                  <PropertyOverview
                    singleProperty={singleProperty}
                    setActiveSection={setActiveSection}
                  />
                  <PropertyEnquirySection
                    singleProperty={singleProperty}
                    banner={banner}
                    propertyBanner={propertyBanner}
                  />
                </div>
                <div className="row">
                  <div className="mt-5">
                    <DetailPageSuggestion singleProperty={singleProperty} />
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <div
            className="text-center"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
              <CircularProgress color="success" />
            </Stack>
          </div>
        )}

        <BuyerFooter />
      </main>
    </>
  );
};

export default BuyerPropertyDetail;
