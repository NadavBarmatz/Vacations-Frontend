import VacationModel from "../../../Models/VacationModel";
import Loading from "../../SharedArea/Loading/Loading";
import VacationCard from "../../VacationsArea/VacationCard/VacationCard";
import "./NowOrNever.css";

interface NowOrNeverProps {
	vacations: VacationModel[];
}

function NowOrNever(props: NowOrNeverProps): JSX.Element {

    const randomIndex = Math.floor(Math.random() * props.vacations.length);
    const randomVacation = props.vacations[randomIndex];

    return (
        <div className="NowOrNever">
			<h2>NOW OR NEVER</h2>
            {randomVacation ? <VacationCard vacation={randomVacation} /> : <Loading />}
            
        </div>
    );
}

export default NowOrNever;
