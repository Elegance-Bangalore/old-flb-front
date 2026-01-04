import { calculateRelativeTime } from "@/CustomServices/Constant";
import { Avatar } from "@mui/material";
import React, { useEffect, useRef, useCallback } from "react";
import { deepOrange } from "@mui/material/colors";
import OnClickLoader from "../Others/OnClickLoader";

const colorMapping = {
  propertyCategory: deepOrange[500],
  footer: "#4CAF50", // green
  faq: "#2196F3", // blue
  category: "#FF5722", // deep orange
  blog: "#9C27B0", // purple
  property: "#3F51B5", // indigo
};

function RecentActivities({
  recentActivityData,
  loadMore,
  hasMore,
  activityLoader,
}) {
  const observer = useRef();

  const lastActivityElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadMore, hasMore]
  );

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div>
      <div className="bg-white-shadow p-3">
        <h3 className="mb-3">Recent Activities</h3>
        <ul
          style={{
            maxHeight: "355px",
            minHeight: "355px",
            overflowY: "scroll",
          }}
        >
          {recentActivityData?.map((activity, index) => {
            if (recentActivityData.length === index + 1) {
              return (
                <li
                  className="d-flex mb-3 gap-2"
                  ref={lastActivityElementRef}
                  key={index}
                >
                  <Avatar
                    sx={{
                      bgcolor: colorMapping[activity.type] || deepOrange[500],
                    }}
                    alt={capitalizeFirstLetter(activity.type)}
                    src="/broken-image.jpg"
                  ></Avatar>
                  <div>
                    <p className="mb-0 fw-semi-bold">{activity?.message}</p>
                    <p className="text-gray">
                      <small>
                        {" "}
                        {calculateRelativeTime(activity?.updatedAt)}
                      </small>{" "}
                    </p>
                  </div>
                </li>
              );
            } else {
              return (
                <li className="d-flex mb-3 gap-2" key={index}>
                  <Avatar
                    sx={{
                      bgcolor: colorMapping[activity.type] || deepOrange[500],
                    }}
                    alt={capitalizeFirstLetter(activity.type)}
                    src="/broken-image.jpg"
                  ></Avatar>
                  <div>
                    <p className="mb-0 fw-semi-bold">{activity?.message}</p>
                    <p className="text-gray">
                      <small>
                        {" "}
                        {calculateRelativeTime(activity?.updatedAt)}
                      </small>{" "}
                    </p>
                  </div>
                </li>
              );
            }
          })}
          {activityLoader && (
            <div className="d-flex justify-content-center align-content-center">
              <OnClickLoader />
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default RecentActivities;
