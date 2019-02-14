const createError = require('http-errors');
const express = require('express');
const path = require('path');
const glob = require('glob');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const Sequelize = require('sequelize');
const sqlite3 = require('sqlite3').verbose()
const app = express();

global.__basedir = __dirname;
global.sequelize = new Sequelize('app.db', '', '', {
    host: 'localhost',
    dialect: 'sqlite',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    storage: path.join(__basedir + '/database/app.db')
});

app.locals.controllers = {};
app.locals.models = {};

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
	app.locals.controllers[ file.replace("./controllers/","").replace(".js","") ] = require( path.resolve( file ) );
});

glob.sync( './models/*.js' ).forEach( function( file ) {
	app.locals.models[ file.replace("./models/","").replace(".js","") ] = require( path.resolve( file ) );
});

var routes  = require('./routes/router');
app.use('/',routes);

app.use(function(req, res, next) { next(createError(404)); });

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