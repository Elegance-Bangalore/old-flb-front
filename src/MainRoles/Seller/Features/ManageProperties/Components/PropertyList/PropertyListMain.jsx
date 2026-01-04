import React, { useEffect, useState } from "react";
import "../../../../SellerStyle/sellerStyle.scss";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  FormControl,
  Autocomplete,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Tab,
} from "@mui/material";
import PropertyListCard from "./PropertyListCard";
import { useDispatch, useSelector } from "react-redux";
import RectangleSkeleton from "@/CustomCommon/MaterialUi/RectangleSkeleton";
import { useLocation, useNavigate } from "react-router-dom";
import useURLFilters from "@/CustomServices/useURLFilters";
import UrlPaginationCustom from "@/CustomCommon/MaterialUi/UrlPaginationCustom";
import {
  sellerDeletePropertyApi,
  sellerPromotePropertyApi,
  sellerPropertyListApi,
} from "@/ApiRoutes/SellerApis";
import { toastMessage } from "@/CustomServices/ToastMessage";
import DeleteModal from "@/components/Modals/DeleteModal";
import Support from "@/CustomCommon/AllRoles/Support";
import {
  agricultureLand,
  Estates,
  farmhouse,
  farmland,
} from "@/CustomServices/Constant";
import PromoteBanner from "@/components/Modals/PromoteBanner";
import { toast } from "react-toastify";
import usePageSEO from "@/Seo";

