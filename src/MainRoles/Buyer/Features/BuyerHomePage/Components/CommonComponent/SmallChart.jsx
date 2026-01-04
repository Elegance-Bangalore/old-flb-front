// SmallChart.js
import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, Filler, Tooltip } from 'chart.js';

// Register necessary components
Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Filler, Tooltip);

const SmallChart = ({chartData}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;

      // Create gradient fill
      const gradient = ctx.createLinearGradient(0, 0, 0, 150);
      gradient.addColorStop(0, 'rgba(0, 167, 111, 0.6)');  // Light Green
      gradient.addColorStop(1, 'rgba(0, 167, 111, 0)');    // Transparent Green

      // Set the gradient as the background color for the dataset
      chart.data.datasets[0].backgroundColor = gradient;
      chart.update();
    }
  }, []);

   // Get current month and create an array of months up to one month before the current month
   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
   const currentMonth = new Date().getMonth();  // Current month as an index (0 = Jan, 11 = Dec)
 
   // Slice the chartData to match the number of displayed months
   const slicedChartData = chartData?.slice(0, currentMonth);

  const data = {
    labels: ['', '', '', '', '','','','','','','',''],  // Minimalist labels
    datasets: [
      {
        data: slicedChartData || [],  // Simulated data points
        borderColor: '#00A76F99',  // Line color (green)
        pointRadius: 0,  // Remove data point markers
        fill: true,  // Fill the area under the line
        tension: 0.4,  // Smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,  // Custom height and width control
    plugins: {
      legend: {
        display: false,  // Hide the legend
      },
      tooltip: {
        enabled: false,  // Disable tooltips
      },
    },
    scales: {
      x: {
        display: false,  // Hide X-axis
      },
      y: {
        display: false,  // Hide Y-axis
      },
    },
    elements: {
      line: {
        borderWidth: 2,  // Line thickness
      },
    },
  };

  return (
    <div style={{ width: '200px', height: '5vh', textAlign: 'center' }}>
      {/* <div style={{ fontSize: '1rem', color: '#00A76F99', fontWeight: 'bold' }}>
        ▲ 233.3% IN 5Y
      </div> */}
      <Line ref={chartRef} data={data} options={options} height={100} />
    </div>
  );
};

export default SmallChart;
