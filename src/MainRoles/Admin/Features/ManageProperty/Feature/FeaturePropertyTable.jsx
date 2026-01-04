import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { Box } from "@mui/material";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { Edit, Edit2, Trash } from "iconsax-react";
import DeleteModal from "@/components/Modals/DeleteModal";
import { deleteFeatureApi } from "@/ApiRoutes/AdminApi";
import { formatDate } from "@/CustomServices/Constant";

const FeaturePropertyTable = ({
  featureData,
  getEditData,
  getFeature,
  loader,
}) => {
  const [deleteId, setDeleteId] = useState("");
  const [opan, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  async function deleteFeature() {
    try {
      const response = await deleteFeatureApi(deleteId);
      handleClose();
      getFeature();
    } catch (error) {
      toastMessage();
    }
  }
  const columns = [
    { field: "title", headerName: "Title", width: 250 },
    { field: "url", headerName: "URL", width: 250 },
    { field: "city", headerName: "City", width: 150 },
    {
      field: "caouselExpires",
      headerName: "Carousel Expiry",
      width: 150,
      renderCell: (params) => (
        <span>{formatDate(params?.row?.caouselExpires)}</span>
      ),
    },
    {
      field: "desktopImage",
      headerName: "Desktop Image",
      width: 200,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Desktop"
          style={{ width: "100px", height: "100px" }}
        />
      ),
    },
    {
      field: "mobileImage",
      headerName: "Mobile Image",
      width: 200,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Mobile"
          style={{ width: "100px", height: "100px" }}
        />
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 130,
      renderCell: (params) => (
        <button
          onClick={() => getEditData(params.row)}
          className="btn btn-profile-edit d-inline-block"
        >
          <Edit2 />
        </button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 130,
      renderCell: (params) => (
        <button
          onClick={() => {
            setDeleteId(params.row._id);
            setOpen(true);
          }}
          className="btn btn-profile-delete d-inline-block"
        >
          <Trash />
        </button>
      ),
    },
  ];
  return (
    <>
      <div
        style={{ height: 600, width: "100%" }}
        className="custom-table-style"
      >
        <DataGrid
          rows={featureData}
          columns={columns}
          getRowId={(row) => row._id}
          rowHeight={120}
          pagination
          className="custom-header"
          pageSizeOptions={[10, 20, 50]}
          loading={loader}
          loadingIndicator={
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="400px"
            >
              <OnClickLoader />
            </Box>
          }
          checkboxSelection
          cellSelection={false}
          disableRowSelectionOnClick
        />
      </div>
      <DeleteModal
        open={opan}
        handleClose={handleClose}
        deleteData={deleteFeature}
      />
    </>
  );
};

export default FeaturePropertyTable;
