import React from "react";
import dummyProfile from "@/CustomAssets/BuyerImages/Dummy-profile.png";

function DeveloperDetail({ developerData }) {
  return (
    <>
      <section className="fl-bg-white">
        <div className="container fl-container pt-5">
          <div className="explore-wrapper fl-glass-bg rounded-5 p-2 property-detail-wrapper">
            <div className="d-flex flex-column flex-lg-row">
              <div className="w-auto mb-3 mb-lg-0">
                <img
                  className="developer-img-main img-fluid fl-img-1-1"
                  src={
                    developerData?.seller?.logo
                      ? developerData?.seller?.logo
                      : developerData?.seller?.profilePic || dummyProfile
                  }
                  alt="developer-img"
                />
              </div>
              <div className="w-100 mb-2">
                <div className="rounded-start-0 bg-white w-100 py-3 px-4">
                  <div className="d-flex align-items-center gap-4 jutify-content-between">
                    <div className="w-100">
                      <div className="row">
                        <div className="col-md-5 align-self-center">
                          <div className="">
                            <h3 className="fl-text-dark mb-1">
                              {developerData?.seller?.companyName
                                ? developerData?.seller?.companyName
                                : developerData?.seller?.fullName}
                            </h3>
                            <p className="fl-text-dark fl-fs-18">
                              {developerData?.seller?.city}
                            </p>
                          </div>
                        </div>
                        <div className="col-md-7">
                          <div className="border rounded-4 fl-border-green p-4">
                            <div className="row">
                              {developerData?.seller?.establishedYear && (
                                <div className="col-md-3 text-center">
                                  <h3 className="fl-text-dark mb-1">
                                    {developerData?.seller?.establishedYear || "---"}
                                  </h3>
                                  <p className="fl-text-dark mb-0 fl-fs-18">
                                    {" "}
                                    Year Established
                                  </p>
                                </div>
                              )}
                              <div className={`text-center ${developerData?.seller?.establishedYear ? "col-md-3" : "col-md-4"}`}>
                                <h3 className="fl-text-dark mb-0 mb-1">
                                  {developerData?.totalCounts || developerData?.activeCounts}
                                </h3>
                                <p className="fl-text-dark mb-0 fl-fs-18">
                                  {" "}
                                  Total Properties
                                </p>
                              </div>
                              <div className={`text-center ${developerData?.seller?.establishedYear ? "col-md-3" : "col-md-4"}`}>
                                <h3 className="fl-text-dark mb-0 mb-1">
                                  {developerData?.activeCounts}
                                </h3>
                                <p className="fl-text-dark mb-0 fl-fs-18">
                                  {" "}
                                  Active Properties
                                </p>
                              </div>
                              <div className={`text-center ${developerData?.seller?.establishedYear ? "col-md-3" : "col-md-4"}`}>
                                <h3 className="fl-text-dark mb-0 mb-1">
                                  {developerData?.soldCounts || 0}
                                </h3>
                                <p className="fl-text-dark mb-0 fl-fs-18">
                                  {" "}
                                  Sold Properties
                                </p>
                              </div>
                            </div>
                          </div>
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
}

export default DeveloperDetail;
