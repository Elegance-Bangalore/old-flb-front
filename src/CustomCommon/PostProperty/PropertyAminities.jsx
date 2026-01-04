import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormControlLabel,
  TextField,
  Checkbox,
  FormGroup,
} from "@mui/material";
import { Add, Star1 } from "iconsax-react";
import Button from "@mui/material/Button";
import ShowError from "../Others/ShowError";

function PropertyAminities({ formik }) {
  const { values, errors, touched, setFieldValue } = formik;
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [addAminity, setAddAminity] = useState(false);
  const [aminity, setAminity] = useState("");

  const allAmenitiesData = [
    {
      name: "Water Supply",
      icon: "https://flb-public.s3.ap-south-1.amazonaws.com/Drop-Bulk-32px%282%29.svg",
    },
    {
      name: "Electricity",
      icon: "https://flb-public.s3.ap-south-1.amazonaws.com/Flash-Bulk-32px%281%29.svg",
    },
    {
      name: "Security Guard",
      icon: "https://flb-public.s3.ap-south-1.amazonaws.com/Security-Bulk-32px%281%29.svg",
    },
    {
      name: "Swimming Pool",
      icon: "https://flb-public.s3.ap-south-1.amazonaws.com/CloudFog-Bulk-32px%281%29.svg",
    },
    {
      name: "Sewage",
      icon: "https://flb-public.s3.ap-south-1.amazonaws.com/Trash-Bulk-32px%281%29.svg",
    },
    {
      name: "Kids Play Area",
      icon: "https://flb-public.s3.ap-south-1.amazonaws.com/EmojiHappy-Bulk-32px%281%29.svg",
    },
    {
      name: "Garden",
      icon: "https://flb-public.s3.ap-south-1.amazonaws.com/Tree-Bulk-32px%282%29.svg",
    },
    {
      name: "Internal Road",
      icon: "https://flb-public.s3.ap-south-1.amazonaws.com/Driving-Bulk-32px%281%29.svg",
    },
    {
      name: "Club House",
      icon: "https://flb-public.s3.ap-south-1.amazonaws.com/House2-Bulk-32px%281%29.svg",
    },
    {
      name: "Avenue Plantations",
      icon: "https://flb-public.s3.ap-south-1.amazonaws.com/AvenuePlantations.png",
    },
    {
      name: "Borewell",
      icon: "https://flb-public.s3.ap-south-1.amazonaws.com/Borewell.png",
    },
    {
      name: "Camfire",
      icon: "https://flb-public.s3.ap-south-1.amazonaws.com/Campfire.png",
    },
    {
      name: "Camping",
      icon: "https://flb-public.s3.ap-south-1.amazonaws.com/Camping.png",
    },
    {
      name: "Car Parking",
      icon: "https://flb-public.s3.ap-south-1.amazonaws.com/CarParking.png",
    },
    {
      name: "CCTV",
      icon: "https://flb-public.s3.ap-south-1.amazonaws.com/CCTV.png",
    },
    {
      name: "Cycling Track",
      icon: "https://flb-public.s3.ap-south-1.amazonaws.com/CyclingTrack.png",
    },
    {
      name: "Drip Irrigation",
      icon: "https://flb-public.s3.ap-south-1.amazonaws.com/DripIrrigation.png",
    },
    {
      name: "Fruit Plantation",
      icon: "https://flb-public.s3.ap-south-1.amazonaws.com/FruitPlantation.png",
    },
    {
      name: "Main Entrance Arch",
      icon: "https://flb-public.s3.ap-south-1.amazonaws.com/MainEntranceArch.png",
    },
    {
      name: "Managed Farm",
      icon: "https://flb-public.s3.ap-south-1.amazonaws.com/ManagedFarm.png",
    },
    {
      name: "Organic Farming",
      icon: "https://flb-public.s3.ap-south-1.amazonaws.com/OrganicFarming.png",
    },
    {
      name: "Party Lawn",
      icon: "https://flb-public.s3.ap-south-1.amazonaws.com/PartyLawn.png",
    },
    {
      name: "Plot Fencing",
      icon: "https://flb-public.s3.ap-south-1.amazonaws.com/PlotFencing.png",
    },
    {
      name: "Sewage Treatment Plants",
      icon: "https://flb-public.s3.ap-south-1.amazonaws.com/SewageTreatmentPlants.png",
    },
    {
      name: "Vegetable Plantation",
      icon: "https://flb-public.s3.ap-south-1.amazonaws.com/VegetablePlantation.png",
    },
    {
      name: "Yoga Meditation Center",
      icon: "https://flb-public.s3.ap-south-1.amazonaws.com/Yoga_MeditationCenter.png",
    },
  ];

  const agricultureLandAmenities = [
    "Water Supply",
    "Electricity",
    "Security Guard",
    "Sewage",
    "Internal Road",
    "Borewell",
    "CCTV",
    "Plot Fencing",
    "Vegetable Plantation",
    "Fruit Plantation",
    "Avenue Plantations",
    "Drip Irrigation",
  ];

  const filteredAmenitiesData =
    values.propertyType === "agricultureLand"
      ? allAmenitiesData.filter((amenity) =>
          agricultureLandAmenities.includes(amenity.name)
        )
      : allAmenitiesData;

  useEffect(() => {
    setSelectedAmenities(values.amenities);
  }, [values.amenities]);

  const handleCheckboxToggle = (name, icon) => {
    const index = selectedAmenities.findIndex((item) => item.name === name);
    if (index !== -1) {
      const updatedAmenities = selectedAmenities.filter(
        (item) => item.name !== name
      );
      setSelectedAmenities(updatedAmenities);
      setFieldValue("amenities", updatedAmenities);
    } else {
      const updatedAmenities = [...selectedAmenities, { name, icon }];
      setSelectedAmenities(updatedAmenities);
      setFieldValue("amenities", updatedAmenities);
    }
  };

  function removeAminity(index) {
    const updateList = [...values.otherAmenities];
    updateList.splice(index, 1);
    setFieldValue("otherAmenities", updateList);
  }

  function addOtherAminity(e) {
    e.preventDefault();
    if (aminity) {
      const updateData = [...values.otherAmenities, aminity];
      setFieldValue("otherAmenities", updateData);
      setAminity("");
    }
  }

  return (
    <>
      <div className="row mb-5">
        <div className="col-xxl-12">
          <div className="bg-white-shadow select-property-wrapper p-4 rounded-3 border">
            <div className="row mb-3">
              <div className="col-12">
                <h4 className="">Property Amenities</h4>
              </div>
            </div>
            <FormGroup>
              <div className="row">
                {filteredAmenitiesData.map((amenity, index) => (
                  <div key={index} className="col-sm-6 col-md-3">
                    <div
                      className={`${
                        selectedAmenities.some(
                          (item) => item.name === amenity.name
                        )
                          ? "bg-border-light-green"
                          : ""
                      } swtich-container mb-4`}
                    >
                      <img src={amenity.icon} alt="Logo"></img>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedAmenities.some(
                              (item) => item.name === amenity.name
                            )}
                            onChange={() =>
                              handleCheckboxToggle(amenity.name, amenity.icon)
                            }
                            style={{ visibility: "hidden" }}
                          />
                        }
                        label={amenity.name}
                        labelPlacement="start"
                      />
                    </div>
                  </div>
                ))}

                {values.otherAmenities?.map((item, index) => (
                  <div
                    className="col-sm-6 col-md-3"
                    onDoubleClick={() => removeAminity(index)}
                    key={index}
                  >
                    <div className="bg-border-light-green swtich-container mb-4 ">
                      <Star1 size="32" color="#00a76f" variant="Bulk" />
                      <FormControlLabel
                        control={<Checkbox style={{ visibility: "hidden" }} />}
                        label={item}
                        labelPlacement="start"
                      />
                    </div>
                  </div>
                ))}

                <div
                  className="col-sm-6 col-md-3"
                  hidden={addAminity}
                  onClick={() => setAddAminity(true)}
                >
                  <button
                    className="bg-border-light-green swtich-container mb-4 w-100"
                    style={{ borderStyle: "dashed" }}
                  >
                    <Add size="40" />
                    Add
                  </button>
                </div>

                <div className="col-sm-6 col-md-3" hidden={!addAminity}>
                  <form onSubmit={addOtherAminity}>
                    <FormControl className="mb-4">
                      <TextField
                        id=""
                        label="Add Aminity"
                        variant="outlined"
                        value={aminity}
                        autoFocus
                        onChange={(e) => setAminity(e.target.value)}
                        onBlur={addOtherAminity}
                      />
                    </FormControl>
                    <Button
                      type="submit"
                      className="me-3"
                      variant="contained"
                      onClick={addOtherAminity}
                    >
                      Submit
                    </Button>
                    <Button
                      type="button"
                      variant="contained"
                      color="error"
                      onClick={() => {
                        setAddAminity(false);
                        setAminity("");
                      }}
                    >
                      Cancel
                    </Button>
                  </form>
                </div>
              </div>
            </FormGroup>
          </div>
          <ShowError touched={touched.amenities} message={errors.amenities} />
        </div>
      </div>
    </>
  );
}

export default PropertyAminities;
