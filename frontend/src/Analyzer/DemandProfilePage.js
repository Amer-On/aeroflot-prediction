import Analyzer from "./components/Analyzer";
import './components/main.css';
import {useEffect} from "react";

function DemandProfilePage() {
    useEffect(() => {
        document.title = 'Профиль спроса';
    }, []);

    return <Analyzer/>;
}
export default DemandProfilePage;
