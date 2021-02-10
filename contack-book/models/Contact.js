var mongoose = require('moongoose');

var contactSchema = mongoose.Schema({
  name:{type:String, require:true, unique:true}, //require 필수입력, unique 중복불가
  email:{type:String},
  phone:{type:String}
});

var Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;
