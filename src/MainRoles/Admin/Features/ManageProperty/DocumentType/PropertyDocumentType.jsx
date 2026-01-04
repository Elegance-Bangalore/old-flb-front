import React, { useEffect, useState } from "react";
import AddDocumentTypeModal from "./AddDocumentTypeModal";
import DocumentTypeTable from "./DocumentTypeTable";
import { documentTypeListApi } from "@/ApiRoutes/AdminApi";
import { toastMessage } from "@/CustomServices/ToastMessage";

function PropertyDocumentType() {
  const [open, setOpen] = useState(false);
  const [documentTypesData, setDocumemtTypesData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [editData, setEditData] = useState(null);

  const handleClose = () => {
    setOpen(false);
    setEditData(null);
  };

  function getEditData(data) {
    setEditData(data);
    setOpen(true);
  }

  async function getDocumentType() {
    try {
      setLoader(true);
      const response = await documentTypeListApi();
      setDocumemtTypesData(response?.data?.documentsType);
    } catch (error) {
      toastMessage();
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    getDocumentType();
  }, []);

  return (
    <div className="container-fluid ovh">
      <div className="row">
        <div className="col-lg-12">
          <div className="breadcrumb_content">
            <h2 className="breadcrumb_title pb-3"></h2>
          </div>
        </div>
        <div className="col-lg-12">
          <div>
            <div className="row mb-5">
              <div className="col-md-6">
                <h3>Property Document Types</h3>
              </div>
              <div className="col-md-6">
                <div className="text-end">
                  <button
                    className="btn-upgrade w-100-mobile"
                    type="button"
                    onClick={() => setOpen(true)}
                  >
                    Add Document Types
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <DocumentTypeTable
                  documentTypesData={documentTypesData}
                  loader={loader}
                  getEditData={getEditData}
                  getDocumentType={getDocumentType}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddDocumentTypeModal
        open={open}
        setOpen={setOpen}
        editData={editData}
        getDocumentType={getDocumentType}
        handleClose={handleClose}
      />
    </div>
  );
}

export default PropertyDocumentType;
