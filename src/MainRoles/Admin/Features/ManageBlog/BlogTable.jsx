import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteBlog, getBlogApi } from "@/ApiRoutes/AdminApi";
import { toast } from "react-toastify";
import { formatDate } from "@/CustomServices/Constant";
import { Edit, Edit2, Trash } from "iconsax-react";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { Box } from "@mui/material";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import DeleteModal from "@/components/Modals/DeleteModal";

export default function BlogsCategoryTable({ query , category }) {
  const [loader, setLoader] = useState(false);
  const [count, setCount] = useState(0);
  const [blogCategoryData, setBlogCategoryData] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [timer, setTimer] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });
  const navigate = useNavigate();

  async function getBlog() {
    setLoader(true);
    try {
      const response = await getBlogApi({
        ...paginationModel,
        query,
        category,
      });
      setBlogCategoryData(response.data.res);
      setCount(response.data.count);
    } catch (error) {
      toastMessage();
    } finally {
      setLoader(false);
    }
  }

  const handleEditClick = (data) => {
    navigate("/admin/editBlog", { state: data });
  };

  const handleDelete = async () => {
    try {
      await deleteBlog(deleteId);
      toast.success("Blog Deleted Successfully");
      getBlog();
      handleClose();
    } catch (error) {
      toast.error("Something went wrong ");
      handleClose();
    } finally {
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "Image",
      width: 200,
      renderCell: (params) => (
        <img
          src={params.row.logo}
          alt="img"
          style={{
            width: "100px",
            height: "100px",
            aspectRatio: "1/1",
            borderRadius: "5px",
            marginLeft: "10px",
          }}
        />
      ),
    },
    { field: "category", headerName: "Category", width: 200 },
    { field: "subCategoryName", headerName: "Sub Category", width: 200 },

    { field: "title", headerName: "Title", width: 200 },
    { field: "selectDate", headerName: "Date", width: 200 },

    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => (
        <button
          className={`btn  ${
            params.row.status === "publish"
              ? "pill-btn-green"
              : "pill-light-btn-gold px-4"
          } d-inline-block`}
        >
          {params.row.status === "publish" ? "Published" : "Draft"}
        </button>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 60,
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
      width: 60,
      renderCell: (params) => (
        <button
          onClick={() => {
            setDeleteId(params.row.id);
            setOpen(true);
          }}
          className="btn btn-profile-delete d-inline-block"
        >
          <Trash />
        </button>
      ),
    },
  ];

  const rows = blogCategoryData.map((element) => ({
    category: element?.categoryId?.category,
    title: element?.title,
    selectDate: formatDate(element?.selectDate),
    delete: "Delete",
    id: element?._id,
    status: element?.status,
    tags: element?.tags,
    categoryId: element?.categoryId,
    logo: element?.logo,
    content: element?.content,
    featured: element?.featured,
    slug: element?.slug,
    meta: element?.meta,
    subCategory: element?.subCategory,
    subCategoryName: element?.subCategory?.subCategory,
    youtubeLink: element?.youtubeLink,
  }));

  useEffect(() => {
    clearTimeout(timer);
    const delay = setTimeout(() => {
      getBlog();
    }, 500);
    setTimer(delay);
    return () => clearTimeout(delay);
  }, [query, paginationModel , category]);

  return (
    <>
      <div
        style={{ height: 600, width: "100%" }}
        className="custom-table-style"
      >
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={130}
          rowCount={count}
          pagination
          getRowId={(row) => rows?.indexOf(row)}
          paginationMode="server"
          className="custom-header"
          pageSizeOptions={[20, 50, 100]}
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
          onPaginationModelChange={setPaginationModel}
          paginationModel={paginationModel}
          cellSelection={false}
          disableRowSelectionOnClick
          checkboxSelection
        />
      </div>

      <DeleteModal
        open={open}
        handleClose={handleClose}
        deleteData={handleDelete}
      />
    </>
  );
}
