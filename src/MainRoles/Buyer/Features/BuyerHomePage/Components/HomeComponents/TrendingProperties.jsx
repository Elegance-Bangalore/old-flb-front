import { getPropertyByCityBuyerHome } from "@/ApiRoutes/BuyersApi";
import HomePageCardLoader from "@/CustomCommon/MaterialUi/HomepageCardLoader";
import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import PropertyCard from "../CommonComponent/PropertyCard";
import { useInView } from "react-intersection-observer";

function TrendingProperties({ settings }) {
  const [city, setCity] = useState("Bengaluru");
  const [loader, setLoader] = useState(true);
  const [propertyTrending, setPropertyTrending] = useState([]);
  const [ref, inView] = useInView({ triggerOnce: true });

  const cityArray = [
    {
      name: "Bengaluru",
      cityName: "Bengaluru",
    },
    {
      name: "Hyderabad",
      cityName: "Hyderabad",
    },

    {
      name: "mumbai",
      cityName: "Mumbai",
    },
    {
      name: "pune",
      cityName: "Pune",
    },
    {
      name: "Mysuru",
      cityName: "Mysuru",
    },
    {
      name: "Chennai",
      cityName: "Chennai",
    },
  ];

  function propertyByCity() {
    setLoader(true);
    getPropertyByCityBuyerHome(city)
      .then((res) => {
        setPropertyTrending(res?.data?.trendProperties);
      })
      .catch((error) => {
        throw error;
        toast.error("Please Check Your Internet Connection");
      })
      .finally(() => setLoader(false));
  }

  useEffect(() => {
    if (inView) {
      propertyByCity();
    }
  }, [city, inView]);

  return (
    <section ref={ref}>
      <div className="container fl-container">
        <div className="row">
          <div className="col-lg-6 col-md-8 mx-auto">
            <div className="text-center">
              <h2 className="fl-ff-main fl-text-dark fl-heading-2">
                Trending Properties in Top Cities
              </h2>
              <p className="fl-ff-main fl-text-dark fw-semi-bold fs-22 mb-5">
                Most popular choices around the country
              </p>
              <div className="row justify-content-center buyer-home-trending">
                {cityArray?.map((element, index) => (
                  <div
                 className="col-5  col-md-4"
                    key={index}
                    onClick={() => setCity(element.name)}
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className={` px-4 fl-light-${
                        element.name === city ? "green" : "gray"
                      }-pill mx-auto mb-4`}
                       style={{
                        minWidth:"80px"
                      }}
                    >
                      <FormControlLabel
                        control={<Checkbox defaultChecked hidden />}
                        label={element.cityName}
                        name={element.name}
                        value={city}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {loader ? (
            <HomePageCardLoader />
          ) : propertyTrending?.length > 2 ? (
            <div className="col-12">
              <div className="mt-5">
                <Slider {...settings}>
                  {propertyTrending?.map((element, index) => (
                    <div className="" key={index}>
                      <PropertyCard property={element} index={index} />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          ) : propertyTrending?.length ? (
            <div className="col-12">
              <div className="mt-5 row justify-content-center">
                {propertyTrending?.map((element, index) => (
                  <div className="col-lg-4 col-md-6 mb-4" key={index}>
                    <PropertyCard property={element} index={index} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="fl-fs-22 fl-text-dark">
                Currently, there are no properties trending in this city.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default TrendingProperties;
