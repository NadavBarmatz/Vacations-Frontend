import "./MobileNavbar.css";
import Logo from "../../../../Assets/Images/Logo/logoWhite.png";
import BurgerClosed from '@mui/icons-material/MenuRounded';
import BurgerOpen from '@mui/icons-material/MenuOpenRounded';
import { useEffect, useState } from "react";
import Navlinks from "../Navlinks/Navlinks";
import { NavLink } from "react-router-dom";
import { mobileBurgerStore } from "../../../../Redux/Store";
import { changeMenuState } from "../../../../Redux/MobileBurgerState";

function MobileNavbar(): JSX.Element {

    const [openMenu, setOpenMenu] = useState<boolean>(mobileBurgerStore.getState().openMenu)

    useEffect(() => {
        // Listen to changes coming from pressing the links:
        const unSub = mobileBurgerStore.subscribe(() => {
            setOpenMenu(mobileBurgerStore.getState().openMenu)
        })

        return () => {unSub();}

    }, [])

    const handleBurger = () => {
        setOpenMenu(!openMenu);
        mobileBurgerStore.dispatch(changeMenuState(openMenu))
    }

    return (
        <div className="MobileNavbar">
            <div className="Logo">
                <NavLink to="/home">
                    <img src={Logo} />
                </NavLink>
            </div>
            {openMenu && <Navlinks />}
            {openMenu ? <BurgerOpen className="Hamburger" onClick={handleBurger} /> : <BurgerClosed className="Hamburger" onClick={handleBurger} /> }
        </div>
    );
}

export default MobileNavbar;
