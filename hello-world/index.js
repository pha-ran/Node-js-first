var express = require('express'); // 설치한 express module을 불러와서 변수(express)에 담기
var app = express(); //express를 실행하여 app object를 초기화

//서버에 get 요청이 있는 경우
app.get('/', function(req, res) { // '/' 위치에 'get'요청을 받는 경우,
  res.send('Hello World!'); // "Hello World!"를 보내기
});

var port = 2021; // 사용할 포트 번호를 port 변수에 대입

//서버가 실행되는 경우
app.listen(port, function(){ // port변수를 이용하여 2021번 포트에 node.js 서버를 연결
  console.log('Server On! http://localhost:'+port); //서버가 실행되면 콘솔창에 표시될 메세지
});
