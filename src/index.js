import './styles/styles.scss';
import './modules/bootstrap.js';
import './fonts/Montserrat-Regular.ttf';
import './modules/Session.js'
import './modules/GSconfig';
import {
    signInInGS,
    Session,
    deleteCookies,
    checkTokenFromCookie,
    getTokenFromCookie,
    writeInCookies, openWin
} from "./modules/Session";

// SMOOTH SCROLLING SECTIONS
$('a[href*=#]:not([href=#])').click(function () {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')
        || location.hostname === this.hostname) {

        let target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    }
});



//Получаем массив печенек
// let arr = document.cookie.split(';')
//     .reduce((acc, cur) => {
//         let item = cur.trim();
//         if (item !== '') {
//             acc.push(item);
//         }
//         return acc;
//     }, []);
//
// console.log(arr);

// document.cookie = "_ym_uid=1613548060656796267";

let arr = [
    "_ym_uid=1613548060656796267",
    "_ym_d=1613548060",
    "_ym_isad=2",
    "_ym_visorc=w",
    "AuthId=4fe968c4-9fa4-4bea-a341-70610a1aef01",
    "PasswordLength=11"
];
deleteCookies();

async function init() {
    let token = getTokenFromCookie();

    if (!token) {
        openWin();
        // const session = await signInInGS('supportsonar', '73812639019')
        //     .then(res => {
        //         return res;
        //     });
        console.log('сессия: ', session);
        writeInCookies(`X-Auth=${session.getToken()}`);
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

$('span').click(function () {
    if ($(this).html() === 'Калькулятор объектов') {
        init();
    }
});

// arr.forEach((el, index) => {
//     el = el.split('=');
//     console.log(el instanceof Array);
//     el = Object.fromEntries(el);
// })
// console.log("Получаем массив", arr);


// console.log('Получен массив: ', );





