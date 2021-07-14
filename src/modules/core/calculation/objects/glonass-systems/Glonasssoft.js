import Monitoring from "./Monitoring";
import { closeAuthWindow, displayError } from "../../services/modal-operations";
import { deleteCookie, getCookie, setCookie } from "../../services/cookie";
import axios from "axios";

export class Glonasssoft extends Monitoring {
  constructor() {
    super();
    this.token = getCookie("X-Auth") || "";
    this.name = "Глонасссофт";
    this.addHandlers();
  }

  async getToken() {
    if (!this.token) {
      section2.addEventListener("userReceived", async (e) => {
        return await this.userReceived(e);
      });
    }
    return;
  }

  async userReceived(e) {
    try {
      await this.logIn(e.detail.username, e.detail.password);
      setCookie("X-Auth", this.token);
      section2.removeEventListener("userReceived", this.userReceived);
      closeAuthWindow();
    } catch (e) {
      return displayError(
        e.display ||
          `Что то пошло не так. Обнови страницу, либо пиши разработчику! Сообщение об ошибке: ${e.message}`
      );
    }
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
  async logIn(username, password) {
    const response = await axios.get(window.configuration.url + "auth/login", {
      params: {
        username: username,
        password: password,
      },
    });

    if (response.data.Error) {
      let err = new Error("Вы неправильно ввели логин или пароль");
      err.display = "Вы неправильно ввели логин или пароль";
      throw err;
    }
    this.user = response.data.User;
    this.token = response.data.AuthId;
  }

  async addHandlers() {}
}
