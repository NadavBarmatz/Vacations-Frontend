import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import { vacationsStore } from "../../../Redux/Store";
import { getVacationsAction } from "../../../Redux/VacationsState";
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
