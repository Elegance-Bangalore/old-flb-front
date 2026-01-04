import React, { useEffect, useState } from "react";
import InitialDetails from "../../../../../../CustomCommon/PostProperty/InitialDetails";
import PropertyDimension from "../../../../../../CustomCommon/PostProperty/PropertyDimension";
import PropertyAminities from "../../../../../../CustomCommon/PostProperty/PropertyAminities";
import PropertyGallery from "../../../../../../CustomCommon/PostProperty/PropertyGallery";
import { useFormik } from "formik";
import { initialValues } from "@/CustomServices/FormsInitialValues/PropertyFormInitialValues";
import { toastMessage } from "@/CustomServices/ToastMessage";
import {
  getEnqiryCountApi,
  getSinglePropertyApi,
  postPropertyApi,
  updatePropertyApi,
} from "@/ApiRoutes/SellerApis";
import OnClickLoader from "../../../../../../CustomCommon/Others/OnClickLoader";
import dayjs from "dayjs";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { postPropertySchema } from "@/Schemas/PostPropertySchema";
import { useSelector } from "react-redux";
import { selectUser } from "@/Redux/Auth/authSlice";
import ProfileAlertModal from "@/components/Modals/ProfileAlertModal";
import UnsavedChangesModal from "@/components/Modals/UnsavedChanges";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useBeforeUnload from "@/CustomServices/useBeforeUnload";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import SubscriptionAlert from "@/components/Modals/SubscriptionAlert";
import Slots from "../../../../../../CustomCommon/PostProperty/Slots";
import { getTime } from "@/CustomServices/Constant";
import PropertyAdditionalInfo from "../../../../../../CustomCommon/PostProperty/PropertyAdditionalInfo";
import { Checkbox, FormControlLabel, Tooltip } from "@mui/material";
import UploadPropertyDocuments from "@/CustomCommon/PostProperty/UploadPropertyDocuments";

