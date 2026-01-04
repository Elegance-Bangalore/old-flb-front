import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Link } from "react-router-dom";
import { formatPropertyType } from "@/CustomServices/Constant";

function FooterSeoHomePage({
  tabValue,
  filteredCategories,
  handleTabChange,
  seoData,
}) {
  return (
    <div className="row footer-seo-row mb-5">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleTabChange}
              aria-label="SEO tabs"
              className="footer-seo-tab-list"
            >
              {filteredCategories.map((category) => (
                <Tab
                  key={category}
                  label={formatPropertyType(category)}
                  value={category}
                />
              ))}
            </TabList>
          </Box>
          {filteredCategories?.map((category) => (  
            <TabPanel
              key={category}
              value={category}
              className="footer-seo-tab-panel-content"
            >
              <div className="row">
                {seoData[category].map((property) => (
                  <div className="col-sm-6 col-md-2" key={property._id}>
                    <Link
                      className="footer-link "
                      style={{fontSize: "12px"}}
                      to={`/property-list/?propertyType=${property.propertyType}&page=1&city=${property.city}`}
                    >
                      {property.title}
                    </Link>
                  </div>
                ))}
              </div>
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </div>
  );
}

export default FooterSeoHomePage;
