'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dashboard = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dashboard = _express2.default.Router();

//Query record based on difficulty grater than filter
dashboard.get('/', function (req, res) {
  res.render('dashboard', {
    activeDashboard: true,
    title: "Dashboard",
    //name: req.user.firstName,
    auth: true
  });
});

exports.dashboard = dashboard;
//# sourceMappingURL=dashboard.js.map