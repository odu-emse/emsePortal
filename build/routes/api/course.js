'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.course = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Course = require('../../models/Course');

var _Course2 = _interopRequireDefault(_Course);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var course = _express2.default.Router();


course.get('/', function (req, res, next) {
    _Course2.default.find().then(function (data) {
        if (!data) {
            return res.status(404).end;
        } else {
            res.status(200).json({
                conf: 'success',
                data: data
            });
        }
    }).catch(function (err) {
        console.log(err);
    });
});

course.get('/:courseNumber', function (req, res, next) {
    if (req.params.courseNumber.length > 3) {
        next();
    }
    var courseNum = req.params.courseNumber;
    _Course2.default.find({
        courseNumber: courseNum
    }).then(function (data) {
        if (!data) {
            return res.status(404).end;
        } else {
            res.status(200).json({
                conf: 'success',
                data: data
            });
        }
    }).catch(function (err) {
        console.log(err);
    });
});

course.get('/:id', function (req, res, next) {
    var identifier = req.params.id;
    _Course2.default.findById(identifier).then(function (data) {
        if (!data) {
            return res.status(404).end;
        } else {
            res.status(200).json({
                conf: 'success',
                data: data
            });
        }
    }).catch(function (err) {
        console.log(err);
    });
});

exports.course = course;
//# sourceMappingURL=course.js.map