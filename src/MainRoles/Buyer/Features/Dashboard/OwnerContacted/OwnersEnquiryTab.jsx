import {
  Avatar,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { ownersContractedApi } from "@/ApiRoutes/BuyersApi";
import {
  setPropertyId,
  setPropertyName,
  setSenderId,
  setSenderName,
  setShowModal,
} from "@/Redux/Chat/chatSlice";
import { Link } from "react-router-dom";
import chat from "@/public/assets/images/profile/chat-black.svg";
import copy from "@/public/assets/images/icons/copy.svg";
import direction from "@/public/assets/images/manage-property/direction-arrow.svg";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { agricultureLand, Estates, farmhouse, farmland, formatNumberInCr, navigateToDetail } from "@/CustomServices/Constant";

function OwnersEnquiryTab() {
  const [updatedEnquiryList, setUpdatedEnquiryList] = useState([]);
  const [count, setCount] = useState(0)
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true)

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });

  const [filters, setFilters] = useState({
    status: "",
    propertyType: ""
  })

  async function ownersContractedList() {
    try {
      setLoader(true)
      const response = await ownersContractedApi({ ...filters, ...paginationModel });
      setUpdatedEnquiryList(response?.data?.data?.data);
      setCount(response?.data?.data?.pageMeta?.total)
    } catch (error) {
      throw error;
    } finally {
      setLoader(false)
    }
  }

  function startChat(data) {
    dispatch(setPropertyId(data.propertyId));
    dispatch(setPropertyName(data.Property));
    dispatch(setSenderName(data.Seller));
    dispatch(setSenderId(data.SellerId));
    dispatch(setShowModal(true));
  }
 
  const columns = [
    {
      id: 1,
      field: "Seller",
      headerName: "Seller",
      width: 250,
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
              {params?.row?.Seller?.slice(0, 1)}
            </Avatar>
            <p className="mb-0">{params?.row?.Seller}</p>
          </div>
        );
      },
    },
    {
      id: 2,
      field: "Property",
      headerName: "Property",
      width: 300,
      renderCell: (params) => (
        <>
          <Link
            className="text-green-hover fs-6"
            to={navigateToDetail(params.row.propertyType, params.row.Property, params.row.propertyCode)} target="_blank"
            style={{
              display: "block",
              marginBottom: 0,
              height: "20px",
              marginTop: "2rem",
              lineHeight: 1,
            }}
          >
            {params.value}{" "}
            <span>
              <img
                className="mb-1"
                style={{ width: ".8rem" }}
              src={direction}
                alt="icon"
              />
            </span>
          </Link>
          <p className="ms-2" style={{ margin: "", lineHeight: 3 }}>
          {params.row.totalAcre} {params.row.plotArea ? `${params.row.plotArea}` : "acre"} - {formatNumberInCr(params.row.price)}
          </p>
        </>
      ),
    },
    { id: 3, field: "Date", headerName: "Date", width: 130 , renderCell: (params) => <p>{params.value}</p>},
    {
      id: 4,
      field: "Email",
      headerName: "Email",
      width: 230,
      renderCell: (params) => {
        return (
          <p>
            {params.value}
            <CopyToClipboard
              text={params.value}
              onCopy={() => toast.success("Text copied")}
            >
              <button
                className="btn border-0 px-1"
              // onClick={copyToClipboard(params.value)}
              >
                <img
                  className="mb-2"
                  style={{ width: "1.2rem" }}
                  src={copy}
                  alt="copy"
                />
              </button>
            </CopyToClipboard>
          </p>
        );
      },
    },
    {
      id: 5,
      field: "mobileNumber",
      headerName: "Mobile",
      width: 230,
      renderCell: (params) => {
        return (
          <p>
            {params.value}
            <CopyToClipboard
              text={params.value}
              onCopy={() => toast.success("Text copied")}
            >
              <button
                className="btn border-0 px-1"
              >
                <img
                  className="mb-2"
                  style={{ width: "1.2rem" }}
                  src={copy}
                  alt="copy"
                />
              </button>
            </CopyToClipboard>
          </p>
        );
      },
    },
    {
      id: 6,
      field: "Chat",
      headerName: "Chat",
      width: 120,
      renderCell: ({ row }) => (
        <button
          className="btn btn-profile-edit d-inline-block px-2 "
          onClick={() => startChat(row)}
        >
          <img className="img-fluid" src={chat} alt="chat" />
        </button>
      ),
    },
  ];

  useEffect(() => {
    ownersContractedList();
  }, [filters, paginationModel]);

  return (
    <div style={{ minHeight: "400px" }} className="custom-table-style">
      <div className="row mx-md-4 my-3">
        <div className="col-md-4 mb-3 mb-lg-0">
          <div className="btn-frame">
            <input
              id="toggle-on"
              className="toggle toggle-left"
              name="toggle"
              value="false"
              type="radio"
              checked={filters.status === "available"}
              onChange={() => setFilters((prev) => ({ ...prev, status: "available" }))}
              hidden
            />
            <label htmlFor="toggle-on" className="btn-pri left">
              Currently Available
            </label>
            <input
              id="toggle-off"
              className="toggle toggle-right"
              name="toggle"
              value="true"
              type="radio"
              checked={filters.status === ""}
              // onChange={() => dispatch(addStatus(""))}
              onChange={() => setFilters((prev) => ({ ...prev, status: "" }))}
              hidden
            />
            <label htmlFor="toggle-off" className="btn-pri right">
              All Properties
            </label>
          </div>
        </div>
        <div className="col-md-4">
          <Box>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="demo-simple-select-label">
                Property Type
              </InputLabel>
              <Select
                labelId=""
                label="Property Type"
                name="propertyType"
                value={filters.propertyType}
                onChange={(e) => setFilters((prev) => ({ ...prev, propertyType: e.target.value }))}
                MenuProps={{
                  disableScrollLock: true,
                }}
              >
                <MenuItem value={""}>All</MenuItem>
                <MenuItem value={farmhouse}>Farmhouse</MenuItem>
                <MenuItem value={farmland}>Farmland</MenuItem>
                <MenuItem value={Estates}>Estates</MenuItem>
                <MenuItem value={agricultureLand}>Agriculture Land</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
      <div
        style={{ height: 580, width: "100%" }}
        className="ms-0 table-container"
      >
        {/* <DataGrid
          className="table-enq mx-3"
          rows={updatedEnquiryList}
          columns={columns}
          rowHeight={100}
          getRowId={(row) => updatedEnquiryList.indexOf(row)}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        /> */}
        <DataGrid
          rows={updatedEnquiryList}
          columns={columns}
          rowHeight={100}
          rowCount={count}
          getRowId={(row) => updatedEnquiryList.indexOf(row)}
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
          checkboxSelection
        />
      </div>
    </div>
  );
}

export default OwnersEnquiryTab;