const PropertyListMain = () => {
  const [propertyList, setPropertyList] = useState([]);
  const [propertyCount, setPropertyCount] = useState(0);
  const [openBannerModal, setOpenBannerModal] = useState(false);
  const [promotedId, setPromotedId] = useState(null);

  const dispatch = useDispatch();
  const [timer, setTimer] = useState(null);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [filters, setFilters] = useURLFilters();
  const [deleteId, setDeleteId] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setOpenBannerModal(false);
  };
  const [value, setValue] = React.useState("publish");

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value, page: 1 };
    const newSearch = setFilters(newFilters);
    navigate(`?${newSearch}`);
  };

  function onPromoteClick(property) {
    // if (property?.propertyApproval !== "Resolved") {
    //   toastMessage(400, "Property is not approved yet");
    //   return;
    // }
    if (property?.propertyAds) {
      promoteProperty(property);
      return;
    }
    setPromotedId(property._id);
    setOpenBannerModal(true);
  }

  const sellerPropertyList = async () => {
    try {
      setLoader(true);
      const response = await sellerPropertyListApi({
        ...filters,
        status: value,
      });
      setPropertyList(response.data.res);
      setPropertyCount(response.data.count);
      return response;
    } catch (error) {
      toastMessage();
      throw error;
    } finally {
      setLoader(false);
    }
  };

  const deleteProperty = async () => {
    try {
      const response = await sellerDeletePropertyApi(deleteId);
      handleClose();
      sellerPropertyList();
      toastMessage(200, "Property Deleted Successfully");
    } catch (error) {
      throw error;
    } finally {
    }
  };

  async function promoteProperty(property) {
    try {
      const response = await sellerPromotePropertyApi(
        {
          propertyAds: property?.propertyAds,
          type: property?.isPropertyPromoted ? "remove" : "add",
        },
        property._id
      );
      sellerPropertyList();
    } catch (error) {
      toastMessage(400, error?.response?.data?.message);
      throw error;
    } finally {
      handleClose();
    }
  }

  useEffect(() => {
    clearTimeout(timer);
    const delay = setTimeout(() => {
      sellerPropertyList();
    }, 650);
    setTimer(delay);
    return () => clearTimeout(delay);
  }, [filters, dispatch, value]);

  usePageSEO({
    title: "Farmland Bazaar – Buy & Sell Farmland Across India",
    description: "Blog Page Sections asjqdjqLDNQAD",
    keywords: ["Farmland Bazaar", "Farmland Bazaar", "Farmland Bazaar"],
    ogTitle: "Farmland Bazaar",
    ogDescription: "Farmland Bazaar",
    ogImage: "https://flb-public.s3.ap-south-1.amazonaws.com/2Geqhte2sdxuKmoZqqyjg.jpeg",
    ogUrl: "https://farmlandbazaar.com//property-list/?propertyType=farmland",
  })

  return (
    <>
      <div className="container-fluid ovh">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb_content style2 mt-5">
              <h2 className="breadcrumb_title">Manage Properties</h2>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="p-3">
              <form className="row">
                <div className="col-md-4">
                  <FormControl className="mb-4">
                    <TextField
                      id=""
                      label=" Search by Name and City"
                      variant="outlined"
                      name="search"
                      value={filters.search}
                      onChange={handleFilterChange}
                    />
                  </FormControl>
                </div>
                <div className="col-md-4">
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Property Type</InputLabel>
                    <Select
                      label="Property Type"
                      name="propertyType"
                      MenuProps={{
                        disableScrollLock: true,
                      }}
                      value={filters.propertyType}
                      onChange={handleFilterChange}
                    >
                      <MenuItem value={""}>All</MenuItem>
                      <MenuItem value={farmhouse}>Farmhouse</MenuItem>
                      <MenuItem value={farmland}>Farmland</MenuItem>
                      <MenuItem value={Estates}>Estates</MenuItem>
                      <MenuItem value={agricultureLand}>
                        Agriculture Land
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </form>

              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    aria-label="lab API tabs example"
                    onChange={(event, newValue) => setValue(newValue)}
                  >
                    <Tab
                      label={"Publish"}
                      value="publish"
                      className="px-5 py-3"
                    />
                    <Tab label={"Draft"} value="draft" className="px-5 py-3" />
                    {/* <Tab
                      label={"All Properties"}
                      value=""
                      className="px-5 py-3"
                    /> */}
                  </TabList>
                </Box>
                <TabPanel value="publish">
                  {loader ? (
                    <RectangleSkeleton />
                  ) : propertyList?.length ? (
                    <>
                      {propertyList
                        .slice() // copy array to avoid mutating state
                        .sort((a, b) => {
                          // Assign a score to each property
                          const getScore = (p) => {
                            if (p.isPropertyPromoted) return 3;
                            if (p.managed_farmland) return 2;
                            return 1;
                          };
                          const scoreA = getScore(a);
                          const scoreB = getScore(b);
                          if (scoreA !== scoreB) return scoreB - scoreA; // higher score first
                          // If same score, sort by most recent
                          return new Date(b.createdAt) - new Date(a.createdAt);
                        })
                        .map((property) => (
                          <PropertyListCard
                            property={property}
                            setDeleteId={setDeleteId}
                            setShow={setShow}
                            onPromoteClick={onPromoteClick}
                          />
                        ))}
                      <UrlPaginationCustom
                        count={propertyCount}
                        page={filters.page}
                        setFilters={setFilters}
                        filters={filters}
                      />
                    </>
                  ) : (
                    <h3 className="mt-5 text-center">
                      There is no Property to show
                    </h3>
                  )}
                </TabPanel>
                <TabPanel value="draft">
                  {loader ? (
                    <RectangleSkeleton />
                  ) : propertyList?.length ? (
                    <>
                      {propertyList.map((property) => (
                        <PropertyListCard
                          property={property}
                          setDeleteId={setDeleteId}
                          setShow={setShow}
                          onPromoteClick={onPromoteClick}
                        />
                      ))}
                      <UrlPaginationCustom
                        count={propertyCount}
                        page={filters.page}
                        setFilters={setFilters}
                        filters={filters}
                      />
                    </>
                  ) : (
                    <h3 className="mt-5 text-center">
                      There is no Property to show
                    </h3>
                  )}
                </TabPanel>
                <TabPanel value="">
                  {loader ? (
                    <RectangleSkeleton />
                  ) : propertyList?.length ? (
                    <>
                      {propertyList.map((property) => (
                        <PropertyListCard
                          property={property}
                          setDeleteId={setDeleteId}
                          setShow={setShow}
                        />
                      ))}
                      <UrlPaginationCustom
                        count={propertyCount}
                        page={filters.page}
                        setFilters={setFilters}
                        filters={filters}
                      />
                    </>
                  ) : (
                    <h3 className="mt-5 text-center">
                      There is no Property to show
                    </h3>
                  )}
                </TabPanel>
              </TabContext>
            </div>
          </div>
          <div className="col-lg-3 text-center">
            <Support />
          </div>
        </div>
      </div>

      <DeleteModal
        open={show}
        handleClose={handleClose}
        deleteData={deleteProperty}
      />
      <PromoteBanner
        open={openBannerModal}
        handleClose={handleClose}
        id={promotedId}
        sellerPropertyList={sellerPropertyList}
      />
    </>
  );
};

export default PropertyListMain;
