import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsList.css";

function VacationsList(): JSX.Element {
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    
    useEffect(() => {
        vacationsService.getAllVacations()
            .then(vacations => setVacations(vacations))
            .catch(err => alert(err));
    })

    return (
        <div className="VacationCard">
			{vacations.map(v => <VacationCard key={v.vacationId} vacation={v}/>)}
        </div>
    );
}

export default VacationsList;
