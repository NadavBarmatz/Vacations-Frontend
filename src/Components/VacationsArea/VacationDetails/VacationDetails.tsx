import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { authStore, vacationsStore, userLikesStore } from "../../../Redux/Store";
import { getAllUserLikes } from "../../../Redux/UserLikesState";
import { addVacationAction, getVacationsAction } from "../../../Redux/VacationsState";
import likesService from "../../../Services/LikesService";
import notificationService from "../../../Services/NotificationService";
import vacationsService from "../../../Services/VacationsService";
import Loading from "../../SharedArea/Loading/Loading";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationDetails.css";

function VacationDetails(): JSX.Element {

    const [vacation, setVacation] = useState<VacationModel>();
    const id = +useParams().id;
    const user = authStore.getState().user;

    useEffect(() => {
        (async () => {
            try{
                let vacations = vacationsStore.getState().vacations;
                if(!vacations) {
                    vacations = await vacationsService.getAllVacations();
                    vacationsStore.dispatch(getVacationsAction(vacations));
                }
                let vacation = vacations?.find(v => v.vacationId === id);
                setVacation(vacation);
                
                let userLikes = userLikesStore.getState().userLikes;
                if(!userLikes) {
                    userLikes = await likesService.getUserLikes();
                    userLikesStore.dispatch(getAllUserLikes(userLikes));
                }
            }
            catch(err: any) {
                notificationService.error(err);
            }
        })();

        const unSub = vacationsStore.subscribe(() => {
            let vacations = vacationsStore.getState().vacations;
            let vacation = vacations?.find(v => v.vacationId === id);
            setVacation(vacation);
        })

        return () => {unSub()}
    }, [])

    return (
        <div className="VacationDetails">
            <h1>VACATION DETAILS</h1>
            {!vacation && <Loading />}
			<VacationCard vacation={vacation} user={user} />
        </div>
    );
}

export default VacationDetails;
