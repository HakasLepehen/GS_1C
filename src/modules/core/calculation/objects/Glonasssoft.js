import { Monitoring } from "./Monitoring";

export class Glonasssoft extends Monitoring {
  constructor() {
    super();
    this.name = 'Глонасссофт';
    this.addHandlers();
  }

  async logIn(username, password) {
    try {
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
        return response.data;
      }
      return response.data;
    } catch (e) {
      return new Error(
        "Что то пошло не так. Обнови страницу, либо пиши разработчику!"
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

  async addHandlers() {
    section2.addEventListener("userReceived", (e) => {
      this.user = e.detail;
      console.log(this.user);
    });
  }
}
