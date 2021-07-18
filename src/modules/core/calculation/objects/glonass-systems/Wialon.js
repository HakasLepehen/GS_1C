import { setCookie, getCookie } from "../../services/cookie";
import Monitoring from "./Monitoring";

export class Wialon extends Monitoring {
  constructor() {
    super();
    this.name = "Виалон";
    this.apiUrl = "https://hst-api.wialon.com";
    this.token = getCookie('w-token') || '';
    // this.initSession();
  }


  async getToken() {
    await this.openAuthWindow()

    // listen message with token from login page window
    window.addEventListener("message", this.tokenReceived);
  }

  async openAuthWindow() {
    // construct login page URL
    var url = "http://hosting.wialon.ru" + "/login.html"; // your site DNS + "/login.html"
    url += "?client_id=" + this.name; // your application name
    url += "&access_type=" + 0x100; // access level, 0x100 = "Online tracking only"
    url += "&activation_time=" + 0; // activation time, 0 = immediately; you can pass any UNIX time value
    url += "&duration=" + 604800; // duration, 604800 = one week in seconds
    url += "&flags=" + 0x1; // options, 0x1 = add username in response

    url += "&redirect_uri=" + "http://hosting.wialon.ru" + "/post_token.html";
    // if login succeed - redirect to this page

    // finally, open login page in new window
    const win = window.open(
      url,
      "_blank",
      "width=760, height=500, top=300, left=500"
    );
    win.resizeBy(500, 300);
  }

  tokenReceived(e) {
    // get message from login window
    const msg = e.data;
    if (typeof msg == "string" && msg.indexOf("access_token=") >= 0) {
      // and save token in instance of object
      const token = msg.replace("access_token=", "");
      this.token = token;
      setCookie('w-token', this.token)
      console.log("w-token: ", this.token);
      window.removeEventListener("message", this.tokenReceived);
    }
  }

  async initSession() {
    let sess = wialon.core.Session.getInstance();
    console.log('Запускаю сессию с url: ', this.apiUrl)
    sess.initSession(this.apiUrl);
    console.log('Запускаю сессию с токеном', this.token);
    sess.loginToken(this.token, '', function(code) {
      if (code) {
        console.log('Не удалось авторизоваться, ошибка: ', wialon.core.Errors.getErrorText(code));  
      } else {
        console.log('Logged successfully');
      }
      let user = sess.getCurrUser().getName();
      console.log('Юзер ', user);
    });

    console.log('Пользователь', sess.getCurrUser());
  }

  async execution() {
    let units
    console.log('Начинаем второй метод');
    let sess = wialon.core.Session.getInstance();
    console.log('session: ', sess);
    const flags = wialon.item.Item.dataFlag.base;
    console.log(flags);
  
    sess.updateDataFlags( // load items to current session
      [{type: "type", data: "avl_unit", flags: flags, mode: 0}], // Items specification
        function (code) { // updateDataFlags callback
            if (code) { console.log(code); return; } // exit if error code
    
                // get loaded 'avl_unit's items  
            units = sess.getItems("avl_unit");

            
            if (!units || !units.length){ 
              console.log("Units not found"); 
              return; 
            } 
            console.log(units);
          }
      );
  }
}