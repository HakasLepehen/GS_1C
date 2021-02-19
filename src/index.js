import './styles/styles.scss';
import './http_maxcdn.bootstrapcdn.com_bootstrap_3.3.6_js_bootstrap';
import './fonts/Montserrat-Regular.ttf';
import axios from "axios";

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

axios.get()
