import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "../services/cookie";
import { closeAuthWindow, displayError, openAuthWindow } from "../services/modal-operations";
import {
  getAgentsArray,
  sortVehicles,
  createPDF,
} from "../services/Object-operations";
import { Vehicle } from "./glonass-elements/Vehicle";
import { Glonasssoft } from "./glonass-systems/Glonasssoft";
import { Wialon } from "./glonass-systems/Wialon";
import wialon from "wialon";

export class Calculator {
  constructor() {
    this.user = {};
    this.glonasssoft = new Glonasssoft();
    this.wialon = new Wialon();
    this.addHandlers();
  }

  // async init() {
  // if (!this.isLogged) {
  //     setTimeout(() => {
  //       return openAuthWindow();
  //     }, 1000);
  //     return;
  // }

  // let wrapper = document.querySelector(".work-data");

  // wrapper.innerHTML = null;

  // let agents = await this.loadData();
  // agents.forEach((agent) => {
  //     agent.countVehicles();
  //     agent.render();
  // });

  // this.sendDataToCreatePdf(agents);
  // this.renderDetails(agents);
  // }

  async init() {
    document.querySelector(".work-data").innerHTML = null;

    await this.globalSignIn();

    let agents = await this.loadAgents();

    agents.forEach(agent => {
      agent.countVehicles();
      agent.render();
    });
  }

  sendDataToCreatePdf(arr) {
    console.log("Масcив клиентов для распечатки", arr);
    document.addEventListener("createPdf", (e) => {
      e.preventDefault();
      console.log("Передается массив на распечатку", arr);
      createPDF(arr);
    });
  }

  // login in all systems of monitoring and writing tokens into a cookies
  async globalSignIn() {
    if (!this.glonasssoft.isLogged("X-Auth")) {
      try {
        setTimeout(openAuthWindow, 1000);
        await this.glonasssoft.logIn();
      } catch (e) {
        displayError(
          e.display ||
            `Что то пошло не так. Обнови страницу, либо пиши разработчику! Сообщение об ошибке: ${e.message}`
        );
        await this.glonasssoft.logIn();
      }
      closeAuthWindow();
    }

    if (!this.wialon.isLogged("w-token")) {
      console.log("Авторизуюсь в виалон");
      await this.wialon.logIn();
    }
    await this.wialon.initSession();
  }

  async loadAgents() {
    let agents, processedAgents;

    try {
      agents = await this.glonasssoft.getAgents();
    } catch (e) {
      if (e.code === 401) {
        console.log(
          "нет авторизации в глонассофте ",
          this.glonasssoft.isLogged()
        );
        openAuthWindow();
        await this.globalSignIn();
      }

      return console.error("Unexpected error", e);
    }

    agents = agents.data.filter((agent) => agent.agentInfoType === 0);

    return (processedAgents = getAgentsArray(agents));
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

      if (!workData.contains(workData.querySelector(".vehicle-info"))) {
        const vehicleInfo = createElement("vehicle-info");
        const infoTitle = createElement("info-title");
        const listWrapper = createElement("list-wrapper");
        const listLabel = createElement("list-label");
        const ol = createElement("vehicle-list", "ol");
        const a = createElement("vehicle-info-close", "a");

        workData.appendChild(vehicleInfo);
        vehicleInfo.appendChild(infoTitle);
        vehicleInfo.appendChild(listWrapper);
        vehicleInfo.appendChild(a);
        a.style.role = "button";
        listWrapper.appendChild(listLabel);
        listWrapper.appendChild(ol);

        console.log(vehicleInfo);

        if (e.target.parentNode.className === "client-data-buttons") {
          const dataBtns = e.target.parentNode;
          const clientData = dataBtns.parentNode;
          const agent = arr.find((el) => el.id === clientData.id);
          console.log(agent);

          vehicleInfo.style.display = "flex";
          vehicleInfo.style.height =
            section2.querySelector(".work-wrapper").clientHeight - 140 + "px";
          vehicleInfo.style.width =
            section2.querySelector(".client-data-buttons").clientWidth +
            40 +
            "px";

          vehiclesForRender = function () {
            const listLabel = workData.querySelector(".list-label");
            workData.querySelector(".info-title").innerText = agent.brand;

            if (e.target.className === "active-objects") {
              listLabel.innerText = "Активные";
              return agent.vehicles.filter((el) => el.status === 1);
            }
            if (e.target.className === "inactive-objects") {
              listLabel.innerText = "Приостановленные";
              return agent.vehicles.filter((el) => el.status === 13);
            }
          };

          let vehicleList = vehicleInfo.querySelector(".vehicle-list");

          vehiclesForRender().forEach((el) => {
            const newLi = document.createElement("li");
            vehicleList.appendChild(newLi).innerText = el.objName;
          });

          console.log(vehiclesForRender());
        }

        workData.addEventListener("click", (e) => {
          if (e.target.className === "vehicle-info-close") {
            console.log(e.target.parentNode);
            vehicleInfo.remove();
          }
        });
      }

      return;
    });
  }

  addHandlers() {
    const submitBtn = section2.querySelector(".btn-submit");

    submitBtn.addEventListener("click", async () => {
      const username = document.querySelector(".form-body-login").value.trim();
      const password = document
        .querySelector(".form-body-password")
        .value.trim();

      if (!username || !password)
        return displayError("Введите логин и пароль!");

      const event = new CustomEvent("userReceived", {
        detail: {
          username: username,
          password: password,
        },
      });

      section2.dispatchEvent(event);
    });

    section2.querySelector(".to-pdf").addEventListener("click", () => {
      const createPDF = new Event("createPdf", { bubbles: true });
      section2.dispatchEvent(createPDF);
    });
  }
}
