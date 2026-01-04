import ChatTab from "@/MainRoles/Seller/Features/ManageEnquiries/Components/ChatTab";
import BuyerSidebarMenu from "@/MainRoles/Buyer/BuyerLayout/BuyerSidebarMenu";
import Header from "@/components/common/header/DefaultHeader";
import MobileMenu from "@/components/common/header/MobileMenu";
import "../ManageChats/chatStyle.scss";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import TextField from '@mui/material/TextField';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const ChatMain = () => {
  // State to store the selected image file

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />
      

      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <BuyerSidebarMenu />
        </div>
      </div>
      <section className="our-dashbord dashbord bgc-f7">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb_content style2">
                <h2 className="breadcrumb_title">CHATS</h2>
              </div>
            </div>
            <div className="col-lg-9">
              <Box
                sx={{
                  flexGrow: 1,
                  bgcolor: "background.paper",
                  display: "flex",
                  height: "70vh",
                }}
              >
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={value}
                  onChange={handleChange}
                  aria-label="Vertical tabs example"
                  sx={{ borderRight: 1, borderColor: "divider" }}
                >
                  <Tab label="Item One" {...a11yProps(0)} />
                  <Tab label="Item Two" {...a11yProps(1)} />
                  <Tab label="Item Three" {...a11yProps(2)} />
                  <Tab label="Item Four" {...a11yProps(3)} />
                  <Tab label="Item Five" {...a11yProps(4)} />
                  <Tab label="Item Six" {...a11yProps(5)} />
                  <Tab label="Item Seven" {...a11yProps(6)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                  <div className="custom-tab">
                    <TextField
                      id="outlined-basic"
                      className="w-100"
                      label="Outlined"
                      variant="outlined"
                    />
                  </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                  Item Three
                </TabPanel>
                <TabPanel value={value} index={3}>
                  Item Four
                </TabPanel>
                <TabPanel value={value} index={4}>
                  Item Five
                </TabPanel>
                <TabPanel value={value} index={5}>
                  Item Six
                </TabPanel>
                <TabPanel value={value} index={6}>
                  Item Seven
                </TabPanel>
              </Box>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChatMain;
