import { useEffect, useState } from "react";
import { Unsubscribe } from "redux";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore, userLikesStore, vacationsStore } from "../../../Redux/Store";
import { getAllUserLikes } from "../../../Redux/UserLikesState";
import { getVacationsAction } from "../../../Redux/VacationsState";
import authService from "../../../Services/AuthService";
import likesService from "../../../Services/LikesService";
import notificationService from "../../../Services/NotificationService";
import vacationsService from "../../../Services/VacationsService";
import Loading from "../../SharedArea/Loading/Loading";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsList.css";

function VacationsList(): JSX.Element {
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    
    const user = authStore.getState().user;
    
    

    useEffect((async () => {
        try{
            let unSub : Unsubscribe;
            
            // Get vacations array from redux:
            let vacationsArr = vacationsStore.getState().vacations;
            
            // If redux's vacations array is undefined and store to redux:
            if(!vacationsArr){
                vacationsArr = await vacationsService.getAllVacations();
                vacationsStore.dispatch(getVacationsAction(vacationsArr));
            }
        
                if(authService.isLoggedIn()){
                    // Get user likes array from redux:
                    let userLikesArr = userLikesStore.getState().userLikes;
        
                    // If redux's user likes array is undefined and store to redux:
                    if(!userLikesArr){
                        userLikesArr = await likesService.getUserLikes();
                        userLikesStore.dispatch(getAllUserLikes(userLikesArr))
                    }

                    // Sort vacations array by user likes:
                    vacationsArr.sort(v => userLikesArr.find(l => l.vacationId === v.vacationId) ? -1 : 1);

                    // Listen to changes to vacations store. If changed, bring all vacations from server and update state:
                    unSub = vacationsStore.subscribe(async() => {
                    vacationsArr = await vacationsService.getAllVacations();
                    userLikesArr = userLikesStore.getState().userLikes;//await likesService.getUserLikes();
                    vacationsArr.sort(v => userLikesArr.find(l => l.vacationId === v.vacationId) ? -1 : 1)

                    setVacations(vacationsArr);
                });
            }

        
            // update state with sorted vacations array to state:
            setVacations(vacationsArr);
            
            
                        
            return () => {unSub()};
        }
        catch(err: any) {
            notificationService.error(err);
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
