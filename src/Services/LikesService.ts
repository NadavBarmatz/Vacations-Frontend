import axios from "axios";
import LikeModel from "../Models/LikeModel";
import { userLikesStore } from "../Redux/Store";
import { getAllUserLikes } from "../Redux/UserLikesState";
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

    public async getUserLikes(): Promise<LikeModel[]> {
        const response = await axios.get<LikeModel[]>(config.urls.userLikes);
        const userLikes = response.data;
        return userLikes;
    }


}

const likesService = new LikesService();

export default likesService;