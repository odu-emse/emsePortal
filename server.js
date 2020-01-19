import express from 'express'
import path from 'path'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import sassMiddleware from 'node-sass-middleware'
import postcssMiddleware from 'postcss-middleware'
import autoprefixer from 'autoprefixer'
import mongoose from 'mongoose'
import hbs from 'express-handlebars'
import createError from 'http-errors'
import passport from 'passport'
import Strategy from 'passport-local'
import session from 'express-session'
import flash from 'connect-flash'
import aws from 'aws-sdk'
import { iamUser, iamSecret, bucket } from './config/keys.js'

const app = express();
import * as helpers from './helper/helpers'

//Router imports
import {home as home} from './routes/home'
import {modules as modules} from './routes/modules'
import {users as users} from './routes/users'
import {signup as signup} from './routes/signup'

//Database connection
import { MongoURI as url } from './config/keys.js'
const options = {
  'useUnifiedTopology': true,
  'useNewUrlParser': true,
  'useCreateIndex': true
}
mongoose.connect(url, options)
  .then(() => {
    console.log('Connected to db... ');
    
  })
  .catch((err) => {
    console.error(err);
  })

// view engine setup
app.engine('hbs', hbs({
  helpers: helpers.helpers,
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layouts/'
}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Middleware
//server middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Sass middleware
let dest = __dirname + '/public'
app.use(sassMiddleware({
  src: __dirname,
  dest: dest,
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true,
  debug: true, 
}));
app.use(postcssMiddleware({
  plugins: [
    // Plugins
    autoprefixer()
  ],
  src: function(req) {
    return path.join(dest, req.url);
  }
}))

//session  middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

//flash middleware
app.use(flash())

//message global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  next()
})

//Static middleware
app.use(express.static('public'))

//Controller

//Routes
app.use('/modules', modules);
app.use('/users', users);
app.use('/', home);
app.use('/signup', signup);

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

export default app