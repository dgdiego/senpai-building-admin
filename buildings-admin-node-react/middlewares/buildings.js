const services = require('../services/building-services');

const getAllBuildings = (req, res, next) => {
    services.getAllBuildings()
        .then((result) => {
            res.status(result.status);
            res.json(result);
        })
        .catch((error) => {
            next(error);
        });

}

const getBuildingById = (req, res, next) => {
    services.getBuildingById(req.params.id)
        .then((result) => {
            res.status(result.status);
            res.json(result);
        })
        .catch((error) => {
            next(error);
        });

}

const createBuilding = (req, res, next) => {
    services.create(req.body)
        .then((result) => {
            res.status(result.status);
            res.json(result);
        })
        .catch((error) => {
            next(error);
        });

}

const updateBuilding = (req, res, next) => {
    services.update(req.body)
        .then((result) => {
            res.status(result.status);
            res.json(result);
        })
        .catch((error) => {
            next(error);
        });

}

const deleteBuilding = (req, res, next) => {
    services.deleted(req.body)
        .then((result) => {
            res.status(result.status);
            res.json(result);
        })
        .catch((error) => {
            next(error);
        });

}

module.exports = {
    getAllBuildings,
    getBuildingById,
    createBuilding,
    updateBuilding,
    deleteBuilding
}