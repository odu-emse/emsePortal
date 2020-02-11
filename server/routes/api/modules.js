import express from 'express'
const modules =  express.Router()
import Module from '../../models/Module'

modules.get('/', (req, res, next) => {
    Module.find()
        .then(data => {
            if (!data){
                return res.status(404).end
            }
            else{
                res.status(200).json({
                    conf: 'success',
                    data: data
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
})

modules.get('/:moduleNumber', (req, res, next) => {
    if (req.params.moduleNumber.length > 3){
        next()
    }
    const moduleNum = req.params.moduleNumber
    Module.find({
        moduleNumber: moduleNum
    })
        .then(data => {
            if (!data){
                return res.status(404).end
            }
            else{
                res.status(200).json({
                    conf: 'success',
                    data: data
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
})

modules.get('/:id', (req, res, next) => {
    const identifier = req.params.id
    Module.findById(identifier)
        .then(data => {
            if (!data){
                return res.status(404).end
            }
            else{
                res.status(200).json({
                    conf: 'success',
                    data: data
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
})
export { modules }
