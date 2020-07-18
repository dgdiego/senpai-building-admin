const router = require('express').Router();
//const todoListRouter = require('./pages/to-do-list');
const buildingsRouter = require('./pages/buildings');
const paymentsRouter = require('./pages/payments');
const loginRouter = require('./pages/login');
const homeRouter = require('./pages/home');
const usersRouter = require('./pages/users');
const errorsRouter = require('./pages/errors');
const landingRouter = require('./pages/landing');
const profileRouter = require('./pages/profile');
const { appAutentication, appUserCan } = require('../middlewares/permission');
const { appErrorHandler } = require('../middlewares/error-handler');

router.use(appAutentication, appUserCan);

router.use('/login', loginRouter);
router.use('/home', homeRouter);
router.use('/profile', profileRouter);
//router.use('/to-do-list', todoListRouter);
router.use('/buildings', buildingsRouter);
router.use('/payments', paymentsRouter);
router.use('/users', usersRouter);
router.use('/error', errorsRouter);
router.use('/', landingRouter);
router.use(appErrorHandler);

module.exports = router;