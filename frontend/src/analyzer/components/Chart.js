import './Main.css';
import React from 'react';
import {GraphPlotly} from "./GraphPlotly";
// const GraphPlotly = React.lazy(() => import("./GraphPlotly"))


function Chart(props) {
    return (
        <div className='charts'>
            <div className='f-graph'>
                <GraphPlotly y={props.y} x={props.x} keys={props.keys} xlabel={props.xlabel}/>
            </div>
        </div>
    )
}

export default Chart;