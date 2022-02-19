import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import DestinationModel from "../../../Models/DestinationModel";
import autoSearchService from "../../../Services/autoSearchService";
import "./SearchComponent.css";
import SearchIcon from '@mui/icons-material/Search';
import { destinationStore } from "../../../Redux/Store";
import { setDestinationId } from "../../../Redux/destinationState";
import notificationService from "../../../Services/NotificationService";

interface SearchComponentProps {
    uniqueID: string;
}

function SearchComponent(props: SearchComponentProps): JSX.Element {

    const navigate = useNavigate();

    const [destinations, setDestinations] = useState<DestinationModel[]>([]);

    const autoComplete = async (e: SyntheticEvent) => {
        try{
            const str = (e.target as HTMLInputElement).value.split(",")[0];
            const destinations = await autoSearchService.autoComplete(str);
            setDestinations( destinations );
            
        }
        catch(err:any){
            notificationService.error(err);
        }
    }

    const searchVacation = async (e: SyntheticEvent) => {
        try{
            if((e as any).code === "Enter"){
                const target = (e.target as HTMLInputElement).value.toLowerCase().split(",")[0];
                const destination =  destinations.find( d => d.destinationCity.toLowerCase().includes(target) 
                || d.destinationCountry.toLowerCase().includes(target) );
                
                destinationStore.dispatch(setDestinationId(destination.destinationId));
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
                <input type="text" list={props.uniqueID + "_autoComplete"} onChange={autoComplete} autoComplete="off" onKeyDown={searchVacation} />
                <datalist id={props.uniqueID + "_autoComplete"}>
                    { destinations?.map(d => <option key={d.destinationId} value={`${d.destinationCity}, ${d.destinationCountry}`} />)}
                </datalist>
        </div>
    );
}

export default SearchComponent;
