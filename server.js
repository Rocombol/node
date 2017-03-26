	var http = require('http'),
		fs = require('fs');

	function otherRequest(uri) {
		var res = true;

		if (uri.indexOf('.') > -1) {
			res = false;
		}

		return res;
	}

	function handleFiles(request, response) {
		console.log('Got request for ' + request.url);
		response.writeHead(200, {});
		fs.readFile(request.url.replace('\/', ''), function (err, file) {
			if (err) {
					response.writeHead(500,{});
					response.write(error + "\n");
					response.end();				
			} else {
				response.write(file.toString(), function () {
					response.end();
				});
			}
		});
	}

	function route(request, response) {
		var handlers = {
			'/fluffy': timeHandler,
			'/json': json
		};

	function timeHandler() {
			response.writeHead(200, {
				"Content-Type": "text/html"
			});
			response.write(getTime());
			response.end();
	}

	function json() {
			fs.readFile("/js/SoftServe/Homeworks/ajax/students.json", function (error, file) {
				if (error) {
					response.writeHead(500, {
						"Content-Type": "application/json"
					});
					response.write(error + "\n");
					response.end();
				} else {
					response.writeHead(200, {
						"Content-Type": "application/json"
					});
					response.write(file);
					response.end();
				}
			});
		}

		if (handlers[request.url]) {
			handlers[request.url]();
		}
	}

	function getTime() {
		var currentdate = new Date();
		var datetime = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
		return datetime;
	}

	http.createServer(function (request, response) {
		if (!otherRequest(request.url)) {
			handleFiles(request, response);
		} else {
			route(request, response);
		}
	}).listen(3000);
