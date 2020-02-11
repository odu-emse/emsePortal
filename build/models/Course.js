'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Course = new _mongoose2.default.Schema({
    courseName: {
        type: String,
        trim: true,
        default: ''
    },
    courseNumber: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: ''
    },
    numberOfModules: {
        type: Number,
        default: 0
    },
    difficulty: {
        type: Number,
        default: 0
    },
    completed: {
        type: Boolean
    },
    containingModules: [
    //contains the _id for each module that's covered by this course
    String],
    keywords: [String]
});

exports.default = _mongoose2.default.model('Course', Course);
//# sourceMappingURL=Course.js.map