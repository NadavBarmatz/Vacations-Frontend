import { useForm } from "react-hook-form";
import { Button, ButtonGroup, TextField } from "@mui/material";
import "./Register.css";
import UserModel from "../../../Models/UserModel";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import { useEffect } from "react";
import React from "react";

function Register(): JSX.Element {

    const myRef = React.createRef<HTMLObjectElement>();

    useEffect(() => {
        myRef.current.scrollIntoView();
    }, [])

    const {register, handleSubmit, formState, reset} = useForm<UserModel>()

    const navigate = useNavigate();

    const submit = async (user: UserModel) => {
        try{
            await authService.register(user);
            notificationService.success("Registration succeed");
            navigate("/home");
        }
        catch(err: any) {
            notificationService.error(err);
        }
    }

    return (
        <div className="Register">
			<h2>Register</h2>

            <form onSubmit={handleSubmit(submit)}>
                <TextField label="First Name" {...register("firstName")} className="TextBox" />
                
                <TextField label="Last Name" {...register("lastName")} className="TextBox" />
                
                <TextField label="Username" {...register("username")} className="TextBox" />
                
                <TextField label="Password" {...register("password")} className="TextBox" />
                
                <ButtonGroup className="TextBox">
                    <Button fullWidth type="submit" color="success">Register</Button>
                    <Button fullWidth color="error" onClick={() => {
                        reset({
                            firstName: null,
                            lastName: null,
                            username: null,
                            password: null
                        })
                    }}>Clear</Button>
                </ButtonGroup>
            </form>
            <span ref={myRef}></span>
        </div>
    );
}

export default Register;
