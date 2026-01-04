import React, { useCallback, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import editIcon from "@/public/assets/images/profile/profile-edit.svg";
import deleteIcon from "@/public/assets/images/profile/delete-profile.svg";
import propertyImage from "@/public/assets/images/manage-property/property.png";
import direction from "@/public/assets/images/manage-property/direction-arrow.svg";
import { Link } from "react-router-dom";
import {
  archivePropertyApi,
  deletePropertyApi,
  getPropertyListAdminApi,
  updateApprovalApi,
  updatePropertyStatusApi,
} from "@/ApiRoutes/AdminApi";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { Box } from "@mui/material";
import { sassTrue } from "sass";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { FormControlLabel, Switch } from "@mui/material";
import { formatDateTime, formatPropertyType } from "@/CustomServices/Constant";


export default function PostPropertyListTable({
  filters,
  paginationModel,
  handlePaginationChange
}) {
  const [propertyList, setPropertyList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(null);
  const [deleteId, setDeleteId] = useState("");
  const [opan, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  // const [paginationModel, setPaginationModel] = useState({
  //   page: 0,
  //   pageSize: 20,
  // });

  async function getPropertyList() {
    try {
      setLoader(true);
      const response = await getPropertyListAdminApi({
        // ...paginationModel,
        // search,
        // propertyApproval,
        // propertyType,
        ...paginationModel,
        ...filters,
        isDeleted: false,
      });
      setPropertyList(response?.data?.res);
      setCount(response?.data?.filterCount);
    } catch (error) {
      throw error
    } finally {
      setLoader(false);
    }
  }

  async function archiveProperty(id) {
    try {
      const response = await archivePropertyApi(id);
      getPropertyList();
      toastMessage(200, "Done");
    } catch (error) {
      throw error
    }
  }
  async function handlePropertyStatusChange(id, newValue) {
    try {
      setLoader(true);
      await updatePropertyStatusApi(id, { propertyStatus: newValue });
      setPropertyList((prevPropertyList) =>
        prevPropertyList.map((property) =>
          property._id === id
            ? { ...property, propertyStatus: newValue }
            : property
        )
      );
    } catch (error) {
    } finally {
      setLoader(false);
    }
  }

  async function handlePropertyApprovalChange(id, newValue) {
    try {
      setLoader(true);
      await updateApprovalApi(id, { propertyApproval: newValue });
      setPropertyList((prevPropertyList) =>
        prevPropertyList.map((property) =>
          property._id === id
            ? { ...property, propertyApproval: newValue }
            : property
        )
      );
      toastMessage(200, `${newValue} Successfully`);
    } catch (error) {

      toastMessage();
    } finally {
      setLoader(false);
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "input-resolved";
      case "Reject":
        return "input-reject";
      case "IN_Review":
        return "input-inreview";
      default:
        return "";
    }
  };

  const columns = [
    {
      field: "heroImage",
      headerName: "Image",
      width: 200,
      renderCell: (params) => (
        <img
          src={params?.row?.heroImage}
          alt="img"
          style={{
            width: "120px",
            height: "80px",
            aspectRatio: "1/1",
            borderRadius: "5px",
            marginLeft: "10px",
          }}
        />
      ),
    },
    {
      field: "propertyTitle",
      headerName: "Title",
      width: 250,
      renderCell: (params) => (
        <>
          <Link
            className="text-green-hover"
            to={`/admin/property-preview/${params.row.propertyCode}`}
            target="_blank"
            style={{
              display: "inline",
              marginBottom: 0,
              fontSize: "1.1rem",
              fontWeight: "500",
              color: "#212B36",
              lineHeight: 1,
            }}
          >
            {params?.row?.propertyTitle}
            <span className="ms-2">
              <img
                className="mb-1"
                style={{ width: ".8rem" }}
                src={direction}
                alt="icon"
              />
            </span>
          </Link>
        </>
      ),
    },
    {
      field: "developer",
      headerName: "Developer",
      width: 250,
      cellClassName: "text-dark fs-16 text-capitalize",
      renderCell: (params) => (
        <p className="fs-16 m-0">
          {params.row.postedBy?.companyName || params.row.postedBy?.fullName}
        </p>
      ),
    },
    {
      field: "propertyType",
      headerName: "Property type",
      width: 200,
      renderCell: (params) => (
        <p className="fs-16 m-0">
          {formatPropertyType(params.row.propertyType)}
        </p>
      ),
    },
    {
      field: "city",
      headerName: "Location",
      width: 150,
      cellClassName: "text-dark fs-16 text-capitalize",
    },  
    {
      field: "createdAt",
      headerName: "Created At",
      width: 300,
      renderCell: (params) => (
        <p className="fs-16 m-0">
          {params.row.createdAt ? formatDateTime(params.row.createdAt) : "N/A"}
        </p>
      ),
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 300,
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
      field: "propertyStatus",
      headerName: "Availability",
      width: 250,
      renderCell: (params) => (
        <select
          value={params.row.propertyStatus}
          className={`bg-transparent form-select ${
            params.row.propertyStatus === "available"
              ? "input-green"
              : "input-red"
          } custom-select`}
          onChange={(e) =>
            handlePropertyStatusChange(params.row._id, e.target.value)
          }
        >
          <option value="" hidden className="">
            Select Status
          </option>
          <option value="available" className="available">
            Available
          </option>
          <option value="sold-out" className="sold">
            Sold
          </option>
        </select>
      ),
    },
    {
      field: "propertyApproval",
      headerName: "Property Approval",
      width: 250,
      renderCell: (params) => (
        <select
          value={params.row.propertyApproval}
          className={`bg-transparent form-select ${getStatusColor(
            params.row.propertyApproval
          )} custom-select`}
          onChange={(e) =>
            handlePropertyApprovalChange(params.row._id, e.target.value)
          }
        >
          <option value="IN_Review" className="inreview">
            IN_Review
          </option>
          <option value="Resolved" className="resolved">
            Approved
          </option>
          <option value="Reject" className="reject">
            Reject
          </option>
        </select>
      ),
    },

    {
      field: "isDeleted",
      headerName: "Archive",
      width: 120,
      renderCell: (params) => (
        <FormControlLabel
          control={<Switch checked={params.row.isDeleted} />}
          labelPlacement="start"
          onChange={() => archiveProperty(params.row._id, params)}
        />
      ),
    },

    {
      field: "edit",
      headerName: "Edit",
      width: 120,
      renderCell: (params) => (
        <Link to={`/admin/edit-property/${params?.row?.propertyCode}`}>
          <button className="btn btn-profile-edit d-inline-block" type="button">
            <img className="img-fluid" src={editIcon} alt="editIcon" />
          </button>
        </Link>
      ),
    },
    
  ];

  useEffect(() => {
    clearTimeout(timer);
    const delay = setTimeout(() => {
      getPropertyList();
    }, 500);
    setTimer(delay);
    return () => clearTimeout(delay);
  }, [paginationModel, filters]);

  return (
    <>
      <div style={{ height: 650, width: "100%" }} className="custom-table-style">
        <DataGrid
          rows={propertyList}
          columns={columns}
          getRowId={(row) => propertyList.indexOf(row)}
          rowHeight={130}
          rowCount={count}
          pagination
          paginationMode="server"
          className="custom-header"
          pageSizeOptions={[20, 50,100]}
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
          onPaginationModelChange={handlePaginationChange}
          paginationModel={paginationModel}
          cellSelection={false}
          disableRowSelectionOnClick
        />
      </div>
    </>
  );
}
