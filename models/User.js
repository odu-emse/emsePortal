import mongoose from 'mongoose'

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
        default: ''
    },
    degree: {
        type: String,
        trim: true,
        default: '',
    },
    adviser: {
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
    classTaken:[{
        type: String,
        default: 'empty'
    }],
    classNeeded:[{
        type: String,
        default: 'all'
    }],
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

export default mongoose.model('User', User)