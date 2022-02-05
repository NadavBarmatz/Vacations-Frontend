import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import VacationModel from "../../../../Models/VacationModel";
import { userLikesStore } from "../../../../Redux/Store";
import config from "../../../../Utils/Config";
import LikeAndCart from "../../../SharedArea/LikeAndCart/LikeAndCart";
import "./CarouselItem.css";

interface CarouselItemProps {
	vacation: VacationModel;
}

function CarouselItem(props: CarouselItemProps): JSX.Element {

    // useEffect(() => {
    //     const userLikesFromRedux = userLikesStore.getState().userLikes;
    //     if(!userLikesFromRedux) {

    //     }
    //     console.log(userLikesFromRedux);
    // }, [])

    return (
        <div className="CarouselItem">
            <NavLink to={"/vacation/" + props.vacation.vacationId}>
                <span>Total Likes: {props.vacation.likes}</span>
    			<img src={config.urls.images + props?.vacation?.imageName} />
            </NavLink>
            <div className="Description">
                <div className="Country">
                    <h3>{props?.vacation?.country}</h3>
                </div>
                <div className="Price">
                    <span>${props?.vacation?.price.toFixed(2)}</span>
                </div>
                <div className="Icons">
                    <LikeAndCart vacationId={props.vacation?.vacationId} />
                </div>
            </div>
        </div>
    );
}

export default CarouselItem;
