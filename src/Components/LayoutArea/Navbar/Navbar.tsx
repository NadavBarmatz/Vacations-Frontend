import Logo from "../../../Assets/Images/Logo/logoWhite.png";
import { NavLink } from "react-router-dom";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Navbar.css";
import { useEffect, useState } from "react";
import SearchComponent from "../../SharedArea/SearchComponent/SearchComponent";

function Navbar(): JSX.Element {

    const [scroll, setScroll] = useState<number>(0);
    
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY);
        });
    }, []);

    return (
        <div className={scroll > (window.innerHeight / 2) ? "Navbar Scrolled" : "Navbar"}>
			<div className="Logo">
                <NavLink to="/home">
                    <img src={Logo} />
                </NavLink>
            </div>
            <div className="Links">
                <NavLink to="/booking">BOOK A FLY</NavLink>
                <NavLink to="/deals">DEALS</NavLink>
                <NavLink to="/contact">CONTACT</NavLink>
            </div>
            <SearchComponent uniqueID="nav_" />
            <AuthMenu />
        </div>
    );
}

export default Navbar;
