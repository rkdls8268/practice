## socket.io🚀를 활용한 채팅창 만들기

### socket 통신 ?
서버와 클라이언트가 연결을 유지하며 **실시간 양방향 통신**으로 데이터를 주고 받는 방식

클라이언트가 요청을 보내는 경우에만 서버가 응답하는 단방향 통신인 HTTP 통신과는 다름.

### socket.io ?
실시간 양방향 이벤트 기반 통신을 가능하게 하는 모듈

[socket document](https://socket.io/docs/v3/server-api/index.html) 참고



> 설치
```
npm install socket.io
```

> sample code
```
io.on('connection', socket => {
  socket.emit('request', /* … */); // emit an event to the socket
  io.emit('broadcast', /* … */); // emit an event to all connected sockets
  socket.on('reply', () => { /* … */ }); // listen to the event
});
```

> how to use
```
const server = require('http').createServer();
const io = require('socket.io')(server);
io.on('connection', client => {
  client.on('event', data => { /* … */ });
  client.on('disconnect', () => { /* … */ });
});
server.listen(3000);
```

> socket.on(eventName, callback)
* eventName (String)
* callback (Function)
* Returns Socket

on(...) 메소드로 이벤트명을 설정해주고, 콜백함수를 지정한다. 

콜백함수 내의 emit(...) 메소드를 통해 같은 port를 사용하고 있는 곳으로 메시지를 출력한다.

이벤트는 emit('event')으로 전달하면 on('event')으로 받는다.

> .attach()

소켓과 서버 연결


> 소켓 실행 과정
```
const socket = io();
```
소켓을 연결해주고 index.jade 내의 form에서 button을 통해 submit을 하게 되면

```
// index.jade -> submit의 콜백함수 내부
socket.emit('chat-msg-1', msg);
```
위의 코드를 통해서 app.js에 있는
```
// app.js
socket.on('chat-msg-1', (msg) => {
    app.io.emit('chat-msg-2', msg);
  });
```
라는 코드가 실행된다.
그리고 그 내부의 app.io.emit('chat-msg-2')가 index.jade 내부에 있는
```
// index.jade
socket.on('chat-msg-2', (msg) => {
      $('#messages').append($('<li>').text(msg.name + '  :  ' +
      msg.message));
    });
```
을 실행하게 되어 채팅창에 글자가 써지게끔 만들어준다.