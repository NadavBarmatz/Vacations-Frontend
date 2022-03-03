import { useEffect } from "react";
import { userLikesStore, vacationsStore } from "../../../Redux/Store";
import { getVacationsAction } from "../../../Redux/VacationsState";
import authService from "../../../Services/AuthService";
import likesService from "../../../Services/LikesService";
import notificationService from "../../../Services/NotificationService";
import vacationsService from "../../../Services/VacationsService";
import HomeDeals from "../HomeDeals/HomeDeals";
import MorePlacesToGo from "../MorePlacesToGo/MorePlacesToGo";
import NowOrNever from "../NowOrNever/NowOrNever";
import "./Home.css";

function Home(): JSX.Element {

    // Used to update redux stores for all its sub-components
    useEffect((async () => {
        try{

            // Check vacations array from redux:
            let vacationsArr = vacationsStore.getState().vacations;

            // If redux's vacations array is undefined and store to redux:
            if(!vacationsArr){
                vacationsArr = await vacationsService.getAllVacations();
                vacationsStore.dispatch(getVacationsAction(vacationsArr));
            }

            if(authService.isLoggedIn()){
                // Check user likes array from redux:
                let userLikes = userLikesStore.getState().userLikes;

                // If redux's user likes array is undefined and store to redux:
                if(!userLikes) {
                    userLikes = await likesService.getUserLikes();
                }
            }
            
        }
        catch(err: any) {
            notificationService.error(err);
        }

    }) as any, [])

    
    return (
        <div className="Home">
            <section>
                <HomeDeals />
            </section>
            <section>
                <NowOrNever />
            </section>
            <section>
                <MorePlacesToGo />
            </section>
        </div>
    );
}

export default Home;
