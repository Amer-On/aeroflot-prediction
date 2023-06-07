import './Main.css';
import {Graph} from "./Graph";


function Chart(props) {
    return (
        <div className='charts'>
            <div className='f-graph'>
                <Graph y={props.y} x={props.x} keys={props.keys}/>
            </div>
        </div>
    )
}


export default Chart;