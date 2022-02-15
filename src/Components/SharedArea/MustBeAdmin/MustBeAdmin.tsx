import { NavLink } from "react-router-dom";
import "./MustBeAdmin.css";

function MustBeAdmin(): JSX.Element {
    return (
        <div className="MustBeAdmin">
			<div>
                <h1>
                    You must be admin reach that section. <br />
                    Please <NavLink to="/login">Login</NavLink> as admin
                </h1>
            </div>
        </div>
    );
}

export default MustBeAdmin;
