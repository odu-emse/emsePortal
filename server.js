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
import session from 'express-session'
import flash from 'connect-flash'
import aws from 'aws-sdk'
import { iamUser, iamSecret, bucket } from './config/keys.js'
import bodyParser from "body-parser";

const app = express();
import * as helpers from './helper/helpers'

//Router imports
import {dashboard as dashboard} from './routes/dashboard'
import {modules as modules} from './routes/modules'
import {users as users} from './routes/users'

//Passport configuration
import authentication from './config/passport'
authentication(passport)

//Database configuration
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
app.use(bodyParser.urlencoded({extended: true}))

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

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//flash middleware
app.use(flash())

//message global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next()
})

//Static middleware
app.use(express.static('public'))

//Controller

//Authentication import
import ensureAuthenticated from './config/auth'

//Routes
//Add ensure authenticated back once testing is done
app.use('/dashboard', dashboard);
app.use('/modules', modules);

//Dont add authenticated
app.use('/users', users);

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