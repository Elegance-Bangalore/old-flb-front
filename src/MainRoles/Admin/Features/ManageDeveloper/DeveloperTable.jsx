import React, { useEffect, useState } from "react";
import { Avatar, Box, FormControlLabel, Switch } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import editIcon from "@/public/assets/images/profile/profile-edit.svg";
import deleteIcon from "@/public/assets/images/profile/delete-profile.svg";
import copy from "@/public/assets/images/icons/copy.svg";
import {
  deleteDeveloperProfileApi,
  getDeveloperListApi,
  toggleFeaturedDeveloperApi,
  updateDeveloperToogleApi,
} from "@/ApiRoutes/AdminApi";
import { toastMessage } from "@/CustomServices/ToastMessage";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import DeleteModal from "@/components/Modals/DeleteModal";
import { formatDateTime } from "@/CustomServices/Constant";
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { API } from '@/ApiRoutes/AdminApi';

function DeveloperTable({ paginationModel, setPaginationModel, filters }) {
  const [developerList, setDeveloperList] = useState([]);
  const [timer, setTimer] = useState(null);
  const [loader, setLoader] = useState(true);
  const [deleteId, setDeleteId] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [count, setCount] = useState(0);

  async function getDeveloperList() {
    try {
      setLoader(true);
      const response = await getDeveloperListApi({
        ...paginationModel,
        ...filters,
      });
      setDeveloperList(response?.data?.response);
      setCount(response?.data?.counts);
    } catch (error) {
      toastMessage();
    } finally {
      setLoader(false);
    }
  }

  async function deactivateDeveloper(id) {
    try {
      await updateDeveloperToogleApi(id);
      const updatedUserList = developerList.map((developer) => {
        if (developer._id === id) {
          return { ...developer, isActive: !developer.isActive };
        }
        return developer;
      });
      setDeveloperList(updatedUserList);
      toastMessage(200, "Status Changed");
    } catch (error) {
      toastMessage();
    }
  }

  async function toggleFeaturedDeveloper(selectedDeveloper) {
    try {
      const {
        subscription,
        profileCompleted,
        about,
        establishedYear,
        _id,
        featured,
      } = selectedDeveloper || {};
      console.log("Featured", featured);
      if (!featured) {
        // if (!subscription) {
        //   toast.error("This seller does not have an active subscription.");
        //   return;
        // }
        if (!profileCompleted) {
          toast.error(
            "The seller's profile is incomplete. Please ensure all required fields are filled."
          );
          return;
        }
        // if (!about) {
        //   toast.error(
        //     "The 'About' section is missing. Please complete the seller's profile."
        //   );
        //   return;
        // }
        // if (!establishedYear) {
        //   toast.error(
        //     "The 'Year of Establishment' is missing. Please provide this information."
        //   );
        //   return;
        // }
      }
      await toggleFeaturedDeveloperApi(_id);
      const updatedUserList = developerList.map((developer) => {
        if (developer._id === selectedDeveloper._id) {
          return { ...developer, featured: !developer.featured };
        }
        return developer;
      });
      setDeveloperList(updatedUserList);
      toastMessage(200, "Successfully Changed");
    } catch (error) {
      console.log("Error is", error);
      toastMessage(400, error.response.data.error);
    }
  }

  async function deleteDeveloperProfile() {
    try {
      await deleteDeveloperProfileApi({
        userId: deleteId,
        deleteOption: "completeDelete",
      });
      toastMessage(200, "Profile Deleted Successfully");
      handleClose();
      getDeveloperList();
    } catch (error) {
      toastMessage();
    }
  }

  useEffect(() => {
    clearTimeout(timer);
    const delay = setTimeout(() => {
      getDeveloperList();
    }, 500);
    setTimer(delay);
    return () => clearTimeout(delay);
  }, [filters, paginationModel]);

  // Helper: get only featured developers, sorted by featuredOrder
  const getSortedFeatured = () =>
    developerList
      .filter((dev) => dev.featured)
      .sort((a, b) => (a.featuredOrder || 0) - (b.featuredOrder || 0));

  // Swap order and update backend
  const handleOrderChange = async (devId, direction) => {
    const featured = getSortedFeatured();
    const idx = featured.findIndex((dev) => dev._id === devId);
    if (idx === -1) return;
    const swapIdx = idx + direction;
    if (swapIdx < 0 || swapIdx >= featured.length) return;
    // Swap orders
    const updated = [...developerList];
    const idA = featured[idx]._id;
    const idB = featured[swapIdx]._id;
    const orderA = featured[idx].featuredOrder || 0;
    const orderB = featured[swapIdx].featuredOrder || 0;
    updated.forEach((dev) => {
      if (dev._id === idA) dev.featuredOrder = orderB;
      if (dev._id === idB) dev.featuredOrder = orderA;
    });
    setDeveloperList(updated);
    // Call backend API to persist order for both developers
    try {
      await API.post('/developer/updateFeaturedOrder', {
        orderUpdates: [
          { _id: idA, featuredOrder: orderB },
          { _id: idB, featuredOrder: orderA },
        ],
      });
      toast.success('Featured order updated');
      // Refresh the developer list from backend
      getDeveloperList();
    } catch (error) {
      toast.error('Failed to update featured order');
    }
  };

  const columns = [
    {
      field: "companyName",
      headerName: "Company Name",
      width: 250,
      renderCell: (params) => (
        <Link
          to="/admin/edit-developer-profile"
          state={{ ...params?.row, scrollBottom: false }}
        >
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
              {params?.row?.companyName ? params?.row?.companyName : "---"}
            </p>
          </div>
        </Link>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      renderCell: (params) => (
        <>
          <p className="text-dark fs-16">
            {params?.row?.email}
            <CopyToClipboard
              text={params?.row?.email}
              onCopy={() => toast.success("Text copied")}
            >
              <button className="btn border-0 px-1">
                <img
                  className="mb-2"
                  style={{ width: "1.2rem" }}
                  src={copy}
                  alt="copy"
                />
              </button>
            </CopyToClipboard>
          </p>
        </>
      ),
    },
    {
      field: "Mobile",
      headerName: "Mobile Numbers",
      width: 200,
      renderCell: (params) => (
        <p className="text-dark fs-16">
          {params?.row?.phone}
          <CopyToClipboard
            text={params?.row?.phone}
            onCopy={() => toast.success("Text copied")}
          >
            <button className="btn border-0 px-1">
              <img
                className="mb-2"
                style={{ width: "1.2rem" }}
                src={copy}
                alt="copy"
              />
            </button>
          </CopyToClipboard>
        </p>
      ),
    },
    {
      field: "i_am",
      headerName: "Type",
      width: 150,
      renderCell: (params) => (
        <p className="fs-16 m-0 text-capitalize">{params.row.i_am}</p>
      ),
    },

    {
      field: "ongoingProjects",
      headerName: "Active Projects",
      width: 150,
      renderCell: (params) => (
        <Link
          to="/admin/edit-developer-profile"
          state={{ ...params?.row, scrollBottom: true }}
        >
          <p className="fs-16 m-0">{params.row.ongoingProjects}</p>
        </Link>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 230,
      renderCell: (params) => (
        <p className="fs-16 m-0">
          {params.row.createdAt ? formatDateTime(params.row.createdAt) : "N/A"}
        </p>
      ),
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 230,
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
      field: "featured",
      headerName: "Featured",
      width: 200,
      renderCell: (params) => (
        <FormControlLabel
          control={<Switch checked={params.row.featured} />}
          labelPlacement="start"
          onChange={() => toggleFeaturedDeveloper(params.row)}
        />
      ),
    },

    {
      field: "isActive",
      headerName: "Status",
      width: 200,
      renderCell: (params) => (
        <FormControlLabel
          control={<Switch checked={params.row.isActive} />}
          labelPlacement="start"
          onChange={() => deactivateDeveloper(params.row._id, "softDelete")}
        />
      ),
    },
    {
      field: "featuredOrder",
      headerName: "Order",
      width: 120,
      renderCell: (params) => {
        if (!params.row.featured) return null;
        const featured = getSortedFeatured();
        const idx = featured.findIndex((dev) => dev._id === params.row._id);
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span>{params.row.featuredOrder ?? ''}</span>
            <button
              className="btn btn-sm"
              onClick={() => handleOrderChange(params.row._id, -1)}
              disabled={idx === 0}
              style={{ minWidth: 24 }}
            >
              <ArrowUpward fontSize="small" />
            </button>
            <button
              className="btn btn-sm"
              onClick={() => handleOrderChange(params.row._id, 1)}
              disabled={idx === featured.length - 1}
              style={{ minWidth: 24 }}
            >
              <ArrowDownward fontSize="small" />
            </button>
          </div>
        );
      },
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 60,
      renderCell: (params) => (
        <Link to="/admin/edit-developer-profile" state={params?.row}>
          <button className="btn btn-profile-edit d-inline-block">
            <img className="img-fluid" src={editIcon} alt="editIcon" />
          </button>
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 60,
      renderCell: (params) => (
        <button
          className="btn btn-profile-delete d-inline-block"
          onClick={() => {
            setDeleteId(params?.row?._id);
            setOpen(true);
          }}
        >
          <img className="img-fluid" src={deleteIcon} alt="" />
        </button>
      ),
    },
  ];

  return (
    <div style={{ height: 700, width: "100%" }} className="custom-table-style">
      <DataGrid
        rows={developerList}
        columns={columns}
        getRowId={(row) => developerList.indexOf(row)}
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
        checkboxSelection={false}
        onPaginationModelChange={setPaginationModel}
        paginationModel={paginationModel}
        cellSelection={false}
        disableRowSelectionOnClick
      />
      <DeleteModal
        open={open}
        handleClose={handleClose}
        deleteData={deleteDeveloperProfile}
      />
    </div>
  );
}

export default DeveloperTable;
