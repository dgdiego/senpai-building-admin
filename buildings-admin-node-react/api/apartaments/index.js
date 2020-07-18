var router = require('express').Router();

const { 
    getAllApartamentsByBuilding,
    getApartamentById,
    createApartament
} = require('../../middlewares/aparaments');

router.get('/:idBuilding', getAllApartamentsByBuilding);
router.get('/:idBuilding/:id', getApartamentById);
router.post('/:idBuilding/create', createApartament);


module.exports = router;