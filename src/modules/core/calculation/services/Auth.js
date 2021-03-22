import axios from "axios";
import {Session} from "../objects/Session";

//Метод авторизации в системе мониторинга
export async function signInInGS(login, password) {
    try {
        const resolve = await axios.get(window.configuration.url + 'auth/login', {
            params: {
                username: login,
                password: password
            }
        });

        console.log(resolve.data.Error)

        if (resolve.data.Error) {
            return resolve.data;
        }
            return resolve.data

    } catch (e) {
        return new Error('Что то пошло не так. Обнови страницу, либо пиши разработчику!')
    }
}

export function displayError(str) {
    document.querySelector('.form-body span').innerHTML = str;
    document.querySelector('.form-body-login').value = null;
    document.querySelector('.form-body-password').value = null;

    setTimeout(() => {
        document.querySelector('.form-body span').innerHTML = null;
    }, 5000)
}

export function openAuthWindow() {
    let modal = document.querySelector('.modal');

    modal.style.display = 'flex';
    modal.style.top = '25vh';
    modal.style.animation = 'fall 0.5s 1';
}

export function closeAuthWindow() {
    let modal = document.querySelector('.modal');

    modal.style.animation = 'up 0.5s 1';
    setTimeout(() => {
        modal.style.top = '-100vh';
        modal.style.display = 'none';
    }, 400)
}