import React from "react";
import { Chart } from "react-google-charts";

export const options = {
  title: "Total Uploads",
  pieHole: 0.6,
  is3D: false,
  slices: {
    0: { color: "#6BE8D5" },
    1: { color: "#086D5E" },
    2: { color: "#004036" },
    3: { color: "#00A76F" },
    4: { color: "#F5B041" },
  },
  titlePosition: "start",
  pieSliceText: "value",
  legend: { position: "bottom" }, // Move legend to the bottom

};

export function DashboardPieChart({ pieChartData }) {

  const capitalizedData = pieChartData?.map(([label, value]) => [
    label.charAt(0).toUpperCase() + label.slice(1),
    value,
  ]);


  const totalUploads = pieChartData?.reduce((acc, [_, value]) => acc + value, 0);
  const data = [["Upload", "Upload Per Person"], ...capitalizedData];

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%" }}
      className="bg-white-shadow "
    >
      <h3
        style={{
          position: "absolute",
          top: "20px",
          left: "120px",
          transform: "translateX(-50%)",
          fontSize: "24px",
          fontWeight: "bold",
          zIndex: "999",
        }}
      >
        Total Uploads: {totalUploads}
      </h3>
      <Chart
        chartType="PieChart"
        width="100%"
        height="100%"
        data={data}
        options={{
          ...options,
          title: "", // Hide the default title
        }}
      />
    </div>
  );
}
