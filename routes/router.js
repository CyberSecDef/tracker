var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req,res,next){
	req.app.locals.controllers.main.index(req,res,next);
});

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resources');
});

module.exports = router;