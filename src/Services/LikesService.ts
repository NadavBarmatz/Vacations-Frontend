import axios from "axios";
import LikeModel from "../Models/LikeModel";
import { userLikesStore } from "../Redux/Store";
import { getAllUserLikes } from "../Redux/UserLikesState";
import config from "../Utils/Config";
import authService from "./AuthService";

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

    public async makeSureUserLikesIsInRedux(): Promise<void> {
        if(authService.isLoggedIn()) {
            // Get user likes array from redux:
                let userLikesArr = userLikesStore.getState().userLikes;
    
                // If redux's user likes array is undefined and store to redux:
                if(!userLikesArr){
                    (async() => {
                        userLikesArr = await this.getUserLikes();
                        userLikesStore.dispatch(getAllUserLikes(userLikesArr))
                    })();
                }
        }
    }

}

const likesService = new LikesService();

export default likesService;