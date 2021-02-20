import './styles/styles.scss';
import './bootstrap.js';
import './fonts/Montserrat-Regular.ttf';
import axios from "axios";
import './GSconfig';

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

async function signInInGS(login, password) {
    try {
        const resolve = await axios.get(window.configuration.url + 'auth/login', {
            params: {
                username: login,
                password: password
            }
        });
        if (resolve.data.Error) {
            alert('вы неправильно ввели логин или пароль');
        } else {
            if (resolve.status === 200) {
                return resolve.data;
            }
        }
    } catch (e) {
        return alert('Что то пошло не так. Обнови страницу, либо пиши разработчику!')
    }
}

async function init () {
    const user = await signInInGS('supportsonar', '73812639019');
    console.log(`полученный пользователь: ${JSON.stringify(user)}`);
}

init();



// axios.get(window.configuration.url + 'auth/login', {
//     params: {
//         username: 'supportsonar',
//         password: '73812639019'
//     }
// })
//     .then(res => {
//             if (res.data.AuthId) {
//                 document.cookie = `X-Auth = ${res.data.AuthId}`
//             } else {
//                 console.error(res.data.Error)
//             }
//         }
//     )
//     .catch(err => console.log(err))

