import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Chart = ({ colors, location, building, data }) => {
    const [state, setState] = useState({
        series: [{
            name: "Volume",
            data: []
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350,
                zoom: {
                    enabled: true
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: `${building} - ${location}`,
                align: 'left'
            },
            subtitle: {
                text: 'Water Consumption Movements',
                align: 'left'
            },
            xaxis: {
                type: 'datetime',
                categories: []
            },
            yaxis: {
                opposite: true
            },
            legend: {
                horizontalAlign: 'left'
            },
            colors: [colors]
        },
        totalVolume: 0
    });

    useEffect(() => {
        if (data && data.length > 0) {
            const newData = data.map(item => ({
                x: new Date(item.DateTime.seconds * 1000).toISOString(), // Convert timestamp to ISO string
                y: item.volume
            }));

            setState(prevState => ({
                ...prevState,
                series: [{ data: newData }],
                totalVolume: data.reduce((total, item) => total + item.volume, 0)
            }));
        }
    }, [data]);

    return (
        <div className="content-data">
            <div className="head">
                <h3>Realtime Reading</h3>
                <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
                <div className="card-meta">
                    <p className="text">Total</p>
                    <p className="meta-value">{state.totalVolume}</p>
                </div>
            </div>
        </div>
    );
}

export default Chart;
