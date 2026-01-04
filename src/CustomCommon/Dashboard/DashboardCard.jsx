import React from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";

function DashboardCard({ icon, graphIcon, data, heading  , label=""}) {
  return (
    <div className="col-sm-6 col-lg-3 mb-4 mb-lg-0 ">
      <div className="bg-white-shadow p-3 h-100">
        <div className="d-flex justify-content-between align-items-center">
          <p className="m-0">{heading}</p>
          <img src={icon}></img>
        </div>
        <h1>{data?.alltime || data?.allTime || "0"}</h1>
        <p>
          {" "}
          <span
            className={`${
              data?.status === "down" ? "text-danger" : "text-success"
            }`}
          >
            {data?.status === "down" ? (
              <FaArrowTrendDown />
            ) : (
              <FaArrowTrendUp />
            )}{" "}
            {data?.change.toFixed(2)}%
          </span>{" "}
          {label}
        </p>
        <img src={graphIcon} className="w-100"></img>
      </div>
    </div>
  );
}

export default DashboardCard;
