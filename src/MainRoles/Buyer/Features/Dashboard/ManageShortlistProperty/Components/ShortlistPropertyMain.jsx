import MobileMenu from "@/components/common/header/MobileMenu";
import {

  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "@/MainRoles/Buyer/BuyerStyle/buyerStyle.scss";
import ShortlistPropertyCard from "./ShortlistPropertyCard";
import { useDispatch, useSelector } from "react-redux";
import BuyerSidebarMenu from "@/MainRoles/Buyer/BuyerLayout/BuyerSidebarMenu";
import { selectFilter } from "@/features/properties/propertiesSlice";
import RectangleSkeleton from "@/CustomCommon/MaterialUi/RectangleSkeleton";
import { requestVisitApi, savePropertyListApi, scheduleVisitApi, toogleSavePropertyApi } from "@/ApiRoutes/BuyersApi";
import Header from "@/components/common/header/dashboard/Header";
import UrlPaginationCustom from "@/CustomCommon/MaterialUi/UrlPaginationCustom";
import { toastMessage } from "@/CustomServices/ToastMessage";
import useURLFilters from "@/CustomServices/useURLFilters";
import { agricultureLand, capitalizeArray, Estates, farmhouse, farmland } from "@/CustomServices/Constant";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Support from "@/CustomCommon/AllRoles/Support";
import ScheduleVisitModal from "@/components/Modals/ScheduleVisitModal";


function ShortlistPropertyMain() {

  const dispatch = useDispatch();
  const [savedPropertyList, setSavedPropertyList] = useState([]);
  const [count, setCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true)
  const [filters, setFilters] = useURLFilters()
  const [timer, setTimer] = useState(null);
  const { cities } = useSelector(selectFilter);
  const capitalizedCities = capitalizeArray(cities);
  const [propertyIndex, setPropertyIndex] = useState(null);
  const [propertyId, setPropertyId] = useState(null);
  const [openVisitModal, setOpenVisitModal] = useState(false);
  const [showSlots, setShowSlots] = useState(false);
  const [visitLoader, setVisitLoader] = useState(false);

  const handleClickOpen = (index, id) => {
    setOpenVisitModal(true);
    setPropertyIndex(index)
    setPropertyId(id)
  };
  const handleCloseModal = () => {
    setOpenVisitModal(false);
    setShowSlots(false)
  };



  async function savedPropertyData() {
    try {
      setLoader(true)
      const response = await savePropertyListApi(filters);
      setSavedPropertyList(response.data.dataArray);
      setCount(response.data.totalCounts)
      return response;
    } catch (error) {
      tosstMessage()
      throw error;
    } finally {
      setLoader(false)
    }
  }


  async function makeVisitRequest(selectedTime, selectedDate) {
    try {
      setVisitLoader(true)
      await requestVisitApi(propertyId, { slot: { slot: selectedTime }, selectDate: selectedDate });
      toastMessage(200, "Visit request sent successfully");
      handleCloseModal();
      const updatedList = [...savedPropertyList];
      updatedList[propertyIndex] = {
        ...updatedList[propertyIndex],
        visitRequest: true,
      };
      setSavedPropertyList(updatedList);
    } catch (err) {
      toastMessage(err?.response?.status, err?.response?.data?.error);
    }
    finally {
      setVisitLoader(false)
    }
  }

  async function removeProperty(id) {
    try {
      const response = await toogleSavePropertyApi(id);
      const index = savedPropertyList.findIndex(
        (property) => property.id === id
      );
      const properties = [...savedPropertyList];
      properties.splice(index, 1)
      setSavedPropertyList(properties)
      toastMessage(response?.status, response?.data?.success);
    } catch (error) {
      toastMessage(error?.response?.status, error?.response?.data?.message);
      throw error;
    }
  }

  function handleFilterChange(e) {
    const { name, value } = e.target
    const newFilters = { ...filters, [name]: value, page: 1 };
    const newSearch = setFilters(newFilters);
    navigate(`?${newSearch}`);

  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    clearTimeout(timer);
    const delay = setTimeout(() => {
      savedPropertyData()
    }, 500);
    setTimer(delay);
    return () => clearTimeout(delay);


  }, [location.search, filters])



  return (
    <>
      <div className="container-fluid ovh">
        <div className="row mt-3">
          <div className="col-lg-12">
            <div className="breadcrumb_content">
              <h2 className="breadcrumb_title">Shortlisted Properties</h2>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="p-3">
              <form className="row">
                <div className="col-xl-4 mb-3 mb-xl-0">
                  <div className="btn-frame">
                    <input id="toggle-on" className="toggle toggle-left" name="status" value="available" type="radio" checked={filters.status === "available"}
                      onChange={handleFilterChange} hidden />
                    <label htmlFor="toggle-on" className="btn-pri left" >Currently Available</label>
                    <input id="toggle-off" className="toggle toggle-right" name="status" value="" type="radio" checked={filters.status === ""}
                      onChange={handleFilterChange} hidden />
                    <label htmlFor="toggle-off" className="btn-pri right">All Properties</label>
                  </div>
                </div>
                <div className="col-sm-6 col-xl-4  mb-3 mb-lg-0">
                  <FormControl>
                    <InputLabel id="">City</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="city"
                      value={filters.city}
                      MenuProps={{
                        disableScrollLock: true,
                      }}
                      label="City"
                      onChange={handleFilterChange}
                    >
                      <MenuItem value="">
                        All City
                      </MenuItem>
                      {capitalizedCities?.map((city, index) => (
                        <MenuItem value={city} key={index}>{city}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div className="col-sm-6 col-xl-4">
                  <Box>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="demo-simple-select-label">
                        Property Type
                      </InputLabel>
                      <Select
                        labelId=""
                        label="Property Type"
                        name="propertyType"
                        value={filters.propertyType}
                        onChange={handleFilterChange}
                        MenuProps={{
                          disableScrollLock: true,
                        }}
                      >
                        <MenuItem value={""}>All</MenuItem>
                        <MenuItem value={farmhouse}>Farmhouse</MenuItem>
                        <MenuItem value={farmland}>Farmland</MenuItem>
                        <MenuItem value={Estates}>Estates</MenuItem>
                        <MenuItem value={agricultureLand}>Agriculture Land</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
              </form>


              {
                loader ? <RectangleSkeleton /> : (
                  savedPropertyList?.length ? (
                    <>
                      {savedPropertyList.map((property, index) => (
                        <React.Fragment key={index}>
                          <ShortlistPropertyCard property={property} removeProperty={removeProperty} handleClickOpen={handleClickOpen} index={index} />

                          <ScheduleVisitModal openVisitModal={openVisitModal} handleCloseModal={handleCloseModal} singleProperty={property?.properties} showSlots={showSlots} setShowSlots={setShowSlots} makeVisitRequest={makeVisitRequest} loader={visitLoader} />
                        </React.Fragment>
                      ))}
                      <UrlPaginationCustom count={count} page={filters.page} setFilters={setFilters} filters={filters} />
                    </>
                  ) : (
                    <h3 className="mt-5 text-center">There is no Property to show</h3>
                  )
                )
              }

            </div>
          </div>
          <div className="col-lg-3 text-center">
            <Support />
          </div>
        </div>
      </div>
    </>
  );
}

export default ShortlistPropertyMain;
