import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteBlogCategory, getBlogCategoryApi } from "@/ApiRoutes/AdminApi";
import { toast } from "react-toastify";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { Box } from "@mui/material";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { Edit, Edit2, Trash } from "iconsax-react";
import DeleteModal from "@/components/Modals/DeleteModal";


export default function BlogsCategoryTable({ query }) {

  const [loader, setLoader] = useState(false);
  const [blogCategoryData, setBlogCategoryData] = useState([]);
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  async function getBlogCategory() {
    setLoader(true);
    try {
      const response = await getBlogCategoryApi(query);
      setBlogCategoryData(response.data.data);
    } catch (error) {
      toast.error("Something went wrong in Blog Category List");
    } finally {
      setLoader(false);
    }
  }


  const handleEditClick = (data) => {
    navigate("/admin/editBlogCategory", { state: data });
  };


  const handleDelete = async () => {
    try {
      await deleteBlogCategory(deleteId);
      toast.success("Category Deleted Successfully");
      getBlogCategory();
      handleClose()
    } catch (error) {
      toastMessage()
      handleClose()
    } finally {
    }
  };

  const columns = [
    { field: "category", headerName: "Category", width: 250 },
    { field: "description", headerName: "Description", width: 320 },
    { field: "associatedBlogs", headerName: "Number of Blogs", width: 250 },

    {
      field: "edit",
      headerName: "Edit",
      width: 130,
      renderCell: (params) => (
        <button
          onClick={() => handleEditClick(params.row)}
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



  useEffect(() => {
    getBlogCategory();
  }, [query]);

  return (

    <>
      <div
        style={{ height: 600, width: "100%" }}
        className="custom-table-style"
      >
        <DataGrid
          rows={blogCategoryData}
          rowHeight={100}
          columns={columns}
          getRowId={(row) => blogCategoryData?.indexOf(row)}
          loading={loader}
          loadingIndicator={<Box display="flex" justifyContent="center" alignItems="center" height="400px"><OnClickLoader /></Box>}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          className="custom-header"
          pageSizeOptions={[5, 10]}
          cellSelection={false}
          disableRowSelectionOnClick
          checkboxSelection
        />
        <DeleteModal open={open} handleClose={handleClose} deleteData={handleDelete} />
      </div>
    </>

  );
}
