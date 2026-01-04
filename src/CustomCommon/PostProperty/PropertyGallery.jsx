import React from "react";
import SingleImageUpload from "./SingleImageUpload";
import UploadGallery from "./UploadGallery";
import ShowError from "../Others/ShowError";
import UploadMultipleImages from "./UploadMultipleImages";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import GetMultipleImagesUrl from "./GetMultipleImagesUrl";
import { farmhouse } from "@/CustomServices/Constant";

function PropertyGallery({ formik }) {
  const { errors, touched, values } = formik;
  const [value, setValue] = React.useState("featured");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="row mb-5">
        <div className="col-xxl-12">
          <div className="bg-white-shadow select-property-wrapper pb-4 pt-2 rounded-3 border">
            <div className="manage_enqury property-manage_enqury">
              <div className="border__">
                <div className="col-12 p-3">
                  <h4 className="">Upload Property Gallery </h4>
                </div>
                <Box sx={{ width: "100%", typography: "body1" }}>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                      >
                        <Tab label="Featured Image" value="featured" />
                        <Tab label="Property Logo" value="propertyLogo" />
                        <Tab label="Property Gallery" value="propertyGallery" />
                        <Tab label="Master Plan" value="masterPlan" />
                        <Tab label="Layout Map" value="layoutMap" />
                        <Tab
                          label="Bedroom"
                          value="bedroom"
                          hidden={values.propertyType !== farmhouse}
                        />
                        <Tab
                          label="Bathroom"
                          value="bathroom"
                          hidden={values.propertyType !== farmhouse}
                        />
                        <Tab
                          label="Kitchen"
                          value="kitchen"
                          hidden={values.propertyType !== farmhouse}
                        />
                        <Tab
                          label="Exterior View"
                          value="exteriorViewImages"
                          hidden={values.propertyType !== farmhouse}
                        />
                        <Tab
                          label="Floor Plan"
                          value="floorPlan"
                          hidden={values.propertyType !== farmhouse}
                        />
                      </TabList>
                    </Box>
                    <TabPanel value="featured">
                      <SingleImageUpload
                        formik={formik}
                        name={"heroImage"}
                        details="Single Image | Formats: jpg, jpeg, png | Dimension:  1440*410 pixels"
                      />
                    </TabPanel>
                    <TabPanel value="propertyLogo">
                      <SingleImageUpload
                        formik={formik}
                        name={"logo"}
                        details="Single Image | Formats: jpg, jpeg, png | Dimension:  200*200 pixels"
                      />
                    </TabPanel>
                    <TabPanel value="propertyGallery">
                      <UploadGallery formik={formik} />
                    </TabPanel>
                    <TabPanel value="masterPlan">
                      <SingleImageUpload formik={formik} name={"masterPlan"} />
                    </TabPanel>
                    <TabPanel value="layoutMap">
                      <UploadMultipleImages
                        formik={formik}
                        name={"layoutMap"}
                      />
                    </TabPanel>
                    <TabPanel value="bedroom">
                      <GetMultipleImagesUrl
                        formik={formik}
                        name={"bedroomsImages"}
                      />
                    </TabPanel>
                    <TabPanel value="bathroom">
                      <GetMultipleImagesUrl
                        formik={formik}
                        name={"bathroomsImages"}
                      />
                    </TabPanel>
                    <TabPanel value="kitchen">
                      <GetMultipleImagesUrl
                        formik={formik}
                        name={"kitchenImages"}
                      />
                    </TabPanel>
                    <TabPanel value="exteriorViewImages">
                      <GetMultipleImagesUrl
                        formik={formik}
                        name={"exteriorViewImages"}
                      />
                    </TabPanel>
                    <TabPanel value="floorPlan">
                      <GetMultipleImagesUrl
                        formik={formik}
                        name={"floorPlanImages"}
                      />
                    </TabPanel>
                  </TabContext>
                </Box>
              </div>
              <div className="ms-3">
                <ShowError
                  touched={touched.heroImage}
                  message={errors.heroImage}
                />
                <ShowError touched={touched.images} message={errors.images} />
                <ShowError
                  touched={touched.layoutMap}
                  message={errors.layoutMap}
                />
                <ShowError touched={touched.videos} message={errors.videos} />
                <ShowError
                  touched={touched.masterPlan}
                  message={errors.masterPlan}
                />
                <ShowError
                  touched={touched.videoUrl}
                  message={errors.videoUrl}
                />
                <ShowError touched={touched.logo} message={errors.logo} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertyGallery;
