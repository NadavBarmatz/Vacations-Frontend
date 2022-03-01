import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DestinationModel from "../../../Models/DestinationModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore, destinationStore, vacationsStore } from "../../../Redux/Store";
import { getVacationsAction } from "../../../Redux/VacationsState";
import destinationsService from "../../../Services/DestinationsService";
import likesService from "../../../Services/LikesService";
import notificationService from "../../../Services/NotificationService";
import vacationsService from "../../../Services/VacationsService";
import Loading from "../../SharedArea/Loading/Loading";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsByDestination.css";

function VacationsByDestination(): JSX.Element {

    const navigate = useNavigate();

    const [vacationsByDestination, setVacationsByDestination] = useState<VacationModel[]>([]);
    const [destination, setDestination] = useState<DestinationModel>();
    const user = authStore.getState().user;
    let destinationId = +useParams().id;
    
    useEffect(() => {
        
        (async() => {
            try{
                // get vacations from redux:
                let destination = await destinationsService.getOneDestination(destinationId);
                let vacations = vacationsStore.getState().vacations;
    
                // If redux empty get from server, save to redux and set state:
                if(!vacations){
                    vacations = await vacationsService.getAllVacations();
                }
    
                vacationsStore.dispatch(getVacationsAction(vacations));
                const vacationsByDestination = vacations.filter(v => v.destinationId === destinationId);

                setVacationsByDestination(vacationsByDestination);
                setDestination(destination);
            }
            catch(err: any){
                notificationService.error(err);
                navigate("/home");
            }
        })();

        likesService.makeSureUserLikesIsInRedux();

        const unSubVacations = vacationsStore.subscribe(() => {
            const vacations = vacationsStore.getState().vacations;
            const vacationsByDestination = vacations.filter(v => v.destinationId === destinationId);
            setVacationsByDestination(vacationsByDestination);
        });

         // every second search the store is changed by the search component and this component gets to re-render:
        const unSubDestinations = destinationStore.subscribe(async () => {
            destinationId = destinationStore.getState().destinationId;
            let vacationsArr = await vacationsService.getAllVacationsByDestinationId(destinationId);
            setVacationsByDestination(vacationsArr);
        })

        return () => { 
            unSubVacations(); 
            unSubDestinations();
        }
    
    }, [])

    return (
        <div className="VacationsByDestination">
			<h2>{destination?.destinationCountry}</h2>
            {
                vacationsByDestination.length > 0 ?
                    (
                        vacationsByDestination ? vacationsByDestination.map(v => <VacationCard key={v.vacationId} vacation={v} user={user} />) 
                        :
                         <Loading />
                    )
                :
                <h3>Currently there are no vacation available to chosen destination</h3>
            }

        </div>
    );
}

export default VacationsByDestination;
