import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "../services/cookie";
import {
  closeAuthWindow,
  displayError,
  openAuthWindow,
  signInInGS,
} from "../services/Auth";
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
      return;
    }

    let wrapper = document.querySelector(".work-data");

    wrapper.innerHTML = null;

    let agents = await this.loadData();
    agents.forEach((agent) => {
      agent.countVehicles();
      agent.render();
    });

    this.renderDetails(agents);
  }

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

  async getVehicles() {
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
      vehicles = await this.getVehicles();
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
        el.info.statusChangeDate,
        el.created
      );
    }));
  }

  renderDetails(arr) {
    const workData = document.querySelector(".work-data");

    workData.addEventListener("click", (e) => {
      let vehiclesForRender;

      const createElement = (_class, tag = "div") => {
        const el = document.createElement(tag);
        el.className = _class;

        return el;
      };
      
      const vehicleInfo = createElement('vehicle-info');
      const infoTitle = createElement('info-title');
      const listWrapper = createElement('list-wrapper');
      const listLabel = createElement('list-label');
      const ol = createElement('ol', 'vehicle-list');
      workData.appendChild(vehicleInfo);
      
      console.log(vehicleInfo);

      // let vehicleInfo = document.querySelector(".vehicle-info");

      // vehicleInfo.getElementsByClassName.display = 'none';
      // vehicleInfo.appendChild(document.createElement("div")).className =
      //   "info-title";
      // vehicleInfo.appendChild(document.createElement("div")).className =
      //   "list-wrapper";
      // vehicleInfo.appendChild(document.createElement("a")).className =
      //   "vehicle-info-close";
      // vehicleInfo
      //   .querySelector(".vehicle-info-close")
      //   .setAttribute("role", "button");

      // let listWrapper = document.querySelector(".list-wrapper");
      // listWrapper.appendChild(document.createElement("div")).className =
      //   "list-label";
      // listWrapper.appendChild(document.createElement("ol")).className =
      //   "vehicle-list";

      // let listLabel = document.querySelector(".list-label");
      // let vehicleList = document.querySelector(".vehicle-list");

      // vehicleInfo.style.display == "none"
      //   ? (vehicleInfo.style.display = "flex")
      //   : (vehicleInfo.style.display = "none");

      if (e.target.parentNode.className === "client-data-buttons") {
        const dataBtns = e.target.parentNode;
        const clientData = dataBtns.parentNode;
        const agent = arr.find((el) => el.id === clientData.id);
        console.log(agent);

        // vehicleInfo.style.display = 'flex';

        vehiclesForRender = function () {
          // document.querySelector(".info-title").innerText = agent.brand;

          if (e.target.className === "active-objects") {
            // listLabel.innerText = "Активные";
            return agent.vehicles.filter((el) => el.status === 1);
          }
          if (e.target.className === "inactive-objects") {
            // listLabel.innerText = "Приостановленные";
            return agent.vehicles.filter((el) => el.status === 13);
          }
        };

        // vehiclesForRender().forEach((el) => {
        //   const newLi = document.createElement("li");
        //   vehicleList.appendChild(newLi).innerText = el.objName;
        // });

        // console.log(vehiclesForRender());
      }
      // console.log(e.target.parentNode.className === "client-data-buttons");
    });
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
