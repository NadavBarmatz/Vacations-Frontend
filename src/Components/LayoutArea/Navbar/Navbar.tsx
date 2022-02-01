import Logo from "../../../Assets/Images/Logo/logoWhite.png";
import { NavLink } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from "@mui/material";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Navbar.css";
import { useEffect, useState } from "react";

function Navbar(): JSX.Element {

    const scrolledCss = "Scrolled";

    const [scroll, setScroll] = useState<number>(0);
    
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY);
        });
    }, []);

    return (
        <div className={scroll > (window.innerHeight / 1.3) ? "Navbar Scrolled" : "Navbar"}>
			<div className="Logo">
                <img src={Logo} />
            </div>
            <div className="Links">
                <NavLink to="/booking">BOOK A FLY</NavLink>
                <NavLink to="/deals">DEALS</NavLink>
                <NavLink to="/contact">CONTACT</NavLink>
            </div>
            <div className="Search">
                <TextField variant="standard" className="InputBox" InputProps={{startAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon className="SearchIcon" />
                    </InputAdornment>
                ),disableUnderline: true
                }}/>
            </div>
                <PersonIcon className="AuthIcon" />
                <AuthMenu />
        </div>
    );
}

export default Navbar;