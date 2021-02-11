var express  = require('express');
var router = express.Router();
var Post = require('../models/Post');

//Index
router.get('/', function(req, res){
  Post.find({})
  .sort('-createdAt')
  .exec(function(err, posts){
    //exec함수 앞에 DB에서 데이터 찾기, 정렬하기 등을 함수로 처리하고 exec안의 함수에서 데이터를 받아와서 처리
    if(err) return res.json(err);
    res.render('posts/index', {posts:posts});
  });
});

//New
router.get('/new', function(req, res){
  res.render('posts/new');
});

//create
router.post('/', function(req, res){
  Post.create(req.body, function(err, post){
    if(err) return res.json(err);
    res.redirect('/posts');
  });
});

//show
router.get('/:id', function(req, res){
  Post.findOne({_id:req.params.id}, function(err, post){
    if(err) return res.json(err);
    res.render('posts/show', {post:post});
  });
});

//edit
router.get('/:id/edit', function(req, res){
  Post.findOne({_id:req.params.id}, function(err, post){
    if(err) return res.json(err);
    res.render('posts/edit', {post:post});
  });
});

//update
router.put('/:id', function(req, res){
  req.body.updatedAt = Date.now(); //post 수정시 날짜를 업데이트
  Post.findOneAndUpdate({_id:req.params.id}, req.body, function(err, post){
    if(err) return res.json(err);
    res.redirect("/posts/"+req.params.id);
  });
});

//destroy
router.delete('/:id', function(req, res){
  Post.deleteOne({_id:req.params.id}, function(err){
    if(err) return res.json(err);
    res.redirect('/posts');
  });
});

module.exports = router;
