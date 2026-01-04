import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import {
  formatDateTime,
  formatPropertyType,
  navigateToDetail,
} from "@/CustomServices/Constant";
import { Link } from "react-router-dom";
import {
  archivePropertyApi,
  updateApprovalApi,
  updatePropertyStatusApi,
} from "@/ApiRoutes/AdminApi";
import direction from "@/public/assets/images/manage-property/direction-arrow.svg";
import editIcon from "@/public/assets/images/profile/profile-edit.svg";
import { FormControlLabel, Switch } from "@mui/material";
import { toastMessage } from "@/CustomServices/ToastMessage";

function RecentlyAdded({
  propertyList,
  setPropertyList,
  link,
  role = "seller",
}) {
  const [loader, setLoader] = useState(false);

  const columns = [
    {
      field: "heroImage",
      headerName: "Image",
      width: 300,
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
      width: 300,
      renderCell: (params) => (
        <>
          <Link
            className="text-green-hover"
            to={navigateToDetail(
              params.row.propertyType,
              params.row.propertyTitle,
              params.row.propertyCode
            )}
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
          </Link>
        </>
      ),
    },
    {
      field: "propertyType",
      headerName: "Property type",
      width: 300,
      cellClassName: "text-dark fs-16",
    },
    {
      field: "city",
      headerName: "Location",
      width: 300,
      cellClassName: "text-dark fs-16",
    },

    {
      field: "propertyStatus",
      headerName: "Status",
      width: 300,
      cellClassName: "text-dark fs-16",
    },
  ];

  async function archiveProperty(id) {
    try {
      const response = await archivePropertyApi(id);
      setPropertyList((prevPropertyList) =>
        prevPropertyList.map((property) =>
          property._id === id
            ? { ...property, isDeleted: !property.isDeleted }
            : property
        )
      );
    } catch (error) {
      toastMessage();
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

  const columnsTwo = [
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
      width: 60,
      renderCell: (params) => (
        <Link to={`/admin/edit-property/${params?.row?.propertyCode}`}>
          <button className="btn btn-profile-edit d-inline-block" type="button">
            <img className="img-fluid" src={editIcon} alt="editIcon" />
          </button>
        </Link>
      ),
    },
  ];

  return (
    <>
    {/* Anchan */}
    
          <div className="custom-table-style">
            <Box sx={{ height: 500, width: "100%" }}>
              
              <DataGrid
                rows={propertyList || []}
                columns={role === "admin" ? columnsTwo : columns}
                rowHeight={130}
                getRowId={(row) => row?._id}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 20,
                    },
                  },
                }}
                pageSizeOptions={[20,50,100]}
                checkboxSelection
                disableRowSelectionOnClick
                cellSelection={false}
              />
            </Box>
          </div>
    </>
  );
}

export default RecentlyAdded;
