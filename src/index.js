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

//Запускаем необходимое приложение в зависимости от нажатого элемента меню.
const navBar = document.getElementById('navbar-example');
navBar.addEventListener('click', function (e) {
    console.log(e.target.innerHTML);

    switch (e.target.innerHTML) {
        case 'Калькулятор объектов':
            console.log('Запущено приложение калькулятор');
            initCalculator();
            break;
        case 'Сделки на карте':
            initDealsOnMap();
            break;
    }
})