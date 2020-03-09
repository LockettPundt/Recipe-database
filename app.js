const express = require('express'),
    session = require('express-session'),
    FileStore = require('session-file-store')(session),
    path = require('path'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    es6Renderer = require('express-es6-template-engine'),
    logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const recipelistRouter = require('./routes/recipelist')


const app = express();
app.engine('html', es6Renderer);
app.set('views', './views');
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session( {
    store: new FileStore(),
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    is_logged_in: false
}))


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/recipelist', recipelistRouter);


module.exports = app;