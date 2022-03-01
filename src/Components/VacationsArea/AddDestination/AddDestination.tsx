import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DestinationModel from "../../../Models/DestinationModel";
import destinationsService from "../../../Services/DestinationsService";
import notificationService from "../../../Services/NotificationService";
import "./AddDestination.css";

function AddDestination(): JSX.Element {

    const navigate = useNavigate();

    const {register, handleSubmit} = useForm<DestinationModel>();

    const submit = async (destination: DestinationModel) => {
        try {
            await destinationsService.addDestination(destination);
            notificationService.success("Destination has been added");
            navigate("/add-vacation");
        }
        catch(err: any) {
            notificationService.error(err);
        }
    }

    return (
        <div className="AddDestination">
			<form onSubmit={handleSubmit(submit)}>
                <TextField label="Country Name:" className="TextBox" {...register("destinationCountry")} />
                
                <TextField label="City Name:" className="TextBox" {...register("destinationCity")} />

                <Button fullWidth type="submit">Submit</Button>
            </form>
        </div>
    );
}

export default AddDestination;
