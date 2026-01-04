import React, { useEffect, useState } from "react";
import { getMediaApi } from "@/ApiRoutes/AdminApi";
import AddMediaModal from "./AddMediaModal";
import MediaTable from "./MediaTable";

const MediaMain = () => {
  const [open, setOpen] = useState(false);
  const [mediaData, setMediaData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [editData, setEditData] = useState(null);

  function getEditData(mediaData) {
    setEditData(mediaData);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setEditData(null);
  };

  async function getMedia() {
    try {
      setLoader(true);
      const res = await getMediaApi();
      setMediaData(res?.data?.media || []);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    getMedia();
  }, []);

  return (
    <>
      <div className="container-fluid ovh">
        <div className="row">
          <div className="col-6">
            <div className="breadcrumb_content">
              <h2 className="breadcrumb_title pb-3">Media</h2>
            </div>
          </div>
          <div className="col-6">
            <div className="text-end">
              <button
                className="btn-upgrade"
                type="button"
                onClick={() => setOpen(true)}
              >
                Add Media
              </button>
            </div>
          </div>
          <div className="col-lg-12">
            <MediaTable
              mediaData={mediaData}
              loader={loader}
              getEditData={getEditData}
              getMedia={getMedia}
            />
          </div>
        </div>
      </div>
      <AddMediaModal
        open={open}
        handleClose={handleClose}
        editData={editData}
        getMedia={getMedia}
      />
    </>
  );
};

export default MediaMain;
