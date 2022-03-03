import "./LikesChart.css";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryStack, VictoryTooltip } from 'victory';
import VacationModel from "../../../Models/VacationModel";
import { useEffect, useState } from "react";
import { vacationsStore } from "../../../Redux/Store";
import vacationsService from "../../../Services/VacationsService";
import React from "react";

function LikesChart(): JSX.Element {

    const myRef = React.createRef<HTMLObjectElement>();

    const [vacations, setVacations] = useState<VacationModel[]>(vacationsStore.getState().vacations);

    useEffect(() => {

        myRef.current.scrollIntoView();
        (async () => {
            if (!vacations) {
                let vacationsArr = await vacationsService.getAllVacations();
                setVacations(vacationsArr);
            }
        })();

    }, []);

    // data for the chart contains only liked vacations:
    const data = vacations?.filter(v => v.likes > 0).map(v => ({ id: v.vacationId.toString(), likes: v.likes, label: v.likes + "likes" }));

    // array of naming for the x axis, one object with array as value:
    const xAxisNaming = data?.map(d => d.id);

    return (
        <div className="LikesChart">
            <h1>Vacations Likes Tracking</h1>
            {data ? <div>
                <VictoryChart domainPadding={25}>
                    <VictoryStack>
                        <VictoryBar
                            style={{ data: { fill: 'hsl(194, 96%, 22%)' } }}
                            labelComponent={<VictoryTooltip />}
                            data={data}
                            x="id"
                            y="likes"
                        />
                        <VictoryAxis dependentAxis label="Likes" />
                        <VictoryAxis label="Vacation ID" tickValues={xAxisNaming} />
                    </VictoryStack>
                </VictoryChart>
            </div> : <p>no data</p>}
            <span ref={myRef} className="Ref"></span>
        </div>
    );
}

export default LikesChart;
