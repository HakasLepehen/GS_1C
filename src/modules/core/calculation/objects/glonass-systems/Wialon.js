import Monitoring from "./Monitoring";

export class Wialon extends Monitoring {
    constructor() {
        super();
        this.name = 'Виалон';
        this.hosting = "https://hosting.wialon.ru";
        this.sess = wialon.core.Session.getInstance();
        his.addHandlers()
    }

    async logIn() {
        await getToken();
    }

    async getToken() { // construct login page URL
        var url = hosting + "/login.html"; // your site DNS + "/login.html"
        url += "?client_id=" + this.name; // your application name
        url += "&access_type=" + 0x100; // access level, 0x100 = "Online tracking only"
        url += "&activation_time=" + 0; // activation time, 0 = immediately; you can pass any UNIX time value
        url += "&duration=" + 604800; // duration, 604800 = one week in seconds
        url += "&flags=" + 0x1; // options, 0x1 = add username in response

        url += "&redirect_uri=" + hosting + "/post_token.html";
        // if login succeed - redirect to this page

        // listen message with token from login page window
        window.addEventListener("message", tokenReceived);

        // finally, open login page in new window
        const win = window.open(url, "_blank", "width=760, height=500, top=300, left=500");
        win.resizeBy(500, 300);
    }

    tokenReceived(e) { // get message from login window
        const msg = e.data;
        if (typeof msg == "string" && msg.indexOf("access_token=") >= 0) { // and save token in instance of object
            const token = msg.replace("access_token=", "");
            this.token = token;
            window.removeEventListener("message", tokenReceived);
        }
    }

    addHandlers()
}
