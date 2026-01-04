import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { propertyAnalyticsApi } from "@/ApiRoutes/AdminApi";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { formatDateTime } from "@/CustomServices/Constant";

function RecentActivityTable({
  activities,
  count,
  paginationModel,
  setPaginationModel,
  loader,
}) {
  const columns = [
    {
      field: "type",
      headerName: "Activity Type",
      width: 230,
    },
    {
      field: "entity",
      headerName: "Entity Name",
      width: 300,
    },
    {
      field: "userName",
      headerName: "Username",
      width: 200,
    },
    {
      field: "updatedAt",
      headerName: "Time Stamp",
      width: 270,
      renderCell: (params) => (
        <span>{formatDateTime(params?.row.updatedAt)}</span>
      ),
    },
    {
      field: "message",
      headerName: "Detail",
      width: 350,
    },
  ];


  return (
    <div className="custom-table-style">
      <Box sx={{ height: "45rem", width: "100%" }}>
        <DataGrid
          rows={activities || []}
          columns={columns}
          getRowId={(row) => activities.indexOf(row)}
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

export default RecentActivityTable;
