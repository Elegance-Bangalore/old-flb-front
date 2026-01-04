import { suggestedPropertiesApi } from "@/ApiRoutes/BuyersApi";
import { settings } from "@/CustomServices/sliderSetting";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import PropertyCard from "../../BuyerHomePage/Components/CommonComponent/PropertyCard";
import OnClickLoader from "@/CustomCommon/Others/OnClickLoader";

function DetailPageSuggestion({ singleProperty }) {
  const [loader, setLoader] = useState(true);
  const [suggestedProperties, setSuggestedProperties] = useState([]);

  async function getSuggestedProperties() {
    try {
      setLoader(true);
      const response = await suggestedPropertiesApi(singleProperty?._id);
      setSuggestedProperties(response?.data?.similarProperties);
    } catch (error) {
      throw error;
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    getSuggestedProperties();
  }, []);

  if (suggestedProperties?.length < 3) {
    return null;
  }

  return (
    <>
      {loader ? (
        <div className="text-center my-3">
          <OnClickLoader />
        </div>
      ) : (
        <div>
          <h3 className="mb-5">SIMILAR PROPERTIES</h3>
          <Slider {...settings}>
            {suggestedProperties?.map((element, index) => (
              <div className="slide-item" key={index}>
                <PropertyCard property={element} />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
}

export default DetailPageSuggestion;
