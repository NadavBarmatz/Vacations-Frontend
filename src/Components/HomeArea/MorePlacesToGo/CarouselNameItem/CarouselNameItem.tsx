import VacationModel from "../../../../Models/VacationModel";
import "./CarouselNameItem.css";

interface CarouselNameItemProps {
	vacation: VacationModel;
}

function CarouselNameItem(props: CarouselNameItemProps): JSX.Element {
    return (
        <div className="CarouselNameItem">
			<h3>{props.vacation.country}</h3>
        </div>
    );
}

export default CarouselNameItem;
