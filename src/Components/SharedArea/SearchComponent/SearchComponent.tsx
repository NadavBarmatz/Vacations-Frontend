import { createRef, SyntheticEvent, useState } from "react";
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


    const navigate = useNavigate();

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
            // execute on "Enter" key down:
            if((e as any).keyCode === 13){
                // if destinations is empty, throw Error message:
                if(destinations.length === 0) throw new Error("Invalid search, or the required destination is not available.");

                const destination = autoSearchService.searchVacation(e, destinations)
                navigate("/vacations/list-by-destination/" + destination.destinationId)
            }
        }
        catch(err: any){
            notificationService.error(err);
        }
    }


    return (
        <div className="SearchComponent">
			 <SearchIcon />
                <input type="text" list={props.uniqueID} onChange={autoComplete} autoComplete="off" onKeyDown={searchVacation} />
                <datalist id={props.uniqueID}>
                    { destinations?.map(d => <option key={d.destinationId} value={`${d.destinationCity}, ${d.destinationCountry}`} />)}
                </datalist>
        </div>
    );
}

export default SearchComponent;
