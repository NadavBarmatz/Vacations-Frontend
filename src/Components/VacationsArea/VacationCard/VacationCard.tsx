import VacationModel from "../../../Models/VacationModel";
import config from "../../../Utils/Config";
import "./VacationCard.css";

interface VacationCardProps {
    vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {

    

    return (
        <div className="VacationCard">
            <img src={config.urls.images + props.vacation.destinationId + "/" + props.vacation.imageName} />
        </div>
    );
}

export default VacationCard;
