import { getCookie } from "../services/cookie";

export class Monitoring {
    constructor(name, cookieKey) {
        this.name = name;
        this.user = null;
        this.token = getCookie(cookieKey) || null;
        this.agents = [];
        this.vehicles = [];
    }

    get isLogged(str) {
        return !!getCookie(str);
    }

    get user() {
        return this._user;
    }

    //returns array of agents
    get agents() {
        return this._agents;
    }

    //getting agents from the system and adding to the this instance
    set agents() {}

    get vehicles() {
        return this._vehicles;
    }

    set vehicles(arr) {
        this.vehicles = arr;
    }
}