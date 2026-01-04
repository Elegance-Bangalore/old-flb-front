import { advertisementListApi } from "@/ApiRoutes/AdminApi";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";
import { formatDateTime } from "@/CustomServices/Constant";

function AdvertisementTable({}) {
  const [advertisementList, setAdvertisementList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  async function getAdvertisementList() {
    try {
      const response = await advertisementListApi({
        page: paginationModel.page,
        pageSize: paginationModel.pageSize,
      });
      setAdvertisementList(response?.data?.advertise || []);
      setTotalCount(response?.data?.totalCount);
    } catch (error) {
      toastMessage(error?.response?.status, error?.response?.data?.error);
      throw error;
    } finally {
      setLoader(false);
    }
  }

  const columns = [
    {
      field: "companyName",
      headerName: "Company Name",
      width: 250,
    },
    {
      field: "cityOfHeadQuarter",
      headerName: "City Of Headquarter",
      width: 150,
    },
    {
      field: "fullName",
      headerName: "Full Name",
      width: 250,
    },
    {
      field: "createdAt",
      headerName: "Date",
      width: 200,
      renderCell: (params) => (
        <span>
    
            {formatDateTime(params?.row?.createdAt)}
        </span>
      ),
    },
    {
      field: "designation",
      headerName: "Designation",
      width: 250,
    },
    {
      field: "businessEmailAddress",
      headerName: "Business Email Address",
      width: 250,
    },
    {
      field: "mobileNumber",
      headerName: "Mobile Number",
      width: 200,
    },
    {
      field: "spaceRequirement",
      headerName: "Space Requirement",
      width: 250,
    },
    {
      field: "description",
      headerName: "Description",
      width: 250,
    },

  ];

  useEffect(() => {
    getAdvertisementList();
  }, []);


  return (
    <div>
      <div
        style={{ height: 620, width: "100%" }}
        className="custom-table-style"
      >
        <DataGrid
          rows={advertisementList}
          columns={columns}
          getRowId={(row) => advertisementList.indexOf(row)}
          rowHeight={130}
          rowCount={totalCount}
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
          checkboxSelection={true}
          onPaginationModelChange={setPaginationModel}
          paginationModel={paginationModel}
          cellSelection={false}
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
}

export default AdvertisementTable;
