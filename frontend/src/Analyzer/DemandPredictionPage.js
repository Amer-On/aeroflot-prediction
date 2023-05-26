import Analyzer from "./components/Analyzer";
import './components/main.css';
import {useEffect} from "react";

function DemandPredictionPage() {
    useEffect(() => {
        document.title = 'Предсказание спроса';
    }, []);


    return <Analyzer/>;
}
export default DemandPredictionPage;
