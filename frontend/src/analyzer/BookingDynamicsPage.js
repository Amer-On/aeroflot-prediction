import Analyzer from "./components/Analyzer";
import axios from "axios";

function BookingDynamicsPage() {
    let title = 'Динамика бронирования'
    return <Analyzer title={title}/>;
}


export default BookingDynamicsPage;