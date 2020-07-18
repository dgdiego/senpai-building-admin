var router = require('express').Router();

const { 
    getPaymentsByApartament,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment
} = require('../../middlewares/payments');

router.get('/apartament/:id', getPaymentsByApartament);
router.get('/:id', getPaymentById);
router.post('/create', createPayment);
router.post('/:id', updatePayment);
router.delete('/:id', deletePayment);


module.exports = router;