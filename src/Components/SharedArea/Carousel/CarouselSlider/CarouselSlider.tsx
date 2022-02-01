import { useEffect, useState } from "react";
import VacationModel from "../../../../Models/VacationModel";
import config from "../../../../Utils/Config";
import "./CarouselSlider.css";

interface CarouselSliderProps {
	vacation: VacationModel;
}

function CarouselSlider(props: CarouselSliderProps): JSX.Element {
    return (
        <div className="CarouselSlider">
			<img src={config.urls.images + props.vacation?.imageName} />
            <p>{props.vacation?.country}</p>
        </div>
    );
}

export default CarouselSlider;
