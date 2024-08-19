"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let ideas = [];
// Add your CRUD API implementation here
router.post('/', (req, res) => {
    const idea = {
        id: ideas.length + 1,
        ideaname: req.body.ideaname,
        ideasummary: req.body.ideasummary,
        authorname: req.body.authorname,
        email: req.body.email,
        claimed: false,
        submitted: true
    };
    ideas.push(idea);
    res.status(201).json(idea);
});
router.get('/', (req, res) => {
    res.json(ideas);
});
router.get('/:id', (req, res) => {
    const idea = ideas.find((i) => i.id === parseInt(req.params.id));
    if (!idea) {
        res.status(404).send('Idea not found');
    }
    else {
        res.json(idea);
    }
});
router.put('/:id', (req, res) => {
    const idea = ideas.find((i) => i.id === parseInt(req.params.id));
    if (!idea) {
        res.status(404).send('idea not found');
    }
    else {
        idea.ideaname = req.body.ideaname || idea.ideaname;
        idea.ideasummary = req.body.ideasummary || idea.ideasummary;
        idea.authorname = req.body.authorname || idea.authorname;
        idea.email = req.body.email || idea.email;
        idea.claimed = req.body.claimed || idea.claimed;
        idea.submitted = req.body.submitted || idea.submitted;
        res.json(idea);
    }
});
router.delete('/:id', (req, res) => {
    const index = ideas.findIndex((i) => i.id === parseInt(req.params.id));
    if (index === -1) {
        res.status(404).send('Idea not found');
    }
    else {
        ideas.splice(index, 1);
        res.status(204).send();
    }
});
exports.default = router;
// const express = require('express');
// const IdeasService = require('./ideas-service')
// const ideasRouter = express.Router()
// const jsonParser = express.json()
// ideasRouter
//  .route('/api')
//   .get((req, res, next) => {
//     const knexInstance = req.app.get('db')
//     IdeasService.getAllIdeas(knexInstance)
//         .then(ideas => {
//             res.json(ideas)
//         })
//     .catch(next)
// })
// ideasRouter
// .route('/api/idea/:id')
// .get((req, res, next) => {
//     const knexInstance = req.app.get('db')
//     IdeasService.getIdeaById(knexInstance, req.params.id)
//       .then(idea => {
//         res.json(idea)
//     })
//     .catch(next)
// })
// .patch(jsonParser, (req, res, next) => {
//     const { claimed } = req.body;
//     const newClaimedVariable = {claimed};
//     const knexInstance = req.app.get('db')
//     IdeasService.updateClaimedVariable(knexInstance, req.params.id, newClaimedVariable)
//     .then(idea => {
//         res.json(idea)
//     }).catch(err => {
//         res.status(400).send({error: 'Unable to update data'});
//     })
// })
// ideasRouter
// .route('/api/idea')
// .post(jsonParser, (req, res, next) => {
//     const { ideaname, ideasummary, authorname, email, claimed, submitted } = req.body;
//     const newIdea = { ideaname, ideasummary, authorname,  email, claimed, submitted }
//     for (const [key, value] of Object.entries(newIdea)) {
//         if (value == null) {
//             return res.status(400).json({
//                 error: { message: `Missing '${key}' in submission` }
//             })
//         }
//     }
//     IdeasService.addNewIdea(
//         req.app.get('db'), newIdea
//     )
//     .then(idea => {
//         res.status(201)
//         .json(idea)
//     })
//     .catch(next)
// })
// module.exports = ideasRouter
//# sourceMappingURL=ideas-router.js.map