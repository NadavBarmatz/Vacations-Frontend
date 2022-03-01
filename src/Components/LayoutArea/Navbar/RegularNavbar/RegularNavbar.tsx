import Navlinks from "../Navlinks/Navlinks";
import Logo from "../../../../Assets/Images/Logo/logoWhite.png";
import "./RegularNavbar.css";
import { NavLink } from "react-router-dom";

function RegularNavbar(): JSX.Element {
    return (
        <div className="RegularNavbar">
            <div className="Logo">
                <NavLink to="/home">
                    <img src={Logo} />
                </NavLink>
            </div>
			<Navlinks />
        </div>
    );
}

export default RegularNavbar;
