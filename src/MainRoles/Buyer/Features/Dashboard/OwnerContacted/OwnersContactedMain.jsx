import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import MobileMenu from "@/components/common/header/MobileMenu";
import {
  addStatus,
  selectFilter,
  setCity,
  setDashboardPropertyType,
} from "@/features/properties/propertiesSlice";
import { useDispatch, useSelector } from "react-redux";
import "../../../../Seller/SellerStyle/sellerStyle.css";
import ChatTab from "./OwnersChatTab";
import ChatBox from "@/CustomCommon/Messages/ChatBox";
import BuyerSidebarMenu from "@/MainRoles/Buyer/BuyerLayout/BuyerSidebarMenu";
import { savedPropertyListAsync, selectSavedProperties } from "@/Redux/Property/propertySlice";
import { selectChatList } from "@/Redux/Chat/chatSlice";
import OwnersEnquiryTab from "./OwnersEnquiryTab";
import OwnersMeetingTab from "./OwnersMeetingTab";
import Header from "@/components/common/header/dashboard/Header";

function OwnersContactedMain() {
  const filters = useSelector(selectFilter);
  const [value, setValue] = React.useState("1");
  const dispatch = useDispatch();
  const chats = useSelector(selectChatList)
  const totalUnreadCount = chats?.reduce((total, obj) => total + obj.unreadCount, 0);

  useEffect(() => {
    dispatch(savedPropertyListAsync({ filters }));
    dispatch(setCity(""))
    dispatch(setDashboardPropertyType(""))
    dispatch(addStatus(""))
  }, []);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="container-fluid ovh">
        <div className="row mt-3">
          <div className="col-lg-12">
            <div className="breadcrumb_content">
              <h2 className="breadcrumb_title">Owners Contacted</h2>
            </div>
          </div>
          <div className="col-md-12 mt-3">
            <div className="bg-white-shadow manage_enqury">
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', overflowX: 'auto' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example" variant="scrollable" scrollButtons="auto">
                    <Tab label="Enquiries" value="1" className="px-md-5 py-3" sx={{ flexShrink: 0 }} />
                    <Tab label="Chats" value="2" className="px-md-5 py-3" sx={{ flexShrink: 0 }} />
                    <Tab label="Meetings" value="3" className="px-md-5 py-3" sx={{ flexShrink: 0 }} />
                  </TabList>
                </Box>
                <TabPanel sx={{ p: 1 }} value="1">
                  <OwnersEnquiryTab />
                </TabPanel>
                <TabPanel sx={{ p: 1 }} value="2">
                  <ChatBox />
                </TabPanel>
                <TabPanel sx={{ p: 1 }} value="3">
                  <OwnersMeetingTab />
                </TabPanel>
              </TabContext>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default OwnersContactedMain;
