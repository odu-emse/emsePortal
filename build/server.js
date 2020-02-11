'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _course = require('./routes/api/course');

var _modules = require('./routes/api/modules');

var _users = require('./routes/api/users');

var _keys = require('./config/keys.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

//Middleware
app.use(_express2.default.json());

//Router imports


//Database configuration

var options = {
  'useUnifiedTopology': true,
  'useNewUrlParser': true,
  'useCreateIndex': true
};
_mongoose2.default.connect(_keys.MongoURI, options).then(function () {
  console.log('Connected to db... ');
}).catch(function (err) {
  console.error(err);
});

//Routes
app.use('/api/modules', _modules.modules);
app.use('/api/course', _course.course);
app.use('/api/users', _users.users);

//Serve static assets if in prod
if (process.env.NODE_ENV === 'production') {
  //set static dir
  app.use(_express2.default.static('client/build'));

  app.get('*', function (req, res) {
    res.sendFile(_path2.default.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

exports.default = app;
//# sourceMappingURL=server.js.map