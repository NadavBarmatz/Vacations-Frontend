import "./Navbar.css";
import { useEffect, useState } from "react";
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
