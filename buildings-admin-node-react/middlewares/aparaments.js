const services = require('../services/apartament-services');

const getAllApartamentsByBuilding = (req, res, next) => {
    services.getAllApartamentsByBuilding(req.params.idBuilding)
        .then((result) => {
            res.status(result.status);
            res.json(result);
        })
        .catch((error) => {
            next(error);
        });
}

const getApartamentById = (req, res, next) => {
    services.getApartamentById(req.params.id)
        .then((result) => {
            res.status(result.status);
            res.json(result);
        })
        .catch((error) => {
            next(error);
        });
}

const createApartament = (req, res, next) => {
    services.create(req.body)
        .then((result) => {
            res.status(result.status);
            res.json(result);
        })
        .catch((error) => {
            next(error);
        });
}

module.exports = {
    getAllApartamentsByBuilding,
    getApartamentById,
    createApartament
}