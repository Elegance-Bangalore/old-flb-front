import React from "react";
import block from "../../../../CustomAssets/Admin/block.svg";
import home from "../../../../CustomAssets/Admin/home.svg";
import speaker from "../../../../CustomAssets/Admin/speaker.svg";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled, Box, Typography } from "@mui/material";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import { Link } from "react-router-dom";

const UpgradePlan = ({ plan }) => {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: "#F5B041",
    },
  }));

  return (
    <div className="bg-white-shadow">
      <div className="bg-white-shadow upgrade-plan-card">
        <div className="progress-wrapper d-flex flex-column justify-content-between pb-5">
          <h3 className="text-white">Your property visibility is low</h3>
          <Box sx={{ position: "relative", width: "100%" }}>
            <Typography
              variant="body2"
              sx={{
                position: "absolute",
                left: plan.position,
                top: -50,
                background: "white",
                borderRadius: "10px",
              }}
              className="bg-light p-2 fw-bold fs-6"
            >
              {plan.visibility + "%"}
              <SentimentSatisfiedIcon sx={{ marginLeft: 0.5 }} />
            </Typography>
            <BorderLinearProgress
              variant="determinate"
              value={Number(plan.visibility)}
            />
          </Box>
        </div>
        <div className="plan-content">
          <h3 className="mb-3">
            Upgrade to <span className="text-success">{plan.name}</span> plan to
            get more benefits
          </h3>
          <ul>
            <li>
              <p>
                <span className="me-1 d-inline-block" style={{ width: "1rem" }}>
                  <img src={home} alt="home icon" />
                </span>{" "}
                {plan.benefits[0]}
              </p>
            </li>
            <li>
              <p>
                <span className="me-1 d-inline-block" style={{ width: "1rem" }}>
                  <img src={block} alt="block icon" />
                </span>{" "}
                {plan.benefits[1]}
              </p>
            </li>
            <li>
              <p>
                <span className="me-1 d-inline-block" style={{ width: "1rem" }}>
                  <img src={speaker} alt="speaker icon" />
                </span>{" "}
                {plan.benefits[2]}
              </p>
            </li>
          </ul>
        </div>
        <div className="plan-action d-flex align-items-end justify-content-end">
          <Link to={"/subscription-plan"}>
            <button className="btn-upgrade mb-4 me-4">UPGRADE NOW</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpgradePlan;
