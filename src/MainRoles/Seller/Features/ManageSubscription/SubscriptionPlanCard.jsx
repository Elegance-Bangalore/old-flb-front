import React, { useEffect, useState } from "react";
import right from "@/public/assets/images/subscription/tick-circle.svg";
import close from "@/public/assets/images/subscription/close-circle.svg";
import { selectSubscription, selectUser } from "@/Redux/Auth/authSlice";
import { useSelector } from "react-redux";
import { Tooltip } from "@mui/material";
import { formatNumberWithoutDecimal } from "@/CustomServices/Constant";
import rightIcon from "@/public/assets/images/subscription/plan-arrow-right.svg";

function SubscriptionPlanCard({ planList, buyPlan, getPlanDetails }) {

  if (!planList || !planList.features || !Array.isArray(planList.features)) {
    return (
      <div className="col-12">
        <div className="alert alert-info">
          <p>Loading plan details...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="row" style={{backgroundColor:"rgba(68, 234, 179, 0.08)",borderRadius:"20px",paddingBottom:"10px"}}>
        
        <div className="col-md-12" style={{marginTop:"20px"}}>
          <div className="plan">
            <ul className="plan-head">
              <li>
                <h5>Plans and Pricing</h5>
              </li>
            </ul>
            <ul className="plan-list plan-price-list">
              {planList.features.map((feature, index) => (
                <li key={`${feature.name}-${index}`}>
                  <div className="feature-content" style={{display:"flex"}}>
                    <div className="feature-icon">
                      <img src={rightIcon} alt="icon" />
                    </div>
                    <p style={{fontSize:"10px"}}>{feature.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </div>
      </div>
  );
}

export default SubscriptionPlanCard;
