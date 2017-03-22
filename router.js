var fs = require('fs');

function route(pathname, responce) {

    if(pathname === '/') {
        responce.writeHead(200, {"Content-Type": "text/html; charset=utf8"});
        fs.createReadStream('index.html').pipe(responce);
    }

    if (pathname === "/hello") {
        responce.writeHead(200, {"Content-Type": "text/html; charset=utf8"});
        responce.write('hello Vovanium!');
        responce.end();
    }
}

exports.route = route;