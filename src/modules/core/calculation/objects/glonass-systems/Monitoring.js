import { getCookie } from "../../services/cookie";

export default class Monitoring {
  constructor() {
    this.name = null;
    this.user = null;
    this.token = null;
    this.agents = [];
    this.vehicles = [];
  }

  isLogged() {
    return !!this.token;
  }
}
