var router = require('express').Router();

const { 
    getAllFundsByBuilding,
    getFundById,
    createFund
} = require('../../middlewares/funds');

router.get('/:idBuilding', getAllFundsByBuilding);
router.get('/:idBuilding/:id', getFundById);
router.post('/:idBuilding/create', createFund);


module.exports = router;