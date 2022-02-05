class Config{
    public urls = {
        vacations: "",
        destinations: "",
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
            destinations: baseUrl + "destinations/",
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
        super("http://localhost:3001/api/");
    };
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;