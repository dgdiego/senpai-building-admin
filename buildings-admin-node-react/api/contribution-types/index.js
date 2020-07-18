var router = require('express').Router();

const { 
    getAllContributionTypes,
    getContributionTypeById,
    createContributionType
} = require('../../middlewares/contribution-types');

router.get('/', getAllContributionTypes);
router.get('/:id', getContributionTypeById);
router.post('/create', createContributionType);


module.exports = router;