const router = require('express').Router();
const buildingRouter = require('./buildings');
const contributionTypesRouter = require('./contribution-types');
const apartamentsRouter = require('./apartaments');
const paymentsRouter = require('./payments');
const expensesRouter = require('./expenses');
const fundsRouter = require('./funds');
const usersRouter = require('./users');
const loginRouter = require('./login');
const logoutRouter = require('./logout');
const profileRouter = require('./profile');
const { apiErrorHandler } = require('../middlewares/error-handler');
const { apiAutentication, apiUserCan } = require('../middlewares/permission');

//always execute 
router.use(apiAutentication, apiUserCan);

//api routes
router.use('/login', loginRouter);
router.use('/logout', logoutRouter);
router.use('/profile', profileRouter);
router.use('/buildings', buildingRouter);
router.use('/contributionTypes', contributionTypesRouter);
router.use('/apartaments/', apartamentsRouter);
router.use('/payments/', paymentsRouter);
router.use('/expenses/', expensesRouter);
router.use('/funds/', fundsRouter);
router.use('/users/', usersRouter);
router.use(apiErrorHandler);


//**TO DELETE */
/* const Task = require('../models/task');
router.get('/tasks', (req, res, next) => {
    Task.getAllTasks()
        .then(tasks => {
            res.json({
                tasks,
            });
        })
        .catch(err => {
            next(err);
        });
}); */

module.exports = router;