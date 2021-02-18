import './styles/styles.scss';
import './http_maxcdn.bootstrapcdn.com_bootstrap_3.3.6_js_bootstrap';
import './fonts/Cyntho Next Slab.ttf'
// function component() {
//     const element = document.createElement('h1');
//
//
//     element.innerHTML = 'Здесь будет работать приложение для подсчета активных/деактивированных объектов из Глонасссофта';
//
//     return element;
// }

// document.body.appendChild(component());

// SMOOTH SCROLLING SECTIONS
$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'')
        || location.hostname === this.hostname) {

        let target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    }
});
