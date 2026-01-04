import React, { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newsavePropertyApi, scheduleVisitApi } from "@/ApiRoutes/BuyersApi";
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
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import PropertyHeader from "@/MainRoles/Buyer/Features/BuyersPropertyDetailPage/components/PropertyHeader";
import PropertyOverview from "@/MainRoles/Buyer/Features/BuyersPropertyDetailPage/components/PropertyOverview";
import Header from "@/components/common/header/dashboard/Header";
import AdminMobileMenu from "@/MainRoles/Admin/AdminLayouts/AdminMobileMenu";
import AdminSidebarMenu from '@/MainRoles/Admin/AdminLayouts/AdminSidebarMenu';
import { getSinglePropertyApi } from "@/ApiRoutes/SellerApis";


const AdminPropertyDetail = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const propertyCode = param?.propertyCode;
  const [sechduleVisitStatus, setSechduleVistStatus] = useState(false);
  const [singleProperty, setSingleProperty] = useState("");
  const [savePropertyStatus, setSavePropertyStatus] = useState(
    singleProperty?.saved
  );
  const user = useSelector(selectUser);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");


  function singlePropertyDetail() {
    setLoader(true);
    getSinglePropertyApi(propertyCode)
      .then((res) => {
        setLoader(false);
        setSechduleVistStatus(res?.data?.data?.visitRequest);
        setSavePropertyStatus(res?.data?.data?.saved);
        setSingleProperty(res?.data?.data);
      })
      .catch((err) => setLoader(false));
  }


  const scheduleVisit = () => {
    if (!user) {
      toast.success("Please login first");
      navigate("/login");
      return;
    }
    try {
      scheduleVisitApi(singleProperty?._id)
        .then((res) => {
          setSechduleVistStatus(true);
          setSavePropertyStatus(true);
        })
        .catch((err) =>
          toastMessage("Unable to SechduleVist.please try again")
        );
    } catch (error) {
      throw error
    }
  };
  const chatModals = () => {
    if (!user) {
      toast.success("Please login first");
      navigate("/login");
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
    newsavePropertyApi(singleProperty?._id)
      .then((res) => {
        if (savePropertyStatus) {
          setSechduleVistStatus(false);
        }
        setSavePropertyStatus(!savePropertyStatus);
      })
      .catch((err) => {
        throw err
      });
  }
  useEffect(() => {
    if (propertyCode) {
      singlePropertyDetail(propertyCode);
    }
  }, [propertyCode]);
  return (
    <>
      <div className="container-fluid ovh">
        <main className="buyers-main">
          {!loader ? (
            <>
              <section className="fl-property-detail-banner py-0">
                <img
                  className="w-100"
                  src={singleProperty?.heroImage}
                  alt="banner Image"
                  srcset=""
                />
              </section>
              <PropertyHeader
                singleProperty={singleProperty}
                scheduleVisit={scheduleVisit}
                chatModal={chatModals}
                sechduleVisitStatus={sechduleVisitStatus}
                savePropertyStatus={savePropertyStatus}
                saveProperty={saveProperty}
                setActiveSection={setActiveSection}
                setSingleProperty={setSingleProperty}
              />
              <section className="fl-bg-white">
                <div className="container fl-container">
                  <div className="row">
                    <PropertyOverview
                      singleProperty={singleProperty}
                      fullWidht={true}
                      setActiveSection={setActiveSection}
                    />
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

        </main>
      </div>
    </>
  );
};

export default AdminPropertyDetail;
