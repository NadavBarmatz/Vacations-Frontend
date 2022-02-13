import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { setDestinationId } from "../../../Redux/destinationState";
import { authStore, destinationStore } from "../../../Redux/Store";
import vacationsService from "../../../Services/VacationsService";
import Loading from "../../SharedArea/Loading/Loading";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsByDestination.css";

function VacationsByDestination(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);

    const user = authStore.getState().user;

    let destinationId = +useParams().id;
    
    useEffect((async () => {
        try{            
            let vacationsArr = await vacationsService.getAllVacationsByDestinationId(destinationId);
            setVacations(vacationsArr);

            // every second search the store is changed by the search component and this component gets to re-render:
            const unSub = destinationStore.subscribe(async () => {
                destinationId = destinationStore.getState().destinationId;
                vacationsArr = await vacationsService.getAllVacationsByDestinationId(destinationId);
                setVacations(vacationsArr);
            })
    
            return () => {unSub()}

        }
        catch(err: any) {
            alert(err.message);
        }
    }) as any, [])

    return (
        <div className="VacationsByDestination">
			<h2>{vacations?.[0]?.country}</h2>
            {vacations ? vacations.map(v => <VacationCard key={v.vacationId} vacation={v} user={user} />) : <Loading />}

        </div>
    );
}

export default VacationsByDestination;
