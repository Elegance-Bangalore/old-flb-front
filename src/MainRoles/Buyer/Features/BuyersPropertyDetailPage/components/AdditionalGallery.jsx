import React from "react";
import ImageSlider from "../ImageSlider";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

function AdditionalGallery({ singleProperty, setActiveSection }) {
  const [value, setValue] = React.useState("0");
  const allImages =
    [
      ...singleProperty?.bedroomsImages,
      ...singleProperty?.bathroomsImages,
      ...singleProperty?.kitchenImages,
      ...singleProperty?.exteriorViewImages,
      ...singleProperty?.floorPlanImages,
    ] || [];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!allImages || allImages.length === 0) {
    return null;
  }

  return (
    <section className="content-section pb-0" id="gallery">
      <div className="detail-content-box fl-property-card rounded-3">
        <div className="py-3 border-bottom fl-card-border">
          <h3 className="fl-text-dark text-uppercase mb-0">
            Additional Gallery
          </h3>
        </div>

        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="All Images" value="0" />
              <Tab
                label="Bedroom Images"
                value="1"
                hidden={singleProperty?.bedroomsImages?.length === 0}
              />
              <Tab
                label="Bathroom Images"
                value="2"
                hidden={singleProperty?.bathroomsImages?.length === 0}
              />
              <Tab
                label="Kitchen Images"
                value="3"
                hidden={singleProperty?.kitchenImages?.length === 0}
              />
              <Tab
                label="Exterior View Images"
                value="4"
                hidden={singleProperty?.exteriorViewImages?.length === 0}
              />
              <Tab
                label="Floor Plan Images"
                value="5"
                hidden={singleProperty?.floorPlanImages?.length === 0}
              />
            </TabList>
          </Box>
          <TabPanel value="0">
            <div className="single-img-preview p-4">
              <ImageSlider
                singleProperty={singleProperty}
                gallery={allImages?.map((item) => item.Location)}
                setActiveSection={setActiveSection}
              />
            </div>
          </TabPanel>
          <TabPanel value="1">
            <div className="single-img-preview p-4">
              <ImageSlider
                singleProperty={singleProperty}
                gallery={[...singleProperty?.bedroomsImages]?.map(
                  (item) => item.Location
                )}
                setActiveSection={setActiveSection}
              />
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div className="single-img-preview p-4">
              <ImageSlider
                singleProperty={singleProperty}
                gallery={[...singleProperty?.bathroomsImages]?.map(
                  (item) => item.Location
                )}
                setActiveSection={setActiveSection}
              />
            </div>
          </TabPanel>
          <TabPanel value="3">
            <div className="single-img-preview p-4">
              <ImageSlider
                singleProperty={singleProperty}
                gallery={[...singleProperty?.kitchenImages]?.map(
                  (item) => item.Location
                )}
                setActiveSection={setActiveSection}
              />
            </div>
          </TabPanel>
          <TabPanel value="4">
            <div className="single-img-preview p-4">
              <ImageSlider
                singleProperty={singleProperty}
                gallery={[...singleProperty?.exteriorViewImages]?.map(
                  (item) => item.Location
                )}
                setActiveSection={setActiveSection}
              />
            </div>
          </TabPanel>
          <TabPanel value="5">
            <div className="single-img-preview p-4">
              <ImageSlider
                singleProperty={singleProperty}
                gallery={[...singleProperty?.floorPlanImages]?.map(
                  (item) => item.Location
                )}
                setActiveSection={setActiveSection}
              />
            </div>
          </TabPanel>
        </TabContext>
      </div>
    </section>
  );
}

export default AdditionalGallery;
