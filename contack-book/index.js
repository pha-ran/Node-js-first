var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

//DB 설정
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;

//한번만 실행
db.once('open', function(){
  console.log('DB connected');
});

db.on('error', function(err){
  console.log('DB ERROR : ', err);
});

app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var contactSchema = mongoose.Schema({
  name:{type:String, require:true, unique:true}, //require 필수입력, unique 중복불가
  email:{type:String},
  phone:{type:String}
});

var Contact = mongoose.model('contact', contactSchema);

app.get('/', function(req, res){
  res.redirect('/contacts');
});

app.get('/contacts', function(req, res){
  Contact.find({}, function(err, contacts){
    if(err) return res.json(err);
    res.render('contacts/index', {contacts:contacts});
  });
});

app.get('/contacts/new', function(req, res){
  res.render('contacts/new');
});

app.post('/contacts', function(req, res){
  Contact.create(req.body, function(err, contact){
    if(err) return res.json(err);
    res.redirect('/contacts');
  });
});

var port = 2021;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});
