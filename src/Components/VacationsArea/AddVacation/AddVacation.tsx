import { Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import { SyntheticEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DestinationModel from "../../../Models/DestinationModel";
import VacationModel from "../../../Models/VacationModel";
import destinationsService from "../../../Services/DestinationsService";
import formService from "../../../Services/FormService";
import notificationService from "../../../Services/NotificationService";
import vacationsService from "../../../Services/VacationsService";
import "./AddVacation.css";

function AddVacation(): JSX.Element {

    const myRef = React.createRef<HTMLFormElement>();


    // Used to set select options and value:
    const [destinations, setDestinations] = useState<DestinationModel[]>([]);
    const [selectValue, setSelectValue] = useState<string>("");

    // Used to validate meeting end time is not before start time:
    const [endTime, setEndTime] = useState<string>("");

    const {register, handleSubmit, reset, formState} = useForm<VacationModel>();

    const navigate = useNavigate();

    useEffect((async () => {
        try {
            myRef.current.scrollIntoView();
            // Get destination from server:
            const destinationsArr = await destinationsService.getAllDestinations();
            // Sort by alphabet order:
            destinationsArr.sort((a, b) => a.destinationCountry < b.destinationCountry ? -1 : 1)
            setDestinations(destinationsArr);
        }
        catch(err: any) {
            notificationService.error(err);
        }
    }) as any, [])

    // Minimum value for dateTime inputs
    const dateTimeMinValue = formService.dateTimeMinValue;

    const submit = async (vacation: VacationModel) => {
        try{
            await vacationsService.addVacation(vacation);
            notificationService.success("Vacation has been added by admin");
            navigate("/deals");
        }
        catch(err: any) {
            notificationService.error(err);
        }

    }

    const handleSelectChange = (e: SyntheticEvent) => formService.handleSelectChange(e, setSelectValue);

    // Function that make sure end cannot be b4 start time:
    const setEndValidation = (e: SyntheticEvent) => formService.handleEndTimeValidation(e, setEndTime);

    return (
        <div className="AddVacation">
            
            <h2>Add New Vacation</h2>
            <form ref={myRef} onSubmit={handleSubmit(submit)}>

                <FormControl fullWidth>
                    <InputLabel>Destination</InputLabel>
                    <Select label="Destination" defaultValue={selectValue} onChange={handleSelectChange} {...register("destinationId", {
                        required: {value: true, message: "Filed is required"},
                    })}>
                        {destinations.map(d => <MenuItem key={d.destinationId} value={d.destinationId}>{d.destinationCountry}, {d.destinationCity}</MenuItem>)}
                    </Select>
                </FormControl>
                <span>{formState.errors.destinationId?.message}</span>

                <TextField type="text" label="Description" className="TextBox" multiline={true} minRows={5} {...register("description", {
                    required: {value: true, message: "Filed is required"},
                    validate: {value: desc => desc.trim().length > 0 || "Cant leave empty"}, 
                    minLength: {value: 10, message: "Description must include 10-2000 characters"},
                    maxLength: {value: 2000, message: "Description must include 10-2000 characters"}
                })} />
                <span>{formState.errors.description?.message}</span>

                <TextField type="datetime-local" inputProps={{min: dateTimeMinValue, onInput: setEndValidation}} label="Start" className="TextBox" {...register("start",{
                    required: {value: true, message: "Filed is required"},
                })} />
                <span>{formState.errors.start?.message}</span>

                <TextField type="datetime-local" inputProps={{min: endTime ? endTime : dateTimeMinValue}} label="End" className="TextBox" {...register("end",{
                    required: {value: true, message: "Filed is required"},
                })} />
                <span>{formState.errors.end?.message}</span>

                <TextField type="number" inputProps={{step: 0.01}} label="Price" className="TextBox" {...register("price",{
                    required: {value: true, message: "Filed is required"},
                    min: {value: 20, message: "Price must be between 20-2000"},
                    max: {value: 2000, message: "Price must be between 20-2000"}
                })} />
                <span>{formState.errors.price?.message}</span>

                <TextField type="file" label="Image" inputProps={{accept: "image/*"}} className="TextBox" {...register("image",{
                    required: {value: true, message: "Filed is required"},
                })} />
                <span>{formState.errors.image?.message}</span>

                <ButtonGroup className="TextBox">
                    <Button type="submit" fullWidth color="success">ADD</Button>
                    <Button fullWidth color="error" onClick={()=>{
                        reset({"description": null, "start": null, "end": null, "price": null, "image": null})
                    }}>CLEAR</Button>
                </ButtonGroup>
            </form>

        </div>
    );
}

export default AddVacation;
