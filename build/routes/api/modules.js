'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.modules = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Module = require('../../models/Module');

var _Module2 = _interopRequireDefault(_Module);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var modules = _express2.default.Router();


modules.get('/', function (req, res, next) {
    _Module2.default.find().then(function (data) {
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

modules.get('/:moduleNumber', function (req, res, next) {
    if (req.params.moduleNumber.length > 3) {
        next();
    }
    var moduleNum = req.params.moduleNumber;
    _Module2.default.find({
        moduleNumber: moduleNum
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

modules.get('/:id', function (req, res, next) {
    var identifier = req.params.id;
    _Module2.default.findById(identifier).then(function (data) {
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
exports.modules = modules;
//# sourceMappingURL=modules.js.map