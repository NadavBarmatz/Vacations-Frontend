import VacationModel from "../../../Models/VacationModel";
import LikeAndCart from "../../SharedArea/LikeAndCart/LikeAndCart";
import config from "../../../Utils/Config";
import EventNoteIcon from '@mui/icons-material/EventNote';
import ScheduleIcon from '@mui/icons-material/Schedule';
import "./VacationCard.css";
import UserModel from "../../../Models/UserModel";
import Role from "../../../Models/Role";
import { Button, ButtonGroup } from "@mui/material";
import vacationsService from "../../../Services/VacationsService";
import { vacationsStore } from "../../../Redux/Store";
import { deleteVacationAction } from "../../../Redux/VacationsState";
import { NavLink, useNavigate } from "react-router-dom";
import notificationService from "../../../Services/NotificationService";

interface VacationCardProps {
    vacation: VacationModel;
    user: UserModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {

    const navigate = useNavigate();

    async function handleDelete(vacationId: number) {
        try{
            await vacationsService.deleteVacation(vacationId);
            vacationsStore.dispatch(deleteVacationAction(vacationId));
            notificationService.success("Vacation has been deleted");
        }
        catch(err: any) {
            notificationService.error(err);
        }
    }

    return (
        <div className="VacationCard">
            <div className="Image">
                {props.vacation?.imageName
                &&
                <img src={config.urls.images + props.vacation?.imageName} />
                }
            </div>
            <div className="Info">
                <h2>{props.vacation?.country}<span> ${props.vacation?.price.toFixed(2)}</span></h2>
                <h3>{props.vacation?.city}</h3>
                <div className="Description">
                    <p>{props.vacation?.description}</p>
                </div>
                <div className="Time">
                    <div>
                        <EventNoteIcon />
                        <p>{new Date(props.vacation?.start).toLocaleString().split(",")[0]}</p>
                    </div>
                    <div>
                        <EventNoteIcon />
                        <p>{new Date(props.vacation?.end).toLocaleString().split(",")[0]}</p>
                    </div>
                    <div>
                        <ScheduleIcon />
                        <p>{new Date(props.vacation?.start).toLocaleString().split(",")[1]}</p>
                    </div>
                    <div>
                        <ScheduleIcon />
                        <p>{new Date(props.vacation?.end).toLocaleString().split(",")[1]}</p>
                    </div>
                </div>
                <div className="LikeSection">
                    <span>Total Likes: {props.vacation?.likes}</span>
                    <LikeAndCart vacationId={props.vacation?.vacationId} />
                </div>
            </div>
            {props.user?.role === Role.Admin && 
                <ButtonGroup>
                    <NavLink to={"/update-vacation/" + props.vacation?.vacationId}>
                        <Button>UPDATE</Button>
                    </NavLink>
                    <Button color="error" onClick={() => {handleDelete(props.vacation?.vacationId)}}>DELETE</Button>
                </ButtonGroup>
            }
        </div>
    );
}

export default VacationCard;
