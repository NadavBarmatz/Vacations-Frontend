import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Unsubscribe } from "redux";
import VacationModel from "../../../../Models/VacationModel";
import { userLikesStore, vacationsStore } from "../../../../Redux/Store";
import config from "../../../../Utils/Config";
import LikeAndCart from "../../../SharedArea/LikeAndCart/LikeAndCart";
import Loading from "../../../SharedArea/Loading/Loading";
import "./CarouselItem.css";

interface CarouselItemProps {
	vacationId: number;
}

function CarouselItem(props: CarouselItemProps): JSX.Element {

    const [vacation, setVacation] = useState<VacationModel>();

    let unSub: Unsubscribe;

    useEffect(() => {
        let vacations = vacationsStore.getState().vacations;
        let currentVacation = vacations.find(v => v.vacationId === props.vacationId);
        setVacation(currentVacation);
        unSub = vacationsStore.subscribe(() => {
            vacations = vacationsStore.getState().vacations;
            currentVacation = vacations.find(v => v.vacationId === props.vacationId);
            setVacation(currentVacation);
        })

        return () => {unSub();}
    }, [])

    return (
        <div className="CarouselItem">
            <NavLink to={"/vacation/" + props.vacationId}>
                <span>Total Likes: {vacation?.likes}</span>
    			<img src={config.urls.images + vacation?.imageName} />
            </NavLink>
            <div className="Description">
                <div className="Country">
                    <h3>{vacation?.country}</h3>
                </div>
                <div className="Price">
                    <span>${vacation?.price.toFixed(2)}</span>
                </div>
                <div className="Icons">
                    <LikeAndCart vacationId={vacation?.vacationId} />
                </div>
            </div>
        </div>
    );
}

export default CarouselItem;
