'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = new _mongoose2.default.Schema({
    firstName: {
        type: String,
        trim: true,
        default: ''
    },
    lastName: {
        type: String,
        trim: true,
        default: ''
    },
    middleName: {
        type: String,
        trim: true,
        default: ''
    },
    dob: {
        type: Date,
        default: ''
    },
    degree: {
        type: String,
        trim: true,
        default: ''
    },
    adviser: {
        type: String,
        trim: true,
        default: ''
    },
    email: {
        type: String,
        trim: true,
        default: ''
    },
    password: {
        type: String,
        trim: true,
        default: ''
    },
    classTaken: [{
        type: String,
        default: 'empty'
    }],
    classNeeded: [{
        type: String,
        default: 'all'
    }],
    probation: {
        type: Boolean,
        default: false
    },
    probationExpire: {
        type: Date,
        default: Date.now
    },
    admitted: {
        type: Boolean,
        default: false
    }
});

exports.default = _mongoose2.default.model('User', User);
//# sourceMappingURL=User.js.map