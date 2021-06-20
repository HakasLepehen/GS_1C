import { getCookie } from "../services/cookie";

class Monitoring {
    constructor(name) {
        this.name = name;
        this.user = null;
        this.token = null;
        this.agents = [];
        this.vehicles = [];
    }

   get isLogged(str) {
        return !!getCookie(str);
    }
}