const mongoose = require('mongoose')

const Module = new mongoose.Schema({
    courseName: {
        type: String,
        trim: true,
        default: '',
    },
    courseNumber: {
        type: Number,
        default: 0,
    },
    moduleNumber: {
        type: Number,
        default: 0,
    },
    moduleName: {
        type: String,
        trim: true,
        default: '',
    },
    description: {
        type: String,
        default: ''
    },
    duration: {
        type: Number,
        default: 0
    },
    cdLink: {
        type: String,
        trim: true,
        default: './'
    },
    numSlides: {
        type: Number,
        trim: true,
        default: 0
    },
    author: {
        type: String,
        trim: true,
        default: ''
    },
    difficulty: {
        type: Number,
        default: 0
    },
    done: {
        type: Boolean
    },
    continue: {
        type: Boolean
    },
    rating: [
        Number
    ],
    keywords: [
        String
    ],
    assignment: {
        //specifies if there is an assignment for the module
        type: Boolean
    },
    numberOfAssignments: {
        //specifies the number of assignments for given module
        type: Number
    },
    listOfAssignments: [{
        //contains the list of assignments
        assignment: [{
            //one specific assignment in the array
            id: {
                type: Number,
                unique: true 
            },
            title: String,
            description: String,
            topics: [ 
                //specifies the topics covered by this specific assignment
                Array 
            ],
            numberOfQuestions: Number,
            PassingGrade: { 
                type: Number, 
                default: 0
            },
            question:[{
                //one specific question in the assignment
                number: Number,
                title: String,
                problem: String,
                correctAnswer: String,
                response: String,
                point: Number,
                visual: Boolean,
                resource: [{
                    //available resource for specific question
                    link: String,
                    name: String
                }],
                relates: Number, //specifies the UUID of the module that has this question's help/answer
            }],
            retake: Boolean,
            due: Date,
            allowedTime: Number,

        }]
    }],
    preTest:{
        type: Boolean
    },
    postTest: {
        type: Boolean
    },

})

module.exports = mongoose.model('Module', Module)