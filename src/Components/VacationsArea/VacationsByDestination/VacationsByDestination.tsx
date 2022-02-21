import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { setDestinationId } from "../../../Redux/destinationState";
import { authStore, destinationStore, userLikesStore, vacationsStore } from "../../../Redux/Store";
import { getAllUserLikes } from "../../../Redux/UserLikesState";
import { getVacationsAction } from "../../../Redux/VacationsState";
import authService from "../../../Services/AuthService";
import likesService from "../../../Services/LikesService";
import notificationService from "../../../Services/NotificationService";
import vacationsService from "../../../Services/VacationsService";
import Loading from "../../SharedArea/Loading/Loading";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsByDestination.css";

function VacationsByDestination(): JSX.Element {

    const navigate = useNavigate();

    const [vacations, setVacations] = useState<VacationModel[]>([]);

    const user = authStore.getState().user;

    let destinationId = +useParams().id;
    
    useEffect(() => {
        try{
            let vacationsArr:VacationModel[];
            (async () => {
                vacationsArr = await vacationsService.getAllVacationsByDestinationId(destinationId);
                setVacations(vacationsArr);
            })();

            if(authService.isLoggedIn()){
                // Get user likes array from redux:
                let userLikesArr = userLikesStore.getState().userLikes;
    
                // If redux's user likes array is undefined and store to redux:
                if(!userLikesArr){
                    (async() => {
                        userLikesArr = await likesService.getUserLikes();
                        userLikesStore.dispatch(getAllUserLikes(userLikesArr))
                    })();
                }
            }


            // every second search the store is changed by the search component and this component gets to re-render:
            const unSub = destinationStore.subscribe(async () => {
                destinationId = destinationStore.getState().destinationId;
                vacationsArr = await vacationsService.getAllVacationsByDestinationId(destinationId);
                setVacations(vacationsArr);
            })
    
            return () => {unSub()}

        }
        catch(err: any) {
            notificationService.error(err);
            navigate("/home");
        }
    }, [])

    return (
        <div className="VacationsByDestination">
			<h2>{vacations?.[0]?.country}</h2>
            {vacations ? vacations.map(v => <VacationCard key={v.vacationId} vacation={v} user={user} />) : <Loading />}

        </div>
    );
}

export default VacationsByDestination;
