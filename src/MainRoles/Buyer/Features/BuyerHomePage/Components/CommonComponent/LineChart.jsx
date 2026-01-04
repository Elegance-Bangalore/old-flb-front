import React, { useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary Chart.js components
Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
  Legend
);

const LineChart = ({ chartData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;

      // Create gradient fill
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "rgba(0, 167, 111, 0.6)");
      gradient.addColorStop(1, "rgba(0, 167, 111, 0)");

      chart.data.datasets[0].backgroundColor = gradient;
      chart.update();
    }
  }, []);

  // Get current month and create an array of months up to one month before the current month
  const months = [
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
  const currentMonth = new Date().getMonth(); // Current month as an index (0 = Jan, 11 = Dec)


  const data = {
    labels: months, // Use the sliced months as labels
    datasets: [
      {
        label: "Price per sq ft",
        data: chartData || [], // Use the sliced chartData
        borderColor: "#00A76F99", // Line color
        pointBackgroundColor: "#00A76F99",
        fill: true, // Enable fill below the line
        tension: 0.4, // Smooth curve for the line
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Disable aspect ratio to control height
    plugins: {
      legend: {
        display: false, // Hide the legend if not needed
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide grid lines for X-axis
        },
      },
      y: {
        grid: {
          color: "#e0e0e0", // Light gray grid lines for Y-axis
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "50vh" }}>
      <Line ref={chartRef} data={data} options={options} height={400} />
    </div>
  );
};

export default LineChart;
