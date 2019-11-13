const mongoose = require('mongoose')

const User = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        default: '',
    },
    lastName: {
        type: String,
        trim: true,
        default: '',
    },
    middleName: {
        type: String,
        trim: true,
        default: '',
    },
    dob: {
        type: Date,
        default: Date.now
    },
    degree: {
        type: String,
        trim: true,
        default: '',
    },
    advisor: {
        type: String,
        trim: true,
        default: '',
    },
    email: {
        type: String,
        trim: true,
        default: '',
    },
    password: {
        type: String,
        trim: true,
        default: '',
    },
    classTaken:[
        String,
    ],
    classNeeded:[
        String,
    ],
    probation: {
        type: Boolean,
        default: false
    },
    probationExpire:{
        type: Date,
        default: Date.now
    },
    admitted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('User', User)