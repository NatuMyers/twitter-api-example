// NodeJS provides the require function, whose job is to load modules and give you access to their exports.

// modules keep scopes local (js classes)
let express = require('express');
let path = require('path');
let index = require('./routes/index');
let tweets = require('./routes/tweets');
let favicon = require('serve-favicon');

let myExpressApp = express();

//// middleware

/// use

myExpressApp.use(favicon(__dirname + '/public/images/favicon.ico'));
myExpressApp.use(express.static(path.join(__dirname, 'public')));
myExpressApp.use('/', index);
myExpressApp.use('/tweets', tweets);

/// set

myExpressApp.set('view engine', 'ejs');
myExpressApp.set('views', path.join(__dirname, 'views'));
module.exports = myExpressApp;

let port = 8000;

myExpressApp.listen(port, function() {
  console.log('Listening on port ' + port + ' please go there in your browser!');
});
