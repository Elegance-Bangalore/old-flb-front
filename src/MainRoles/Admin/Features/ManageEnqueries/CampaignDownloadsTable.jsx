import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Chip } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { Copy } from "iconsax-react";
import { Download as DownloadIcon } from "@mui/icons-material";
import { formatDateTime } from "@/CustomServices/Constant";

export default function CampaignDownloadsTable({
  downloadsList,
  getDownloadsList,
  paginationModel,
  setPaginationModel,
}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const enrichedDownloadsList = downloadsList?.map((item, index) => ({
      ...item,
      id: item._id,
    }));
    setData(enrichedDownloadsList);
  }, [downloadsList]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "failed":
        return "error";
      default:
        return "default";
    }
  };

  const columns = [
    {
      field: "userName",
      headerName: "User",
      width: 200,
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
              {params?.row?.userName?.slice(0, 1)?.toUpperCase() || "U"}
            </Avatar>
            <p className="mb-0 text-capitalize fs-16">
              {params?.row?.userName || "N/A"}
            </p>
          </div>
        );
      },
    },
    {
      field: "userEmail",
      headerName: "Email",
      width: 300,
      renderCell: (params) => (
        <>
          <p className="text-dark fs-16">
            {params?.row?.userEmail || "N/A"}
            <CopyToClipboard
              text={params?.row?.userEmail || ""}
              onCopy={() => toast.success("Email copied")}
            >
              <button className="btn border-0 px-1">
                <Copy size="16" />
              </button>
            </CopyToClipboard>
          </p>
        </>
      ),
    },
    {
      field: "campaignName",
      headerName: "Campaign",
      width: 250,
      renderCell: (params) => (
        <p className="text-dark fs-16 m-0">
          {params?.row?.campaignName || 
           params?.row?.campaignId?.title || 
           params?.row?.campaignId?.name || 
           "N/A"}
        </p>
      ),
    },
    {
      field: "downloadDate",
      headerName: "Download Date",
      width: 200,
      renderCell: (params) => (
        <p className="fs-16 m-0">
          {params.row.downloadDate || params.row.createdAt 
            ? formatDateTime(params.row.downloadDate || params.row.createdAt) 
            : "N/A"}
        </p>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.row.status || "Completed"}
          color={getStatusColor(params.row.status)}
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-outline-primary"
            title="Download Details"
            disabled
          >
            <DownloadIcon fontSize="small" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSizeOptions={[10, 20, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        disableRowSelectionOnClick
        sx={{
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #e0e0e0",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5",
            borderBottom: "2px solid #e0e0e0",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#f8f9fa",
          },
        }}
      />
    </div>
  );
}
