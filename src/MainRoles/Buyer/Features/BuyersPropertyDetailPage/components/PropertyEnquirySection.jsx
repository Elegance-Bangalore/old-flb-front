import { downloadBroucherApi, postInquiryApi } from "@/ApiRoutes/BuyersApi";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import ShowError from "@/CustomCommon/Others/ShowError";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { selectUser } from "@/Redux/Auth/authSlice";
import { postEnquirySchemaBuyerPropertyDetailPageUpdated } from "@/Schemas/PostPropertySchema";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { admin, buy, sell, subAdmin } from "@/CustomServices/Constant";
import SellerDetailModal from "@/components/Modals/SellerDetailModal";
import PropertyInquiryModal from "@/components/Modals/PropertyInquiryModal";
import { sendOtpApi, verifyOtpApi } from "@/ApiRoutes/AuthApi";
import { Checkbox, FormControlLabel, Tooltip } from "@mui/material";
import axios from "axios";
import { bannerCountApi } from "@/ApiRoutes/AdminApi";
import Slider from "react-slick";
import PropertyCard from "../../BuyerHomePage/Components/CommonComponent/PropertyCard";

function PropertyEnquirySection({
  singleProperty = {},
  propertyList = [],
  fromDeveloperProfile = false,
  developerData = {},
  banner = [],
  propertyBanner=[]
}) {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [sellerDetailOpen, setSellerDetailOpen] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [agree, setAgree] = useState(false);

  // New state for additional form fields
  const [reasonToBuy, setReasonToBuy] = useState("");
  const [preferredLocation, setPreferredLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [homeLoanOptions, setHomeLoanOptions] = useState(false);
  const [siteVisits, setSiteVisits] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);

  const setting3 = {
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: "0",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const initialValues = {
    buyerName: user ? user.fullName : "",
    buyerEmail: user ? user.email : "",
    buyerPhone: user ? user.phone : "",
    propertyId: singleProperty?._id,
    reasonToBuy: "",
  };

  const Formik = useFormik({
    initialValues,
    validationSchema: postEnquirySchemaBuyerPropertyDetailPageUpdated,
    onSubmit: (values) => {
      if (user) {
        postInquiry(values);
        return;
      }
      if (!isOtpSent) {
        sendOtp();
        return;
      }
      submitOtp(values);
    },
  });

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    setValues,
    handleSubmit,
    setFieldValue,
    touched,
    resetForm,
  } = Formik;

  async function postInquiry(value) {
    setLoader(true);
    try {
      // Include additional form data in the inquiry
      const inquiryData = {
        ...value,
        reasonToBuy,
        preferredLocation,
        budget,
        homeLoanOptions,
        siteVisits,
        termsAgreed
      };
      
      const response = await postInquiryApi(inquiryData);
      const { status, message } = response.data;
      toastMessage(status, message);
      resetForm();
      setOtp("");
      setIsOtpSent(false);
      setInquiryModalOpen(false);
      setAgree(false);
      // Reset additional fields
      setReasonToBuy("");
      setPreferredLocation("");
      setBudget("");
      setHomeLoanOptions(false);
      setSiteVisits(false);
      setTermsAgreed(false);
      setSellerDetailOpen(true);
    } catch (error) {
      toastMessage();
      throw error;
    } finally {
      setLoader(false);
    }
  }

  async function sendOtp() {
    try {
      setLoader(true);
      const phone = values.buyerPhone;
      const response = await sendOtpApi({ phone, is_login: false });
      const { status, message } = response?.data;
      if (status === 200) {
        setIsOtpSent(true);
        toast.success("OTP sent to your phone number");
      } else {
        toastMessage(status, message);
      }
    } catch (error) {
      toast.error("Something went wrong in sending OTP");
      throw error;
    } finally {
      setLoader(false);
    }
  }

  const postProperty = () => {
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
  };

  function handleNumberOnly(e) {
    const { name, value } = e.target;
    if (name === "otp") {
      setOtp(value);
    } else if (/^\d*\.?\d*$/.test(e.target.value)) {
      setFieldValue(name, value);
      setIsOtpSent(false);
      setOtp("");
    }
  }

  async function submitOtp(data) {
    try {
      setLoader(true);
      const otpData = {
        otp,
        phone: data.buyerPhone,
        is_login: false,
      };
      const response = await verifyOtpApi(otpData);
      const { status, message } = response?.data;
      if (status === 200) {
        postInquiry(data);
      }
    } catch (error) {
      if (error) {
        setLoader(false);
        toastMessage(
          error?.response?.data?.status,
          error?.response?.data?.message
        );
        throw error;
      }
    }
  }

  async function clickCount(id) {
    try {
      const response = await bannerCountApi(id);
    } catch (error) {
      throw error;
    }
  }

  const handleOpenInquiryModal = () => {
    setInquiryModalOpen(true);
  };

  const handleCloseInquiryModal = () => {
    setInquiryModalOpen(false);
    setOtp("");
    setIsOtpSent(false);
    setAgree(false);
    // Reset additional fields
    setReasonToBuy("");
    setPreferredLocation("");
    setBudget("");
    setHomeLoanOptions(false);
    setSiteVisits(false);
    setTermsAgreed(false);
    // Reset form to clear any validation errors
    resetForm();
  };

  // Cleanup effect to ensure proper state management
  useEffect(() => {
    return () => {
      // Reset all modal states when component unmounts
      setInquiryModalOpen(false);
      setSellerDetailOpen(false);
      setOtp("");
      setIsOtpSent(false);
      setAgree(false);
      setReasonToBuy("");
      setPreferredLocation("");
      setBudget("");
      setHomeLoanOptions(false);
      setSiteVisits(false);
      setTermsAgreed(false);
      // Ensure body scroll is restored
      document.body.style.overflow = 'unset';
    };
  }, []);

  console.log("NB" , banner)

  return (
    <>
      <div className="col-lg-3 fl-sticky">
        <div className="border fl-card-border border-raidus-10 mb-2">
          <div className="px-4 py-3 text-center fl-bg-light-dark mb-3">
            <h4 className="fl-text-dark text-uppercase mb-0 fl-fs-22">
            TELL US YOUR REQUIREMENT
            </h4>
          </div>
          <div className="p-3 mb-3 text-center">
          {/* <h4 className="fl-text-dark text-uppercase mb-5 fl-fs-22">
              TELL US YOUR REQUIREMENT
            </h4> */}
            <button
              type="button"
              className="fl-btn-green"
              onClick={handleOpenInquiryModal}
            >
              Post Inquiry
            </button>
          </div>
        </div>
        {banner?.length > 0 && (
          <>
            <Slider {...setting3}>
              {banner?.map((banner, index) => (
                <div className="mb-3 w-100 h-100" onClick={() => clickCount(banner._id)}>
                  <a href={banner.url} target="_blank">
                    <img
                      src={banner?.banner}
                      alt="Banner"
                      className="img-fluid border-raidus-10 w-100"
                    />
                  </a>
                </div>
              ))}
            </Slider>
          </>
        )}

        {propertyBanner?.length > 0 ? (
          <>
            <Slider {...setting3}>
              {propertyBanner?.map((property, index) => (
                <div className="col-md-12" key={index}>
                  <PropertyCard
                    property={property?.propertyId}
                    feature={true}
                    banner={property?.banner}
                  />
                </div>
              ))}
            </Slider>
          </>
        ) : (
          <div>
             {/* <div className="border fl-border-dark-green border-raidus-10 fl-bg-light-green px-4 py-5 text-center">
            <h4 className="fl-ff-main fl-text-dark fl-fs-20">
              Unlock the Potential of Your Land!{" "}
            </h4>
            <p className="fl-ff-main fl-text-dark fw-semi-bold fl-16 mb-4">
              Post Your Property Today and Connect with Interested Buyers!
            </p>
            <button className="fl-btn-yellow" onClick={postProperty}>
              Post your property
            </button>
          </div> */}
          </div>
        )}
      </div>

      <PropertyInquiryModal
        show={inquiryModalOpen}
        handleClose={handleCloseInquiryModal}
        values={values}
        handleChange={handleChange}
        handleBlur={handleBlur}
        errors={errors}
        touched={touched}
        handleNumberOnly={handleNumberOnly}
        user={user}
        fromDeveloperProfile={fromDeveloperProfile}
        propertyList={propertyList}
        otp={otp}
        isOtpSent={isOtpSent}
        agree={agree}
        setAgree={setAgree}
        loader={loader}
        handleSubmit={handleSubmit}
        // New props for additional fields
        reasonToBuy={reasonToBuy}
        setReasonToBuy={setReasonToBuy}
        preferredLocation={preferredLocation}
        setPreferredLocation={setPreferredLocation}
        budget={budget}
        setBudget={setBudget}
        homeLoanOptions={homeLoanOptions}
        setHomeLoanOptions={setHomeLoanOptions}
        siteVisits={siteVisits}
        setSiteVisits={setSiteVisits}
        termsAgreed={termsAgreed}
        setTermsAgreed={setTermsAgreed}
      />

      <SellerDetailModal
        show={sellerDetailOpen}
        handleClose={() => setSellerDetailOpen(false)}
        developerData={
          fromDeveloperProfile ? developerData : singleProperty?.postedBy
        }
      />
    </>
  );
}

export default PropertyEnquirySection;
