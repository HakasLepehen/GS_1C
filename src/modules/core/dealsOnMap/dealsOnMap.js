import axios from "axios";

export async function initDealsOnMap() {
    // let dns = "https://hosting.wialon.com";
    //
    // let url = dns + "/login.html"; // your site DNS + "/login.html"
    // url += "?client_id=" + "App";	// your application name
    // url += "&access_type=" + 0x100;	// access level, 0x100 = "Online tracking only"
    // url += "&activation_time=" + 0;	// activation time, 0 = immediately; you can pass any UNIX time value
    // url += "&duration=" + 604800;	// duration, 604800 = one week in seconds
    // url += "&flags=" + 0x1;			// options, 0x1 = add username in response
    //
    // url += "&redirect_uri=" + dns + "/post_token.html"; // if login succeed - redirect to this page
    //
    // // listen message with token from login page window
    // window.addEventListener("message", listenerMess);
    //
    // // finally, open login page in new window
    // window.open(url, "_blank", "width=760, height=500, top=300, left=500");

    // create Request instance
    var req = new W.Request('https://hst-api.wialon.com');

    // execute 'core/login' request with 'api' method
    req.api(
        'core/login',
        {user: 'wialon_test', password: 'test'},
        function() {
            // callback
        }
    );

    // execute 'core/login' request with 'send' method
    req.send(
        '/wialon/ajax.html?svc=core/login',
        {user: 'wialon_test', password: 'test'},
        function success() {
            // success callback
        },
        function error() {
            // error callback
        }
    );
}

function listenerMess(e) {
    console.log(e);
}


