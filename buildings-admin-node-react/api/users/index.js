var router = require('express').Router();

const { 
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../middlewares/users');

/*const { 
    getUser,
} = require('../middlewares/user');

const { 
    autenticateUser
} = require('../middlewares/autorization');*/


//router.post('/', getUser, autenticateUser, registerUser, apiErrorHandler);

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/create', createUser);
router.post('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;