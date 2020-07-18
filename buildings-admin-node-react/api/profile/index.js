var router = require('express').Router();

const { 
    changeUserPassword
} = require('../../middlewares/users');

router.post('/', changeUserPassword);

module.exports = router;