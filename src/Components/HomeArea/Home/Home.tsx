import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import { userLikesStore, vacationsStore } from "../../../Redux/Store";
import { getAllUserLikes } from "../../../Redux/UserLikesState";
import { getVacationsAction } from "../../../Redux/VacationsState";
import authService from "../../../Services/AuthService";
import likesService from "../../../Services/LikesService";
import vacationsService from "../../../Services/VacationsService";
import HomeDeals from "../HomeDeals/HomeDeals";
import MorePlacesToGo from "../MorePlacesToGo/MorePlacesToGo";
import NowOrNever from "../NowOrNever/NowOrNever";
import "./Home.css";

function Home(): JSX.Element {

  const [vacations, setVacations] = useState<VacationModel[]>([]);

    useEffect((async () => {
        try{
            const vacationsFromRedux = vacationsStore.getState().vacations;
            if(!vacationsFromRedux){
                const vacations = await vacationsService.getAllVacations();
                vacationsStore.dispatch(getVacationsAction(vacations));
                setVacations(vacations);


                if(authService.isLoggedIn()){
                    const userLikes = userLikesStore.getState().userLikes;
                    if(!userLikes) {
                        const userLikes = await likesService.getUserLikes();
                        userLikesStore.dispatch(getAllUserLikes(userLikes));
                    }
                }
            }
            else{
                setVacations(vacationsFromRedux);
            }
        }
        catch(err: any) {
            alert(err.message);
        }
      }) as any, [])

    return (
        <div className="Home">
			<section>
                <HomeDeals />
            </section>
            <section>
                <NowOrNever vacations={vacations} />
            </section>
            <section>
                <MorePlacesToGo />
            </section>
        </div>
    );
}

export default Home;
