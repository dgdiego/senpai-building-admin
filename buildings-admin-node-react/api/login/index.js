var router = require('express').Router();

const { 
    login
} = require('../../middlewares/users');

router.post('/', login);

module.exports = router;