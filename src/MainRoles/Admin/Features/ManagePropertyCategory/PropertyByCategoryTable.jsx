import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Link } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import {
  adminGeneralEnquiryApi,
  changeCategoryApi,
  deleteEnquiryApi,
  deleteGeneralEnquiryApi,
  deletePropertyApi,
  propertyByCategoryApi,
  propertyCategoryListApi,
} from "@/ApiRoutes/AdminApi";
import DeleteModal from "@/components/Modals/DeleteModal";
import { Copy, Data, DocumentCopy, Messages, Trash } from "iconsax-react";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { Box } from "@mui/material";
import { formatDate } from "@/CustomServices/Constant";
import AddEnquirieModal from "@/components/Modals/AddEnquirieModal";
import { toastMessage } from "@/CustomServices/ToastMessage";
import direction from "@/public/assets/images/manage-property/direction-arrow.svg";

export default function PropertyByCategoryTable({
  search,
  sort,
  propertyApproval,
  propertyType,
  categoryId,
}) {
  const [propertyByCategoryList, setpropertyByCategoryList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deletePropertyName, setDeletePropertyName] = useState("");
  const [deleteCategoryName, setDeleteCategoryName] = useState("");
  const handleClose = () => {
    setOpen(false);
    setEnquiryModal(false);
  };
  const [data, setData] = useState([]);
  const [enquiryModal, setEnquiryModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [category, setCategory] = useState([]);
  const [timer, setTimer] = useState(null);
  const [count, setCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  async function getPropertyByCategoryList() {
    try {
      const filters = { search, propertyApproval, propertyType, ...paginationModel };
      const response = await propertyByCategoryApi(categoryId,filters);
      setpropertyByCategoryList(response?.data?.response?.data);
      setCount(response?.data?.count);
    } catch (error) {
      toastMessage();
    }
  }

  async function getCategoryList() {
    try {
      const response = await propertyCategoryListApi();
      setCategory(response?.data?.response);
    } catch (error) {
      throw error;
    }
  }
  async function handleCategoryChange(
    propertyId,
    oldCategoryId,
    newCategoryId
  ) {
    try {
      const response = await changeCategoryApi({
        propertyId,
        oldCategoryId,
        newCategoryId,
        visible:true
      });
      toastMessage(200, "Property Category Changed Successfully");
      getPropertyByCategoryList();
    } catch (error) {
      toastMessage();
    }
  }

  useEffect(() => {
    clearTimeout(timer);
    const delay = setTimeout(() => {
      getPropertyByCategoryList();
    }, 500);
    setTimer(delay);
    return () => clearTimeout(delay);

  }, [paginationModel, search,propertyApproval,propertyType]);

  useEffect(() => {
    getCategoryList();
  }, []);

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
      headerName: "Property",
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
      field: "propertyType",
      headerName: "Property Type",
      width: 300,
      renderCell: (params) => (
        <>
          <Link
            className="text-green-hover text-dark fs-16"
            to="#"
            style={{
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            {params?.row?.propertyType}
          </Link>
        </>
      ),
    },
   
    {
      field: "propertyStatus",
      headerName: "Availability",
      width: 250,
      renderCell: (params) => (
       <p className={`text-uppercase fw-bold mb-0 ${params.row.propertyStatus === "available" ? "text-success" : "text-danger"}`}>{params.row.propertyStatus}</p>
      ),
    },

    {
      field: "",
      headerName: "Change Category",
      width: 250,
      renderCell: (params) => (
        <select
          className={`bg-transparent form-select d-inline custom-select border-solid`}
          onChange={(e) =>
            handleCategoryChange(params.row._id, params.row.categoryId , e.target.value)
          }
        >
          <option value="">Move to</option>
          {category?.map((item, index) => (
            <option value={item._id} key={index}>
              {item.name}
            </option>
          ))}
        </select>
      ),
    },

    {
      field: "delete",
      headerName: "",
      width: 60,
      renderCell: (params) => (
        <button
          className="btn btn-profile-delete d-inline-block"
          onClick={() => {
            setOpen(true);
            setDeleteId(params.row._id);
            setDeletePropertyName(params.row.propertyTitle);
            const cat = category.find((c) => c._id === params.row.categoryId);
            setDeleteCategoryName(cat ? cat.name : "");
          }}
        >
          <Trash size="32" />
        </button>
      ),
    },
  ];

  async function deleteProperty() {
    try {
      const response = await deletePropertyApi(deleteId);
      handleClose();
      getPropertyByCategoryList();
      toastMessage(200, "Property removed  succesfully");
    } catch (error) {
      toastMessage();
    }
  }

  return (
    <>
      <div style={{ height: 550, width: "100%" }} className="custom-table-style">
        <DataGrid
          rows={propertyByCategoryList}
          columns={columns}
          getRowId={(row) => propertyByCategoryList.indexOf(row)}
          rowHeight={130}
          rowCount={count}
          pagination
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
          checkboxSelection
          onPaginationModelChange={setPaginationModel}
          paginationModel={paginationModel}
          cellSelection={false}
        />
      </div>

      <DeleteModal
        open={open}
        handleClose={handleClose}
        deleteData={deleteProperty}
        propertyName={deletePropertyName}
        categoryName={deleteCategoryName}
      />
      <AddEnquirieModal
        show={enquiryModal}
        rowData={rowData}
        handleClose={handleClose}
      />
    </>
  );
}
