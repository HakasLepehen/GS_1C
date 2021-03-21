import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from './../utils/cookie';
import { resError } from './../utils/request-error';

export class Calculator {

  get isLogged() {
    // логики можно добавить
    if (getCookie('X-Auth')) return true;

    return false;
  }

  constructor() {
    this.user = null; this.token = getCookie('X-Auth') || null;

    this.addHandlers();
  }

  // эта функция выполняется при каждом открытии раздела "Калькулятор объектов"
  async init() {

    if (this.isLogged) {
      console.log('Я уже залогинен');
    } else {
      return openAuthWindow();
    }

    let agents;
    
    try {
      agents = await this.getAgents();
    } catch (e) {
      if (e?.code === 401) {
        // запрос вернул статус 401 и очистил куки. Перезапускаем init()
        console.log('Токен не валиден, запрашиваю повторную авторизацию');
        return this.init();
      }

      // тут ошибка не из-за того, что юзер не авторизован
      return console.error('Unexpected error', e);
    }

    console.log('Получил агентов', agents);

  }

  async getAgents() {

    try {

      const { data: agents } = await axios.get(window.configuration.url + 'agents', {
        headers: {
          'X-Auth': this.token
        }
      });

      return agents;

    } catch (e) {

      if (e.response.status === 401) deleteCookie('X-Auth');

      throw resError(e);

    }
    
  }

  async signIn(login, password) {

    try {

      const { data } = await axios.get(window.configuration.url + 'auth/login', {
        params: {
          username: login,
          password: password
        }
      });
      debugger;

      if (data.Error) {
        let err = new Error(data.Error);
        err.display = 'Вы неправильно ввели логин или пароль'; // это сообщение для юзера
        throw err;
      }

      this.user = data.User; // мб пригодится

      closeAuthWindow();

      return setCookie('X-Auth', data.AuthId);

    } catch (e) {
      let err = new Error(e);
      err.display = e.display || 'Что то пошло не так. Обнови страницу, либо пиши разработчику!'; // это сообщение для юзера
      throw err;
    }

  }

  addHandlers() {

    document.querySelector('.btn-submit').addEventListener('click', async () => {

      const login = document.querySelector('.form-body-login').value.trim();
      const password = document.querySelector('.form-body-password').value.trim();

      if (!login || !password) return showError('Введите логин и пароль!');

      try {
        await this.signIn(login, password);
      } catch (e) {
        return showError(e.display || 'Непредвиденная ошибка');
      }

    });

  }

}

function openAuthWindow() {
  const modal = document.querySelector('.modal');

  modal.style.display = 'flex';
  modal.style.top = '25vh';
  modal.style.animation = 'fall 0.5s 1';
}

function closeAuthWindow() {
  const modal = document.querySelector('.modal');

  modal.style.animation = 'up 0.5s 1';

  setTimeout(() => {
    modal.style.top = '-100vh';
    modal.style.display = 'none';
  }, 400);
}

function showError(error) {
  document.querySelector('.form-body span').innerHTML = error;
  document.querySelector('.form-body-login').value = null;
  document.querySelector('.form-body-password').value = null;

  setTimeout(() => {
    document.querySelector('.form-body span').innerHTML = null;
  }, 5000)
}
