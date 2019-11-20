const express = require('express');
const IdeasService = require('./ideas-service')

const ideasRouter = express.Router()
const jsonParser = express.json() 

ideasRouter
 .route('/api')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    IdeasService.getAllIdeas(knexInstance)
        .then(ideas => {
            res.json(ideas)
        })
    .catch(next)
})

ideasRouter
.route('/api/idea/:id')
.get((req, res, next) => {
    const knexInstance = req.app.get('db')
    IdeasService.getIdeaById(knexInstance, req.params.id)
      .then(idea => {
        res.json(idea)
    })
    .catch(next)
})

.patch(jsonParser, (req, res, next) => {
    
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
.route('/api/idea')
.post(jsonParser, (req, res, next) => {
    const { ideaname, ideasummary, authorname, email, claimed, submitted } = req.body;
    const newIdea = { ideaname, ideasummary, authorname,  email, claimed, submitted }
    
    for (const [key, value] of Object.entries(newIdea)) {
        if (value === null) {
            return res.status(400).json({
                error: { message: `Missing '${key}' in submission` }
            })
        }
    }
    
    IdeasService.addNewIdea(
        req.app.get('db'), newIdea
    )
    .then(idea => {
        res.status(201)
        .json(idea)
    })
    .catch(next)
})

module.exports = ideasRouter