import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Link } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { deleteEnquiryApi } from "@/ApiRoutes/AdminApi";
import DeleteModal from "@/components/Modals/DeleteModal";
import { Copy, Trash } from "iconsax-react";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { formatDateTime } from "@/CustomServices/Constant";

export default function EnquiresTable({
  enquiryList,
  getEnquiryList,
  paginationModel,
  setPaginationModel,
}) {
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleClose = () => setOpen(false);

  const columns = [
    {
      field: "Customer",
      headerName: "Customer",
      width: 200,
      renderCell: (params) => (
        <div className="d-flex gap-2 align-items-center">
          <Avatar
            sx={{
              bgcolor: "#F4F6F8",
              color: "#919EAB",
              border: "1px solid #919EAB",
              width: 32,
              height: 32,
              fontSize: 14,
            }}
          >
            {params?.row?.Customer?.[0] || "--"}
          </Avatar>
          <span className="fs-14 text-capitalize">
            {params?.row?.Customer || "--"}
          </span>
        </div>
      ),
    },
    {
      field: "Property",
      headerName: "Property",
      width: 220,
      renderCell: (params) => (
        <span className="fs-14 text-dark">
          {params?.row?.Property || "--"}
        </span>
      ),
    },
    {
      field: "createdAt",
      headerName: "Date",
      width: 180,
      renderCell: (params) => (
        <span className="fs-14">{params?.row?.createdAt ? formatDateTime(params.row.createdAt) : "--"}</span>
      ),
    },
    {
      field: "Email",
      headerName: "Email",
      width: 220,
      renderCell: (params) => (
        <div className="d-flex align-items-center gap-1">
          <span className="fs-14">{params?.row?.Email || "--"}</span>
          {params?.row?.Email && (
            <CopyToClipboard
              text={params?.row?.Email}
              onCopy={() => toast.success("Copied to clipboard")}
            >
              <button className="btn p-0 border-0">
                <Copy size={16} />
              </button>
            </CopyToClipboard>
          )}
        </div>
      ),
    },
    {
      field: "mobileNumber",
      headerName: "Mobile Number",
      width: 160,
      renderCell: (params) => (
        <div className="d-flex align-items-center gap-1">
          <span className="fs-14">{params?.row?.mobileNumber || "--"}</span>
          {params?.row?.mobileNumber && (
            <CopyToClipboard
              text={params?.row?.mobileNumber}
              onCopy={() => toast.success("Copied to clipboard")}
            >
              <button className="btn p-0 border-0">
                <Copy size={16} />
              </button>
            </CopyToClipboard>
          )}
        </div>
      ),
    },
    {
      field: "reasonToBuy",
      headerName: "Reason To Buy",
      width: 160,
      renderCell: (params) => <span className="fs-14">{params?.row?.reasonToBuy || "--"}</span>,
    },
    {
      field: "preferredLocation",
      headerName: "Preferred Location",
      width: 160,
      renderCell: (params) => <span className="fs-14">{params?.row?.preferredLocation || "--"}</span>,
    },
    {
      field: "budget",
      headerName: "Budget",
      width: 140,
      renderCell: (params) => <span className="fs-14">{params?.row?.budget || "--"}</span>,
    },
    {
      field: "homeLoanOptions",
      headerName: "Home Loan",
      width: 120,
      renderCell: (params) => <span className="fs-14">{params?.row?.homeLoanOptions ? "Yes" : "No"}</span>,
    },
    {
      field: "siteVisits",
      headerName: "Site Visits",
      width: 120,
      renderCell: (params) => <span className="fs-14">{params?.row?.siteVisits ? "Yes" : "No"}</span>,
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 80,
      renderCell: (params) => (
        <button
          className="btn btn-outline-danger p-1"
          onClick={() => {
            setOpen(true);
            setDeleteId(params.row._id);
          }}
        >
          <Trash size={16} />
        </button>
      ),
    },
  ];

  async function deleteEnquiry() {
    try {
      await deleteEnquiryApi(deleteId);
      handleClose();
      getEnquiryList();
      toast.success("Enquiry deleted successfully");
    } catch (error) {
      toastMessage();
    }
  }

  return (
    <>
      {(!enquiryList?.data || enquiryList?.data.length === 0) ? (
        <div className="text-center text-muted py-5">
          -- No enquiries found --
        </div>
      ) : (
        <div style={{ height: 620, width: "100%" }} className="custom-table-style">
          <DataGrid
            rows={enquiryList?.data.map((item) => ({ ...item, id: item._id }))}
            columns={columns}
            rowHeight={60}
            getRowId={(row) => row._id}
            pagination
            paginationMode="server"
            rowCount={enquiryList?.pageMeta?.total || 0}
            pageSizeOptions={[20, 50, 100]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            className="custom-header"
            sx={{
              "& .MuiDataGrid-cell": { alignItems: "center" },
              "& .MuiDataGrid-columnHeaders": { backgroundColor: "#f5f5f5", fontWeight: "bold" },
            }}
          />
        </div>
      )}

      <DeleteModal open={open} handleClose={handleClose} deleteData={deleteEnquiry} />
    </>
  );
}
