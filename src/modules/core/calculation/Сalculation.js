import {Session} from "./objects/Session";
// import {Cookie} from "./objects/cookie";
import {
    closeAuthWindow,
    openAuthWindow,
    signInInGS,
    displayError
} from "./services/Auth";
import {getAgents} from "./services/Agent-operations";

export function initCalculator() {
    let token = Cookie.getTokenFromCookies();
    let agents = null;

    if (!token) {
        setTimeout(openAuthWindow, 1000);
        document.querySelector('.btn-submit').addEventListener('click', async function () {
            let login = document.querySelector('.form-body-login').value.trim();
            let password = document.querySelector('.form-body-password').value.trim();
            // 73812639019
            if (!login || !password) {
                displayError('Введите логин или пароль!');
            } else {
                let session = await signInInGS(login, password);

                if (session instanceof Session) {
                    let cookie = new Cookie('X-Auth', session._token);
                    cookie.writeCookie();
                    closeAuthWindow();
                }

                if (session instanceof Error) {
                    displayError('Вы неправильно ввели логин или пароль');
                }
            }
        })
    }
    (async function () {
        agents = await getAgents(token)
            .then(res => {
                return res
            });
        console.log('Агенты перед таймаутом', agents)
    })();
}