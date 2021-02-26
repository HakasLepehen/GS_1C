import axios from "axios";

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
    let section2 = document.querySelector('.section2');
    let overflow = document.createElement('div');

    overflow.className = "overflow";
    section2.appendChild(overflow);
    modal.style.display = 'flex';
    modal.style.top = '25vh';
    modal.style.animation = 'fall 0.5s 1'
    // var height = modal.offsetHeight;
    // modal.style.marginTop = height / 2 + 'px';
    // overflow.onclick = () => {
    //     modal.style.top = "-100%";
    //     modal.style.display = 'none';
    //     overflow.remove();
    // }
}

// module.exports =