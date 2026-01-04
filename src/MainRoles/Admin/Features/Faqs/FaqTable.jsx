import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Edit2, Trash } from "iconsax-react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { deleteFaqApi, faqListApi } from "@/ApiRoutes/AdminApi";
import DeleteModal from "@/components/Modals/DeleteModal";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";

export default function FaqTable({ query, category }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [loader, setLoader] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [faqData, setFaqData] = useState([]);
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  async function getFaqList() {
    try {
      setLoader(true);
      const data = { query, category, ...paginationModel };
      const response = await faqListApi(data);
      setFaqData(response?.data?.res);
      setCount(response?.data?.count);
    } catch (error) {
      throw error;
    } finally {
      setLoader(false);
    }
  }

  async function deleteFaq() {
    try {
      await deleteFaqApi(deleteId);
      getFaqList();
      handleClose();
      toast.success("Deleted Successfully!");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  useEffect(() => {
    clearTimeout(timer);
    const delay = setTimeout(() => {
      getFaqList();
    }, 500);
    setTimer(delay);
    return () => clearTimeout(delay);
  }, [query, category, paginationModel]);

  const columns = [
    {
      field: "category",
      headerName: "Category",
      width: 150,
      renderCell: (params) => (
        <>
          <p className="text-dark fs-16">{params?.row?.category}</p>
        </>
      ),
    },
    {
      field: "question",
      headerName: "Question",
      width: 250,
      renderCell: (params) => {
        return (
          <p
            className="mb-0 text-capitalize fs-16"
          >
            {params?.row?.question}
          </p>
        );
      },
    },
    {
      field: "answers",
      headerName: "Answer",
      width: 500,
      renderCell: (params) => (
        <div
          className="text-dark fs-16"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(params?.row?.answers),
          }}
        />
      ),
    },

    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <Link to="/admin/edit-faq" state={params?.row}>
          <button className="btn btn-profile-edit d-inline-block">
            <Edit2 size="20" />
          </button>
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <button
          className="btn btn-profile-delete d-inline-block"
          onClick={() => {
            setOpen(true);
            setDeleteId(params?.row?._id);
          }}
        >
          <Trash size="20" />
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
          rows={faqData}
          columns={columns}
          rowCount={count}
          rowHeight={100}
          pagination
          getRowId={(row) => faqData.indexOf(row)}
          paginationMode="server"
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
        deleteData={deleteFaq}
      />
    </>
  );
}
