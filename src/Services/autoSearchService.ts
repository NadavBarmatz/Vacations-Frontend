import axios from 'axios';
import DestinationModel from "../Models/DestinationModel";
import config from '../Utils/Config';

class AutoSearchService {

    public async autoComplete(str: string): Promise<DestinationModel[]> {
        const response = await axios.get<DestinationModel[]>(config.urls.autoComplete + str);
        const destinations = response.data;
        return destinations;
    }

}

const autoSearchService = new AutoSearchService();

export default autoSearchService;