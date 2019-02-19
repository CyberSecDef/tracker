var express = require('express');
var router = express.Router();

const multer = require('multer');

const storage = multer.memoryStorage();
    const upload = multer({ 
    storage: storage
});



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
router.get('/packages/:packageId', function(req, res, next) {
  req.app.locals.controllers.packages.show(req,res,next);
});


router.post('/packages', function(req, res, next) {
  req.app.locals.controllers.packages.add(req,res,next);
});

router.delete('/packages/:packageId', function(req, res, next) {
  req.app.locals.controllers.packages.delete(req,res,next);
});

router.put('/packages/:packageId', function(req, res, next) {
  req.app.locals.controllers.packages.put(req,res,next);
});

router.post('/packages/:packageId/hosts',  upload.single('hostCsv'), function(req, res, next) {
    const uploadExcel = req.file;    
    const buffer = uploadExcel.buffer;
    req.fileContent = buffer.toString();
    
    req.app.locals.controllers.packages.addHosts(req,res,next);
});

module.exports = router;