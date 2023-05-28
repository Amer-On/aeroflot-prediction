import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import {Line} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        // colors: {
        //     forceOverride: true
        // }
    },
};
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function Graph(props) {
    const labels = props.x;
    console.log(labels)

    const datasets = []

    for (var i = 0; i < props.y.length; i++) {
        datasets.push(
            {
                label: props.keys[i],
                data: props.y[i],
                // backgroundColor: 'RGB(props.keys[i], props.keys[i], props.keys[i])',
                // palette('tol', props.x.length).map(function(hex);
                borderColor: getRandomColor(),
                // backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        )
    }

    const data = {
        labels,
        datasets: datasets
    };
    console.log(labels)
    console.log(props.y)

    return <Line options={options} data={data}/>;
}