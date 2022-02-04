import axios from "axios";
import LikeModel from "../Models/LikeModel";
import config from "../Utils/Config";

class LikesService {

    public async likeVacation(id: number): Promise<LikeModel> {
        const response = await axios.post<LikeModel>(config.urls.like + id);
        const data = response.data;
        return data;
    }

    public async dislikeVacation(id: number): Promise<void> {
        await axios.delete(config.urls.dislike + id);
    }

}

const likesService = new LikesService();

export default likesService;