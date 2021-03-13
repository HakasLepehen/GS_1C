import {Session} from "./objects/Session";
import {
    closeAuthWindow,
    openAuthWindow,
    signInInGS,
    writeErrorToUser
} from "./services/Auth";
import {Cookie} from "./objects/Cookie";

export function initCalculator() {
    let token = Cookie.getTokenFromCookies();

    if (!token) {
        setTimeout(openAuthWindow, 1000);
        document.querySelector('.btn-submit').addEventListener('click', async function () {
            let login = document.querySelector('.form-body-login').value.trim();
            let password = document.querySelector('.form-body-password').value.trim();
            // 73812639019
            if (!login || !password) {
                writeErrorToUser('Введите логин или пароль!');
            } else {
                let session = await signInInGS(login, password);

                if (session instanceof Session) {
                    let cookie = new Cookie('X-Auth', session._token);
                    cookie.writeCookie();
                    closeAuthWindow();
                }

                if (session instanceof Error) {
                    writeErrorToUser('Вы неправильно ввели логин или пароль');
                }
            }
        })
    } else {
        console.log('Получили токен: ', token);
    }
}