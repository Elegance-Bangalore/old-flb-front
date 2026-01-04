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
  togglePromotedPropertyApi,
} from "@/ApiRoutes/AdminApi";
import { getCuratedDeals } from "@/ApiRoutes/BuyersApi";
import { RefreshSquare } from "iconsax-react";
import { GoPencil } from "react-icons/go";
import { formatDate } from "@/CustomServices/Constant";

const PromotedPropertyTable = ({
  promotedList,
  loader,
  curatedDealsList,
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
      await togglePromotedPropertyApi({
        propertyAds: promotedId?.propertyAds,
        propertyId: promotedId?._id,
        type: "remove",
      });
      handleClose();
      toast.success("Property Removed Successfully");
      curatedDealsList();
    } catch (error) {
      console.log("Error", error);
    } finally {
    }
  }

  const columns = [
    { field: "propertyTitle", headerName: "Property", width: 250 },
    { field: "prmotionType", headerName: "Promotion Type", width: 250 },
    { field: "promotionCity", headerName: "City", width: 250 },

    {
      field: "propertyAds",
      headerName: "Banner",
      width: 250,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Banner not available"
          style={{ width: "100px", height: "100px" }}
        />
      ),
    },
    {
      field: "promoteExpires",
      headerName: "Promotion Expiry",
      width: 250,
      renderCell: (params) => (
        <span>{formatDate(params?.row?.promoteExpires)}</span>
      ),
    },
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
      field: "remove",
      headerName: "Remove",
      width: 150,
      renderCell: (params) => (
        <button
          className="btn btn-profile-delete d-inline-block"
          onClick={() => {
            setOpen(true);
            setPromotedId(params?.row);
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
          rows={promotedList}
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

export default PromotedPropertyTable;
