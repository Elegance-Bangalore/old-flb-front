import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { formatDateTime } from "@/CustomServices/Constant";
import { Copy } from "iconsax-react";
import { toast } from "react-toastify";
import { FaRegCopy } from "react-icons/fa6";

function DeveloperAnalyticsTable({
  developers,
  count,
  paginationModel,
  setPaginationModel,
  loader,
}) {
  const columns = [
    {
      field: "companyName",
      headerName: "Developer Name",
      width: 300,
      renderCell: (params) => (
        <div className="d-flex gap-2 align-items-center">
          <Avatar
            sx={{
              bgcolor: "#F4F6F8",
              color: "#919EAB",
              border: "1px solid #919EAB",
            }}
          >
            {params?.row?.companyName?.slice(0, 1)}
          </Avatar>
          <p className="mb-0 text-capitalize fs-16">
            {params?.row?.companyName
              ? params?.row?.companyName
              : params?.row?.fullName}
          </p>
        </div>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 350,
      renderCell: (params) => (
        <>
          <p className="text-dark fs-16">
            {params?.row?.email}
            <CopyToClipboard
              text={params?.row?.email}
              onCopy={() => toast.success("Text copied")}
            >
              <button className="btn border-0 px-1">
                <FaRegCopy />
              </button>
            </CopyToClipboard>
          </p>
        </>
      ),
    },
    {
      field: "Mobile",
      headerName: "Mobile Numbers",
      width: 300,
      renderCell: (params) => (
        <p className="text-dark fs-16">
          {params?.row?.phone}
          <CopyToClipboard
            text={params?.row?.phone}
            onCopy={() => toast.success("Text copied")}
          >
            <button className="btn border-0 px-1">
              <FaRegCopy />
            </button>
          </CopyToClipboard>
        </p>
      ),
    },
    {
      field: "createdAt",
      headerName: "Time Stamp",
      width: 270,
      renderCell: (params) => (
        <span>{formatDateTime(params?.row.createdAt)}</span>
      ),
    },
  ];

  return (
    <div className="custom-table-style">
      <Box sx={{ height: "40rem", width: "100%" }}>
        <DataGrid
          rows={developers || []}
          columns={columns}
          getRowId={(row) => developers?.indexOf(row)}
          pagination
          rowCount={count}
          paginationMode="server"
          className="custom-header"
          pageSizeOptions={[20, 50, 100]}
          onPaginationModelChange={setPaginationModel}
          paginationModel={paginationModel}
          checkboxSelection={false}
          disableRowSelectionOnClick
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
        />
      </Box>
    </div>
  );
}

export default DeveloperAnalyticsTable;
