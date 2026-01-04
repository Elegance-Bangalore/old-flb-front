import React, { useEffect, useState } from "react";
import PromotedPropertyTable from "./PromotedPropertyTable";
import AddPromotedModal from "./AddPromotedModal";
import { getCuratedDeals } from "@/ApiRoutes/BuyersApi";
import { getCuratedDealsApi } from "@/ApiRoutes/AdminApi";

const PromotedProperty = () => {
  const [open, setOpen] = useState(false);

  const [loader, setLoader] = useState(false);
  const [promotedList, setPromotedList] = useState([]);
  const [editData, setEditData] = useState(null);

  async function curatedDealsList() {
    try {
      setLoader(true);
      const response = await getCuratedDealsApi();
      setPromotedList(response?.data?.curatedDeals);
    } catch (error) {
    } finally {
      setLoader(false);
    }
  }

  const handleClose = () => {
    setOpen(false);
    setEditData(null);
  };

  function getEditData(value) {
    setEditData(value);
    setOpen(true);
  }

  useEffect(() => {
    curatedDealsList();
  }, []);

  return (
    <>
      <div className="container-fluid ovh">
        <div className="row">
          <div className="col-6">
            <div className="breadcrumb_content">
              <h2 className="breadcrumb_title pb-3">Featured Properties</h2>
            </div>
          </div>
          <div className="col-6">
            <div className="text-end">
              <button
                className="btn-upgrade"
                type="button"
                onClick={() => setOpen(true)}
              >
                Add Property
              </button>
            </div>
          </div>
          <div className="col-lg-12">
            <PromotedPropertyTable
              curatedDealsList={curatedDealsList}
              promotedList={promotedList}
              loader={loader}
              getEditData={getEditData}
            />
          </div>
        </div>
      </div>
      <AddPromotedModal
        open={open}
        handleClose={handleClose}
        curatedDealsList={curatedDealsList}
        editData={editData}
      />
    </>
  );
};

export default PromotedProperty;
