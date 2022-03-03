import "./Footer.css";
import FooterLogo from "../../../Assets/Images/Logo/logoBlue.png";
import { NavLink } from "react-router-dom";

function Footer(): JSX.Element {
    return (
        <div className="Footer">
			<div className="FooterLogo">
                <img src={FooterLogo} />
            </div>
            <div className="Links">
                <NavLink to="/home">HOME</NavLink>
                <NavLink to="/deals">DEALS</NavLink>
                <NavLink to="/contact">CONTACT</NavLink>
            </div>
        </div>
    );
}

export default Footer;
