import axios from 'axios';
import {deleteCookie, getCookie, setCookie} from './../services/cookie';
import {displayError, signInInGS} from "../services/Auth";

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

        // this.loadAgents();

    }

    async loadAgents() {

        let agents;

        try {
            // agents = await this.getAgents();
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

            const {data: agents} = await axios.get(window.configuration.url + 'agents', {
                headers: {
                    'X-Auth': this.token
                }
            });

            return agents;

        } catch (e) {

            if (e.response.status === 401) deleteCookie('X-Auth');

            console.error(e);
            alert('Не удалось выгрузить данные по клиентам - обратитесь к разработчику')

        }

    }

    // async signIn(login, password) {
    //
    //     try {
    //
    //         const {data} = await axios.get(window.configuration.url + 'auth/login', {
    //             params: {
    //                 username: login,
    //                 password: password
    //             }
    //         });
    //
    //         if (data.Error) {
    //             let err = new Error(data.Error);
    //             displayError('Вы неправильно ввели логин или пароль'); // это сообщение для юзера
    //             throw err;
    //         }
    //
    //         this.user = data.User; // мб пригодится
    //         this.token = data.AuthId;
    //
    //         closeAuthWindow();
    //
    //         setCookie('X-Auth', data.AuthId);
    //
    //         this.init();
    //
    //         return data.AuthId;
    //
    //     } catch (e) {
    //         // let err = new Error(e);
    //         // err.display = e.display || 'Что то пошло не так. Обнови страницу, либо пиши разработчику!'; // это сообщение для юзера
    //         // throw err;
    //
    //         displayError('Что то пошло не так. Обнови страницу, либо пиши разработчику!');
    //     }
    //
    // }

    addHandlers() {

        document.querySelector('.btn-submit').addEventListener('click', async () => {

            const login = document.querySelector('.form-body-login').value.trim();
            const password = document.querySelector('.form-body-password').value.trim();

            if (!login || !password) return displayError('Введите логин и пароль!');

            try {
                let data = await signInInGS(login, password);

                console.log('Хорошие данные', data);

                if (data.Error) {
                    return displayError('Вы неправильно ввели логин или пароль');
                }

                this.user = data.User;
                this.token = data.AuthId;

                setCookie('X-Auth', data.AuthId);
                closeAuthWindow();
                this.init();

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

function closeAuthWindow() {
    const modal = document.querySelector('.modal');

    modal.style.animation = 'up 0.5s 1';

    setTimeout(() => {
        modal.style.top = '-100vh';
        modal.style.display = 'none';
    }, 400);
}


