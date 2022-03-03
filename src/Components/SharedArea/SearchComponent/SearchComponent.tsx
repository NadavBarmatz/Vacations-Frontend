import { SyntheticEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DestinationModel from "../../../Models/DestinationModel";
import autoSearchService from "../../../Services/autoSearchService";
import "./SearchComponent.css";
import SearchIcon from '@mui/icons-material/Search';
import notificationService from "../../../Services/NotificationService";

interface SearchComponentProps {
    uniqueID: string;
}

function SearchComponent(props: SearchComponentProps): JSX.Element {

    // Used extract the value from input element when searching:
    const inputRef = useRef<HTMLInputElement>();

    const navigate = useNavigate();

    // Destinations array used inside the datalist element
    const [destinations, setDestinations] = useState<DestinationModel[]>([]);

    const autoComplete = async (e: SyntheticEvent) => {
        try{
            const destinations = await autoSearchService.autoComplete(e);
            setDestinations( destinations );
        }
        catch(err:any){
            notificationService.error(err);
        }
    }

    const searchVacation = async (e: SyntheticEvent) => {
        try{
            // Execute on "Enter" key down or clicking on the search icon:
            if((e as any).keyCode === 13 || e.type === "click"){
                
                // If destinations is empty, meaning there are no matches, throw Error message:
                if(destinations.length === 0) throw new Error("Invalid search, or the required destination is not available.");

                // get the correct destination:
                const destination = autoSearchService.searchVacation(inputRef.current.value, destinations);
                
                // Navigate to vacation list by destination:
                navigate("/vacations/list-by-destination/" + destination.destinationId);
            }
        }
        catch(err: any){
            notificationService.error(err);
        }
    }


    return (
        <div className="SearchComponent">
			 <SearchIcon onClick={searchVacation} />
                <input type="text" list={props.uniqueID} ref={inputRef} onChange={autoComplete} autoComplete="off" onKeyDown={searchVacation} />
                <datalist id={props.uniqueID}>
                    { destinations?.map(d => <option onClick={searchVacation} key={d.destinationId} value={`${d.destinationCity}, ${d.destinationCountry}`} />)}
                </datalist>
        </div>
    );
}

export default SearchComponent;
