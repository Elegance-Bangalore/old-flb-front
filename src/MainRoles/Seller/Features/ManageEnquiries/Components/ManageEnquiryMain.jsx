import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Header from "@/components/common/header/dashboard/Header";
import MobileMenu from "@/components/common/header/MobileMenu";
import SidebarMenu from "@/components/common/header/dashboard/SidebarMenu";
import {
  selectFilter,
  setEnquiryFilter,
  setEnquirySearch,
} from "@/features/properties/propertiesSlice";
import {
  enquiryListApi,
  getEnqiryCountApi,
  visitRequestApi,
} from "@/ApiRoutes/SellerApis";
import { useDispatch, useSelector } from "react-redux";
import "../../../SellerStyle/sellerStyle.scss";
import EnquiryTab from "./EnquiryTab";
import ChatTab from "./ChatTab";
import MeetingTab from "./MeetingTab";
import ChatBox from "@/CustomCommon/Messages/ChatBox";
import { selectChatList } from "@/Redux/Chat/chatSlice";
import { toastMessage } from "@/CustomServices/ToastMessage";
import CustomPagination from "@/CustomCommon/MaterialUi/CustomPagination";
import RectangleSkeleton from "@/CustomCommon/MaterialUi/RectangleSkeleton";
import { selectUser } from "@/Redux/Auth/authSlice";
import SubscriptionModal from "@/components/Modals/SubscriptionModal";
import SubscriptionAlert from "@/components/Modals/SubscriptionAlert";
import { useNavigate } from "react-router-dom";

function ManageEnquiryMain() {
  const filters = useSelector(selectFilter);
  const { enquiryFilter, enquirySearch, page } = filters;
  const user = useSelector(selectUser);
  const [enquiryList, setEnquiryList] = useState([]);
  const [requestList, setRequestList] = useState([]);
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [enquiryLoader, setEnquiryLoader] = useState(false);
  const [loader, setLoader] = useState(true);

  const naviagte = useNavigate()
  const chats = useSelector(selectChatList);
  const totalUnreadCount = chats?.reduce(
    (total, obj) => total + obj.unreadCount,
    0
  );
  const [value, setValue] = React.useState("1");
  const [total, setTotal] = useState({});

  const [showSubscriptionModal, setShowSubscriptionModal] = React.useState(true);

  const chatMessage = "If you want to access chat feature, Please contact us";
  const meetingMessage =
    "If you want to know who is sending you visit request then Please contact us";

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function visitRequest() {
    try {
      setLoader(true);
      const response = await visitRequestApi(page);
      setRequestList(response.data.dataArray);
      setCount(response.data.count);
    } catch (error) {
      toastMessage();
    } finally {
      setLoader(false);
    }
  }

  async function getTotalCount() {
    try {
      const response = await getEnqiryCountApi();
      setTotal(response?.data);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    if (value === "3") {
      visitRequest();
      setShow(false);
    }
    getTotalCount();
  }, [value]);

  return (
    <>

      {
        user?.subscription ? (
          <>
            <div className="container-fluid ovh">
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumb_content style2 mt-5">
                    <h2 className="breadcrumb_title">Manage Enquiries </h2>
                  </div>
                </div>

                <div className="bg-white-shadow manage_enqury">
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                      >
                        <Tab
                          label={`Enquiries - ${total?.inquiriesCount ? total?.inquiriesCount : ""
                            }`}
                          value="1"
                          className="px-5 py-3"
                        />
                        <Tab
                          label={`Chats - ${totalUnreadCount}`}
                          value="2"
                          className="px-5 py-3"
                        />
                        <Tab
                          label={`Meetings - ${total?.meetingsCount ? total?.meetingsCount : ""
                            }`}
                          value="3"
                          className="px-5 py-3"
                        />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      <EnquiryTab enquiryList={enquiryList} loader={enquiryLoader} />
                    </TabPanel>
                    <TabPanel value="2">
                      {!user?.subscription ? (
                        <SubscriptionAlert
                          open={show}
                          handleClose={handleClose}
                          message={chatMessage}
                        />
                      ) : (
                        <ChatBox />
                      )}
                    </TabPanel>
                    <TabPanel value="3">
                      {loader ? (
                        <RectangleSkeleton />
                      ) : (
                        <>
                          <MeetingTab requestList={requestList} setShow={setShow} />
                          <CustomPagination count={count} />
                        </>
                      )}
                    </TabPanel>
                  </TabContext>
                </div>
              </div>
            </div>
            <SubscriptionAlert
              open={show}
              handleClose={handleClose}
              message={meetingMessage}
            />
          </>
        ) : (
          <>
            <SubscriptionModal show={true} handleClose={() => naviagte(-1)} />
          </>
        )
      }
    </>
  );
}

export default ManageEnquiryMain;
