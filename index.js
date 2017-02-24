var express = require('express');
var bodyParser = require('body-parser');
var uriUtil = require('mongodb-uri');
var morgan = require('morgan');
// var gifs = [{
//     keyword: 'funny cat',
//     url: 'https://wallpaperscraft.com/image/cat_lie_lounge_beach_funny_52306_2560x1024.jpg',
//     description: "A funny cat on the beach."
// },
// {
//     keyword: 'bear',
//     url: 'http://i.imgur.com/fMLh7Sz.jpg?fb',
//     description: "A bear in the bitterroot that is very friendly."
// },
// ]

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost/gif';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);
var options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};
mongoose.connect(mongooseUri, options);
var Gif = require('./models/gif');
// var todoRoutes = require('./routes/todos');


var app = express();

app.use(bodyParser.json())
app.use(morgan('dev'));

app.use(function(req, res, next){
    req.veryImportantInformation = 'Super crucial to the request';
    next();
})

app.get('/v1/gifs/search', function(req, res){
    var query = req.query.q;
    Gif.find({keyword: query}, function(err, foundGifs){
      if(err) {
        next(err);
      } else {
        res.json(foundGifs);
      }
    })
})

// app.get('/v1/gifs/all', function(req, res){
//     // var query = req.query.q;
//     res.json(gifs);
//     });




app.post('/v1/gifs', function(req, res){
  var aGif = new Gif();
  aGif.keyword = req.body.gif.keyword;
  aGif.url = req.body.gif.url;
  aGif.description = req.body.gif.description;
  aGif.save(function(err, aGif){
   if(err){
      res.send(err)
    } else {
      res.json(aGif)
    }
  })
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req, res){
  Gif.find(function(err, foundGifs){
    console.log(err)
    if(err) {
      next(err);
    } else {
      res.render('index', {gifs: foundGifs});
    }
  })
});

var port = process.env.PORT || 3000;

app.listen(port, function(req, res){
  console.log('listening on this port: ' + port);
});
