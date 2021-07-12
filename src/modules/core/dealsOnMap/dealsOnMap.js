const hosting = "https://hosting.wialon.ru";
const app = "Calculator-wialon";

export function initDealsOnMap() {
  async function getToken() {
    // construct login page URL
    var url = hosting + "/login.html"; // your site DNS + "/login.html"
    url += "?client_id=" + app; // your application name
    url += "&access_type=" + 0x100; // access level, 0x100 = "Online tracking only"
    url += "&activation_time=" + 0; // activation time, 0 = immediately; you can pass any UNIX time value
    url += "&duration=" + 604800; // duration, 604800 = one week in seconds
    url += "&flags=" + 0x1; // options, 0x1 = add username in response

    url += "&redirect_uri=" + hosting + "/post_token.html"; // if login succeed - redirect to this page

    // listen message with token from login page window
    window.addEventListener("message", tokenReceived);

    // finally, open login page in new window
    const win = window.open(
      url,
      "_blank",
      "width=760, height=500, top=300, left=500"
    );
    win.resizeBy(500, 300);
  }

  function tokenReceived(e) {
    // get message from login window
    const msg = e.data;
    if (typeof msg == "string" && msg.indexOf("access_token=") >= 0) {
      // get token
      const token = msg.replace("access_token=", "");
      // now we can use token, e.g writing him in the cookie
      document.cookie = `w-token=${token}`;

      // remove "message" event listener
      window.removeEventListener("message", tokenReceived);
    }
  }

  // getToken()

  // const hosting = "https://hosting.wialon.ru";
  // const app = "Calculator-wialon";

  // const sess = wialon.core.Session.getInstance();

  // //AUTH INTO WIALON

  // async function getToken() {
  //   // construct login page URL
  //   var url = hosting + "/login.html"; // your site DNS + "/login.html"
  //   url += "?client_id=" + app; // your application name
  //   url += "&access_type=" + 0x100; // access level, 0x100 = "Online tracking only"
  //   url += "&activation_time=" + 0; // activation time, 0 = immediately; you can pass any UNIX time value
  //   url += "&duration=" + 604800; // duration, 604800 = one week in seconds
  //   url += "&flags=" + 0x1; // options, 0x1 = add username in response

  //   url += "&redirect_uri=" + hosting + "/post_token.html"; // if login succeed - redirect to this page

  //   // listen message with token from login page window
  //   window.addEventListener("message", tokenReceived);

  //   // finally, open login page in new window
  //   const win = window.open(
  //     url,
  //     "_blank",
  //     "width=760, height=500, top=300, left=500"
  //   );
  //   win.resizeBy(500, 300);
  // }

  // function tokenReceived(e) {
  //   // get message from login window
  //   const msg = e.data;
  //   if (typeof msg == "string" && msg.indexOf("access_token=") >= 0) {
  //     // get token
  //     const token = msg.replace("access_token=", "");
  //     // now we can use token, e.g writing him in the cookie
  //     document.cookie = `w-token=${token}`;

  //     // remove "message" event listener
  //     window.removeEventListener("message", tokenReceived);
  //   }
  // }

  // function auth(token) {
  //   // let token;
  //   // const user = sess.getCurrUser();
  //   // if(user) {
  //   //     msg(`Вы уже авторизованы под пользователем ${user.getName()}`)
  //   // }
  //   // token = getCookie('w-token');
  //   // if (!token) {
  //   //     getToken()
  //   //     console.log(`Производим попытку авторизации с токеном ${token}`)
  //   //     sess.initSession(hosting);
  //   //     sess.loginToken(token)
  //   // }
  // }

  // //проверка наличия токена в системе
  // function checkToken() {
  //   sess.initSession(hosting);
  // }

  // function getCookie(name) {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) return parts.pop().split(";").shift();
  // }

  // function msg(str) {
  //   document.getElementById("token").innerHTML = str;
  // }

  // async function init() {
  //     let user;
  //   let token = getCookie("w-token");
  //   console.log(`Производим авторизацию с токеном ${token}`);
  //   if (!token) {
  //     console.log(`Токен отсутствует, требуется авторизация`);

  //     await getToken();
  //     return;
  //   }
  //   sess.initSession("https://hst-api.wialon.com");

  //   sess.loginToken(token, "", function (code) {
  //     if (code) return;
  //     user = sess.getCurrUser().getName();

  //     console.log(`Пользователь ${user}`)
  //     execution();
  //   });
  // }

  // function execution() { // Execute after login succeed
  //   let units;
  //   let groups;
  //     console.log('Получаем данные по авто')
  // 	// flags to specify what kind of data should be returned
  // 	var flags = wialon.item.Item.dataFlag.base;
  //     console.log('Флаги', flags)
  //     sess.updateDataFlags( // load items to current session

  // 	[{type: "type", data: "", flags: flags, mode: 0}], // Items specification "avl_unit_group" для получения групп объектов
  // 		function (code) { // updateDataFlags callback
  //     		if (code) { console.log(wialon.core.Errors.getErrorText(code)); return; } // exit if error code

  //         console.log('Code', code)
  //             // get loaded 'avl_unit's items
  // 	    	units = sess.getItems('avl_unit');
  //     		if (!units || !units.length){ alert("Units not found"); return; } // check if units found

  // 		    // units.forEach(el => {
  //         //   console.log(el);
  //         //   console.log(el.getCustomProps())
  //         // });
  //         console.log(units );
  //         // console.log(units[0].$$user_name);
  //             // bind action to select change event

  // 	    }
  // 	);

  //   const token = sess.getToken()

  //   console.log(token);
  //   // sess.updateDataFlags( // load items to current session
  //   //   [{type: "type", data: "avl_unit_group", flags: flags, mode: 0}], // Items specification "avl_unit_group" для получения групп объектов
  //   //     function (code) { // updateDataFlags callback
  //   //         if (code) { console.log(wialon.core.Errors.getErrorText(code)); return; } // exit if error code

  //   //         console.log('Code', code)
  //   //             // get loaded 'avl_unit's items
  //   //         groups = sess.getItems("avl_unit_group");
  //   //         if (!groups || !groups.length){ alert("Units not found"); return; } // check if units found

  //   //         console.log(groups)
  //   //         // console.log(units[0].$$user_name);
  //   //             // bind action to select change event

  //   //       }
  //   //   );

  //         // sess.item.Item.getCustomProps()
  // }
  // init();
  // // console.log(getCookie('X-Auth'));
  // // getToken();
}
