import './styles/styles.scss';
import './modules/bootstrap.js';
import './fonts/Montserrat-Regular.ttf';
import './modules/authModule.js'
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

document.cookie = [
    "_ym_uid=1613548060656796267"
];

let arr = [
    "_ym_uid=1613548060656796267",
    "_ym_d=1613548060",
    "_ym_isad=2",
    "_ym_visorc=w",
    "AuthId=4fe968c4-9fa4-4bea-a341-70610a1aef01",
    "PasswordLength=11"
];

async function init () {
    // const user = await signInInGS('supportsonar', '73812639019');
    // console.log(`полученный пользователь: ${JSON.stringify(user)}`);
    // openWin();
    let obj = {

    }

    function Cook(key, val) {
        this.key = key;
        this.val = val;
    }

    arr.forEach((el, index) => {
        el = el.split('=');
        let rel = new Cook(el[0], el[1]);
        arr.push(el[index]);
        console.log(rel)
    })
    console.log("Получаем массив", arr);

    // console.log('Получен массив: ', );
}

    init();





