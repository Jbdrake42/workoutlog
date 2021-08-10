let express = require('express');
const validateSession = require('../middleware/validateSession');
let router = express.Router();

router.get('/test', validateSession, function(req, res){
    res.send('test is functioning')
})

module.exports = router