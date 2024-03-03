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
      xaxis: {
        type: "datetime",
        categories: [],
        labels: {
          formatter: function (value, timestamp) {
            return new Date(value).toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              hour12: true,
            });
          },
          style: {
            fontSize: "10px",
          },
        },
      },
      yaxis: {
        opposite: true,
      },
      legend: {
        horizontalAlign: "left",
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
