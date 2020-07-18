const Fund = require('../models/fund');

const getAllFundsByBuilding = (req, res, next) => {
    Fund.getAllFundsByBuilding(req.params.idBuilding)
        .then((Funds) => {
            res.status(200);
            res.json({
                Funds,
            });
        })
        .catch((error) => {
            next(error);
        });

}

const getFundById = (req, res, next) => {
    Fund.getFundById(req.params.id)
        .then((Fund) => {
            if (Fund) {
                res.status(200);
                res.json({
                    Fund,
                });
            } else {
                res.status(404);
                res.json({
                    success: false,
                    message: 'No existe un fondo con el ID especificado',
                });
            }
        })
        .catch((error) => {
            next(error);
        });

}

const createFund = (req, res, next) => {
    Fund.create(req.body)
        .then((Fund) => {
            res.status(200);
            res.json({
                Fund,
            });
        })
        .catch((error) => {
            next(error);
        });
}

module.exports = {
    getAllFundsByBuilding,
    getFundById,
    createFund
}