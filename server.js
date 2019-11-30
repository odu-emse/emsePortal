const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser =  require('cookie-parser');
const sassMiddleware = require('node-sass-middleware');
const mongoose = require('mongoose');
const hbs = require('express-handlebars')
const app = express();

//Database connection
mongoose.connect('mongodb+srv://root:root@emseportal-1qgvd.mongodb.net/test?retryWrites=true&w=majority', {
  'useUnifiedTopology': true,
  'useNewUrlParser': true,
  'useCreateIndex': true
})
  .then(() => console.log('Connected to database...'))
  .catch(err => console.error(err));

// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Middleware
//server middleware
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Sass middleware
let sassPath = path.join(__dirname, '/sass');
let destPath = path.join(__dirname, '/public/style');
app.use(sassMiddleware({
  src: __dirname,
  dest: __dirname + '/public',
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true,
  debug: true, 
}));

//Static middleware
app.use(express.static(path.join(__dirname, '/public')));

//Controller
const modules = require('./routes/modules')
const users = require('./routes/users')
const home = require('./routes/home')
const signup = require('./routes/signup')

//Routes
app.use('/modules', modules);
app.use('/users', users);
app.use('/', home);
app.use('/signup', signup);


//Server
app.listen(5000, () => console.log('Server has started on port 3000...'));

module.exports = app