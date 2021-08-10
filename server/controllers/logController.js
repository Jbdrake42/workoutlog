const router = require('express').Router();
const validateSession = require('../middleware/validateSession');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const Log = require('../db').import('../models/log')

router.post('/log', validateSession, (req, res) => {
    const logEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner_id: req.user.id
    }
    Log.create(logEntry)
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({ error: err }))
})

router.get('/log', validateSession, (req, res) => {
    const query = { where: { owner_id: req.user.id } };
    Log.findAll(query)
.then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({ error: err }))
})

router.get('/log/:id', validateSession, (req,res) =>{
    const query = { where: {id: req.params.id, owner_id: req.user.id }};
    Log.findAll(query)
.then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({ error: err }))
})


router.put('/log/:id', validateSession, (req,res) =>{
 const updateLog = {
    description: req.body.log.description,
    definition: req.body.log.definition,
    result: req.body.log.result,
 }

 const query = {where: {id: req.params.id}};

 Log.update(updateLog, query)
 .then(() => res.status(200).json({message: "Log Updated"}))
 .catch((err) => res.status(500).json({error: err}))
})

router.delete('/log/:id', validateSession, (req,res) =>{
    const query = { where: {id: req.params.id, owner_id: req.user.id }};
    Log.destroy(query)
        .then(() => res.status(200).json({ message: ' has been destroyed!!'}))
        .catch((err) => res.status(500).json({ error: err}))
})
module.exports = router;