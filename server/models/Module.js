import mongoose from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId;

const Module = new mongoose.Schema({
    parentCourseName: {
        type: String,
        trim: true,
        default: '',
    },
    parentCourseNumber: {
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
    listOfAssignments: [
        //contains the list of assignments
        {
            //one specific assignment in the array
            name: String,
            id: {
                type: String,
                unique: true,
                name: ObjectId 
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
                relates: {
                    //specifies the UUID of the module that has this question's help/answer
                    type: String,
                    value: ObjectId 
                }
            }],
            retake: Boolean,
            due: Date,
            allowedTime: Number,
        }
    ],
    preTest:{
        type: Boolean
    },
    postTest: {
        type: Boolean
    },

})

export default mongoose.model('Module', Module)