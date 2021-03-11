import axios from "axios";

export class Session {
    constructor(token, login) {
        this.token = token;
        this.login = login;
    }

    getToken() {
        return this.token;
    }
    getLogin() {
        return this.login;
    }
}

//Метод авторизации в системе мониторинга
export async function signInInGS(login, password) {
    try {
        const resolve = await axios.get(window.configuration.url + 'auth/login', {
            params: {
                username: login,
                password: password
            }
        });
        if (resolve.data.Error) {
            alert('Вы неправильно ввели логин или пароль');
        } else {
            if (resolve.status === 200) {
                return new Session(resolve.data.AuthId, resolve.data.User);
            }
        }
    } catch (e) {
        return alert('Что то пошло не так. Обнови страницу, либо пиши разработчику!')
    }
}

export function deleteCookies() {
    let cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

export function getTokenFromCookie() {
    let cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        if (cookies[i].includes('X-Auth=')) {
            let pos = cookies[i].indexOf('=');
            return cookies[i].substring(pos + 1, cookies[i].length).trim();
        }
    }
}

export function writeInCookies(str) {
    document.cookie = str;
}

export function openWin() {
    let modal = document.querySelector('.modal');
    let sectionContainer = document.querySelector('.section2 .container');
    let overflow = document.createElement('div');

    overflow.className = "overflow";
    sectionContainer.appendChild(overflow);
    modal.style.display = 'flex';
    modal.style.top = '25vh';
    modal.style.animation = 'fall 0.5s 1'

    // overflow.onclick = () => {
    //
    //     modal.style.animation = 'up 1s 1';
    //     setTimeout(() => {
    //         modal.style.top = "-100%";
    //         modal.style.display = 'none';
    //         overflow.remove();
    //     }, 900);
    // }
}

// module.exports =