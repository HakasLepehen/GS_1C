import './styles/styles.scss';
import './modules/libs/bootstrap.js';
import './fonts/Montserrat-Regular.ttf';
import './modules/libs/GSconfig';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {initDealsOnMap} from "./modules/core/dealsOnMap/dealsOnMap";
import {initCalculation} from "./modules/core/calculation/Сalculation";


pdfMake.vfs = pdfFonts.pdfMake.vfs;


// Плавное переключение по навигации
const a = document.querySelectorAll('a[href*="#"]:not([href="#"])');
a.forEach((el) => {
    el.addEventListener('click', function (e) {

        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')
            || location.hostname === this.hostname) {

            let section = $(this.hash);
            console.log('Hash: ', this.hash.slice(1));
            section = section.length ? section : $('[name=' + this.hash.slice(1) + ']');
            if (section.length) {
                e.preventDefault();
                window.scrollTo({
                    top: section.offset().top,
                    behavior: 'smooth'
                })
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

document
      .querySelector(".refresh")
      .addEventListener("click", function(e) {
        initCalculation();
      })

