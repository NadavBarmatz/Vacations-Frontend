import "./Header.css";
import DestinationModel from "../../../Models/DestinationModel";
import { useState } from "react";
import SearchComponent from "../../SharedArea/SearchComponent/SearchComponent";


function Header(): JSX.Element {

    return (
        <div className="Header">
            
			<h1>WHERE YOU WANT TO GO?</h1>
        
            <SearchComponent uniqueID="header_" />
        
        </div>
    );
}

export default Header;
