import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import VacationModel from "../../../../Models/VacationModel";
import { vacationsStore } from "../../../../Redux/Store";
import config from "../../../../Utils/Config";
import LikeAndCart from "../../../SharedArea/LikeAndCart/LikeAndCart";
import "./CarouselItem.css";

interface CarouselItemProps {
    vacationId: number;
}

function CarouselItem(props: CarouselItemProps): JSX.Element {
    const [vacation, setVacation] = useState<VacationModel>();

    useEffect(() => {
        // Get vacations from redux:
        let vacations = vacationsStore.getState().vacations;
        // set current vacation for each carousel item
        let currentVacation = vacations?.find(
            (v) => v.vacationId === props.vacationId
        );
        setVacation(currentVacation);
        
        const unSub = vacationsStore.subscribe(() => {
            vacations = vacationsStore.getState().vacations;
            currentVacation = vacations.find(
                (v) => v.vacationId === props.vacationId
            );
            setVacation(currentVacation);
        });

        return () => {
            unSub();
        };
    }, []);

    return (
        <div className="CarouselItem">
            <NavLink to={"/vacation/" + props.vacationId}>
                <span>Total Likes: {vacation?.likes}</span>
                {vacation?.imageName && (
                    <img src={config.urls.images + vacation?.imageName} />
                )}
            </NavLink>
            <div className="Description">
                <div className="Country">
                    <span>{vacation?.country}</span>
                </div>
                <div className="Price">
                    <p>${vacation?.price.toFixed(2)}</p>
                </div>
                <div className="Icons">
                    <LikeAndCart vacationId={vacation ? vacation.vacationId : null} />
                </div>
            </div>
        </div>
    );
}

export default CarouselItem;
