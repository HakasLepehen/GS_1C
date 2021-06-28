import { getCookie } from "../services/cookie";

export class Monitoring {
  constructor() {
    this.name = null;
    this.user = null;
    this.token = null;
    this.agents = [];
    this.vehicles = [];
  }

  isLogged(str) {
    return !!getCookie(str);
  }
}
