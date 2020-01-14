const express =  require('express')
const modules =  express.Router()
import Module from '../models/Module'

//Query record based on difficulty grater than filter
modules.get('/', (req, res) => {
  let filters = req.query

  if(req.query.difficulty != null){
    filters = {
      difficulty: {
        $gt: req.query.difficulty
      }
    }
  }
  Module.find(filters)   
      .then(modules => {
        res.render('module',{
          layout: 'modules',
          activeModules: true,
          title: "My modules",
          data: modules,
          courseName: modules.courseName,
          courseNumber:  modules.courseNumber,
          moduleNumber:  modules.moduleNumber,
          moduleName:  modules.moduleName,
          description:  modules.description,
          duration:  modules.duration,
          cdLink:  modules.cdLink,
          numSlides: modules.numSlides,
          author: modules.author,
          difficulty: modules.difficulty,
          keywords: modules.keywords,
          continue: modules.continue
        })
      })
      .catch( err => {
        res.json({
          confirmation: 'fail',
          message: err.message
        })
      })
})

//TODO: need to render the filtered data not json it 
//Query record by ID
modules.get('/:id', (req, res) => {
  const id = req.params.id

  Module.findById(id)
      .then(modules => {
        res.json({
          confirmation: 'success',
          data: modules
        })
      })
      .catch( err => {
        res.json({
          confirmation: 'fail',
          message: `Module number ${id} not found. Please check your search term.`
        })
      })
})

export { modules }
