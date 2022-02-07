import { useEffect, useState } from "react";
import { Unsubscribe } from "redux";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore, vacationsStore } from "../../../Redux/Store";
import { getVacationsAction } from "../../../Redux/VacationsState";
import vacationsService from "../../../Services/VacationsService";
import Loading from "../../SharedArea/Loading/Loading";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsList.css";

function VacationsList(): JSX.Element {
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const user = authStore.getState().user;

    console.log("vacations");
    

    let unSub: Unsubscribe;
    let vacationsArr: VacationModel[] = [];

    useEffect((async () => {
        try{
            unSub = vacationsStore.subscribe(() => {
                vacationsArr = vacationsStore.getState().vacations;
            });
            if(vacationsArr.length === 0) {
                vacationsArr = await vacationsService.getAllVacations();
                vacationsStore.dispatch(getVacationsAction(vacationsArr));
            } 

            setVacations(vacationsArr);
            
            return() => {unSub();}
        }
        catch(err: any) {
            alert(err.message)
        }
    }) as any, [])

    return (
        <div className="VacationsList">
            <h2>ALL VACATIONS</h2>
            {vacations ? vacations.map(v => <VacationCard key={v.vacationId} vacation={v} user={user} />) : <Loading />}
        </div>
    );
}

export default VacationsList;
