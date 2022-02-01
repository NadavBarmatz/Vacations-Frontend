class Config{
    public urls = {
        vacations: "",
        images: "",
        register: "",
        login: ""
    }

    public constructor(baseUrl: string){
        this.urls = {
            vacations: baseUrl + "vacations/",
            images: baseUrl + "vacations/images/",
            register: baseUrl + "auth/register",
            login: baseUrl + "auth/login"
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