import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const Chart = ({ colors, location, building, data }) => {
  const [state, setState] = useState({
    series: [
      {
        name: "Volume",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
        zoom: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 3,
        curve: "smooth",
      },
      title: {
        text: `${building} - ${location}`,
        align: "left",
      },
      subtitle: {
        text: "Water Consumption Movements",
        align: "left",
      },
      markers: {
        // size: 6,
        // strokeWidth: 0,
        hover: {
          size: 8,
        },
      },
      xaxis: {
        type: "datetime",
        labels: {
          show: false, // Hide x-axis labels
        },
      },
      yaxis: {
        opposite: true,
      },
      legend: {
        horizontalAlign: "left",
      },
      tooltip: {
        x: {
          formatter: function (value) {
            // Convert timestamp to JavaScript Date object
            const date = new Date(value);
            // Get month, date, year, hours, and minutes
            const month = date.toLocaleString("default", { month: "short" });
            const day = date.getDate();
            const year = date.getFullYear();
            let hours = date.getHours();
            const minutes = date.getMinutes();
            let period = "AM";

            // Convert hours to 12-hour format and determine AM/PM
            if (hours === 0) {
              hours = 12;
            } else if (hours === 12) {
              period = "PM";
            } else if (hours > 12) {
              hours -= 12;
              period = "PM";
            }

            // Format time (e.g., "MMM DD, YYYY hh:MM AM/PM")
            return `${month} ${day}, ${year} ${
              hours < 10 ? "0" + hours : hours
            }:${minutes < 10 ? "0" + minutes : minutes} ${period}`;
          },
        },
      },
      colors: [colors],
    },
    totalVolume: 0,
  });

  useEffect(() => {
    if (data && data.length > 0) {
      const newData = data.map((item) => ({
        x: new Date(item.DateTime.seconds * 1000), // Convert timestamp to JavaScript Date object
        y: item.volume,
      }));

      // Sort newData in descending order based on the x value (datetime)
      newData.sort((a, b) => b.x - a.x);

      setState((prevState) => ({
        ...prevState,
        series: [{ data: newData }],
        totalVolume: data
          .reduce((total, item) => total + item.volume, 0)
          .toFixed(2),
      }));
    }
  }, [data]);

  return (
    <div className="content-data">
      <div className="head">
        <p className="header">Realtime Reading</p>
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="line"
          height={350}
        />
        <div className="card-meta">
          <p className="text">Total</p>
          <p className="meta-value">{state.totalVolume}</p>
        </div>
      </div>
    </div>
  );
};

export default Chart;
