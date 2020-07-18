const services = require('../services/payment-services');


const getPaymentById = (req, res, next) => {
    services.getPaymentById(req.params.id)
        .then((result) => {
            res.status(result.status);
            res.json(result);
        })
        .catch((error) => {
            next(error);
        });
}

const getPaymentsByApartament = (req, res, next) => {
    services.getPaymentsByApartament(req.params.id)
        .then((result) => {
            res.status(result.status);
            res.json(result);
        })
        .catch((error) => {
            next(error);
        });

}

const createPayment = (req, res, next) => {
    services.create(req.body)
        .then((result) => {
            res.status(result.status);
            res.json(result);
        })
        .catch((error) => {
            next(error);
        });

}

const updatePayment = (req, res, next) => {
    services.update(req.body)
        .then((result) => {
            res.status(result.status);
            res.json(result);
        })
        .catch((error) => {
            next(error);
        });

}

const deletePayment = (req, res, next) => {
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
    getPaymentsByApartament,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment
}