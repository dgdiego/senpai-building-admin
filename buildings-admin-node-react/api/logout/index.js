var router = require('express').Router();

const { 
    logout
} = require('../../middlewares/users');

router.post('/', logout);

module.exports = router;