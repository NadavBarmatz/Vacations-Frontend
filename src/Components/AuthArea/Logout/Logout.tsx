import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";

function Logout(): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {
        authService.logout();
        notificationService.success("Logout succeed");
        navigate("/home");
    }, []);

    return null;
}

export default Logout;
