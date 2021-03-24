import axios from 'axios';
import {deleteCookie, getCookie, setCookie} from '../services/cookie';
import {closeAuthWindow, displayError, signInInGS} from "../services/Auth";

export class Calculator {

    get isLogged() {
        if (getCookie('X-Auth')) return true;

        return false;
    }

    constructor() {
        this.user = null;
        this.token = getCookie('X-Auth') || null;

        this.addHandlers();
    }

    init() {

        if (!this.isLogged) {
            setTimeout(() => {
                return openAuthWindow();
            }, 1000);
        }

        this.loadAgents();

    }

    async loadAgents() {

        let agents;

        try {

            agents = await this.getAgents();

        } catch (e) {

            if (e.code === 401) {
                return openAuthWindow()
            }

            return console.error('Unexpected error', e);

        }

        console.log(agents);
        //ничего

    }

    async getAgents() {

        try {

            return await axios.get(window.configuration.url + 'agents', {
                headers: {
                    'X-Auth': this.token
                }
            });

        } catch (e) {

            if (e.response.status === 401) {
                deleteCookie('X-Auth');
                e.code = 401;
                throw e;
            }
        }

    }

    addHandlers() {

        document.querySelector('.btn-submit').addEventListener('click', async () => {

            const login = document.querySelector('.form-body-login').value.trim();
            const password = document.querySelector('.form-body-password').value.trim();

            if (!login || !password) return displayError('Введите логин и пароль!');

            try {
                let data = await signInInGS(login, password);

                if (data.Error) {
                    return displayError('Вы неправильно ввели логин или пароль');
                }

                this.user = data.User;
                this.token = data.AuthId;

                setCookie('X-Auth', data.AuthId);
                closeAuthWindow();
                await this.init();

                return data.AuthId;
            } catch (e) {
                displayError('Что то пошло не так. Обнови страницу, либо пиши разработчику!');
                console.error(e.message);
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