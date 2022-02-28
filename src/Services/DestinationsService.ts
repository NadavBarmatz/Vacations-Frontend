import { destinationStore } from './../Redux/Store';
import axios from 'axios';
import DestinationModel from "../Models/DestinationModel";
import config from '../Utils/Config';

class DestinationsService {

    public async getAllDestinations(): Promise<DestinationModel[]> {
        const response = await axios.get<DestinationModel[]>(config.urls.destinations);
        const destinations = response.data;
        return destinations;
    }

    public async getOneDestination(destinationId: number): Promise<DestinationModel> {
        const response = await axios.get<DestinationModel>(config.urls.destinations + destinationId);
        const destination = response.data;
        return destination;
    }

    public async addDestination(destination: DestinationModel): Promise<DestinationModel> {
        const response = await axios.post<DestinationModel>(config.urls.destinations, destination);
        const newDestination = response.data;
        return newDestination;
    }

}

const destinationsService = new DestinationsService();

export default destinationsService;