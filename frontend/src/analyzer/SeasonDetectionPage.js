import Analyzer from "./components/Analyzer";


function SeasonDetectionPage() {
    let title = 'Определение сезонности'
    return (<Analyzer title={title} route="/api/ml/seasons"/>);
}

export default SeasonDetectionPage;
