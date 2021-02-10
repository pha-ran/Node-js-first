var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
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
app.use(methodOverride('_method')); //method의 query값으로 HTTP method를 변경

var contactSchema = mongoose.Schema({
  name:{type:String, require:true, unique:true}, //require 필수입력, unique 중복불가
  email:{type:String},
  phone:{type:String}
});

var Contact = mongoose.model('contact', contactSchema);

//Routes
app.get('/', function(req, res){
  res.redirect('/contacts');
});

//Index
app.get('/contacts', function(req, res){
  Contact.find({}, function(err, contacts){
    if(err) return res.json(err);
    res.render('contacts/index', {contacts:contacts});
                      //위치, 오브젝트{key:"DB 오브젝트"}
  });
});

//new
app.get('/contacts/new', function(req, res){
  res.render('contacts/new');
});

//create
app.post('/contacts', function(req, res){
  Contact.create(req.body, function(err, contact){
    if(err) return res.json(err);
    res.redirect('/contacts');
  });
});

//show
app.get('/contacts/:id', function(req, res){
  Contact.findOne({_id:req.params.id}, req.body, function(err, contact){
    if(err) return res.json(err);
    res.render('contacts/show', {contacts:contacts});
  });
});

//edit
app.get('/contacts/:id/edit', function(req, res){
  Contact.findOne({_id:req.params.id}, function(err, contact){
    if(err) return res.json(err);
    res.render('contacts/edit', {contacts:contacts});
  });
});

//update
app.put('/contacts/:id', function(req, res){
  Contact.findOneAndUpdate({_id:req.params.id}, req.body, function(err, contact){
    if(err) return res.json(err);
    res.redirect('/contacts/'+req.params.id);
  });
});

//destroy
app.delete('/contacts/:id', function(req, res){
  Contact.deleteOne({_id:req.params.id}, req.body, function(err, contact){
    if(err) return res.json(err);
    res.redirect('/contacts/'+req.params.id);
  });
});

var port = 2021;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});
