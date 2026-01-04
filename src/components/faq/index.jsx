import { useState } from "react";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../common/header/DefaultHeader";
import MobileMenu from "../common/header/MobileMenu";
;
import BreadCrumbBanner from "./BreadCrumbBanner";
import FaqContent from "./FaqContent";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TextField from "@mui/material/TextField";
import GeneralFaq from "./GeneralFaq";
import AccountFaq from "./AccountFaq";
import BuyerFaq from "./BuyerFaq";
import SellerFaq from "./SellerFaq";

const index = () => {
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

      {/* <!-- Modal --> */}
      

      {/* <!-- Inner Page Breadcrumb --> */}
      <BreadCrumbBanner />

      {/* <!-- Our FAQ --> */}
      <section className="our-faq bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2 className="mt0">Frequently Asked Questions</h2>
              </div>
            </div>
          </div>
          {/* End .row */}

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
          {/* End .row */}
        </div>
      </section>

      {/* <!-- Our Footer --> */}
      <section className="footer_one">
        <div className="container">
          <div className="row">
            <Footer />
          </div>
        </div>
      </section>

      {/* <!-- Our Footer Bottom Area --> */}
      <section className="footer_middle_area pt40 pb40">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section>
    </>
  );
};

export default index;
