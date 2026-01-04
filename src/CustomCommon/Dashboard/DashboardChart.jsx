import { BarChart } from "@mui/x-charts";
import React from "react";

function DashboardChart() {
  return (
    <>
      <div className="bg-white-shadow p-3 ">
        <h3>Total Revenue</h3>

        <div className="chart-container">
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: [
                  "Day 1",
                  "Day 2",
                  "Day 3",
                  "Day 4",
                  "Day 5",
                  "Day 6",
                  "Day 7",
                ],
                paddingInner: 0.6, // Adjust this to control bar thickness (higher = thinner bars)
                paddingOuter: 0.3,
              },
            ]}
            series={[
              {
                data: [5, 1, 10, 4, 2, 10, 2],
                color: "#28DB9F",
              },
              {
                data: [2, 3, 6, 9, 3, 4, 7],
                color: "#00A76F",
              },
            ]}
            height={370}
            sx={{ margin: "0px 20px" }} // Additional margin around the chart using sx prop
          />
        </div>
      </div>
    </>
  );
}

export default DashboardChart;
