import DownloadBrochure from "@/CustomCommon/AllRoles/DownloadBrochure";
import {
  agricultureLand,
  farmhouse,
  Estates,
  formatDate,
  formatPropertyType,
} from "@/CustomServices/Constant";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const SubOverview = ({ singleProperty, setActiveSection }) => {
  const [ref, inView, entry] = useInView({
    threshold: [1],
    rootMargin: "-50px 0px -50px 0px",
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && entry.isIntersecting) {
      setActiveSection("overview");
    }
  }, [inView, entry, setActiveSection]);

  return (
    <>
      <section className="content-section p-0" id="overview" ref={ref}>
        <div className="detail-content-box fl-property-card rounded-3">
          <div className=" px-3 py-3 border-bottom fl-card-border">
            <h3 className="fl-text-dark text-uppercase mb-0">Overview </h3>
          </div>
          <div className="p-2 p-md-4 overview-content">
            <div className="row">
              <div className="col-6 col-lg-4 mb-4">
                <div className="grid-1-1">
                  <div className="d-inline-block">
                    <img
                      src="https://flb-public.s3.ap-south-1.amazonaws.com/PropertyType.svg"
                      className="img-fluid"
                      alt="Icon"
                    />
                  </div>
                  <div className="">
                    <p className="fl-text-gray fl-fw-600 mb-1 text-uppercase">
                      Property Type
                    </p>
                    <h4 className="fl-text-dark fl-fw-600">
                      {formatPropertyType(singleProperty?.propertyType)}
                    </h4>
                  </div>
                </div>
              </div>
              {singleProperty?.propertyType === Estates && (
                <div className="col-6 col-lg-4 mb-4">
                  <div className="grid-1-1">
                    <div className="">
                      <img
                        src="https://flb-public.s3.ap-south-1.amazonaws.com/PropertyType.svg"
                        className="img-fluid"
                        alt="Icon"
                      />
                    </div>
                    <div className="">
                      <p className="fl-text-gray fl-fw-600 mb-1 text-uppercase">
                        ESTATE TYPE
                      </p>
                      <h4 className="fl-text-dark fl-fw-600">
                        {singleProperty?.estateType}
                      </h4>
                    </div>
                  </div>
                </div>
              )}
              <div className="col-6 col-lg-4 mb-4">
                <div className="grid-1-1">
                  <div className="">
                    <img
                      src="https://flb-public.s3.ap-south-1.amazonaws.com/ProjectArea.svg"
                      className="img-fluid"
                      alt="Icon"
                    />
                  </div>
                  <div className="">
                    <p className="fl-text-gray fl-fw-600 mb-1 text-uppercase">
                      {singleProperty?.propertyType === agricultureLand
                        ? "TOTAL LAND"
                        : "PROJECT AREA"}
                    </p>
                    <h4 className="fl-text-dark fl-fw-600 text-capitalize">
                      {" "}
                      {singleProperty?.totalAcre} {singleProperty?.plotArea}
                    </h4>
                  </div>
                </div>
              </div>
              {singleProperty?.boundWallMade && (
                <div className="col-6 col-lg-4 mb-4">
                  <div className="grid-1-1">
                    <div className="">
                      <img
                        src="https://flb-public.s3.ap-south-1.amazonaws.com/BoundaryWall.svg"
                        className="img-fluid"
                        alt="Icon"
                      />
                    </div>
                    <div className="">
                      <p className="fl-text-gray fl-fw-600 mb-1">
                        BOUNDARY WALL
                      </p>
                      <h4 className="fl-text-dark fl-fw-600">
                        {singleProperty?.boundWallMade}
                      </h4>
                    </div>
                  </div>
                </div>
              )}

              {singleProperty?.bedrooms &&
                singleProperty.propertyType === farmhouse && (
                  <div className="col-6 col-lg-4 mb-4">
                    <div className="grid-1-1">
                      <div className="">
                        <img
                          src="https://flb-public.s3.ap-south-1.amazonaws.com/Bedrooms.svg"
                          className="img-fluid"
                          alt="Icon"
                        />
                      </div>
                      <div className="">
                        <p className="fl-text-gray fl-fw-600 mb-1">BEDROOMS</p>
                        <h4 className="fl-text-dark fl-fw-600">
                          {singleProperty?.bedrooms}
                        </h4>
                      </div>
                    </div>
                  </div>
                )}

              {singleProperty?.bathrooms &&
                singleProperty.propertyType === farmhouse && (
                  <div className="col-6 col-lg-4 mb-4">
                    <div className="grid-1-1">
                      <div className="">
                        <img
                          src="https://flb-public.s3.ap-south-1.amazonaws.com/Bathrooms.svg"
                          className="img-fluid"
                          alt="Icon"
                        />
                      </div>
                      <div className="">
                        <p className="fl-text-gray fl-fw-600 mb-1">BATHROOMS</p>
                        <h4 className="fl-text-dark fl-fw-600">
                          {singleProperty?.bathrooms}
                        </h4>
                      </div>
                    </div>
                  </div>
                )}

              {singleProperty?.balconies &&
                singleProperty.propertyType === farmhouse && (
                  <div className="col-6 col-lg-4 mb-4">
                    <div className="grid-1-1">
                      <div className="">
                        <img
                          src="https://flb-public.s3.ap-south-1.amazonaws.com/balconies.svg"
                          className="img-fluid"
                          alt="Icon"
                        />
                      </div>
                      <div className="">
                        <p className="fl-text-gray fl-fw-600 mb-1">BALCONIES</p>
                        <h4 className="fl-text-dark fl-fw-600">
                          {singleProperty?.balconies}
                        </h4>
                      </div>
                    </div>
                  </div>
                )}

              {singleProperty?.farmhouseStatus &&
                singleProperty.propertyType === farmhouse && (
                  <div className="col-6 col-lg-4 mb-4">
                    <div className="grid-1-1">
                      <div className="">
                        <img
                          src="https://flb-public.s3.ap-south-1.amazonaws.com/Farmhousestatus.svg"
                          className="img-fluid"
                          alt="Icon"
                        />
                      </div>
                      <div className="">
                        <p className="fl-text-gray fl-fw-600 mb-1">
                          FARMHOUSE STATUS
                        </p>
                        <h4 className="fl-text-dark fl-fw-600">
                          {singleProperty?.farmhouseStatus}
                        </h4>
                      </div>
                    </div>
                  </div>
                )}

              {singleProperty?.buildUpArea &&
                singleProperty.propertyType === farmhouse && (
                  <div className="col-6 col-lg-4 mb-4">
                    <div className="grid-1-1">
                      <div className="">
                        <img
                          src="https://flb-public.s3.ap-south-1.amazonaws.com/Builduparea.svg"
                          className="img-fluid"
                          alt="Icon"
                        />
                      </div>
                      <div className="">
                        <p className="fl-text-gray fl-fw-600 mb-1">
                          Build-Up Area
                        </p>
                        <h4 className="fl-text-dark fl-fw-600">
                          {singleProperty?.buildUpArea + " Ft"}
                        </h4>
                      </div>
                    </div>
                  </div>
                )}

              {singleProperty?.negotiablePrice && (
                <div className="col-6 col-lg-4 mb-4">
                  <div className="grid-1-1">
                    <div className="">
                      <img
                        src="https://flb-public.s3.ap-south-1.amazonaws.com/Pricenegotiable.svg"
                        className="img-fluid"
                        alt="Icon"
                      />
                    </div>
                    <div className="">
                      <p className="fl-text-gray fl-fw-600 mb-1 text-uppercase">
                        PRICE NEGOTIABLE
                      </p>
                      <h4 className="fl-text-dark fl-fw-600">
                        {singleProperty?.negotiablePrice}
                      </h4>
                    </div>
                  </div>
                </div>
              )}

              {singleProperty?.propertyStatus && (
                <div className="col-6 col-lg-4 mb-4">
                  <div className="grid-1-1">
                    <div className="">
                      <img
                        src="https://flb-public.s3.ap-south-1.amazonaws.com/Availablestatus.svg"
                        className="img-fluid"
                        alt="Icon"
                      />
                    </div>
                    <div className="">
                      <p className="fl-text-gray fl-fw-600 mb-1 text-uppercase">
                        Avalibility Status
                      </p>
                      <h4 className="fl-text-dark fl-fw-600">
                        {singleProperty?.propertyStatus}
                      </h4>
                    </div>
                  </div>
                </div>
              )}

              {singleProperty?.manageFarms && (
                <div
                  className="col-6 col-lg-4 mb-4"
                  hidden={singleProperty?.propertyType === agricultureLand}
                >
                  <div className="grid-1-1">
                    <div className="">
                      <img
                        src="https://flb-public.s3.ap-south-1.amazonaws.com/Managedfarm.svg"
                        className="img-fluid"
                        alt="Icon"
                      />
                    </div>
                    <div className="">
                      <p className="fl-text-gray fl-fw-600 mb-1">
                        MANAGED FARMS
                      </p>
                      <h4 className="fl-text-dark fl-fw-600">
                        {singleProperty?.manageFarms}
                      </h4>
                    </div>
                  </div>
                </div>
              )}

              {singleProperty?.openSidesCount && (
                <div className="col-6 col-lg-4 mb-4">
                  <div className="grid-1-1">
                    <div className="">
                      <img
                        src="https://flb-public.s3.ap-south-1.amazonaws.com/Opensidecount.svg"
                        className="img-fluid"
                        alt="Icon"
                      />
                    </div>
                    <div className="">
                      <p className="fl-text-gray fl-fw-600 mb-1">
                        OPEN SIDES COUNT
                      </p>
                      <h4 className="fl-text-dark fl-fw-600">
                        {singleProperty?.openSidesCount}
                      </h4>
                    </div>
                  </div>
                </div>
              )}

              {singleProperty?.maintainaceOfYears && (
                <div
                  className="col-6 col-lg-4 mb-4"
                  hidden={singleProperty?.propertyType === agricultureLand}
                >
                  <div className="grid-1-1">
                    <div className="">
                      <img
                        src="https://flb-public.s3.ap-south-1.amazonaws.com/Freeyearsofmaintenance.svg"
                        className="img-fluid"
                        alt="Icon"
                      />
                    </div>
                    <div className="">
                      <p className="fl-text-gray fl-fw-600 mb-1">
                        FREE YEARS OF MAINTENANCE
                      </p>
                      <h4 className="fl-text-dark fl-fw-600">
                        {singleProperty?.maintainaceOfYears}
                      </h4>
                    </div>
                  </div>
                </div>
              )}

              {singleProperty?.transactionType && (
                <div className="col-6 col-lg-4 mb-4">
                  <div className="grid-1-1">
                    <div className="">
                      <img
                        src="https://flb-public.s3.ap-south-1.amazonaws.com/Transactiontype.svg"
                        className="img-fluid"
                        alt="Icon"
                      />
                    </div>
                    <div className="">
                      <p className="fl-text-gray fl-fw-600 mb-1 text-uppercase">
                        TRANSACTION TYPE
                      </p>
                      <h4 className="fl-text-dark fl-fw-600">
                        {singleProperty?.transactionType}
                      </h4>
                    </div>
                  </div>
                </div>
              )}

              {singleProperty?.propertyType === farmhouse &&
                singleProperty?.ageOfProperty && (
                  <div className="col-6 col-lg-4 mb-4">
                    <div className="grid-1-1">
                      <div className="">
                        <img
                          src="https://flb-public.s3.ap-south-1.amazonaws.com/Ageofproperty.svg"
                          className="img-fluid"
                          alt="Icon"
                        />
                      </div>
                      <div className="">
                        <p className="fl-text-gray fl-fw-600 mb-1 text-uppercase">
                          AGE OF PROPERTY
                        </p>
                        <h4 className="fl-text-dark fl-fw-600">
                          {singleProperty?.ageOfProperty}{" "}
                          {Number(singleProperty?.ageOfProperty) > 1
                            ? " Years"
                            : " Year"}
                        </h4>
                      </div>
                    </div>
                  </div>
                )}

              {singleProperty?.propertyType === farmhouse &&
                singleProperty?.floorDetails && (
                  <div className="col-6 col-lg-4 mb-4">
                    <div className="grid-1-1">
                      <div className="">
                        <img
                          src="https://flb-public.s3.ap-south-1.amazonaws.com/No.offloors.svg"
                          className="img-fluid"
                          alt="Icon"
                        />
                      </div>
                      <div className="">
                        <p className="fl-text-gray fl-fw-600 mb-1 text-uppercase">
                          NO. OF FLOORS
                        </p>
                        <h4 className="fl-text-dark fl-fw-600">
                          {singleProperty?.floorDetails}
                        </h4>
                      </div>
                    </div>
                  </div>
                )}

              {singleProperty?.propertyType === farmhouse &&
                singleProperty?.ownershipType && (
                  <div className="col-6 col-lg-4 mb-4">
                    <div className="grid-1-1">
                      <div className="">
                        <img
                          src="https://flb-public.s3.ap-south-1.amazonaws.com/Ownershiptype.svg"
                          className="img-fluid"
                          alt="Icon"
                        />
                      </div>
                      <div className="">
                        <p className="fl-text-gray fl-fw-600 mb-1 text-uppercase">
                          OWNERSHIP TYPE
                        </p>
                        <h4 className="fl-text-dark fl-fw-600">
                          {singleProperty?.ownershipType}
                        </h4>
                      </div>
                    </div>
                  </div>
                )}

              {singleProperty?.propertyType === agricultureLand &&
                singleProperty?.facing && (
                  <div className="col-6 col-lg-4 mb-4">
                    <div className="grid-1-1">
                      <div className="">
                        <img
                          src="https://flb-public.s3.ap-south-1.amazonaws.com/Facing.svg"
                          className="img-fluid"
                          alt="Icon"
                        />
                      </div>
                      <div className="">
                        <p className="fl-text-gray fl-fw-600 mb-1 text-uppercase">
                          FACING
                        </p>
                        <h4 className="fl-text-dark fl-fw-600">
                          {singleProperty?.facing}
                        </h4>
                      </div>
                    </div>
                  </div>
                )}

              {singleProperty?.propertyType === agricultureLand &&
                singleProperty?.facingRoadWidth && (
                  <div className="col-6 col-lg-4 mb-4">
                    <div className="grid-1-1">
                      <div className="">
                        <img
                          src="https://flb-public.s3.ap-south-1.amazonaws.com/FacingRoadwidth.svg"
                          className="img-fluid"
                          alt="Icon"
                        />
                      </div>
                      <div className="">
                        <p className="fl-text-gray fl-fw-600 mb-1 text-uppercase">
                          FACING ROAD WIDTH
                        </p>
                        <h4 className="fl-text-dark fl-fw-600">
                          {singleProperty?.facingRoadWidth}{" "}
                          {singleProperty?.facingWidthType}
                        </h4>
                      </div>
                    </div>
                  </div>
                )}
              <div
                className="col-12 text-center"
                style={{
                  borderTop: "1px solid #E0E0E0",
                  display: singleProperty?.broucher ? "block" : "none",
                }}
              >
                <div className="mt-3">
                  <DownloadBrochure singleProperty={singleProperty} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SubOverview;
