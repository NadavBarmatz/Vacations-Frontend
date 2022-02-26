import "./LikesChart.css";
import { VictoryBar, VictoryChart, VictoryStack, VictoryTooltip } from 'victory';
import VacationModel from "../../../Models/VacationModel";
import { useEffect, useState } from "react";
import { vacationsStore } from "../../../Redux/Store";
import vacationsService from "../../../Services/VacationsService";
import MustBeAdmin from "../../SharedArea/MustBeAdmin/MustBeAdmin";
import authService from "../../../Services/AuthService";
import React from "react";

function LikesChart(): JSX.Element {

    const myRef = React.createRef<HTMLObjectElement>();

    const [vacations, setVacations] = useState<VacationModel[]>(vacationsStore.getState().vacations);

    useEffect((async () => {
        myRef.current.scrollIntoView();
        if(!vacations) {
            let vacationsArr = await vacationsService.getAllVacations();
            setVacations(vacationsArr);
        }
    }) as any, []);

    // data for the chart contains only liked vacations:
    const data = vacations?.filter(v => v.likes > 0).map(v => ({id: v.vacationId.toString(), likes: v.likes, label: v.likes}));

    // array of naming for the x axis, one object with array as value:
    const xAxisNaming = { x: data?.map(d => d.id) };
    
    return (
        <div className="LikesChart">
            <h1>Vacations Likes Tracking</h1>
            {data ? <div>
                <VictoryChart domainPadding={25}>
                    <VictoryStack>
                        <VictoryBar
                            style={{data: {fill: 'hsl(194, 96%, 22%)'}}}
                            labelComponent={<VictoryTooltip/>}
                            categories={xAxisNaming}
                            data={data}
                            x="id"
                            y="likes"       
                        />
                    </VictoryStack>
                </VictoryChart>
            </div> : <p>no data</p>}
            <span ref={myRef} className="Ref"></span>
        </div>
    );
}

export default LikesChart;
