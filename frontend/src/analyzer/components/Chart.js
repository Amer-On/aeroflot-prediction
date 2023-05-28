import './Main.css';
import './Loader.css';
import {Graph} from "./Graph";


function Chart(props) {
    return (
        <div className='charts'>
            <div className='f-graph'>
                {!props.data ?
                    (<div className='lds-hourglass'></div>)
                    :
                    <Graph data={props.data}/>
                }
            </div>
        </div>
    )
}


export default Chart;