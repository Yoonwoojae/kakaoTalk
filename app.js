const express = require('express');
const socket = require('socket.io');
const http = require('http');
const fs = require('fs');
const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use('/html', express.static('./html'));
app.use('/css', express.static('./css'));
app.use('/js', express.static('./js'));
app.use('/images', express.static('./images'));

app.get('/', (request, response) => {
    fs.readFile('./html/index.html', (err, data) => {
        if (err) {
            response.send('error');
        } else {
            response.writeHead(200, {'Content-Type':'text/html'});
            response.write(data);
            response.end();
        }
    })
})

io.sockets.on('connection', (socket) => {
    console.log('유저 접속 됨');

    socket.on('send', (data) => {
        console.log('전달된 메시지:', data.msg)
    })

    socket.on('disconnect', () => {
        console.log('접속종료')
    })
})

server.listen(8088, () => {
    console.log('서버 실행 중...');
})