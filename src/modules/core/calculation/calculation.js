import {getTokenFromCookie, openWin} from "./Session";

export function initCalculator() {


    let token = getTokenFromCookie();

    if (!token) {
        setTimeout(openWin, 1000);
        $('.btn-submit').click(function () {
            alert($('.form-body-login').value)
        })

        // const session = await signInInGS('supportsonar', '73812639019')
        //     .then(res => {
        //         return res;
        //     });
        // console.log('сессия: ', session);
        // writeInCookies(`X-Auth=${session.getToken()}`);
    } else {
        console.log('Получили токен: ', token);
    }
    // const session = await signInInGS('supportsonar', '73812639019');
    // console.log(`полученная сессия: ${JSON.stringify(session)}`);
    // if (session.getToken()) {
    //     alert('Вы авторизованы!');
    // } else {
    //     alert('Вы не авторизованы');
    // }

    // let token = getTokenFromCookie();
    // if (!token) {
    //
    // }
    // let ar1 = document.querySelectorAll('li');
}