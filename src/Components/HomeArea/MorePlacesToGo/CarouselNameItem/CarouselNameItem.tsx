import { NavLink } from "react-router-dom";
import VacationModel from "../../../../Models/VacationModel";
import "./CarouselNameItem.css";

interface CarouselNameItemProps {
	vacation: VacationModel;
}

function CarouselNameItem(props: CarouselNameItemProps): JSX.Element {
    return (
        <NavLink to={"/vacations/list-by-destination/" + props.vacation.destinationId}>
        <div className="CarouselNameItem">
			<h3>{props.vacation.country}</h3>
        </div>
        </NavLink>
    );
}

export default CarouselNameItem;
