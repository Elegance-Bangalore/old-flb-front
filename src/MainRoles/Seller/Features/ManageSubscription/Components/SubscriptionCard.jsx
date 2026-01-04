import React, { useEffect, useState } from "react";
import right from "@/public/assets/images/subscription/tick-circle.svg";
import close from "@/public/assets/images/subscription/close-circle.svg";
import { selectSubscription, selectUser } from "@/Redux/Auth/authSlice";
import { useSelector } from "react-redux";
import { Tooltip } from "@mui/material";
import { formatNumberWithoutDecimal } from "@/CustomServices/Constant";

function SubscriptionCard({ planList, buyPlan, getPlanDetails, isAdmin = false }) {
  const existingPlan = useSelector(selectSubscription);
  const user = useSelector(selectUser);


  const currentPlanIndex = planList.findIndex(
    (plan) => plan.planName === existingPlan?.planName
  );
  
  function formatDate(inputDate) {
    // Split the input date string into day, month, and year
    if (!inputDate) return "";
    var parts = inputDate.split("-");
    var day = parts[0];
    var month = parts[1];
    var year = parts[2];

    // Create a Date object
    var date = new Date(year, month - 1, day); // Note: Month is zero-based in JavaScript Date object

    // Get the month name
    var monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var monthName = monthNames[date.getMonth()];

    // Format the date
    var formattedDate = monthName + " " + day + ", " + year;

    // Return the formatted date
    return formattedDate;
  }

  return (
    <div>
      <div className="row">
        {planList.map((plan, index) => (
          <div key={plan.planName} className="col-md-4" style={{marginTop:"20px"}}>
            <div
              className={`plan ${
                plan.planName === "Silver" ? "border-golden" : ""
              } ${
                user?.subscription
                  ? existingPlan?.planName === plan.planName &&
                    "border-active chat-match"
                  : plan?.planName === "Basic" &&
                    "border-active chat-match"
              }`}
            style={{height: "100%", minHeight: "600px"}}>
              { user?.subscription && existingPlan?.planName === plan.planName && (
                <span className="active-pill text-center">ACTIVE</span>
              )}
              {plan.planName === "Silver" && (!user?.subscription || existingPlan?.planName !== plan.planName) && (
                <span className="popular-pill">POPULAR</span>
              )}
              <ul className="plan-head">
                <li>
                  {/* <h5>
                    {plan.planName}
                    {plan.planName?.toLowerCase() !== "silver" && (
                      <> - <span style={{ fontSize: "14px" }}>{plan.timePeriod} Months</span></>
                    )}
                  </h5> */}

                    <h5 style={{}}>
                      {plan.planName}
                      {[ "basic"].includes(plan.planName?.toLowerCase()) === false && (
                        <>
                          {/* {" - "} */}
                          <h5 style={{ fontSize: "14px" }}>{plan.timePeriod} Months</h5>
                        </>
                      )}
                    </h5>
                </li>
                <li>
                  <strike>{formatNumberWithoutDecimal(plan.actualprice)}</strike>
                  <h4>{formatNumberWithoutDecimal(plan.discountedPrice)}</h4>
                  <h6>+ 18% GST</h6>
                </li>
                <li>
                  {user?.subscription &&
                  existingPlan?.planName === plan.planName ? (
                    <button type="button" className="btn-sub" disabled>
                      Exp:{" "}
                      <span style={{ fontSize: "0.85rem" }}>
                        {formatDate(existingPlan?.expiresAt)}{" "}
                      </span>
                    </button>
                  ) : plan.planName?.toLowerCase() === "basic" ? (
                    <button type="button" className="btn-sub" disabled>
                      Free
                    </button>
                  ) : (
                    <Tooltip
                      title={
                        !isAdmin && !user?.isEmailVerified 
                          ? "Please verify your email first to subscribe" 
                          : user?.subscription 
                            ? "Already have an active plan" 
                            : "Click to subscribe"
                      }
                    >
                      <button
                        type="button"
                        className="btn-sub"
                        onClick={() => getPlanDetails(plan)}
                        // disabled={!user?.isEmailVerified || user?.subscription}
                      >
                        Subscribe
                      </button>
                    </Tooltip>
                  )}
                </li>
              </ul>
              <ul className="plan-list plan-price-list">
                {plan.features.map((feature, featureIndex) => (
                  <li key={`${feature.name}-${featureIndex}`}>
                    <div className="feature-content" style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                      <div className="feature-icon" >
                        {feature.isIncluded === true ? (
                          <img src={right} alt="icon" />
                        ) : feature.isIncluded === false ? (
                          <img src={close} alt="icon" />
                        ) : null}
                      </div>
                      <p style={{fontSize:"12px"}}>{feature.content}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubscriptionCard;
