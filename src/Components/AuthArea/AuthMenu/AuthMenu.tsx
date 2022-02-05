import { Thermostat } from "@mui/icons-material";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import { Unsubscribe } from "redux";
import Role from "../../../Models/Role";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/Store";
import "./AuthMenu.css";

interface AuthMenuState {
	user: UserModel;
}

class AuthMenu extends Component<{}, AuthMenuState> {

    private unsubscribeMe: Unsubscribe;

    public componentDidMount(): void {
        this.setState({ user: authStore.getState().user });

        this.unsubscribeMe = authStore.subscribe(() => {
            const user = authStore.getState().user;
            this.setState({ user });
        });
    }

    public componentWillUnmount(): void {
        this.unsubscribeMe();
    }

    public render(): JSX.Element {
        return (
            <div className="AuthMenu">

                {!this.state?.user &&
                    <>
                        <span>Hello Guest</span>
                        <span> | </span>
                        <NavLink to="/login">Login</NavLink>
                        <span> | </span>
                        <NavLink to="/register">Register</NavLink>
                    </>
                }

                {this.state?.user &&
                    <>
                        <span>Hello {this.state.user.username}</span>
                        <span> | </span>
                        <NavLink to="logout">Logout</NavLink>
                    </>
                }

                {this.state?.user?.role === Role.Admin &&
                    <>
                    <br />
                        <NavLink to="add-vacation">Add Vacation</NavLink>
                    </>
                }				
            </div>
        );
    }
}

export default AuthMenu;
