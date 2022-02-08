import { useEffect, useState } from "react";
import { Unsubscribe } from "redux";
import VacationModel from "../../../Models/VacationModel";
import { userLikesStore, vacationsStore } from "../../../Redux/Store";
import { getAllUserLikes } from "../../../Redux/UserLikesState";
import { getVacationsAction } from "../../../Redux/VacationsState";
import likesService from "../../../Services/LikesService";
import vacationsService from "../../../Services/VacationsService";
import HomeDeals from "../HomeDeals/HomeDeals";
import MorePlacesToGo from "../MorePlacesToGo/MorePlacesToGo";
import NowOrNever from "../NowOrNever/NowOrNever";
import "./Home.css";

function Home(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    console.log("Home Vacations", vacations);
    
    let unSub: Unsubscribe;
    let vacationsArr: VacationModel[] = [];

    useEffect((async () => {

        unSub = vacationsStore.subscribe(() => {
            vacationsArr = vacationsStore.getState().vacations;
            setVacations(vacationsArr);
        })
        if(vacationsArr.length === 0){
            vacationsArr = await vacationsService.getAllVacations();
            vacationsStore.dispatch(getVacationsAction(vacationsArr));
            setVacations(vacationsArr);
        }

        // let userLikes = userLikesStore.getState().userLikes;
        // if(!userLikes) {
        //     userLikes = await likesService.getUserLikes();
        //     userLikesStore.dispatch(getAllUserLikes(userLikes));
        // }

        return () => {unSub();}

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
