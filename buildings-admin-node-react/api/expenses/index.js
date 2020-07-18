var router = require('express').Router();

const { 
    getAllExpensesByBuilding,
    getExpenseById,
    createExpense
} = require('../../middlewares/expenses');

router.get('/:idBuilding', getAllExpensesByBuilding);
router.get('/:idBuilding/:id', getExpenseById);
router.post('/:idBuilding/create', createExpense);


module.exports = router;