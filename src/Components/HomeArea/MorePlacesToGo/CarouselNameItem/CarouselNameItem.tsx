import { NavLink } from "react-router-dom";
import DestinationModel from "../../../../Models/DestinationModel";
import VacationModel from "../../../../Models/VacationModel";
import "./CarouselNameItem.css";

interface CarouselNameItemProps {
	vacation: DestinationModel;
}

function CarouselNameItem(props: CarouselNameItemProps): JSX.Element {
    return (
        <NavLink to={"/vacations/list-by-destination/" + props.vacation.destinationId}>
        <div className="CarouselNameItem">
			<h3>{props.vacation.destinationCountry}</h3>
        </div>
        </NavLink>
    );
}

export default CarouselNameItem;
