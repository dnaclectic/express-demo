var mongoose = require('mongoose');
// var validators = require('mongoose-validators');

var GifSchema = new mongoose.Schema({
  keyword: String,
  url: String,
  description: String
  });


module.exports = mongoose.model('Gif', GifSchema);
