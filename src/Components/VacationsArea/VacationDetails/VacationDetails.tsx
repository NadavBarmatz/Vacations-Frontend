import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/Store";
import notificationService from "../../../Services/NotificationService";
import vacationsService from "../../../Services/VacationsService";
import Loading from "../../SharedArea/Loading/Loading";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationDetails.css";

function VacationDetails(): JSX.Element {

    const [vacation, setVacation] = useState<VacationModel>();
    const id = +useParams().id;
    const user = authStore.getState().user;

    useEffect((async () => { 
        try{
            const vacation = await vacationsService.getOneVacation(id);
            setVacation(vacation);
        }
        catch(err: any) {
            notificationService.error(err);
        }
    }) as any, [])

    return (
        <div className="VacationDetails">
            <h1>VACATION DETAILS</h1>
            {!vacation && <Loading />}
			<VacationCard vacation={vacation} user={user} />
        </div>
    );
}

export default VacationDetails;
