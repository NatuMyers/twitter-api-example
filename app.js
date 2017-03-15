var express = require('express');
var path = require('path');
var index = require('./routes/index');
var tweets = require('./routes/tweets');
var app = express();
var favicon = require('serve-favicon');

// favicon
app.use(favicon(__dirname + '/public/images/favicon.ico'));

// serve static assets from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// look for view html in the views directory
app.set('views', path.join(__dirname, 'views'));

// use ejs to render
app.set('view engine', 'ejs');

// setup routes
app.use('/', index);
app.use('/tweets', tweets);


module.exports = app;

var port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log('Listening on ' + port + '!!!!!!!!!!!');
});
