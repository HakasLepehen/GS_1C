export class Cookie{
    constructor(key, value) {
        this._key = key;
        this._value = value;
    }

    get key() {
        return this._key;
    }

    set key(key) {
        this._key = key;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    writeCookie() {
        document.cookie = `${this._key}=${this._value}`;
    }

    static getTokenFromCookies() {
        let cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i++) {
            if (cookies[i].includes('X-Auth=')) {
                let pos = cookies[i].indexOf('=');
                return cookies[i].substring(pos + 1, cookies[i].length).trim();
            }
        }
    }

    static clearCookies() {
        let cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            let eqPos = cookie.indexOf("=");
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }
}