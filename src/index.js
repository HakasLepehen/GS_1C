import './styles/styles.scss';
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

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    }
});
