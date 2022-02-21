import { SyntheticEvent } from 'react';
import axios from 'axios';
import DestinationModel from "../Models/DestinationModel";
import config from '../Utils/Config';
import { destinationStore } from '../Redux/Store';
import { setDestinationId } from '../Redux/destinationState';

class AutoSearchService {

    public async autoComplete(e: SyntheticEvent): Promise<DestinationModel[]> {
        const str = (e.target as HTMLInputElement).value.split(",")[0];
        const response = await axios.get<DestinationModel[]>(config.urls.autoComplete + str);
        const destinations = response.data;
        return destinations;
    }

    public searchVacation(e: SyntheticEvent, destinationState: DestinationModel[]): DestinationModel {
        const target = (e.target as HTMLInputElement).value.toLowerCase().split(",")[0];
        const destination =  destinationState.find( d => d.destinationCity.toLowerCase().includes(target) 
        || d.destinationCountry.toLowerCase().includes(target) );
        
        destinationStore.dispatch(setDestinationId(destination.destinationId));
        
        return destination;
    }

}

const autoSearchService = new AutoSearchService();

export default autoSearchService;