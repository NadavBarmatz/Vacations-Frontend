import { NavLink } from "react-router-dom";
import { changeMenuState } from "../../../../Redux/MobileBurgerState";
import { mobileBurgerStore } from "../../../../Redux/Store";
import AuthMenu from "../../../AuthArea/AuthMenu/AuthMenu";
import SearchComponent from "../../../SharedArea/SearchComponent/SearchComponent";
import "./Navlinks.css";

function Navlinks(): JSX.Element {

    const handleClick = () => {
        mobileBurgerStore.dispatch(changeMenuState(false));
    }

    return (
        <div className="Navlinks">
			<div className="Links">
                <NavLink onClick={handleClick} to="/home">Home</NavLink>
                <NavLink onClick={handleClick} to="/deals">DEALS</NavLink>
                <NavLink onClick={handleClick} to="/contact">CONTACT</NavLink>
            </div>
            <div className="LeftNavSide">
                <SearchComponent uniqueID="nav_" />
                <AuthMenu />
            </div>
        </div>
    );
}

export default Navlinks;
