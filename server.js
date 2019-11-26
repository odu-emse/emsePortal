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
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));

//Controller
const modules = require('./routes/modules')
const users = require('./routes/users')
const home = require('./routes/home')
const signup = require('./routes/signup')

//Routes
app.use('/api/modules', modules);
app.use('/api/users', users);
app.use('/', home);
app.use('/signup', signup);


//Server
app.listen(5000, () => console.log('Server has started on port 3000...'));

module.exports = app