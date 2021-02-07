var express = require('express'); // 설치한 express module을 불러와서 변수(express)에 담기
var app = express(); //express를 실행하여 app object를 초기화

// //서버에 get 요청이 있는 경우
// app.get('/', function(req, res) { // '/' 위치에 'get'요청을 받는 경우,
//   res.send('Hello World!'); // "Hello World!"를 보내기
// });

app.set('view engine', 'ejs'); //ejs 사용을 위한 express의 view engine에 ejs를 set
app.use(express.static(__dirname + '/public')); //http 메소드나 루트에 상관없이 요청이 올떄마다 함수실행

app.get('/hello', function(req, res) { //query를 통해 이름 받기 / 모든 query들은 req.query에 저장
  res.render('hello', {name:req.query.nameQuery});
});

app.get('/hello/:nameParam', function(req, res) { //route param을 통해 이름 받기
  res.render('hello', {name:req.params.nameParam}); //ejs 파일 사용은 res.resder함수 사용
});

var port = 2021; // 사용할 포트 번호를 port 변수에 대입

//서버가 실행되는 경우
app.listen(port, function(){ // port변수를 이용하여 2021번 포트에 node.js 서버를 연결
  console.log('Server On! http://localhost:' + port); //서버가 실행되면 콘솔창에 표시될 메세지
});
