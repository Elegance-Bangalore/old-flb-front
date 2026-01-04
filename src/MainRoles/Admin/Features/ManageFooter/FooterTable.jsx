import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteFooter, getFooterApi, toogleFooterStatusApi } from "@/ApiRoutes/AdminApi";
import { toast } from "react-toastify";
import editIcon from "@/public/assets/images/profile/profile-edit.svg";
import deleteIcon from "@/public/assets/images/profile/delete-profile.svg";
import Switch from "@mui/material/Switch";
import DeleteModal from "@/components/Modals/DeleteModal";
import { Box } from "@mui/material";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";

export default function FooterTable({ query }) {
  const [loader, setLoader] = useState(false);
  const [blogCategoryData, setBlogCategoryData] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [timer, setTimer] = useState(null);

  async function getFooter() {
    setLoader(true);
    try {
      const response = await getFooterApi(query);
      setBlogCategoryData(response.data.res);
    } catch (error) {
      toast.error("Something went wrong in Footer Category List");
    } finally {
      setLoader(false);
    }
  }
  const handleEditClick = (data) => {
    navigate("/admin/editFooter", { state: data });
  };

  const handleDelete = async () => {
    try {
      await deleteFooter(deleteId);
      toast.success("Footer Deleted Successfully");
      handleClose();
      getFooter();
    } catch (error) {
      toast.error("Something went wrong in Footer Deletion");
    } finally {
    }
  };

  const handleChange = async (params) => {
    try {
      await toogleFooterStatusApi(params.row.id);
      getFooter();
    } catch (error) {
      toast.error("Something went wrong in Footer Category List");
    } finally {
      setLoader(false);
    }
  };

  const columns = [
    {
      field: "selectPage",
      headerName: "Page",
      width: 250,
      cellClassName: "text-dark fs-16",
    },
    {
      field: "title",
      headerName: "Page Title",
      width: 320,
      cellClassName: "text-dark fs-16",
    },
    {
      field: "link",
      headerName: "Link",
      width: 250,
      renderCell: (params) => (
        <a
          href={`${params.row.link}`}
          target="_blank"
          style={{ color: "#0095FF" }}
          className="text-primary fs-16"
        >
          {params.row.link}
        </a>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <Switch
          checked={params.row.status}
          onChange={() => handleChange(params)}
          inputProps={{ "aria-label": "controlled" }}
        />
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 130,
      renderCell: (params) => (
        <button
          onClick={() => handleEditClick(params.row)}
          className="btn btn-profile-edit d-inline-block  "
        >
          <img className="img-fluid" src={editIcon} alt="editIcon" />
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
            setDeleteId(params.row.id);
            setOpen(true);
          }}
          className="btn btn-profile-delete d-inline-block"
        >
          <img className="img-fluid" src={deleteIcon} alt="" />
        </button>
      ),
    },
  ];

  const rows = blogCategoryData.map((element, i) => ({
    selectPage: element.selectPage,
    link: element.link,
    title: element.title,
    status: element.status,
    delete: "Delete",
    id: element._id,
    index: i,
  }));

  useEffect(() => {
    clearTimeout(timer);
    const delay = setTimeout(() => {
      getFooter();
    }, 500);
    setTimer(delay);
    return () => clearTimeout(delay);

  }, [query]);

  return (
    <>
      <div style={{ height: 600, width: "100%" }} className="custom-table-style">
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={80}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          className="custom-header"
          pageSizeOptions={[5, 10]}
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
        deleteData={handleDelete}
      />
    </>
  );
}
