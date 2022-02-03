import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import Loading from "../../SharedArea/Loading/Loading";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationDetails.css";

function VacationDetails(): JSX.Element {

    const [vacation, setVacation] = useState<VacationModel>();
    const id = +useParams().id;

    useEffect((async () => { 
        try{
            const vacation = await vacationsService.getOneVacation(id);
            setVacation(vacation);
        }
        catch(err: any) {
            alert(err.message);
        }
    }) as any, [])

    return (
        <div className="VacationDetails">
            {!vacation && <Loading />}
			<VacationCard vacation={vacation} />
        </div>
    );
}

export default VacationDetails;
