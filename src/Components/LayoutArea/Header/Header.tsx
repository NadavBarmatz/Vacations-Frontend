import "./Header.css";
import SearchComponent from "../../SharedArea/SearchComponent/SearchComponent";


function Header(): JSX.Element {

    return (
        <div className="Header">
            
			<h1>WHERE DO YOU WANT TO GO?</h1>
        
            <SearchComponent uniqueID="header_" />
        
        </div>
    );
}

export default Header;
