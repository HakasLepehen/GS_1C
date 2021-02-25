import './styles/styles.scss';
import './modules/bootstrap.js';
import './fonts/Montserrat-Regular.ttf';
import './modules/authModule.js'
// import axios from "axios";
import './modules/GSconfig';
import {signInInGS, openWin} from "./modules/authModule";

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



async function init () {
    const user = await signInInGS('supportsonar', '73812639019');
    console.log(`полученный пользователь: ${JSON.stringify(user)}`);
    openWin();
}

    init();





