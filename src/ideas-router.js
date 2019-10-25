const express = require('express');
const knex = require('knex');

const IdeasService = require('./ideas-service')

const ideasRouter = express.Router()
const jsonParser = express.json() //for post endpoint

  

ideasRouter
 .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    IdeasService.getAllIdeas(knexInstance)
        .then(ideas => {
            res.json(ideas)
        })
    .catch(next)
  })

ideasRouter
.route('/idea/:id')
.get((req, res, next) => {
    const knexInstance = req.app.get('db')
    IdeasService.getIdeaById(knexInstance, req.params.id)
      .then(idea => {
        res.json(idea)
    })
    .catch(next)
  })

.patch((req, res) =>{

})

ideasRouter
.route('/create-idea')
.post(jsonParser, (req, res, next) => {
    res.status(201).send('something')
})


module.exports = ideasRouter


