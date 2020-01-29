import {urlencoded} from "express";
const express =  require('express')
const modules =  express.Router()
import Module from '../../models/Module'

//Query record based on difficulty grater than filter
modules.get('/', (req, res) => {
    Module.find()
        .then(modules => {
          res.render('module', {
            layout: 'modules',
            activeModules: true,
            title: "My modules",
            //name: req.user.firstName,
            auth: true,
            data: modules,
            courseName: modules.courseName,
            courseNumber: modules.courseNumber,
            moduleNumber: modules.moduleNumber,
            moduleName: modules.moduleName,
            description: modules.description,
            duration: modules.duration,
            cdLink: modules.cdLink,
            numSlides: modules.numSlides,
            author: modules.author,
            difficulty: modules.difficulty,
            keywords: modules.keywords,
            continue: modules.continue
          })
        })
        .catch(err => {
          res.json({
            confirmation: 'fail',
            message: err.message
          })
        })
})

//@route    POST api/modules
//@desc     shows modules that match searched data
//@access   Public for testing purposes

modules.post('/', (req, res) => {
  const search = req.body.search
    console.log(search)
    console.log(search.length)
    if (search.length > 0){
        //return data if search input wasn't empty
        Module.find({ moduleNumber: search })
            .then(modules => {
                if (modules.length > 0){
                    //check if the parameter that was given is met
                    res.render('module', {
                        confirmation: 'success returned filtered value',
                        query: search,
                        layout: 'modules',
                        activeModules: true,
                        title: "My modules",
                        //name: req.user.firstName,
                        auth: true,
                        data: modules,
                        courseName: modules.courseName,
                        courseNumber: modules.courseNumber,
                        moduleNumber: modules.moduleNumber,
                        moduleName: modules.moduleName,
                        description: modules.description,
                        duration: modules.duration,
                        cdLink: modules.cdLink,
                        numSlides: modules.numSlides,
                        author: modules.author,
                        difficulty: modules.difficulty,
                        keywords: modules.keywords,
                        continue: modules.continue
                    })
                }
                else{
                    //give error if no such document can be retrieved
                    res.json({
                        confirmation: 'success returned no value',
                        data: modules,
                    })
                }
            })
            .catch( err => {
                res.json({
                    confirmation: 'fail',
                    message: err.message
                })
            })
    }
    else{
        //return all data if search input was empty
        Module.find()
            .then(modules => {
                res.render('module', {
                    confirmation: 'success returned all values',
                    layout: 'modules',
                    activeModules: true,
                    title: "My modules",
                    //name: req.user.firstName,
                    auth: true,
                    data: modules,
                    courseName: modules.courseName,
                    courseNumber: modules.courseNumber,
                    moduleNumber: modules.moduleNumber,
                    moduleName: modules.moduleName,
                    description: modules.description,
                    duration: modules.duration,
                    cdLink: modules.cdLink,
                    numSlides: modules.numSlides,
                    author: modules.author,
                    difficulty: modules.difficulty,
                    keywords: modules.keywords,
                    continue: modules.continue
                })
            })
            .catch(err => {
                res.json({
                    confirmation: 'fail. no  data matched your parameters.',
                    message: err.message
                })
            })
    }
})

export { modules }
