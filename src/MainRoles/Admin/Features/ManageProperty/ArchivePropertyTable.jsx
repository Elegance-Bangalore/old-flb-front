import React, { useCallback, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import direction from "@/public/assets/images/manage-property/direction-arrow.svg";
import { Link } from "react-router-dom";
import {
  archivePropertyApi,
  deletePropertyApi,
  getArchivePropertyListAdminApi,
} from "@/ApiRoutes/AdminApi";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { Box } from "@mui/material";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { RefreshSquare, Trash } from "iconsax-react";
import DeleteModal from "@/components/Modals/DeleteModal";
import { formatPropertyType } from "@/CustomServices/Constant";

export default function ArchivePropertyTable({
  search,
  propertyApproval,
  propertyType,
}) {
  const [propertyList, setPropertyList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(null);
  const [restore, setRestore] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [opan, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  async function getArchivePropertyList() {
    try {
      setLoader(true);
      const response = await getArchivePropertyListAdminApi({
        ...paginationModel,
        search,
        propertyApproval,
        propertyType,
        isDeleted: true,
      });
      setPropertyList(response?.data?.res);
      setCount(response?.data?.filterCount);
    } catch (error) {
      throw error;
    } finally {
      setLoader(false);
    }
  }

  async function deleteProperty() {
    try {
      await deletePropertyApi(deleteId);
      getArchivePropertyList();
      handleClose();
      toastMessage(200, "Property Deleted Permanently");
    } catch (error) {
      throw error;
      toastMessage();
    }
  }

  async function archiveProperty(id) {
    try {
      const response = await archivePropertyApi(id);
      getArchivePropertyList();
      setPropertyList((prevList) => {
        return prevList.map((cat) => {
          if (cat._id === id) {
            return { ...cat, isDeleted: !cat.isDeleted };
          }
          return cat;
        });
      });
      toastMessage(200, "Done");
    } catch (error) {
      throw error;
    }
  }

  const columns = [
    {
      field: "heroImage",
      headerName: "Image",
      width: 250,
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
      cellClassName: "text-dark fs-16",
    },
    {
      field: "",
      headerName: "Restore",
      width: 150,
      renderCell: (params) => (
        <button className="btn btn-profile-delete d-inline-block">
          <RefreshSquare onClick={() => archiveProperty(params?.row?._id)} />
        </button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 150,
      renderCell: (params) => (
        <button
          className="btn btn-profile-delete d-inline-block"
          onClick={() => {
            setOpen(true);
            setDeleteId(params?.row?._id);
          }}
        >
          <Trash />
        </button>
      ),
    },
  ];

  useEffect(() => {
    clearTimeout(timer);
    const delay = setTimeout(() => {
      getArchivePropertyList();
    }, 500);
    setTimer(delay);
    return () => clearTimeout(delay);
  }, [search, paginationModel, propertyApproval, propertyType]);

  return (
    <>
      <div
        style={{ height: 550, width: "100%" }}
        className="custom-table-style"
      >
        <DataGrid
          rows={propertyList}
          columns={columns}
          getRowId={(row) => propertyList.indexOf(row)}
          rowHeight={130}
          rowCount={count}
          pagination
          paginationMode="server"
          className="custom-header"
          pageSizeOptions={[5, 10]}
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
          onPaginationModelChange={setPaginationModel}
          paginationModel={paginationModel}
          cellSelection={false}
          disableRowSelectionOnClick
        />
      </div>
      <DeleteModal
        open={opan}
        handleClose={handleClose}
        deleteData={deleteProperty}
      />
    </>
  );
}
