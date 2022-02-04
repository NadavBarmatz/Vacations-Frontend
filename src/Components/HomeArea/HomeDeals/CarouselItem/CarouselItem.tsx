import { NavLink } from "react-router-dom";
import VacationModel from "../../../../Models/VacationModel";
import config from "../../../../Utils/Config";
import LikeAndCart from "../../../SharedArea/LikeAndCart/LikeAndCart";
import "./CarouselItem.css";

interface CarouselItemProps {
	vacation: VacationModel;
}

function CarouselItem(props: CarouselItemProps): JSX.Element {
    return (
        <div className="CarouselItem">
            <NavLink to={"/vacation/" + props.vacation.vacationId}>
    			<img src={config.urls.images + props?.vacation?.imageName} />
            </NavLink>
            <div className="Description">
                <div className="Country">
                    <h3>{props?.vacation?.country}</h3>
                </div>
                <div className="Price">
                    <span>${props?.vacation?.price}</span>
                </div>
                <div className="Icons">
                    <LikeAndCart vacationId={props.vacation?.vacationId} />
                </div>
            </div>
        </div>
    );
}

export default CarouselItem;
