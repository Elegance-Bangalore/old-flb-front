import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Link } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import {
  adminGeneralEnquiryApi,
  deleteEnquiryApi,
  deleteGeneralEnquiryApi,
} from "@/ApiRoutes/AdminApi";
import DeleteModal from "@/components/Modals/DeleteModal";
import { Copy, Data, DocumentCopy, Messages, Trash } from "iconsax-react";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { Box } from "@mui/material";
import { formatDate, formatDateTime } from "@/CustomServices/Constant";
import AddEnquirieModal from "@/components/Modals/AddEnquirieModal";
import { toastMessage } from "@/CustomServices/ToastMessage";

export default function GeneralEnqueriesTable({ search, sort }) {
  const [enquiryList, setEnquiryList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const handleClose = () => {
    setOpen(false);
    setEnquiryModal(false);
  };
  const [data, setData] = useState([]);
  const [enquiryModal, setEnquiryModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [timer, setTimer] = useState(null);
  const [count, setCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });
  const shouldIncludeMessagesColumn = !data.some((row) => row.reply);


  async function getEnquiryList() {
    try {
      const filters = { search, sort, ...paginationModel };
      const response = await adminGeneralEnquiryApi(filters);
      setEnquiryList(response?.data?.inquiries);
      setCount(response?.data?.count);
    } catch (error) {
      toastMessage();
    }
  }

  useEffect(() => {
    clearTimeout(timer);
    const delay = setTimeout(() => {
      getEnquiryList();
    }, 500);
    setTimer(delay);
    return () => clearTimeout(delay);
  }, [paginationModel, search, sort]);

  const columns = [
    {
      field: "mame",
      headerName: "Name",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="d-flex gap-2 align-items-center">
            <Avatar
              sx={{
                bgcolor: "#F4F6F8",
                color: "#919EAB",
                border: "1px solid #919EAB",
              }}
            >
              {params?.row?.name.slice(0, 1)}
            </Avatar>
            <p className="mb-0 text-capitalize fs-16">{params?.row?.name}</p>
          </div>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Date",
      width: 300,
      renderCell: (params) => (
        <>
          <Link
            className="text-green-hover text-dark fs-16"
            to="#"
            style={{
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            {formatDateTime(params?.row?.createdAt)}
          </Link>
        </>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
      renderCell: (params) => (
        <>
          <Link
            className="text-green-hover text-dark fs-16"
            to="#"
            style={{
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            {params?.row?.email}
          </Link>
        </>
      ),
    },
    {
      field: "phone",
      headerName: "Mobile Number",
      width: 350,
      renderCell: (params) => (
        <>
          <p className="text-dark fs-16">
            {params?.row?.phone}
            <CopyToClipboard
              text={params?.row?.phone}
              onCopy={() => toast.success("Text copied")}
            >
              <button className="btn border-0 px-1">
                <DocumentCopy className="ms-2" size={16} />
              </button>
            </CopyToClipboard>
          </p>
        </>
      ),
    },
    {
      field: "message",
      headerName: "Message",
      width: 300,
      renderCell: (params) => (
        <>
          <p className="text-dark fs-16">{params?.row?.message}</p>
        </>
      ),
    },
    {
      field: "reply",
      headerName: "Reply",
      width: 300,
      renderCell: (params) => (
        <>
          <p className="text-dark fs-16">{params?.row?.reply || "----"}</p>
        </>
      ),
    },
    {
      field: "",
      headerName: "",
      width: 80,
      renderCell: (params) => (
        <Messages
          onClick={() => {
            setEnquiryModal(true);
            setRowData(params.row);
          }}
          style={{ cursor: "pointer" }}
        />
      ),
    },
    {
      field: "delete",
      headerName: "",
      width: 60,
      renderCell: (params) => (
        <button
          className="btn btn-profile-delete d-inline-block"
          onClick={() => {
            setOpen(true);
            setDeleteId(params.row._id);
          }}
        >
          <Trash />
        </button>
      ),
    },
  ];

  async function deleteEnquiry() {
    try {
      const response = await deleteGeneralEnquiryApi(deleteId);
      handleClose();
      getEnquiryList();
    } catch (error) {
      toastMessage();
    }
  }

  return (
    <>
      <div
        style={{ height: 620, width: "100%" }}
        className="custom-table-style"
      >
        <DataGrid
          rows={enquiryList}
          columns={columns}
          getRowId={(row) => enquiryList.indexOf(row)}
          rowHeight={130}
          rowCount={count}
          pagination
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
          checkboxSelection
          onPaginationModelChange={setPaginationModel}
          paginationModel={paginationModel}
          cellSelection={false}
          disableRowSelectionOnClick
        />
      </div>

      <DeleteModal
        open={open}
        handleClose={handleClose}
        deleteData={deleteEnquiry}
      />
      <AddEnquirieModal
        show={enquiryModal}
        getEnquiryList={getEnquiryList}
        rowData={rowData}
        handleClose={handleClose}
      />
    </>
  );
}
