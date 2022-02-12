import { useEffect, useState } from "react";
import { Unsubscribe } from "redux";
import VacationModel from "../../../Models/VacationModel";
import { authStore, vacationsStore } from "../../../Redux/Store";
import vacationsService from "../../../Services/VacationsService";
import Loading from "../../SharedArea/Loading/Loading";
import VacationCard from "../../VacationsArea/VacationCard/VacationCard";
import "./NowOrNever.css";

interface NowOrNeverProps {
	vacations: VacationModel[];
}

function NowOrNever(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);

    useEffect(() => {

        let vacationsArr = vacationsStore.getState().vacations;
        setVacations(vacationsArr);
        
        const unSub = vacationsStore.subscribe(async () => {
            vacationsArr = await vacationsService.getAllVacations();
            setVacations(vacationsArr);
        });

        return () => {unSub();}
    })

    const user = authStore.getState().user;
    
    let randomVacation: VacationModel;
    if(vacations?.length !== 0){
        const randomIndex = Math.floor(Math.random() * vacations?.length);
        randomVacation = vacations?.[0];
    }

    return (
        <div className="NowOrNever">
			<h2>NOW OR NEVER</h2>
            {randomVacation ? <VacationCard vacation={randomVacation} user={user} /> : <Loading />}
            
        </div>
    );
}

export default NowOrNever;
