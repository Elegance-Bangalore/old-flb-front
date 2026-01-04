import React, { useEffect, useState } from "react";
import AddPromotionBanner from "./AddPromotionBanner";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { getBannerListApi } from "@/ApiRoutes/AdminApi";
import PromotionBannerTable from "./PromotionBannerTable";

function PromotionBannerList() {
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [promotedList, setPromotedList] = useState([]);
  const [editData, setEditData] = useState(null);

  const handleClose = () => { 
    setOpen(false);
    setEditData(null);
  };

  async function getPromotionBannerList() {
    try {
      const response = await getBannerListApi();
      setPromotedList(response?.data?.data);
    } catch (error) {
      toastMessage(error?.response?.status, error?.response?.data?.error);
    }
  }

  function getEditData(data) {
    setEditData(data);
    setOpen(true);
  }

  useEffect(() => {
    getPromotionBannerList();
  }, []);

  return (
    <div className="container-fluid ovh">
      <div className="row">
        <div className="col-6">
          <div className="breadcrumb_content">
            <h2 className="breadcrumb_title pb-3">Promotional Banner</h2>
          </div>
        </div>
        <div className="col-6">
          <div className="text-end">
            <button
              className="btn-upgrade"
              type="button"
              onClick={() => setOpen(true)}
            >
              Add Banner
            </button>
          </div>
        </div>
        <div className="col-12">
          <div className="col-lg-12">
            <PromotionBannerTable
              bannerList={promotedList}
              loader={loader}
              getEditData={getEditData}
              getPromotionBannerList={getPromotionBannerList}
            />
          </div>
        </div>
      </div>

      <AddPromotionBanner
        open={open}
        handleClose={handleClose}
        editData={editData}
        getPromotionBannerList={getPromotionBannerList}
      />
    </div>
  );
}

export default PromotionBannerList;
