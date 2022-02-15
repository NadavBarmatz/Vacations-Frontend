import "./LikesChart.css";
import * as V from 'victory';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme, VictoryStack } from 'victory';
import VacationModel from "../../../Models/VacationModel";
import { useEffect, useState } from "react";
import { authStore, vacationsStore } from "../../../Redux/Store";
import vacationsService from "../../../Services/VacationsService";
import Role from "../../../Models/Role";
import MustBeAdmin from "../../SharedArea/MustBeAdmin/MustBeAdmin";

function LikesChart(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>(vacationsStore.getState().vacations);

    const isAdmin = authStore.getState().user?.role;

    useEffect((async () => {
        if(!vacations) {
            let vacationsArr = await vacationsService.getAllVacations();
            setVacations(vacationsArr);
        }
    }) as any, []);

    // data for the chart contains only liked vacations:
    const data = vacations?.filter(v => v.likes > 0).map(v => ({id: v.vacationId.toString(), likes: v.likes}));

    // array of naming for the x axis, one object with array as value:
    const xAxisNaming = { x: data?.map(d => d.id) };
    
    return (
        <div className="LikesChart">
        {
            isAdmin === Role.Admin ?
                <div>
                    <h1>Vacations Likes Tracking</h1>
                    {data ? <div>
                        <VictoryChart  domainPadding={25}>
                            <VictoryStack colorScale="warm">
                                <VictoryBar
                                categories={xAxisNaming}
                                    data={data}
                                    x="id"
                                    y="likes"       
                                />
                            </VictoryStack>
                        </VictoryChart>
                    </div> : <p>no data</p>}
                </div>
            :
                <MustBeAdmin />
        }
        </div>
    );
}

export default LikesChart;
