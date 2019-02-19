require('dotenv').config()
var config = require('config');

console.log(process.env.environment);
console.log( config.get('development.database') );

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const glob = require('glob');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const Sequelize = require('sequelize');
const sqlite3 = require('sqlite3').verbose()
const routes  = require('./routes/router');

const multer = require('multer');
const upload = multer({ dest: './uploads/' })


const app = express();



app.locals.__basedir = __dirname;
app.locals.controllers = {};
app.locals.models = {};

global.sequelize = new Sequelize( config.get('development.database'), '', '', {
    host: 'localhost',
    dialect: 'sqlite',
    operatorsAliases: false,
    transactionType: 'IMMEDIATE',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    storage: path.join(app.locals.__basedir + '/database/' + config.get('development.database') )
});

glob.sync( './controllers/*.js' ).forEach( function( file ) {
	app.locals.controllers[ file.replace("./controllers/","").replace(".js","") ] = require( path.resolve( file ) );
});

glob.sync( './models/*.js' ).forEach( function( file ) {
	app.locals.models[ file.replace("./models/","").replace(".js","") ] = require( path.resolve( file ) );
});





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

app.use('/',routes);

app.use(function(req, res, next) { next(createError(404)); });
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = process.env.environment === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;