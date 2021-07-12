import Monitoring from "./Monitoring";
import axios from "axios";

export class Glonasssoft extends Monitoring {
  constructor() {
    super();
    this.name = "Глонасссофт";
    this.addHandlers();
  }

  async getToken() {
    section2.addEventListener("userReceived", this.userReceived);
  }

  async userReceived(e) {
    this.user = e.detail;

    try {
      await this.glonasssoft.logIn(this.user.username, this.user.password);
      setCookie("X-Auth", this.glonasssoft.token);
      await this.init();
    } catch (e) {
      return displayError(
        e.display ||
          `Что то пошло не так. Обнови страницу, либо пиши разработчику! Сообщение об ошибке: ${e.message}`
      );
    }
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

  //void, authorization in Glonasssoft system and initialize data in Glonasssoft instance
  async logIn(username, password) {
      const response = await axios.get(
        window.configuration.url + "auth/login",
        {
          params: {
            username: username,
            password: password,
          },
        }
      );

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
