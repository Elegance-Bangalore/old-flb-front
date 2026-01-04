import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { propertyAnalyticsApi } from "@/ApiRoutes/AdminApi";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";

function PropertyAnalyticsTable({
  properties,
  count,
  paginationModel,
  setPaginationModel,
  loader,
}) {
  const columns = [
    {
      field: "propertyTitle",
      headerName: "Property Name",
      width: 270,
    },
    {
      field: "propertyStatus",
      headerName: "Status",
      width: 200,
      renderCell: (params) => (
        <span
          style={{
            color: params.value === "available" ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {params.value.charAt(0).toUpperCase() + params.value.slice(1)}
        </span>
      ),
    },
    {
      field: "propertyViewCount",
      headerName: "Views",
      width: 200,
    },
    {
      field: "shortlistedCount",
      headerName: "Shortlisted",
      width: 200,
    },
    {
      field: "inquiriesCount",
      headerName: "Enquiries",
      width: 200,
    },
    {
      field: "visitedCount",
      headerName: "Site Visits",
      width: 200,
    },
    {
      field: "chatsCount",
      headerName: "Chats",
      width: 200,
    },
  ];

  return (
    <div className="custom-table-style">
      <Box sx={{ height: 550, width: "100%" }}>
        <DataGrid
          rows={properties || []}
          columns={columns}
          getRowId={(row) => row._id}
          pagination
          rowCount={count}
          paginationMode="server"
          className="custom-header"
          pageSizeOptions={[20, 50]}
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

export default PropertyAnalyticsTable;
