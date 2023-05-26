import Analyzer from "./components/Analyzer";
import './components/main.css'
import {useEffect} from "react";

function SeasonDetectionPage() {
    useEffect(() => {
        document.title = 'Определение сезонности';
    }, []);

    return <Analyzer/>;
}
export default SeasonDetectionPage;
