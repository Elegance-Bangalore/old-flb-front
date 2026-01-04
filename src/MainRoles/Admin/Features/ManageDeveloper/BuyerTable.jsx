import React, { useEffect, useState } from "react";
import { Avatar, Box, FormControlLabel, Switch } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import editIcon from "@/public/assets/images/profile/profile-edit.svg";
import deleteIcon from "@/public/assets/images/profile/delete-profile.svg";
import copy from "@/public/assets/images/icons/copy.svg";
import {
  deleteDeveloperProfileApi,
  getBuyerListApi,
} from "@/ApiRoutes/AdminApi";
import { toastMessage } from "@/CustomServices/ToastMessage";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import DeleteModal from "@/components/Modals/DeleteModal";
import { formatDateTime } from "@/CustomServices/Constant";

function BuyerTable({ paginationModel, setPaginationModel, filters }) {
  const [buyerList, setBuyerList] = useState([]);
  const [timer, setTimer] = useState(null);
  const [loader, setLoader] = useState(true);
  const [deleteId, setDeleteId] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [count, setCount] = useState(0);

  async function getBuyerList() {
    try {
      setLoader(true);
      const response = await getBuyerListApi({
        ...paginationModel,
        ...filters,
      });
      setBuyerList(response?.data?.buyers);
      setCount(response?.data?.count);
    } catch (error) {
      toastMessage();
    } finally {
      setLoader(false);
    }
  }
  async function deleteDeveloperProfile() {
    try {
      await deleteDeveloperProfileApi({
        userId: deleteId,
        deleteOption: "completeDelete",
      });
      toastMessage(200, "Profile Deleted Successfully");
      handleClose();
      getBuyerList();
    } catch (error) {
      toastMessage();
    }
  }

  useEffect(() => {
    clearTimeout(timer);
    const delay = setTimeout(() => {
      getBuyerList();
    }, 500);
    setTimer(delay);
    return () => clearTimeout(delay);
  }, [filters, paginationModel]);

  const columns = [
    {
      field: "fullName",
      headerName: "Name",
      width: 220,
      renderCell: (params) => (
        <Link
          to="/admin/edit-developer-profile"
          state={{ ...params?.row, scrollBottom: false }}
        >
          <div className="d-flex gap-2 align-items-center">
            <Avatar
              sx={{
                bgcolor: "#F4F6F8",
                color: "#919EAB",
                border: "1px solid #919EAB",
              }}
            >
              {params?.row?.fullName?.slice(0, 1)}
            </Avatar>
            <p className="mb-0 text-capitalize fs-16">
              {params?.row?.fullName ? params?.row?.fullName : "---"}
            </p>
          </div>
        </Link>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 220,
      renderCell: (params) => (
        <>
          <p className="text-dark fs-16">
            {params?.row?.email}
            <CopyToClipboard
              text={params?.row?.email}
              onCopy={() => toast.success("Text copied")}
            >
              <button className="btn border-0 px-1">
                <img
                  className="mb-2"
                  style={{ width: "1.2rem" }}
                  src={copy}
                  alt="copy"
                />
              </button>
            </CopyToClipboard>
          </p>
        </>
      ),
    },
    {
      field: "Mobile",
      headerName: "Mobile Numbers",
      width: 150,
      renderCell: (params) => (
        <p className="text-dark fs-16">
          {params?.row?.phone}
          <CopyToClipboard
            text={params?.row?.phone}
            onCopy={() => toast.success("Text copied")}
          >
            <button className="btn border-0 px-1">
              <img
                className="mb-2"
                style={{ width: "1.2rem" }}
                src={copy}
                alt="copy"
              />
            </button>
          </CopyToClipboard>
        </p>
      ),
    },
  
    {
      field: "createdAt",
      headerName: "Created At",
      width: 230,
      renderCell: (params) => (
        <p className="fs-16 m-0">
          {params.row.createdAt ? formatDateTime(params.row.createdAt) : "N/A"}
        </p>
      ),
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 230,
      renderCell: (params) => (
        <p className="fs-16 m-0">
          <p className="fs-16 m-0">
            {params.row.updatedAt
              ? formatDateTime(params.row.updatedAt)
              : "N/A"}
          </p>
        </p>
      ),
    },

    {
      field: "delete",
      headerName: "Delete",
      width: 60,
      renderCell: (params) => (
        <button
          className="btn btn-profile-delete d-inline-block"
          onClick={() => {
            setDeleteId(params?.row?._id);
            setOpen(true);
          }}
        >
          <img className="img-fluid" src={deleteIcon} alt="" />
        </button>
      ),
    },
  ];

  return (
    <div style={{ height: 570, width: "100%" }} className="custom-table-style">
      <DataGrid
        rows={buyerList || []}
        columns={columns}
        getRowId={(row) => buyerList?.indexOf(row)}
        rowHeight={80}
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
        checkboxSelection={false}
        onPaginationModelChange={setPaginationModel}
        paginationModel={paginationModel}
        cellSelection={false}
        disableRowSelectionOnClick
      />
      <DeleteModal
        open={open}
        handleClose={handleClose}
        deleteData={deleteDeveloperProfile}
      />
    </div>
  );
}

export default BuyerTable;
