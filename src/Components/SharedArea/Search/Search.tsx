import { Component, SyntheticEvent } from "react";
import DestinationModel from "../../../Models/DestinationModel";
import SearchIcon from '@mui/icons-material/Search';
import "./Search.css";
import autoSearchService from "../../../Services/autoSearchService";

interface SearchState {
	destinations: DestinationModel[];
}

interface SearchProps{
    unique: string;
}

class Search extends Component<SearchProps, SearchState> {

    public constructor(props: SearchProps) {
        super(props);
        this.state = {
			destinations: []
        };
    }

    private autoComplete = async (e: SyntheticEvent) => {
        try{
            const str = (e.target as HTMLInputElement).value;
            const destinations = await autoSearchService.autoComplete(str);
            this.setState({ destinations })
            
        }
        catch(err:any){
            alert(err.message)
        }
    }

    private searchVacation = async (e: SyntheticEvent) => {
        if((e as any).code === "Enter"){
            console.log(this.state.destinations)
            console.log( this.state.destinations.find(d => d.destinationCity === (e.target as HTMLInputElement).value.split(",")[0] ))
        }
    }

    public render(): JSX.Element {
        return (
            <div className="Search">

                <SearchIcon />
                <input type="text" list={this.props.unique + "autoComplete"} onChange={this.autoComplete} autoComplete="off" onKeyDown={this.searchVacation} />
                <datalist id={this.props.unique + "autoComplete"}>
                    {this.state?.destinations?.map(d => <option key={d.destinationId} value={`${d.destinationCity}, ${d.destinationCountry}`} />)}
                </datalist>
            
            </div>
        );
    }
}

export default Search;
