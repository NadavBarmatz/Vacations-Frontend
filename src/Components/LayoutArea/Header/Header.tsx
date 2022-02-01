import { InputAdornment, TextField } from "@mui/material";
import "./Header.css";
import SearchIcon from '@mui/icons-material/Search';


function Header(): JSX.Element {
    return (
        <div className="Header">
			<h1>WHERE YOU WANT TO GO?</h1>
            <TextField variant="standard" className="InputBox" InputProps={{startAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon className="SearchIcon" />
                    </InputAdornment>
                ),disableUnderline: true
                }}/>
        </div>
    );
}

export default Header;
