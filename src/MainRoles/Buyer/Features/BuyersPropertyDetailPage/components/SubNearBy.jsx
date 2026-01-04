import React, { useEffect, useState } from "react";
import { Modal, IconButton, Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useInView } from "react-intersection-observer";
import { nearbyLocationApi } from "@/ApiRoutes/BuyersApi";
import NearbyMap from "./NearbyMap";
const SubNearBy = ({ setActiveSection, singleProperty }) => {
  const [value, setValue] = useState("1");
  const [nearbyData, setNearbyData] = useState(null);
  const location = {
    locality: singleProperty?.locality,
    city: singleProperty?.city,
    state: singleProperty?.state,
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [ref, inView, entry] = useInView({
    threshold: [0.5, 1],
    rootMargin: "-50px 0px -50px 0px",
    triggerOnce: false,
  });

  async function getNearbyList() {
    try {
      const response = await nearbyLocationApi(location);
      setNearbyData(response?.data);
    } catch (error) {
      console.log("Error in get nearby list", error);
    }
  }

  useEffect(() => {
    if (inView && entry.isIntersecting) {
      setActiveSection("nearby");
    }
    if (singleProperty) {
      getNearbyList();
    }
  }, [inView, entry, setActiveSection]);

  return (
    <>
      {nearbyData && (
        <section className="content-section pb-0" id="nearby">
          <div className="detail-content-box fl-property-card rounded-3">
            <div className="px-3 py-3 border-bottom fl-card-border">
              <h3 className="fl-text-dark text-uppercase mb-0 fl-fs-22">
                Nearby Location
              </h3>
            </div>
            <div className="overview-content" ref={ref}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      className="text-capitalize fw-normal"
                      label="Highlights"
                      value="1"
                    />
                    <Tab
                      className="text-capitalize fw-normal"
                      label="Shopping"
                      value="2"
                    />
                    <Tab
                      className="text-capitalize fw-normal"
                      label="Restaurants"
                      value="3"
                    />
                    <Tab
                      className="text-capitalize fw-normal"
                      label="Schools"
                      value="4"
                    />
                    <Tab
                      className="text-capitalize fw-normal"
                      label="Hospitals"
                      value="5"
                    />
                    <Tab
                      className="text-capitalize fw-normal"
                      label="Airports"
                      value="6"
                    />
                    <Tab
                      className="text-capitalize fw-normal"
                      label="Upcoming Projects"
                      value="7"
                    />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <NearbyMap nearbyData={nearbyData?.highlights} />
                </TabPanel>
                <TabPanel value="2">
                  <NearbyMap nearbyData={nearbyData?.shoppingMalls} />
                </TabPanel>
                <TabPanel value="3">
                  <NearbyMap nearbyData={nearbyData?.restaurants} />
                </TabPanel>
                <TabPanel value="4">
                  <NearbyMap nearbyData={nearbyData?.schools} />
                </TabPanel>
                <TabPanel value="5">
                  <NearbyMap nearbyData={nearbyData?.hospitals} />
                </TabPanel>
                <TabPanel value="6">
                  <NearbyMap nearbyData={nearbyData?.airports} />
                </TabPanel>
                <TabPanel value="7">
                  <NearbyMap nearbyData={nearbyData?.UpcomingProjects} />
                </TabPanel>
              </TabContext>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SubNearBy;
