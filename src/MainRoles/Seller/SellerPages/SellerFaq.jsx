import MobileMenu from "@/components/common/header/MobileMenu";
import Header from "@/components/common/header/dashboard/Header";
import SidebarMenu from "@/components/common/header/dashboard/SidebarMenu";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TextField from "@mui/material/TextField";
import GeneralFaq from "@/components/faq/GeneralFaq";
import AccountFaq from "@/components/faq/AccountFaq";
import BuyerFaq from "@/components/faq/BuyerFaq";
import FaqContent from "@/components/faq/FaqContent";

const SellerFaq = () => {

    const [value, setValue] = useState("1");
    const [search, setSearch] = useState("");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSearch = (value) => {
        let query = value;
        setSearch(query);
        if (query) {
            setValue("5");
        } else {
            setValue("1");
        }
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
                    <SidebarMenu />
                </div>
            </div>
            <section className="our-dashbord dashbord bgc-f7">
                <div className="container-fluid ovh">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb_content">
                                <h2 className="breadcrumb_title">FAQS</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-10 offset-lg-1">
                                <div className="faq_content">
                                    <div className="faq_according">
                                        <div className="row">
                                            <div className="col-9">
                                                <Box sx={{ width: "100%", typography: "body1" }}>
                                                    <TabContext value={value}>
                                                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                                            <TabList
                                                                onChange={handleChange}
                                                                aria-label="lab API tabs example "
                                                                className="col-md-9"
                                                            >
                                                                <Tab
                                                                    label="General FAQs,"
                                                                    value="1"
                                                                    hidden={search}
                                                                />
                                                                <Tab
                                                                    label="Account FAQs"
                                                                    value="2"
                                                                    hidden={search}
                                                                />
                                                                <Tab
                                                                    label="Buyer FAQs"
                                                                    value="3"
                                                                    hidden={search}
                                                                />
                                                                <Tab
                                                                    label="Seller FAQs"
                                                                    value="4"
                                                                    hidden={search}
                                                                />
                                                                <Tab label="Search" value="5" hidden={!search} />
                                                            </TabList>
                                                        </Box>
                                                        <TabPanel value="1">
                                                            <GeneralFaq />
                                                        </TabPanel>
                                                        <TabPanel value="2">
                                                            <AccountFaq />
                                                        </TabPanel>
                                                        <TabPanel value="3">
                                                            <BuyerFaq />
                                                        </TabPanel>
                                                        <TabPanel value="4">
                                                            <SellerFaq />
                                                        </TabPanel>
                                                        <TabPanel value="5">
                                                            <FaqContent search={search} />
                                                        </TabPanel>
                                                    </TabContext>
                                                </Box>
                                            </div>
                                            <div className="col-3">
                                                <div>
                                                    <TextField
                                                        label="Search..."
                                                        id="outlined-size-small"
                                                        size="small"
                                                        className="col-md-3"
                                                        value={search}
                                                        onChange={(e) => handleSearch(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default SellerFaq;
