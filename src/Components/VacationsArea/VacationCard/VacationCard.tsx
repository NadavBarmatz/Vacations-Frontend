import VacationModel from "../../../Models/VacationModel";
import LikeAndCart from "../../SharedArea/LikeAndCart/LikeAndCart";
import config from "../../../Utils/Config";
import EventNoteIcon from '@mui/icons-material/EventNote';
import ScheduleIcon from '@mui/icons-material/Schedule';
import "./VacationCard.css";

interface VacationCardProps {
    vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {

    return (
        <div className="VacationCard">
            <div className="Image">
                <img src={config.urls.images + props.vacation?.imageName} />
            </div>
            <div className="Description">
                <h2>{props.vacation?.country}<span> ${props.vacation?.price}</span></h2>
                <h3>{props.vacation?.city}</h3>
                <p>{props.vacation?.description}</p>
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
                <LikeAndCart vacationId={props.vacation?.vacationId} />
            </div>
        </div>
    );
}

export default VacationCard;
