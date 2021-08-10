const router = require('express').Router();
const User = require('../db').import('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
router.post('/register', (req, res) => {
    console.log('register function called')
    User.create({
        username: req.body.user.username,
        password: bcrypt.hashSync(req.body.user.password, 15)
    })
    .then((user) => {
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
        res.json({
            user: user,
            message: 'User Successfully created',
            sessionToken: token
        })})
    .catch( err => {
        res.status(500).json({ error: err})
    })
})

router.post('/login', (req, res) => {
    console.log('%%%%login function called%%%%')
   
    User.findOne({
        where: {
            username: req.body.user.username
        }
    })
    .then((user) => {
         
        if(user) {
            bcrypt.compare(req.body.user.password, user.password, (err, matches) => {
                if (matches) {
                    let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
                    res.status(200).json({
                        user:user,
                        message: "User Logged in",
                        sessionToken: token
                })
            } else {
                res.status(502).send({ error: "login Failed"})
            }
            })
        } else {
            res.status(500).json({ error: 'User does not exist'})
        }
       
    })
    .catch( err => {
        res.status(500).json({ error: err})
})})
module.exports = router;