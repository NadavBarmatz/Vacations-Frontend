import { vacationsStore } from './../Redux/Store';
import { Socket, io } from 'socket.io-client';
import VacationModel from '../Models/VacationModel';
import config from '../Utils/Config';
import { addVacationAction, deleteVacationAction, updateVacationAction } from '../Redux/VacationsState';

class SocketIoService {

    private socket: Socket

    public connect(): void {
        this.socket = io(config.urls.socketServer);

        this.socket.on("admin-add-vacation", (vacation: VacationModel) => {
            vacationsStore.dispatch(addVacationAction(vacation));
        });

        this.socket.on("admin-update-vacation", (vacation: VacationModel) => {
            vacationsStore.dispatch(updateVacationAction(vacation));
        });

        this.socket.on("admin-delete-vacation", (id: number) => {
            vacationsStore.dispatch(deleteVacationAction(id));
        });


    }

    public disconnect(): void {
        this.socket.disconnect();
    }
}

const socketIoService = new SocketIoService();

export default socketIoService;