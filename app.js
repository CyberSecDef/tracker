var createError = require('http-errors');
var express = require('express');
var path = require('path');
var glob = require('glob');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database(path.join(__dirname + '/database/app.db'))
var controllers = {};

db.serialize(function () {
  db.run('CREATE TABLE  if not exists lorem (info TEXT)')
  var stmt = db.prepare('INSERT INTO lorem VALUES (?)')

  for (var i = 0; i < 10; i++) {
    stmt.run('Ipsum ' + i)
  }

  stmt.finalize()

  db.each('SELECT rowid AS id, info FROM lorem limit 10', function (err, row) {
    console.log(row.id + ': ' + row.info)
  })
})

db.close()

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname + '/node_modules/jquery/dist')));
app.use(express.static(path.join(__dirname + '/node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname + '/node_modules/feather-icons/dist')));
app.use(express.static(path.join(__dirname + '/node_modules/chart.js/dist')));

glob.sync( './controllers/*.js' ).forEach( function( file ) {
	controllers[ file.replace("./controllers/","").replace(".js","") ] = require( path.resolve( file ) );
});
app.set("controllers",controllers);

var routes  = require('./routes/router');
app.use('/',routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
