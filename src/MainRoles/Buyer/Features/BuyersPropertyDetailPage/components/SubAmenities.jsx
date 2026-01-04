import { Checkbox, FormControlLabel } from "@mui/material";
import { Star1 } from "iconsax-react";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const SubAmenities = ({ singleProperty, setActiveSection }) => {
  const [ref, inView, entry] = useInView({
    threshold: [0.5, 1],
    rootMargin: "-50px 0px -50px 0px",
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && entry.isIntersecting) {
      setActiveSection("amenities");
    }
  }, [inView, entry, setActiveSection]);

  return (
    <>
      <section className="content-section pb-0" id="amenities">
        <div className="detail-content-box fl-property-card rounded-3">
          <div className="px-3 py-3 border-bottom fl-card-border">
            <h3 className="fl-text-dark text-uppercase mb-0">Amenities</h3>
          </div>
          <div className="p-2 p-md-4">
            <div className="row" ref={ref}>
              {singleProperty?.amenities?.map((element, index) => (
                <div className="col-6 col-sm-6 col-xxl-4" key={index}>
                  <div className="fl-property-card border-raidus-10 mb-4 py-2 d-flex justify-content-between">
                    <FormControlLabel
                      className="ms-3 fl-ff-main fl-text-dark"
                      control={<Checkbox defaultChecked hidden />}
                      label={element.name}
                      labelPlacement="end"
                    />
                    <img src={element.icon} height={40} width={40} alt="icon" />
                  </div>
                </div>
              ))}
            </div>
            {singleProperty?.otherAmenities?.length ? (
              <div className="row">
                <div className="col-12">
                  <h4 className="text-uppercase fl-text-gray fl-right-border-line d-flex align-items-center my-3">
                    <span className="d-inline-block fl-fit-content me-3">
                      Other&nbsp;Amenities
                    </span>
                    <span className="line"></span>
                  </h4>
                </div>
                {singleProperty?.otherAmenities?.map((element, index) => (
                  <div className="col-6 col-sm-6 col-xxl-4" key={index}>
                    <div className="fl-property-card amenities-card border-raidus-10 mb-4 py-2 d-flex justify-content-between">
                      <FormControlLabel
                        className="ms-3 fl-ff-main fl-text-dark"
                        control={<Checkbox hidden defaultChecked />}
                        label={element}
                        labelPlacement="end"
                      />
                      <Star1 className="fl-text-green" variant="Bulk" />
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
};

export default SubAmenities;
