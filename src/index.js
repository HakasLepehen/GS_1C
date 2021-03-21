import './styles/styles.scss';
import './modules/vendors/bootstrap.js';
import './fonts/Montserrat-Regular.ttf';
import './modules/vendors/GSconfig';
import { initDealsOnMap } from "./modules/core/dealsOnMap/dealsOnMap";
import { initCalculator } from "./modules/core/calculation/Сalculation";
import { Calculator } from './classes';

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


setTimeout(() => {
    const activeApp = document.querySelector('nav li.active')?.dataset?.page;

    if (activeApp) initApp(activeApp);
}, 500);


//Запускаем необходимое приложение в зависимости от нажатого элемента меню.
document.querySelectorAll('li[role="presentation"]').forEach(li => {
    li.addEventListener('click', initApp.bind(null, li.dataset.page))
})

function initApp(iApp) {
    console.log(iApp);
    if (!window.apps) window.apps = {};

    switch (iApp) {
        case 'calc':
            if (!window.apps.calculator) window.apps.calculator = new Calculator();
            const app = window.apps.calculator;
            app.init();
            break;
        case 'map':
            initDealsOnMap();
            break;
    }
}

