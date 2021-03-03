import axios from "axios";

//Метод авторизации в системе мониторинга
export async function signInInGS(login, password) {
    try {
        const resolve = await axios.get(window.configuration.url + 'auth/login', {
            params: {
                username: login,
                password: password
            }
        });
        if (resolve.data.Error) {
            alert('Вы неправильно ввели логин или пароль');
        } else {
            if (resolve.status === 200) {
                return resolve.data;
            }
        }
    } catch (e) {
        return alert('Что то пошло не так. Обнови страницу, либо пиши разработчику!')
    }
}

export function openWin() {
    let modal = document.querySelector('.modal');
    let sectionContainer = document.querySelector('.section2 .container');
    let overflow = document.createElement('div');

    overflow.className = "overflow";
    sectionContainer.appendChild(overflow);
    modal.style.display = 'flex';
    modal.style.top = '25vh';
    modal.style.animation = 'fall 0.5s 1'

    // overflow.onclick = () => {
    //
    //     modal.style.animation = 'up 1s 1';
    //     setTimeout(() => {
    //         modal.style.top = "-100%";
    //         modal.style.display = 'none';
    //         overflow.remove();
    //     }, 900);
    // }
}

// module.exports =