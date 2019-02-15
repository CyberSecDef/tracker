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

/* GET packages listing. */
router.get('/packages', function(req, res, next) {
  req.app.locals.controllers.packages.index(req,res,next);
});

router.post('/packages', function(req, res, next) {
  req.app.locals.controllers.packages.add(req,res,next);
});

router.delete('/packages', function(req, res, next) {
  req.app.locals.controllers.packages.delete(req,res,next);
});

module.exports = router;