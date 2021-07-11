import Monitoring from "./Monitoring";
import axios from "axios";

export class Glonasssoft extends Monitoring {
  constructor() {
    super();
    this.name = "Глонасссофт";
    this.addHandlers();
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

  async addHandlers() {}
}
