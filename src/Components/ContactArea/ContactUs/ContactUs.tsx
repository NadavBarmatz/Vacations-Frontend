import { Button, ButtonGroup, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import MessageModel from "../../../Models/MessageModel";
import { authStore } from "../../../Redux/Store";
import PleaseLogIn from "../../SharedArea/PleaseLogIn/PleaseLogIn";
import "./ContactUs.css";

function ContactUs(): JSX.Element {

    const {register, handleSubmit, formState, reset} = useForm<MessageModel>();

    const user = authStore.getState().user;

    const submit = (message: MessageModel) => {
        console.log(message);
    }
    
    return (
        <div className="ContactUs">

            {user ? 
                <div>
                    <h1>CONTACT US</h1>

                    <form onSubmit={handleSubmit(submit)}>
                        
                        <TextField label="Subject" className="TextBox" {...register("subject", {
                            required: {value: true, message: "Field is required"}
                        })} />
                        <span>{formState.errors.subject?.message}</span>

                        <TextField label="Email" className="TextBox" {...register("email", {
                            required: {value: true, message: "Field is required"}
                        })} />
                        <span>{formState.errors.email?.message}</span>

                        <TextField label="Message" className="TextBox" multiline={true} minRows={5} {...register("message", {
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
