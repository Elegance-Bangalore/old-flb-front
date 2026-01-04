import {
  FormControl,
  Autocomplete,
  TextField,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Header from "@/components/common/header/dashboard/Header";
import AdminMobileMenu from "@/MainRoles/Admin/AdminLayouts/AdminMobileMenu";
import AdminSidebarMenu from "@/MainRoles/Admin/AdminLayouts/AdminSidebarMenu";
import FaqTable from "./FaqTable";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { faqListApi } from "@/ApiRoutes/AdminApi";
import { useLocation, useNavigate } from "react-router-dom";

const FaqListPage = () => {
  const [loader, setLoader] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [faqData, setFaqData] = useState({});
  const [timer, setTimer] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  return (
    <>
      <div className="container-fluid ovh">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb_content">
              <h2 className="breadcrumb_title pb-3">FAQs</h2>
            </div>
          </div>
          <div className="col-lg-12">
            <div>
              <form className="row">
                <div className="col-md-3">
                  <FormControl className="mb-4">
                    <TextField
                      id=""
                      label="Search"
                      variant="outlined"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </FormControl>
                </div>

                <div className="col-md-3 col-12 mb-3">
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="demo-simple-select-label">
                      Select Categoty
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      label="Select Categoty"
                      name="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      MenuProps={{
                        disableScrollLock: true,
                      }}
                    >
                      <MenuItem value={""}>All</MenuItem>
                      <MenuItem value={"general"}>General</MenuItem>
                      <MenuItem value={"account"}>Account</MenuItem>
                      <MenuItem value={"buyer"}>Buyer</MenuItem>
                      <MenuItem value={"seller"}>Seller</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col-md-6 col-12 mb-3">
                  <div className="text-end">
                    <Link to="/admin/add-faq">
                      <button className="btn-upgrade w-100-mobile" type="button">
                        ADD FAQ
                      </button>
                    </Link>
                  </div>
                </div>
              </form>
              <div className="row">
                <div className="col-md-12">
                  <FaqTable query={query} category={category} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FaqListPage;
