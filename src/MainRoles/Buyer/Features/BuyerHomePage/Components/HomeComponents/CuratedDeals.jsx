import { getCuratedDeals, toogleSavePropertyApi } from "@/ApiRoutes/BuyersApi";
import { formatNumberInCr, navigateToDetail } from "@/CustomServices/Constant";
import { toastMessage } from "@/CustomServices/ToastMessage";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { toast } from "react-toastify";
import profile from "@/CustomAssets/BuyerImages/profile-img.png";
import { useSelector } from "react-redux";
import { selectUser } from "@/Redux/Auth/authSlice";

function CuratedDeals({ settings, setting2 }) {
  const [curatedDealLoader, setCuratedDealLoader] = useState(true);
  const [curatedDeals, setCuratedDeals] = useState([]);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  function curatedDealsList() {
    getCuratedDeals()
      .then((res) => {
        const deals = res?.data?.curatedDeals || [];
        deals.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));
        setCuratedDeals(deals);
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => setCuratedDealLoader(false));
  }

  async function toogleSaveProperty(id, index) {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    if (user?.interested === "sell") {
      toast.info("Please login as Buyer");
      return;
    }
    const updatedDeals = [...curatedDeals];
    updatedDeals[index].saved = !updatedDeals[index].saved;
    setCuratedDeals(updatedDeals);

    try {
      const response = await toogleSavePropertyApi(id);
    } catch (error) {
      updatedDeals[index].saved = !updatedDeals[index].saved;
      setCuratedDeals(updatedDeals);
      toastMessage();
    }
  }

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  useEffect(() => {
    curatedDealsList();
  }, []);

  return (
    <>
    
      {curatedDeals?.length ? (
        <div className="container fl-container py-5 curated_section-wrapper">
          <div className="text-center pb-4">
            <h2 className="fl-ff-main fl-text-dark fl-heading-2 mb-1">
              Featured Properties 
            </h2>
            <p className="fl-ff-main fl-text-dark fw-semi-bold fs-22 mb-5">
              Exclusive Deals Just For You
            </p>
          </div>
          {curatedDeals?.length > 2 ? (
            <Slider {...setting2}>
              {curatedDeals?.map((element, index) => (
                <div className="slide-item" key={index}>
                  <div className="fl-curated-card">
                    <Link
                      to={navigateToDetail(
                        element?.propertyType,
                        element?.propertyTitle,
                        element?.propertyCode
                      )}
                      target="_blank"
                    >
                      <div className="curated-img">
                        <img
                          className="w-100"
                          src={
                            element?.propertyAds
                              ? element?.propertyAds
                              : element?.heroImage
                          }
                          alt="img"
                        />
                      </div>
                    </Link>
                    <div className="curated-detail">
                      <div className="curated-detail-content-wapper fl-card-shadow">
                        <div className="curated-detail-image-wapper d-flex justify-content-between align-items-center">
                          <div className="curated-profile-image">
                            <img
                              src={element?.logo || element?.heroImage}
                              alt="profile"
                              className=""
                            />
                          </div>
                          <div className="favorite-icon me-md-4">
                            <Checkbox
                              onChange={() =>
                                toogleSaveProperty(element?._id, index)
                              }
                              {...label}
                              icon={<FavoriteBorder />}
                              checkedIcon={<Favorite />}
                              checked={element.saved}
                            />
                          </div>
                        </div>
                        <div className="curated-detail-content mt-2">
                          <h4>{element?.propertyTitle}</h4>
                          <p>
                            {element?.city}, {element?.state}
                          </p>
                        </div>
                        <div className="d-flex flex-wrap justify-content-between align-items-end">
                          <h3 className="fl-text-dark mb-0 fs-3">
                            {formatNumberInCr(element?.price)}{" "}
                            <span className="fs-5 fw-normal">Onwards</span>
                          </h3>
                          <Link
                            to={navigateToDetail(
                              element?.propertyType,
                              element?.propertyTitle,
                              element?.propertyCode
                            )}
                            target="_blank"
                          >
                            <button className="fl-btn-yellow">Explore</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <>
              <div className="row">
                {curatedDeals?.map((element, index) => (
                  <div className="slide-item col-md-6 mb-3 mb-md-0" key={index}>
                    <div className="fl-curated-card fl-curated-card-2">
                    <Link
                      to={navigateToDetail(
                        element?.propertyType,
                        element?.propertyTitle,
                        element?.propertyCode
                      )}
                      target="_blank"
                    >
                      <div className="curated-img">
                        <img
                          className="w-100"
                          src={
                            element?.propertyAds
                              ? element?.propertyAds
                              : element?.heroImage
                          }
                          alt="img"
                        />
                      </div>
                      </Link>
                      <div className="curated-detail">
                        <div className="curated-detail-content-wapper fl-card-shadow">
                          <div className="curated-detail-image-wapper d-flex justify-content-between align-items-center">
                            <div className="curated-profile-image">
                              <img
                                src={element?.logo || element?.heroImage}
                                alt="profile"
                              />
                            </div>
                            <div className="favorite-icon me-md-4">
                              <Checkbox
                                onChange={() =>
                                  toogleSaveProperty(element?._id, index)
                                }
                                {...label}
                                icon={<FavoriteBorder />}
                                checkedIcon={<Favorite />}
                                checked={element.saved}
                              />
                            </div>
                          </div>
                          <div className="curated-detail-content mt-2">
                            <h4>{element?.propertyTitle}</h4>
                            <p>
                              {element?.city}, {element?.state}
                            </p>
                          </div>
                          <div className="d-flex flex-wrap justify-content-between align-items-end">
                            <h3 className="fl-text-dark mb-0 fs-3">
                              {formatNumberInCr(element?.price)}{" "}
                              <span className="fs-5">Onwards</span>
                            </h3>
                            <Link
                              to={navigateToDetail(
                                element?.propertyType,
                                element?.propertyTitle,
                                element?.propertyCode
                              )}
                              target="_blank"
                            >
                              <button className="fl-btn-yellow">Explore</button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ) : null}
    </>
  );
}

export default CuratedDeals;
