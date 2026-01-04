import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { deleteBlogSubCategoryApi, deleteBlogTagsApi} from "@/ApiRoutes/AdminApi";
import { toast } from "react-toastify";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { Box } from "@mui/material";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { Edit, Edit2, Trash } from "iconsax-react";
import DeleteModal from "@/components/Modals/DeleteModal";


export default function BlogSubCategoryTable({ subCategoryData, loader, getEditData, getBlogSubCategories }) {

  const [deleteId, setDeleteId] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);


  const handleDelete = async () => {
    try {
      await deleteBlogSubCategoryApi(deleteId);
      toast.success("Category Deleted Successfully");
      handleClose()
      getBlogSubCategories()
    } catch (error) {
      toastMessage()
      handleClose()
    } finally {
    }
  };

  const columns = [
    { field: "subCategory", headerName: "Sub Category", width: 250 },
    { field: "description", headerName: "Description", width: 500 },

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
          rows={subCategoryData}
          rowHeight={100}
          columns={columns}
          getRowId={(row) => subCategoryData?.indexOf(row)}
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
