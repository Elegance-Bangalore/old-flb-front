import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getHomepageStatsApi } from "@/ApiRoutes/BuyersApi";

const CounterSection = () => {
  const [stats, setStats] = useState({
    properties: 0,
    developers: 0,
    inquiries: 0,
    leadersOnboarded: 0,
  });
  const [display, setDisplay] = useState({
    properties: 0,
    developers: 0,
    inquiries: 0,
    leadersOnboarded: 0,
  });

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    getHomepageStatsApi().then((res) => {
      if (res?.data) {
        setStats(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setDisplay((prev) => {
          let updated = { ...prev };
          let done = true;
          Object.keys(stats).forEach((key) => {
            if (prev[key] < stats[key]) {
              updated[key] = Math.min(prev[key] + Math.ceil(stats[key] / 50), stats[key]);
              done = false;
            }
          });
          if (done) clearInterval(interval);
          return updated;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [inView, stats]);

  return (
    <section ref={ref} className="fl-bg-green py-4 my-5">
      <div className="container fl-container">
        <div className="row">
          <div className="col-6 col-md-3 mb-4 mb-lg-0 text-center">
            <h3 className="text-white fl-ff-main fl-counter-heading">
              {display.properties}+
            </h3>
            <p className="text-white fl-ff-main fl-fs-22 fw-semi-bold mb-0 fl-counter-content">
              Properties
            </p>
          </div>
          <div className="col-6 col-md-3 mb-4 mb-lg-0 text-center">
            <h3 className="text-white fl-ff-main fl-counter-heading">
              {display.developers}+
            </h3>
            <p className="text-white fl-ff-main fl-fs-22 fw-semi-bold mb-0 fl-counter-content">
              Developers
            </p>
          </div>
          <div className="col-6 col-md-3 mb-4 mb-lg-0 text-center">
            <h3 className="text-white fl-ff-main fl-counter-heading">
              {display.inquiries}+
            </h3>
            <p className="text-white fl-ff-main fl-fs-22 fw-semi-bold mb-0 fl-counter-content">
              Inquiries
            </p>
          </div>
          <div className="col-6 col-md-3 mb-2 mb-lg-0 text-center">
            <h3 className="text-white fl-ff-main fl-counter-heading">
              {display.leadersOnboarded}+
            </h3>
            <p className="text-white fl-ff-main fl-fs-22 fw-semi-bold mb-0 fl-counter-content">
              Sold Out Properties
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
