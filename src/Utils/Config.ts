class Config{
    public urls = {
        vacations: "",
        vacationsByDestination: "",
        destinations: "",
        autoComplete: "",
        images: "",
        register: "",
        login: "",
        userLikes: "",
        like: "",
        dislike: "",
        socketServer: ""
    }

    public constructor(baseUrl: string){
        this.urls = {
            vacations: baseUrl + "vacations/",
            vacationsByDestination: baseUrl + "vacations/by-destination/",
            destinations: baseUrl + "destinations/",
            autoComplete: baseUrl + "auto-complete/",
            images: baseUrl + "vacations/images/",
            register: baseUrl + "auth/register/",
            login: baseUrl + "auth/login/",
            userLikes: baseUrl + "likes/user-likes/",
            like: baseUrl + "likes/like/",
            dislike: baseUrl + "likes/dislike/",
            socketServer: "http://localhost:3001"
        };
    };
}

class DevelopmentConfig extends Config{
    public constructor(){
        super("http://localhost:3001/api/");
    };
}

class ProductionConfig extends Config{
    public constructor(){
        super("https://fly-now.herokuapp.com/api/");
    };
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;