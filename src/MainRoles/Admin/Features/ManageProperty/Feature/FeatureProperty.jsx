import React, { useEffect, useState } from "react";
import FeaturePropertyTable from "./FeaturePropertyTable";
import AddFeatureModal from "./AddFeatureModal";
import { getFeatureAdminApi } from "@/ApiRoutes/AdminApi";

const FeatureProperty = () => {
  // const [search, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [featureData, setFeatureData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [editData, setEditData] = useState(null);

  function getEditData(featureData) {
    setEditData(featureData);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setEditData(null);
  };

  async function getFeature() {
    try {
      setLoader(true);
      const res = await getFeatureAdminApi();
      setFeatureData(res?.data?.data);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    getFeature();
  }, []);

  return (
    <>
      <div className="container-fluid ovh">
        <div className="row">
          <div className="col-6">
            <div className="breadcrumb_content">
              <h2 className="breadcrumb_title pb-3">Feature Banner</h2>
            </div>
          </div>
          <div className="col-6">
            <div className="text-end">
              <button
                className="btn-upgrade"
                type="button"
                onClick={() => setOpen(true)}
              >
                Add Feature
              </button>
            </div>
          </div>
          <div className="col-lg-12">
            <FeaturePropertyTable
              featureData={featureData}
              open={open}
              handleClose={handleClose}
              loader={loader}
              getEditData={getEditData}
              getFeature={getFeature}
            />
          </div>
        </div>
      </div>
      <AddFeatureModal
        open={open}
        handleClose={handleClose}
        editData={editData}
        getFeature={getFeature}
      />
    </>
  );
};

export default FeatureProperty;
