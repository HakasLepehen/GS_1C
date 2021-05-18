import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "../services/cookie";
import {
  closeAuthWindow,
  displayError,
  openAuthWindow,
  signInInGS,
} from "../services/Auth";
import { Agent } from "./Agent";
import { getAgentsArray, sortVehicles } from "../services/Object-operations";
import { Vehicle } from "./Vehicle";

export class Calculator {
  get isLogged() {
    return !!getCookie("X-Auth");
  }

  constructor() {
    this.user = null;
    this.token = getCookie("X-Auth") || null;
    this.addHandlers();
  }

  async init() {
    if (!this.isLogged) {
      setTimeout(() => {
        return openAuthWindow();
      }, 1000);
    }

    let agents = await this.loadData();
    agents.forEach((agent) => {
      agent.sort();
      console.log(agent);
    });
  }

  calculateData() {}

  async loadAgents() {
    let agents, processedAgents;

    try {
      agents = await this.getAgents();
    } catch (e) {
      if (e.code === 401) {
        return openAuthWindow();
      }

      return console.error("Unexpected error", e);
    }

    agents = agents.data.filter((agent) => agent.agentInfoType === 0);

    return (processedAgents = getAgentsArray(agents));
  }

  async getAgents() {
    try {
      return await axios.get(window.configuration.url + "agents", {
        headers: {
          "X-Auth": this.token,
        },
      });
    } catch (e) {
      if (e.response.status === 401) {
        deleteCookie("X-Auth");
        e.code = 401;
        throw e;
      }
    }
  }

  async getObjects() {
    try {
      return await axios.get(window.configuration.url + "vehicles", {
        headers: {
          "X-Auth": this.token,
        },
      });
    } catch (e) {
      if (e.response.status === 401) {
        deleteCookie("X-Auth");
        e.code = 401;
        throw e;
      }
    }
  }

  async loadData() {
    let clients = await this.loadAgents();

    let vehicles = await this.loadVehicles();

    return (clients = sortVehicles(clients, vehicles));
  }

  async loadVehicles() {
    let vehicles, processedVehicles;
    try {
      vehicles = await this.getObjects();
    } catch (error) {
      if (error.code === 401) return openAuthWindow();
    }

    vehicles = Array.from(vehicles.data);

    return (processedVehicles = vehicles.map((el) => {
      return new Vehicle(
        el.vehicleId,
        el.number.trim(),
        el.owner.trim(),
        el.info.status,
        el.info.statusChangeDate
      );
    }));
  }

  addHandlers() {
    document
      .querySelector(".btn-submit")
      .addEventListener("click", async () => {
        const login = document.querySelector(".form-body-login").value.trim();
        const password = document
          .querySelector(".form-body-password")
          .value.trim();

        if (!login || !password) return displayError("Введите логин и пароль!");

        try {
          let data = await signInInGS(login, password);

          if (data.Error) {
            return displayError("Вы неправильно ввели логин или пароль");
          }

          this.user = data.User;
          this.token = data.AuthId;

          setCookie("X-Auth", data.AuthId);
          closeAuthWindow();
          await this.init();

          return data.AuthId;
        } catch (e) {
          displayError(
            "Что то пошло не так. Обнови страницу, либо пиши разработчику!"
          );
          console.error(e.message);
        }
      });
  }
}
