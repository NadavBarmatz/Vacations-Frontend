import { NavLink } from "react-router-dom";
import "./PleaseLogIn.css";

function PleaseLogIn(): JSX.Element {
    return (
        <div className="PleaseLogIn">
            <div>
                <h1>
                    You are unauthorized to reach that section. <br />
                    Please <NavLink to="/login">Login </NavLink>
                    or <NavLink to="/register">Register</NavLink>.    
                </h1>
            </div>
        </div>
    );
}

export default PleaseLogIn;
