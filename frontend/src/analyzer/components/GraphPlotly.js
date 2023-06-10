import React from 'react';

const Plot = React.lazy(() => import("react-plotly.js"))

export function GraphPlotly(props) {
    const data = props.y.map((ySeries, i) => ({
        y: ySeries,
        x: props.x,
        type: 'line',
        fill: 'tonexty',
        name: props.keys[i]
    }));

    const layout = {
        dragmode: 'pan', // this drag mode allows you to zoom
        autosize: true,
        responsive: true,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',

        xaxis: {
            type: 'category',
            title: {
                text: props.xlabel,
                font: {
                    family: 'Montserrat, sans-serif',
                    size: 18,
                    color: '#7f7f7f'
                }
            },
        },

        yaxis: {
            title: {
                text: 'Спрос',
                font: {
                    family: 'Montserrat, sans-serif',
                    size: 18,
                    color: '#7f7f7f'
                }
            }
        }
    };

    return (
        <Plot
            data={data}
            layout={layout}
            useResizeHandler // this prop makes the plot responsive
            style={{width: '100%', height: '100%'}}
        />
    );
}

