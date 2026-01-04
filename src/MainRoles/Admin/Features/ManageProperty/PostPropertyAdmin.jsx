import React, { useEffect, useState } from "react";
import InitialDetails from "@/CustomCommon/PostProperty/InitialDetails";
import { useFormik } from "formik";
import { initialValues } from "@/CustomServices/FormsInitialValues/PropertyFormInitialValues";
import { toastMessage } from "@/CustomServices/ToastMessage";
import {
  adminPostPropertyApi,
  editPropertyAdminApi,
} from "@/ApiRoutes/AdminApi";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import AdminInputs from "@/CustomCommon/PostProperty/AdminInputs";
import {
  postPropertySchema,
  postPropertySchemaAdmin,
} from "@/Schemas/PostPropertySchema";
import { useNavigate } from "react-router-dom";
import AdminSidebarMenu from "@/MainRoles/Admin/AdminLayouts/AdminSidebarMenu";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { getSinglePropertyApi } from "@/ApiRoutes/SellerApis";
import Slots from "@/CustomCommon/PostProperty/Slots";
import { getTime } from "@/CustomServices/Constant";
import { UploadFile } from "@mui/icons-material";
import PropertyAdditionalInfo from "@/CustomCommon/PostProperty/PropertyAdditionalInfo";
import PropertyDimension from "@/CustomCommon/PostProperty/PropertyDimension";
import PropertyAminities from "@/CustomCommon/PostProperty/PropertyAminities";
import PropertyGallery from "@/CustomCommon/PostProperty/PropertyGallery";
import PropertyDocuments from "@/CustomCommon/PostProperty/PropertyDocuments";
import UploadPropertyDocuments from "@/CustomCommon/PostProperty/UploadPropertyDocuments";
import { toast } from "react-toastify";
import { Switch, FormControlLabel } from '@mui/material';

const PostPropertyAdmin = () => {
  const param = useParams();
  const navigate = useNavigate();
  const propertyCode = param?.propertyCode;
  const [possessionDate, setPossessionDate] = useState(null);
  const minTime = dayjs().hour(8).minute(0).second(0);
  const maxTime = dayjs().hour(22).minute(0).second(0);
  const [fromTime, setFromTime] = useState(minTime);
  const [toTime, setToTime] = useState(maxTime);
  const [loader, setLoader] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);

  const Formik = useFormik({
    initialValues,
    validationSchema: postPropertySchemaAdmin,
    onSubmit: (values) => {
      if (propertyCode) {
        updateProperty(values);
      } else {
        postProperty(values);
      }
    },
  });

  function handlePost() {
    Formik.handleSubmit();
    const errors = Formik.errors;
    if (Object.keys(errors).length !== 0) {
      const firstErrorKey = Object.keys(errors)[0];
      const firstErrorMessage = errors[firstErrorKey];
      toast.error(firstErrorMessage);
    }
  }

  async function postProperty(value) {
    try {
      setLoader(true);
      delete value?.propertyCategory;
      const response = await adminPostPropertyApi({
        ...value,
        areaType: value.areaType ? value.areaType : "Sq Ft",
        documentName: value.documentName || null,
        managed_farmland: value.manageFarmland || false,
      });
      const { status, message } = response?.data;
      toastMessage(status, message);
      navigate(-1);
    } catch (error) {
      toastMessage(error?.response?.status, error?.response?.data?.message);
      throw error;
    } finally {
      setLoader(false);
    }
  }

  async function getSingleProperty() {
    try {
      setPageLoader(true);
      const response = await getSinglePropertyApi(propertyCode);
      const { status, message, data } = response?.data;
      if (status === 200) {
        const { possessionDate } = response?.data?.data;
        Formik.setValues({
          ...data,
          manageFarmland: data?.managed_farmland || false,
        });
        setPossessionDate(dayjs(new Date(possessionDate)));
        Formik.setFieldValue("videoUrl", data?.videoUrl[0]);
        Formik.setFieldValue("sellerId", data?.postedBy?._id);
        Formik.setFieldValue("documentName", data?.documentName?._id);
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
      setPageLoader(false);
    }
  }

  async function updateProperty(value) {
    try {
      setLoader(true);
      delete value?.propertyCategory;
      const response = await editPropertyAdminApi({
        ...value,
        postedBy: value?.sellerId,
        areaType: value.areaType ? value.areaType : "Sq Ft",
        documentName: value.documentName || null,
        managed_farmland: value.manageFarmland || false,
      });
      const { status, message } = response?.data;
      toastMessage(status, message);
      navigate(-1);
    } catch (error) {
      toastMessage(error?.response?.status, error?.response?.data?.message);
      throw error;
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    if (propertyCode) {
      getSingleProperty();
    }
  }, [propertyCode]);


  return (
    <>
      <div className="container-fluid ovh" >
        <div className="row pb-5">
          <div className="col-xxl-12">
            <div className="breadcrumb_content">
              <h2 className="breadcrumb_title">
                {propertyCode ? "Edit" : "Post"} Property
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
        {/* Add toggle for Manage Farmland (admin only) */}
        {/* <div className="mb-4">
          <FormControlLabel
            control={
              <Switch
                checked={Formik.values.manageFarmland || false}
                onChange={e => Formik.setFieldValue('manageFarmland', e.target.checked)}
                color="primary"
              />
            }
            label="Manage Farmland "
          />
        </div> */}
        {/* <PropertyDocuments formik={Formik} /> */}
        <UploadPropertyDocuments formik={Formik} />
        <AdminInputs formik={Formik} />
        <div className="mb-5 text-center text-lg-end">

          <div>
            <button
              className="btn btn-black rounded-btn py-3 text-white"
              style={{ minWidth: "18rem", fontSize: "1.25rem" }}
              onClick={handlePost}
              disabled={loader}
            >
              {loader ? (
                <OnClickLoader color="white" />
              ) : propertyCode ? (
                "Update Property "
              ) : (
                "Post Property "
              )}
            </button>
          </div>
        </div>
      </div>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={pageLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default PostPropertyAdmin;
