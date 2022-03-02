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
                <TextField label="First Name" {...register("firstName", {
                    required: {value: true, message: "Field is required"},
                    minLength: {value: 4, message: "First name must be 4-20 chars"},
                    maxLength: {value: 20, message: "First name must be 4-20 chars"}
                })} className="TextBox" />
                <span>{formState.errors.firstName?.message}</span>
                
                <TextField label="Last Name" {...register("lastName",{
                    required: {value: true, message: "Field is required"},
                    minLength: {value: 4, message: "Last name must be 4-30 chars"},
                    maxLength: {value: 30, message: "Last name must be 4-30 chars"}
                })} className="TextBox" />
                <span>{formState.errors.lastName?.message}</span>

                
                <TextField label="Username" {...register("username", {
                    required: {value: true, message: "Field is required"},
                    minLength: {value: 2, message: "Username must be 2-20 chars"},
                    maxLength: {value: 20, message: "Username must be 2-20 chars"}
                })} className="TextBox" />
                <span>{formState.errors.username?.message}</span>

                
                <TextField label="Password" type='password' {...register("password", {
                    required: {value: true, message: "Field is required"},
                    minLength: {value: 4, message: "Password must be 4-12 chars"},
                    maxLength: {value: 12, message: "Password must be 4-12 chars"}
                })} className="TextBox" />
                <span>{formState.errors.password?.message}</span>

                
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
