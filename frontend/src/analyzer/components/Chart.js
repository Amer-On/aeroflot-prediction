import './Main.css';
import './Loader.css';
import {Graph} from "./Graph";
import {useEffect} from "react";


function Chart(props) {
    // console.log(props.x)
    return (
        <div className='charts'>
            <div className='f-graph'>
                {!props.x ?
                    (<div className='lds-hourglass'>{props.x}{props.y}</div>)
                    :
                    <Graph y={props.y} x={props.x} keys={props.keys}/>
                }
            </div>
        </div>
    )
}


export default Chart;