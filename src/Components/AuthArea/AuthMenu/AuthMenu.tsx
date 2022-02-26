import PersonIcon from '@mui/icons-material/Person';
import { Component } from "react";
import { NavLink } from "react-router-dom";
import { Unsubscribe } from "redux";
import Role from "../../../Models/Role";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/Store";
import authService from '../../../Services/AuthService';
import AdminActions from "../AdminActions/AdminActions";
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

                {!authService.isLoggedIn() &&
                    <div>
                        <span>Hello Guest</span>
                        <span> | </span>
                        <NavLink to="/login">Login</NavLink>
                        <span> | </span>
                        <NavLink to="/register">Register</NavLink>
                    </div>
                }

                {authService.isLoggedIn() &&
                    <div>
                        <span>Hello {this.state?.user?.username}</span>
                        <span> | </span>
                        <NavLink to="logout">Logout</NavLink>
                    </div>
                }

                {authService.isAdmin() &&
                    <AdminActions />
                }
            <PersonIcon className="AuthIcon" onClick={() => {console.log("clicked")}} />

            </div>
        );
    }
}

export default AuthMenu;
