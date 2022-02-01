import { useForm } from "react-hook-form";
import { Button, ButtonGroup, TextField } from "@mui/material";
import "./Register.css";
import UserModel from "../../../Models/UserModel";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";

function Register(): JSX.Element {

    const {register, handleSubmit, formState, reset} = useForm<UserModel>()

    const navigate = useNavigate();

    const submit = async (user: UserModel) => {
        try{
            await authService.register(user);
            alert("Registration succeed");
            navigate("/home");
        }
        catch(err: any) {
            alert(err.message);
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
        </div>
    );
}

export default Register;
