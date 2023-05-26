import Analyzer from "./components/Analyzer";
import {useEffect} from "react";

function DemandPredictionPage() {
    useEffect(() => {
        document.title = 'Предсказание спроса';
    }, []);


    return <Analyzer/>;
}
export default DemandPredictionPage;
