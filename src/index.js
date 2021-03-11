import './styles/styles.scss';
import './modules/vendors/bootstrap.js';
import './fonts/Montserrat-Regular.ttf';
import './modules/vendors/GSconfig';

import {initDealsOnMap} from "./modules/core/dealsOnMap/dealsOnMap";
import {deleteCookies} from "./modules/core/calculation/Session";
import {initCalculator} from "./modules/core/calculation/calculation";

// Плавное переключение по навигации
const a = document.querySelectorAll('a[href*="#"]:not([href="#"])');
a.forEach((el) => {
    el.addEventListener('click', function (e) {

        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')
            || location.hostname === this.hostname) {

            let target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                e.preventDefault();
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 500);
                return false;
            }
        }
    })
})

deleteCookies();

document.querySelectorAll('.nav__counter')
    .forEach(el => el.addEventListener('click', function () {
        if (this.innerHTML === 'Калькулятор объектов') {
            setTimeout(initCalculator, 1000);
        }
        if (this.innerHTML === 'Сделки на карте') {
            setTimeout(initDealsOnMap, 1000);
        }
    }));

// arr.forEach((el, index) => {
//     el = el.split('=');
//     console.log(el instanceof Array);
//     el = Object.fromEntries(el);
// })
// console.log("Получаем массив", arr);


// console.log('Получен массив: ', );





