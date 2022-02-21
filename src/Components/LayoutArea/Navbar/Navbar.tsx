import { NavLink } from "react-router-dom";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Navbar.css";
import { useEffect, useState } from "react";
import SearchComponent from "../../SharedArea/SearchComponent/SearchComponent";
import Navlinks from "./Navlinks/Navlinks";
import RegularNavbar from "./RegularNavbar/RegularNavbar";
import MobileNavbar from "./MobileNavbar/MobileNavbar";

function Navbar(): JSX.Element {

    const [scroll, setScroll] = useState<number>(0);
    
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY);
        });
    }, []);

    return (
        <div className={scroll > (window.innerHeight / 2) ? "Navbar Scrolled" : "Navbar"}>
            <RegularNavbar />
            <MobileNavbar />
        </div>
    );
}

export default Navbar;
