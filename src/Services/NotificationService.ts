import { Notyf } from "notyf";

class NotificationService {

    private notification = new Notyf({duration: 4000, position: {x: "center", y: "center"}, dismissible: true});

    public success(message: string): void {
        this.notification.success(message);
    }

    public error(err: any): void {
        const message = this.getError(err);
        this.notification.error(message);
    }

    private getError(err: any): string {
        
        if(typeof err === "string") return err;

        if(typeof err.response?.data === "string") return err.response.data;

        if(Array.isArray(err.response?.data)) return err.response?.data[0];

        if(typeof err.message === "string") return err.message;

        return "An error has occurred, please try again."
    }

}

const notificationService = new NotificationService();

export default notificationService;