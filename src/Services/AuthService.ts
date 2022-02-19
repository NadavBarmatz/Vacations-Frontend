import axios from 'axios';
import CredentialsModel from '../Models/CredentialsModel';
import Role from '../Models/Role';
import UserModel from "../Models/UserModel";
import { registerAction, loginAction, logoutAction } from '../Redux/AuthState';
import { authStore } from '../Redux/Store';
import config from '../Utils/Config';

class AuthService {

    public async register(user: UserModel): Promise<void> {
        const response = await axios.post<string>(config.urls.register, user);
        const token = response.data;
        authStore.dispatch(registerAction(token));
    }

    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post<string>(config.urls.login, credentials);
        const token = response.data;
        authStore.dispatch(loginAction(token));
    }

    public logout(): void {
        authStore.dispatch(logoutAction());
    }

    public isLoggedIn() : boolean {
        return authStore.getState().token !== null;
    }

    public isAdmin() : boolean {
        return authStore.getState().user?.role === Role.Admin;
    }

}

const authService = new AuthService();

export default authService;