const express = require('express');
const IdeasService = require('./ideas-service')

const ideasRouter = express.Router()
const jsonParser = express.json() 

  

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

.patch(jsonParser, (req, res, next) => {
    console.log(req.body.claimed)
    const { claimed } = req.body;
    const newClaimedVariable = {claimed};
    const knexInstance = req.app.get('db')
    IdeasService.updateClaimedVariable(knexInstance, req.params.id, newClaimedVariable)
    
    .then(idea => {
        console.log({idea})
        res.json(idea)
    })
        
    

})

ideasRouter
.route('/create-idea')
.post(jsonParser, (req, res, next) => {
    
    const {  ideaName, ideaSummary, authorName, email, claimed, submitted } = req.body;
    const newIdea = { ideaName, ideaSummary, email, claimed, submitted }
    for (const [key, value] of Object.entries(newIdea)) {
        if (value == null) {
            return res.status(400).json({
                error: { message: `Missing '${key}' in submission` }
            })
        }
    }
    
    IdeasService.addNewIdea(
        req.app.get('db'), newIdea
    )
    .then(idea => {
        res.status(201).location(`/idea/${id}`).json(idea)
    })
    .catch(next)
})



module.exports = ideasRouter


