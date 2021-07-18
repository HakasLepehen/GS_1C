import Monitoring from "./Monitoring";
import { closeAuthWindow, displayError, openAuthWindow } from "../../services/modal-operations";
import { deleteCookie, getCookie, setCookie } from "../../services/cookie";
import axios from "axios";

export class Glonasssoft extends Monitoring {
  constructor() {
    super();
    this.token = getCookie("X-Auth") || "";
    this.name = "Глонасссофт";
    this.addHandlers();
  }

  async getUser() {
    return new Promise(res => {

      function receiveUser(e) {
        section2.removeEventListener("userReceived", receiveUser);
        return res(e.detail);
      }
      section2.addEventListener('userReceived', receiveUser);
    })
  }

  async getAgents() {
    try {
      console.log("Получаю данные по клиентам ГС с токеном: ", this.token);
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

  //void, authorization in Glonasssoft system and initialize data in Glonasssoft instance
  async logIn() {
    const user = await this.getUser();

    const response = await axios.get(window.configuration.url + "auth/login", {
      params: {
        username: user.username,
        password: user.password,
      },
    });

    if (response.data.Error) {
      let err = new Error("Вы неправильно ввели логин или пароль");
      err.display = "Вы неправильно ввели логин или пароль";
      throw err;
    }
    let modal = document.querySelector(".modal");

  
    if(modal.style.display == "flex") {
      closeAuthWindow();
    }
    this.user = response.data.User;
    this.token = response.data.AuthId;
    setCookie('X-Auth', this.token);
  }

  async addHandlers() {}
}
