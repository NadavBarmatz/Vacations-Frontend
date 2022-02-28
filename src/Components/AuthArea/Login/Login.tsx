import { Button, ButtonGroup, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import "./Login.css";

function Login(): JSX.Element {

    const myRef = React.createRef<HTMLObjectElement>();

    useEffect(() => {
        myRef.current.scrollIntoView();
    }, [])

    const {register, handleSubmit, formState, reset} = useForm<CredentialsModel>();

    const navigate = useNavigate();

    const submit = async (credentials: CredentialsModel) => {
        try{
            await authService.login(credentials);
            notificationService.success("Login succeed");
            navigate("/home");
        }
        catch(err: any) {
            notificationService.error(err);
        }
    }

    return (
        <div className="Login">
			<h2>Login</h2>

            <form onSubmit={handleSubmit(submit)}>
                <TextField label="Username" {...register("username")} className="TextBox" />
                <TextField label="Password" type='password' {...register("password")} className="TextBox" />
                <ButtonGroup className="TextBox">
                    <Button fullWidth type="submit" color="success" >Login</Button>
                    <Button fullWidth color="error" onClick={() => {
                        reset({
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

export default Login;
