var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  title:{type:String, required:true},
  body:{type:String, required:true},
  createdAt:{type:Date, default:Date.now}, //함수명을 넣으면 리턴값이 기본값
  updatedAt:{type:Date}
});

var Post = mongoose.model('post', postSchema);
module.exports = Post;
