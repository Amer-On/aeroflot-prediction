import Analyzer from "./components/Analyzer";
import axios from "axios";

function BookingDynamicsPage() {
    let title = 'Динамика бронирования'
    const host = "";
    axios.get(host + '/api/cities/search/%D0%9E%D0%BC').catch(
        (e) => {
            console.log(e)
        }
    )

    return <Analyzer title={title}/>;
}


export default BookingDynamicsPage;