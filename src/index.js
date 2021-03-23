import './styles/styles.scss';
import './modules/vendors/bootstrap.js';
import './fonts/Montserrat-Regular.ttf';
import './modules/vendors/GSconfig';
import {initDealsOnMap} from "./modules/core/dealsOnMap/dealsOnMap";
// import {Calculator} from "./modules/core/calculation/objects/Calculator";
import {initCalculation} from "./modules/core/calculation/Сalculation";

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

//Запускаем необходимое приложение в зависимости от нажатого элемента меню.
const navBar = document.getElementById('navbar-example');
navBar.addEventListener('click', function (e) {

    switch (e.target.innerHTML) {
        case 'Калькулятор объектов':
            initCalculation();
            break;
        case 'Сделки на карте':
            initDealsOnMap();
            break;
    }
})