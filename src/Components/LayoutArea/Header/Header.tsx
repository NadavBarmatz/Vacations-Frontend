import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import "./Header.css";
import SearchIcon from '@mui/icons-material/Search';
import DestinationModel from "../../../Models/DestinationModel";
import { SyntheticEvent, useState } from "react";
import autoSearchService from "../../../Services/autoSearchService";
import SearchComponent from "../../SharedArea/SearchComponent/SearchComponent";


function Header(): JSX.Element {

    const [destinations, setDestinations] = useState<DestinationModel[]>([]);

    // async function autoComplete(e: SyntheticEvent) {
    //     const str = (e.target as HTMLInputElement).value;
    //     console.log(str);        
    //     const destinationsSuggestions = await autoSearchService.autoComplete(str);
    //     console.log(destinationsSuggestions);
    //     setDestinations(destinationsSuggestions);
    // }

    return (
        <div className="Header">
			<h1>WHERE YOU WANT TO GO?</h1>
            {/* <TextField variant="standard" className="InputBox" InputProps={{startAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon className="SearchIcon" />
                    </InputAdornment>
                ),disableUnderline: true
            }} onChange={autoComplete} /> */}
            <SearchComponent uniqueID="header_" />
           
        
        </div>
    );
}

export default Header;
