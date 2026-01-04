import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteBlogCategory, deleteBlogTagsApi, getBlogCategoryApi, getBlogTagsApi } from "@/ApiRoutes/AdminApi";
import { toast } from "react-toastify";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { Box } from "@mui/material";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { Edit, Edit2, Trash } from "iconsax-react";
import DeleteModal from "@/components/Modals/DeleteModal";


export default function BlogTagTable({ tagsData, loader, getEditData, getBlogTags }) {

  const [deleteId, setDeleteId] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);




  const handleDelete = async () => {
    try {
      await deleteBlogTagsApi(deleteId);
      toast.success("Category Deleted Successfully");
      handleClose()
      getBlogTags()
    } catch (error) {
      toastMessage()
      handleClose()
    } finally {
    }
  };

  const columns = [
    { field: "tags", headerName: "Tags Title", width: 250 },
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
          onClick={() => { setDeleteId(params.row._id); setOpen(true) }
          }
          className="btn btn-profile-delete d-inline-block"
        >
          <Trash />
        </button >
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
          rows={tagsData}
          rowHeight={100}
          columns={columns}
          getRowId={(row) => tagsData?.indexOf(row)}
          loading={loader}
          loadingIndicator={<Box display="flex" justifyContent="center" alignItems="center" height="400px"><OnClickLoader /></Box>}
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
        <DeleteModal open={open} handleClose={handleClose} deleteData={handleDelete} />
      </div>
    </>

  );
}
