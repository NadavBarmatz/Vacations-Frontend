import axios from "axios";
import VacationModel from "../Models/VacationModel";
import config from "../Utils/Config";

class VacationsService {

    public async getAllVacations(): Promise<VacationModel[]> {        
        const response = await axios.get<VacationModel[]>(config.urls.vacations);
        const vacations = response.data;
        return vacations;    
    }

    public async getAllVacationsByDestinationId(id: number): Promise<VacationModel[]> {        
        const response = await axios.get<VacationModel[]>(config.urls.vacationsByDestination + id);
        const vacations = response.data;
        return vacations;    
    }

    public async getOneVacation(id: number): Promise<VacationModel> {
        const response = await axios.get<VacationModel>(config.urls.vacations + id);
        const vacation = response.data;
        return vacation;
    }

    public async addVacation(vacation: VacationModel): Promise<VacationModel> {
        const myFormData = new FormData();
        myFormData.append("destinationId", vacation.destinationId.toString());
        myFormData.append("description", vacation.description);
        myFormData.append("start", vacation.start);
        myFormData.append("end", vacation.end);
        myFormData.append("price", vacation.price.toString());
        myFormData.append("image", vacation.image.item(0));
        const response = await axios.post(config.urls.vacations, myFormData);
        const addedVacation = response.data;
        return addedVacation;
    }

    public async fullUpdateVacation(vacation: VacationModel): Promise<VacationModel> {
        const myFormData = new FormData();
        myFormData.append("destinationId", vacation.destinationId.toString());
        myFormData.append("description", vacation.description);
        myFormData.append("start", vacation.start);
        myFormData.append("end", vacation.end);
        myFormData.append("price", vacation.price.toString());
        myFormData.append("image", vacation.image.item(0));
        const response = await axios.put(config.urls.vacations + vacation.vacationId, myFormData);
        const updatedVacation = response.data;
        return updatedVacation;
    }

    public async deleteVacation(id: number): Promise<string> {
        const response = await axios.delete(config.urls.vacations + id);
        return response.statusText;
    }

}

const vacationsService = new VacationsService();

export default vacationsService;