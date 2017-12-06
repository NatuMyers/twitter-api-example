let express = require('express');
let expressRouter = express.Router();

/* GET home page. */
expressRouter.get('/', function(req, res) {
  res.render('index', { title: 'Twitter API Example' });
});

module.exports = expressRouter;
