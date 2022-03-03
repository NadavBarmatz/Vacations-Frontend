import { NavLink } from "react-router-dom";
import DestinationModel from "../../../../Models/DestinationModel";
import "./CarouselNameItem.css";

interface CarouselNameItemProps {
	destination: DestinationModel;
}

function CarouselNameItem(props: CarouselNameItemProps): JSX.Element {
    return (
        <NavLink to={"/vacations/list-by-destination/" + props.destination.destinationId}>
        <div className="CarouselNameItem">
			<h3>{props.destination.destinationCountry}</h3>
        </div>
        </NavLink>
    );
}

export default CarouselNameItem;
