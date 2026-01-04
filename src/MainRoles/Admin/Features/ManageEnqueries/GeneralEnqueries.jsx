import {
  FormControl,
  TextField,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Header from "@/components/common/header/dashboard/Header";
import { useEffect, useState } from "react";
import { adminGeneralEnquiryApi } from "@/ApiRoutes/AdminApi";
import AdminSidebarMenu from "@/MainRoles/Admin/AdminLayouts/AdminSidebarMenu";
import AdminMobileMenu from "@/MainRoles/Admin/AdminLayouts/AdminMobileMenu";
import GeneralEnqueriesTable from "./GeneralEnqueriesTable";


const GeneralEnqueries = () => {

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("descending")
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  useEffect(() => {
    setPaginationModel({ ...paginationModel, page: 0 })
  }, [search])


  return (
    <>
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb_content">
                <h2 className="breadcrumb_title pb-3">General Enquiries</h2>
              </div>
            </div>
            <div className="col-lg-12">
              <div>
                <form className="row">
                  <div className="col-md-4">
                    <FormControl className="mb-4">
                      <TextField
                        id=""
                        label="Search by Name"
                        variant="outlined"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </FormControl>
                  </div>
                  <div className="col-md-4 col-12 mb-3">
                    <FormControl variant="outlined">
                      <InputLabel id=" ">
                        Sort
                      </InputLabel>
                      <Select labelId="" label="Availability" value={sort} onChange={(e) => setSort(e.target.value)} MenuProps={{
                        disableScrollLock: true,
                      }}>
                        <MenuItem value="descending">Newest</MenuItem>
                        <MenuItem value="ascending">Oldest</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-md-4">
                    {/* <div className="text-end">
                        <button className="btn-upgrade me-2">IMPORT</button>
                        <button className="btn-upgrade">EXPORT</button>
                      </div> */}
                  </div>
                </form>
                <div className="row">
                  <div className="col-md-12">
                    <GeneralEnqueriesTable search={search} sort={sort} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default GeneralEnqueries;
