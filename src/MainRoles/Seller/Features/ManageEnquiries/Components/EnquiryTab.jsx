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
import { enquiryListApi, viewInquiryApi } from "@/ApiRoutes/SellerApis";
import { setPropertyId, setPropertyName, setSenderId, setSenderName, setShowModal } from "@/Redux/Chat/chatSlice";
import { Link } from "react-router-dom";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import chat from "@/public/assets/images/profile/chat-black.svg";
import copy from "@/public/assets/images/icons/copy.svg";
import direction from "@/public/assets/images/manage-property/direction-arrow.svg";
import { toast } from "react-toastify";
import SubscriptionModal from "@/components/Modals/SubscriptionModal";
import { selectUser } from "@/Redux/Auth/authSlice";
import { formatDateTime, navigateToDetail } from "@/CustomServices/Constant";
import SubscriptionAlert from "@/components/Modals/SubscriptionAlert";
import { toastMessage } from "@/CustomServices/ToastMessage";


function EnquiryTab() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  const [enquiryList, setEnquiryList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const message = "If you want to know the contact details of Enquiries, Please contact us"
   
  const [filters, setFilters] = useState({
    search: "",
    timePeriod: ""
  })
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });

  function handleFilterChange(e) {

    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }


  async function handleReadStatus(id) {
    try {
      const response = await viewInquiryApi({ inquiryId: id });
      const { status, message } = response.data
      if (status === 200) {
        const updatedList = enquiryList?.map((item) =>
          item._id === id ? { ...item, status: "read" } : item
        );
        setEnquiryList(updatedList);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setShow(true)
      }
    }
  }

  async function manageEnquiry() {
    try {
      setLoader(true)
      const response = await enquiryListApi({ ...filters, ...paginationModel });
      const { status } = response.data;
      setEnquiryList(response.data.data.data);
      setCount(response.data.data.pageMeta.total);
    } catch (error) {
      toastMessage()
    } finally {
      setLoader(false)
    }
  }

  function startChat(data) {
    if (!user.subscription) {
      setShow(true)
      return
    }
    dispatch(setPropertyId(data.propertyId))
    dispatch(setPropertyName(data.Property))
    dispatch(setSenderName(data.Customer))
    dispatch(setSenderId(data.buyerId))
    dispatch(setShowModal(true))
  }

  const columns = [
    {
      id: 1, field: "Customer", headerName: "Customer", width: 200,
      renderCell: (params) => {
        return (
          <div className="d-flex gap-2 align-items-center">
            <Avatar sx={{ bgcolor: "#F4F6F8", color: "#919EAB", border: "1px solid #919EAB" }}>
              {params?.row?.Customer?.slice(0, 1)}
            </Avatar>
            <p className="mb-0 text-capitalize">{params?.row?.Customer}</p>
          </div>
        );
      },
    },
    {
      id: 2, field: "Property", headerName: "Property", width: 200,
      renderCell: (params) => (
        <Link className="fs-20 text-green-hover" to={navigateToDetail(params.row.propertyType, params.row.Property, params.row.propertyCode)} target="_blank">{params.value} <span><img className="mb-1" style={{ width: ".8rem" }} src={direction} alt="icon" /></span></Link>
      ),
    },
    {
      field: "createdAt",
      headerName: "Date",
      width: 300,
      renderCell: (params) => (
        <p className="fs-16 m-0">
          {params.row.createdAt ? formatDateTime(params.row.createdAt) : "N/A"}
        </p>
      ),
    },
    {
      id: 4,
      field: "Email",
      headerName: "Email",
      width: 300,
      renderCell: (params) => {
        if (!user.subscription) {
          return (
            <button
              onClick={() => setShow(true)}
              className="btn btn-dark px-4" style={{ borderRadius: ".8rem", fontWeight: "500" }}
            >
              View
            </button>
          );
        } else {
          return (<p>{params.value}
            <CopyToClipboard
              text={params.value}
              onCopy={() => toast.success("Text copied")}>
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
            </CopyToClipboard> </p>);
        }
      },
    },
    {
      id: 5,
      field: "mobileNumber",
      headerName: "Mobile Number",
      width: 200,
      renderCell: (params) => {
        if (!user.subscription) {
          return (
            <button
              onClick={() => setShow(true)}
              className="btn btn-dark px-4" style={{ borderRadius: ".8rem", fontWeight: "500" }}
            >
              View
            </button>
          );
        } else {
          return (<p>{params.value} <CopyToClipboard
            text={params.value}
            onCopy={() => toast.success("Text copied")}>
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
          </CopyToClipboard> </p>);
        }
      },
    },
    {
      id: 6,
      field: "Chat",
      headerName: "Chat",
      width: 120,
      renderCell: ({ row }) => (
        <button className="btn btn-profile-edit d-inline-block px-2 " onClick={() => startChat(row)}>
          <img className="img-fluid" src={chat} alt="chat" />
        </button>
      ),
    },
  ];


  useEffect(() => {
    clearTimeout(timer);
    const delay = setTimeout(() => {
      manageEnquiry()
    }, 500);
    setTimer(delay);
    return () => clearTimeout(delay);

  }, [filters, paginationModel]);

  return (
    <div style={{ minHeight: "400px" }}>
      <div className="p-3 search__ d-flex align-items-center">
        <div className="" style={{ width: "20%" }}>
          <TextField
            label="Search by name and city"
            variant="outlined"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
          />
        </div>

        <div className="mx-2" style={{ width: "15%" }}>
          <FormControl fullWidth variant="outlined" className="">
            <InputLabel id="demo-simple-select-label">Time Period</InputLabel>
            <Select
              labelId=""
              label="Time Period"
              name="timePeriod"
              value={filters.timePeriod}
              onChange={handleFilterChange}
              MenuProps={{
                disableScrollLock: true,
              }}
            >
              <MenuItem value={"weekly"}>Weekly</MenuItem>
              <MenuItem value={"monthly"}>Monthly</MenuItem>
              <MenuItem value={"quaterly"}>Quaterly</MenuItem>
              <MenuItem value={""}>All</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <div style={{ height: 580, width: "100%" }} className="ms-0 table-container custom-table-style">
        <DataGrid
          rows={enquiryList}
          columns={columns}
          rowHeight={100}
          rowCount={count}
          getRowId={(row) => enquiryList.indexOf(row)}
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
          disableRowSelectionOnClick
        />
      </div>
      {/* <SubscriptionModal show={show} handleClose={handleClose} /> */}
      <SubscriptionAlert open={show} handleClose={handleClose} message={message} />
    </div>
  );
}

export default EnquiryTab;