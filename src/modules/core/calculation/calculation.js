import {getTokenFromCookie, openWin, Session, signInInGS, writeInCookies} from "./Session";

export function initCalculator() {


    let token = getTokenFromCookie();

    if (!token) {

        setTimeout(openWin, 1000);
        document.querySelector('.btn-submit').addEventListener('click', async function () {
            let login = document.querySelector('.form-body-login').value.trim();
            let password = document.querySelector('.form-body-password').value.trim();

            console.log('Введенный логин:', login);
            console.log('Введенный пароль:', password);
            // 73812639019
            let session = await signInInGS(login, password);

            console.log('сессия: ', session);

            if (session instanceof Session)
                writeInCookies(`X-Auth=${session.getToken()}`);

            if (session instanceof Error || !session) {
                let errorSelector = document.querySelector('.form-body::after');
                console.log(session);
            }
        })

    } else {
        console.log('Получили токен: ', token);
    }
}