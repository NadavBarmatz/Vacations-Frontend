import { userLikesStore, vacationsStore } from './../Redux/Store';
import { Socket, io } from 'socket.io-client';
import VacationModel from '../Models/VacationModel';
import config from '../Utils/Config';
import { addVacationAction, deleteVacationAction, updateVacationAction } from '../Redux/VacationsState';
import LikeModel from '../Models/LikeModel';
import { dislikeAction, getAllUserLikes, likeAction } from '../Redux/UserLikesState';
import likesService from './LikesService';

class SocketIoService {

    private socket: Socket

    public connect(): void {
        this.socket = io(config.urls.socketServer);

        this.socket.on("admin-add-vacation", (vacation: VacationModel) => {
            if(vacationsStore.getState().vacations){
                vacationsStore.dispatch(addVacationAction(vacation));
            }
            console.log("admin added vacation");
            
        });

        this.socket.on("admin-update-vacation", (vacation: VacationModel) => {
            if(vacationsStore.getState().vacations){
                vacationsStore.dispatch(updateVacationAction(vacation));
            }
        });

        this.socket.on("admin-delete-vacation", (id: number) => {
            vacationsStore.dispatch(deleteVacationAction(id));
            console.log("admin deleted vacation");

        });

        this.socket.on("user-like-vacation", async (like: LikeModel) => {
            const userLikes = await likesService.getUserLikes();
            userLikesStore.dispatch(getAllUserLikes(userLikes));
        })

        this.socket.on("user-dislike-vacation", async (like: LikeModel) => {
            const userLikes = await likesService.getUserLikes();
            userLikesStore.dispatch(getAllUserLikes(userLikes));
        })

        this.socket.on("vacation-likes-update", (vacation: VacationModel) => {
            if(vacationsStore.getState().vacations){
                vacationsStore.dispatch(updateVacationAction(vacation));
            }
        });

    }

    public disconnect(): void {
        this.socket.disconnect();
    }
}

const socketIoService = new SocketIoService();

export default socketIoService;