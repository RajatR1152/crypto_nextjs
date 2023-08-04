import axios from "axios";
import React, { useState, useRef } from "react";
import { useEffect } from "react";
import Chart from "chart.js/auto";
import moment from "moment/moment";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);


const LineChart = ({ coin }) => {

    const [data2, setData2] = useState([]);

    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=inr&days=7`).then((res) => {
            setData2(res.data.prices);
        });

    }, [])

    const canvasEl = useRef(null);

    const coinChartData = data2.map(v => ({ x: v[0], y: v[1].toFixed(2) }));

    const colors = {
        purple: {
            default: "rgba(149, 76, 233, 1)",
            half: "rgba(149, 76, 233, 0.5)",
            quarter: "rgba(149, 76, 233, 0.25)",
            zero: "rgba(149, 76, 233, 0)"
        },
        indigo: {
            default: "rgba(80, 102, 120, 1)",
            quarter: "rgba(80, 102, 120, 0.25)"
        }
    };

    useEffect(() => {
        const ctx = canvasEl.current.getContext("2d");
        const gradient = ctx.createLinearGradient(0, 16, 0, 600);
        gradient.addColorStop(0, colors.purple.half);
        gradient.addColorStop(0.65, colors.purple.quarter);
        gradient.addColorStop(1, colors.purple.zero);

        const data = {
            labels: coinChartData.map(val => moment(val.x).format('MMM DD')),
            datasets: [
                {
                    label: coin,
                    backgroundColor: gradient,
                    fill: true,
                    borderWidth: 2,
                    borderColor: colors.purple.default,
                    lineTension: 0.2,
                    pointBackgroundColor: colors.purple.default,
                    pointRadius: 0,
                    data: coinChartData.map(value => value.y)
                }
            ]
        };
        const config = {
            type: "line",
            data: data
        };
        const myLineChart = new Chart(ctx, config);

        return function cleanup() {
            myLineChart.destroy();
        };
    });

    return (
        <div className='w-full md:p-5'>
            <canvas id="myChart" ref={canvasEl}  />
        </div>
    );
}

export default LineChart;