const PostPropertyMain = ({
  setIsDirty,
  showUnsavedChangesModal,
  url,
  setFormValues,
}) => {
  const minTime = dayjs().hour(8).minute(0).second(0);
  const maxTime = dayjs().hour(22).minute(0).second(0);
  const [fromTime, setFromTime] = useState(minTime);
  const [toTime, setToTime] = useState(maxTime);
  const param = useParams();
  const propertyCode = param?.propertyCode;
  const [agree, setAgree] = useState(propertyCode ? true : false);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [possessionDate, setPossessionDate] = useState(null);
  const [loader, setLoader] = useState(false);
  const [backdrop, setBackDrop] = useState(false);
  const [totalCount, setTotalCount] = useState({});
  const [subscriptionAlert, setSubscriptionAlert] = useState(false);
  const message =
    "Maximize your property's visibility and attract more potential buyers with our Premium Plan. Enjoy exclusive features, enhanced exposure, and priority placement.";

  function handleClose() {
    setOpen(false);
    navigate(url);
    // setShowUnsavedChangesModal(false);
  }

  const Formik = useFormik({
    initialValues,
    validationSchema: postPropertySchema,
    onSubmit: (values) => {
      if (propertyCode) {
        updateProperty(values);
      } else {
        postProperty(values);
      }
    },
  });

  async function postProperty(value) {
    if (!agree) {
      return;
    }
    try {
      setLoader(true);
      delete value?.propertyCategory;
      const response = await postPropertyApi({
        ...value,
        status: "publish",
        areaType: value.areaType ? value.areaType : "Sq Ft",
        documentName: value.documentName || null,
      });
      const { status, message } = response?.data;
      toastMessage(status, message);
      navigate("/seller/property-list");
    } catch (error) {
      toastMessage(error?.response?.status, error?.response?.data?.message);
      throw error;
    } finally {
      setLoader(false);
    }
  }

  async function getSingleProperty() {
    try {
      setBackDrop(true);
      const response = await getSinglePropertyApi(propertyCode);
      const { status, message, data } = response?.data;
      if (status === 200) {
        const { possessionDate, videoUrl } = response?.data?.data;
        Formik.setValues(data);
        setPossessionDate(dayjs(new Date(possessionDate)));
        Formik.setFieldValue("videoUrl", videoUrl[0]);
        Formik.setFieldValue("documentName", data?.documentName?._id);
        Formik.setFieldValue(
          "pricePerSqft",
          (data?.price / data?.totalAcre).toFixed(2)
        );
        if (!data?.from) {
          Formik.setFieldValue("from", getTime(minTime));
        } else setFromTime(dayjs(data?.from, "HH:mm:ss"));
        if (!data?.to) {
          Formik.setFieldValue("to", getTime(maxTime));
        } else setToTime(dayjs(data?.to, "HH:mm:ss"));
      }
      toastMessage(status, message);
    } catch (error) {
      toastMessage();
      throw error;
    } finally {
      setBackDrop(false);
    }
  }

  async function updateProperty(value) {
    try {
      setLoader(true);
      delete value.propertyCategory;
      const response = await updatePropertyApi(
        {
          ...value,
          status: "publish",
          areaType: value.areaType ? value.areaType : "Sq Ft",
          documentName: value.documentName || null,
        },
        Formik.values.propertyCode
      );
      const { status, message } = response?.data;
      toastMessage(status, message);
      navigate("/seller/property-list");
    } catch (error) {
      toastMessage(error?.response?.status, error?.response?.data?.message);

      throw error;
    } finally {
      setLoader(false);
    }
  }

  function handlePost() {
    const errors = Formik.errors;
    if (Object.keys(errors).length !== 0) {
      const firstErrorKey = Object.keys(errors)[0];
      const firstErrorMessage = errors[firstErrorKey];
      toast.error(firstErrorMessage);
    }
    Formik.handleSubmit();
  }

  async function postPropertyDraft() {
    const data = Formik.values;
    delete data?.propertyCategory;
    setLoader(true);
    try {
      let response;
      if (propertyCode) {
        // Editing existing property, update as draft
        response = await updatePropertyApi(
          { ...data, status: "draft" },
          Formik.values.propertyCode
        );
      } else {
        // New property, post as draft
        response = await postPropertyApi({ ...data, status: "draft" });
      }
      const { status, message } = response?.data;
      toastMessage(status, message);
      // Update local form state to reflect draft status
      Formik.setFieldValue("status", "draft");
    } catch (error) {
      toastMessage(error?.response?.status, error?.response?.data?.message);
      throw error;
    } finally {
      setLoader(false);
    }
  }

  async function getTotalCount() {
    try {
      const response = await getEnqiryCountApi();
      setTotalCount(response?.data?.postedPropertiesCounts);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    if (propertyCode) {
      getSingleProperty();
    } else {
      Formik.setValues(initialValues);
      getTotalCount();
    }
  }, [propertyCode]);

  useEffect(() => {
    if (user?.profileCompleted === false) {
      setOpen(true);
    }
  }, [user]);

  useBeforeUnload(() => {
    "You have unsaved changes. Are you sure";
  }, Formik.dirty);

  useEffect(() => {
    if (Formik.dirty) {
      setIsDirty(true);
    }
  }, [Formik.dirty]);

  useEffect(() => {
    setFormValues(Formik.values);
  }, [Formik.values]);

  return (
    <>
      <div className="">
        <div className="container-fluid ovh">
          <div className="row pb-5">
            <div className="col-xxl-12">
              <div className="breadcrumb_content">
                <h2 className="breadcrumb_title">
                  {propertyCode ? "Update Property" : "Add Property"}
                </h2>
              </div>
            </div>
          </div>
          <InitialDetails formik={Formik} />
          <PropertyDimension
            formik={Formik}
            possessionDate={possessionDate}
            setPossessionDate={setPossessionDate}
          />
          <PropertyAdditionalInfo
            formik={Formik}
            possessionDate={possessionDate}
            setPossessionDate={setPossessionDate}
          />
          <Slots
            formik={Formik}
            fromTime={fromTime}
            toTime={toTime}
            setFromTime={setFromTime}
            setToTime={setToTime}
          />
          <PropertyAminities formik={Formik} />
          <PropertyGallery formik={Formik} />
          <UploadPropertyDocuments formik={Formik} />

          <div
            className="d-flex justify-content-end my-3 text-end me-3"
            hidden={propertyCode}
          >
            <div>
              <FormControlLabel
                className="m-0"
                control={
                  <Checkbox
                    checked={agree}
                    className="pe-2 py-0"
                    disabled={loader}
                    onChange={() => setAgree(!agree)}
                  />
                }
              />
            </div>
            <div className="fs-12 text-dark">
              I agree to all 
              <Link
                className="text-success text-decoration-underline"
                to="/terms"
                target="_blank"
              >
                {" "}
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link
                className="text-success text-decoration-underline"
                to={"/privacy-policy"}
                target="_blank"
              >
                {" "}
                Privacy Policies
              </Link>
            </div>
          </div>

          <div className="mb-5 text-end" style={{display:"flex",justifyContent:"flex-end",gap:"10px"}}>
            <div hidden={propertyCode}>
              <Tooltip title={!agree && "Please agree to Terms and Conditions"}>
                <button
                  className="btn btn-black rounded-btn py-3 text-white"
                  style={{ minWidth: "18rem", fontSize: "1.25rem" }}
                  onClick={postPropertyDraft}
                  disabled={loader}
                >
                  {loader ? (
                    <OnClickLoader color="white" />
                  ) : (
                    "Save as Draft"
                  )}
                </button>
              </Tooltip>
            </div>
            <div>
              <Tooltip title={!agree && "Please agree to Terms and Conditions"}>
                <button
                  className="btn btn-black rounded-btn py-3 text-white"
                  style={{ minWidth: "18rem", fontSize: "1.25rem" }}
                  onClick={handlePost}
                  disabled={loader}
                >
                  {loader ? (
                    <OnClickLoader color="white" />
                  ) : propertyCode ? (
                    "Update Property"
                  ) : (
                    "Post Property"
                  )}
                </button>
              </Tooltip>
            </div>
           
          </div>
        </div>
      </div>
      <ProfileAlertModal open={open} handleClose={() => setOpen(false)} />
      <UnsavedChangesModal
        open={showUnsavedChangesModal}
        handleClose={handleClose}
        url={url}
        postProperty={postPropertyDraft}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default PostPropertyMain;
