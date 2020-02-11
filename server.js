import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import createError from 'http-errors'
import passport from 'passport'
import session from 'express-session'
import flash from 'connect-flash'
import path from 'path'

const app = express();

//Router imports
import {dashboard as dashboard} from './routes/api/dashboard'
import {course as course} from './routes/api/course'
import {modules as modules} from './routes/api/modules'
import {users as users} from './routes/api/users'

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

//Middleware
//server middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


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

//Controller

//Authentication import
import ensureAuthenticated from './config/auth'

//Routes
//Add ensure authenticated back once testing is done
app.use('/dashboard', dashboard);
app.use('/api/modules', modules);
app.use('/api/course', course);

//Dont add authenticated
app.use('/users', users);

//Serve static assets if in prod
if (process.env.NODE_ENV === 'production'){
  //set static dir
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

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