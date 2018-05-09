const http = require('http');
const fs = require('fs');

function loadHTML(){
	const theHTMLtoGet = fs.readFileSync('./Tic-Tac-Toe/ttt.html');
	return theHTMLtoGet;
}
function loadCss(){
	const CssToGet = fs.readFileSync('./Tic-Tac-Toe/ttt.css');
	return CssToGet;
}
function loadJS(){
	const JSToGet = fs.readFileSync('./Tic-Tac-Toe/ttt.js');
	return JSToGet;
}

const server = http.createServer((req, res)=>{
	if(req.url === '/'){
		res.writeHead(200,{'content-type': 'text/html'});
			res.end(loadHTML());
	}else if(req.url === '/ttt.css'){
		res.writeHead(200, {'content-type' : 'text/css'});
		res.end(loadCss());
	}else if(req.url === '/ttt.js'){
		res.writeHead(200, {'content-type': 'application/javascript'});
		res.end(loadJS());
	}else if(req.url === '/tttimage.png'){
		res.writeHead(200, {'content-type':'image/x-icon'});
		const img = fs.readFileSync('./Tic-Tac-Toe/tttimage.png');
		res.end(img);
	}else if(req.url === '/offlimits'){
		res.writeHead(403, {'content-type': 'text/html'});
		res.write('<h1>You are not allowed to view this page.</h1>');
		res.end();
	}else if(req.url === '/apiKey='){
		res.writeHead(400, {'content-type': 'text/html'});
		res.write('<h1>Missing correct API Key</h1>')
		res.end();
	}else{
		res.writeHead(404, {'content-type': 'text/html'});
		res.write('<h1>Requested page not found!</h1>');
		res.end();
	}
});

server.listen(8080);
console.log(`Server is listening on port 8080...`)