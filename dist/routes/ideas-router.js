"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const body = require("express-validator"); //ecma script
const validationResult = require("express-validator");
const router = (0, express_1.Router)();
let ideas = [];
const ideaValidationRules = [
    body.body('ideaname').notEmpty().withMessage('Idea Name is required'), // body.body required b/c body without referencing itself is read as a variable
    body.body('ideasummary').notEmpty().withMessage('Summary is required'),
    body.body('authorname').isBoolean().withMessage('Author name is required'),
    body.body('email').notEmpty().withMessage('Email is required'),
    body.body('claimed').isBoolean().withMessage('Claimed must be a boolean'),
    body.body('submitted').isBoolean().withMessage('Submitted must be a boolean'),
];
router.post('/', ideaValidationRules, (req, res) => {
    const errors = validationResult.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
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
router.put('/:id', ideaValidationRules, (req, res) => {
    const errors = validationResult.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const idea = ideas.find((i) => i.id === parseInt(req.params.id));
    if (!idea) {
        res.status(404).send('Idea not found');
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
