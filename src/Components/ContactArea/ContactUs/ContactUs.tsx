import { Button, ButtonGroup, TextField } from "@mui/material";
import { createRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import MessageModel from "../../../Models/MessageModel";
import { authStore } from "../../../Redux/Store";
import notificationService from "../../../Services/NotificationService";
import PleaseLogIn from "../../SharedArea/PleaseLogIn/PleaseLogIn";
import "./ContactUs.css";

function ContactUs(): JSX.Element {

    const {register, handleSubmit, formState, reset} = useForm<MessageModel>();

    const myRef = createRef<HTMLFormElement>();

    useEffect(()=>{
        myRef.current?.scrollIntoView();
    },[])

    const user = authStore.getState().user;

    const submit = (message: MessageModel) => {
        try {
            // Implement here email sending to admin mail.

            notificationService.success("Your message has been sent successfully");
        }
        catch(err: any) {
            notificationService.error(err);
        }
    }
    
    return (
        <div className="ContactUs">

            {user ? 
                <div>
                    <h2>CONTACT US</h2>

                    <form ref={myRef} onSubmit={handleSubmit(submit)}>
                        
                        <TextField variant="filled" label="Subject" className="TextBox" {...register("subject", {
                            required: {value: true, message: "Field is required"}
                        })} />
                        <span>{formState.errors.subject?.message}</span>

                        <TextField variant="filled" label="Email" className="TextBox" {...register("email", {
                            required: {value: true, message: "Field is required"}
                        })} />
                        <span>{formState.errors.email?.message}</span>

                        <TextField variant="filled" label="Message" className="TextBox" multiline={true} minRows={5} {...register("message", {
                            required: {value: true, message: "Field is required"}
                        })} />
                        <span>{formState.errors.message?.message}</span>

                        <ButtonGroup className="TextBox">
                            <Button fullWidth color="success" type="submit">Send</Button>
                            <Button fullWidth color="error" onClick={()=>{reset({subject: null, email: null, message: null})}}>Clear</Button>
                        </ButtonGroup>
                    </form>
                </div>
                :
                <PleaseLogIn />
            }
        </div>
    );
}

export default ContactUs;
