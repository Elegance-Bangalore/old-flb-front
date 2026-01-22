import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getHomepageStatsApi } from "@/ApiRoutes/BuyersApi";
import { Home2, User, MessageText, TickCircle } from "iconsax-react";

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
    <section ref={ref} className="section-counter">
      <div className="container fl-container">
        <div className="row">
          <div className="col-6 col-md-3 mb-4 mb-lg-0 text-center">
            
            <h3 className="text-white fl-ff-main fl-counter-heading">
              {display.properties}+
            </h3>
            <p className="counter-content"> 
              <Home2 size={24} color="#76c25b" className="" />
              Properties
            </p>
          </div>
          <div className="col-6 col-md-3 mb-4 mb-lg-0 text-center">
           
            <h3 className="text-white fl-ff-main fl-counter-heading">
              {display.developers}+
            </h3>
            <p className="counter-content">  <User size={24} color="#76c25b" className="" />
              Developers
            </p>
          </div>
          <div className="col-6 col-md-3 mb-4 mb-lg-0 text-center">
           
            <h3 className="text-white fl-ff-main fl-counter-heading">
              {display.inquiries}+
            </h3>
            <p className="counter-content">  <MessageText size={24} color="#76c25b" className="" />
              Inquiries
            </p>
          </div>
          <div className="col-6 col-md-3 mb-2 mb-lg-0 text-center">
           
            <h3 className="text-white fl-ff-main fl-counter-heading">
              {display.leadersOnboarded}+
            </h3>
            <p className="counter-content">  <TickCircle size={24} color="#76c25b" className="" />
              Sold Out Properties
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
