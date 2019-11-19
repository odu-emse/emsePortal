const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser =  require('cookie-parser');
const sassMiddleware = require('node-sass-middleware');
const mongoose = require('mongoose');
const app = express();

// Database connection
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/portal',)
    .then(() => console.log('Connected to database...'))
    .catch(err => console.error(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Middleware
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));

//Controller
const modules = require('./routes/modules')
const users = require('./routes/users')

//Routes
app.use('/api/modules', modules);
app.use('/api/users', users);

//Server
app.listen(3000, () => console.log('Server has started on port 3000...'));

module.exports = app