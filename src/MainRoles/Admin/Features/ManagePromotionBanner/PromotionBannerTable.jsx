import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { toast } from "react-toastify";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { Box } from "@mui/material";
import { toastMessage } from "@/CustomServices/ToastMessage";
import DeleteModal from "@/components/Modals/DeleteModal";
import {
  deleteFooterSeoApi,
  deletePromotionalBannerApi,
  togglePromotedPropertyApi,
} from "@/ApiRoutes/AdminApi";
import { getCuratedDeals } from "@/ApiRoutes/BuyersApi";
import { RefreshSquare } from "iconsax-react";
import { GoPencil } from "react-icons/go";
import { formatDate, formatPropertyType } from "@/CustomServices/Constant";

const PromotionBannerTable = ({
  bannerList,
  loader,
  getPromotionBannerList,
  getEditData,
}) => {
  const [promotedId, setPromotedId] = useState(null);
  const [open, setOpen] = useState(false);

  function handleClose() {
    setOpen(false);
    setPromotedId(null);
  }

  async function removeProperty() {
    try {
      await deletePromotionalBannerApi(promotedId);
      handleClose();
      toast.success("Property Removed Successfully");
      getPromotionBannerList();
    } catch (error) {
      console.log("Error", error);
    } finally {
    }
  }

  const columns = [
    {
      field: "propertyType",
      headerName: "Property Type",
      width: 250,
      renderCell: (params) => (
        <span>{formatPropertyType(params?.row?.propertyType)}</span>
      ),
    },
    { field: "city", headerName: "City", width: 250 },
    { field: "url", headerName: "URL", width: 250 },
    { field: "bannerType", headerName: "Banner Type", width: 250 },

    {
      field: "banner",
      headerName: "Banner",
      width: 250,
      renderCell: (params) => (
        <img
          src={params.row.banner}
          alt="Banner not available"
          style={{ width: "100px", height: "100px" }}
        />
      ),
    },

    { field: "bannerClicks", headerName: "Banner Clicks", width: 250 },
    {
      field: "edit",
      headerName: "Edit",
      width: 150,
      renderCell: (params) => (
        <button
          className="btn btn-profile-delete d-inline-block"
          onClick={() => {
            getEditData(params?.row);
          }}
        >
          <GoPencil />
        </button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 150,
      renderCell: (params) => (
        <button
          className="btn btn-profile-delete d-inline-block"
          onClick={() => {
            setPromotedId(params?.row?._id);
            setOpen(true);
          }}
        >
          <RefreshSquare />
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
          rows={bannerList || []}
          columns={columns}
          getRowId={(row) => row._id}
          rowHeight={120}
          pagination
          className="custom-header"
          pageSizeOptions={[10, 20]}
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
        open={open}
        handleClose={handleClose}
        deleteData={removeProperty}
      />
    </>
  );
};

export default PromotionBannerTable;
