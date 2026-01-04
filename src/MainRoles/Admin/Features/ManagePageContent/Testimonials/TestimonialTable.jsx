import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { deleteTestimonialApi } from "@/ApiRoutes/AdminApi";
import { toast } from "react-toastify";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { Box } from "@mui/material";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { Edit, Edit2, Trash } from "iconsax-react";
import DeleteModal from "@/components/Modals/DeleteModal";
import dummyProfile from "@/CustomAssets/BuyerImages/Dummy-profile.png";


export default function TestimonialTable({
  testimonialData,
  loader,
  getEditData,
  getTestimonials,
}) {
  const [deleteId, setDeleteId] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  

  const handleDelete = async () => {
    try {
      await deleteTestimonialApi(deleteId);
      toast.success("Testimonail Deleted Successfully");
      handleClose();
      getTestimonials();
    } catch (error) {
      toastMessage();
      handleClose();
    } finally {
    }
  };

  const columns = [
    { field: "name", headerName: "User Name", width: 175 },
    {
      field: "image",
      headerName: "Image",
      width: 130,
      renderCell: (params) => (
        <img
          src={params.row.image || dummyProfile}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
          }}
        >
        </img>
      ),
    },
    { field: "type", headerName: "Type", width: 250 },  
    {
      field: "description",
      headerName: "Review",
      width: 400,
    },
    { field: "youTubeLink", headerName: "Youtube Link", width: 250 },  
    { field: "ratings", headerName: "Rating", width: 250 },  
    {
      field: "edit",
      headerName: "Edit",
      width: 130,
      renderCell: (params) => (
        <button
          onClick={() => getEditData(params.row)}
          className="btn btn-profile-edit d-inline-block  "
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
          rows={testimonialData || []}
          rowHeight={100}
          columns={columns}
          getRowId={(row) => testimonialData?.indexOf(row)}
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
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 50 },
            },
          }}
          className="custom-header"
          pageSizeOptions={[50, 100]}
          cellSelection={false}
          disableRowSelectionOnClick
          checkboxSelection
        />
        <DeleteModal
          open={open}
          handleClose={handleClose}
          deleteData={handleDelete}
        />
      </div>
    </>
  );
}
