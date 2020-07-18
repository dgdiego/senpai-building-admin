const ContributionType = require('../models/contribution-type');

const getAllContributionTypes = (req, res, next) => {
    ContributionType.getAllContributionTypes()
        .then((contributionTypes) => {
            res.status(200);
            res.json({
                contributionTypes,
            });
        })
        .catch((error) => {
            next(error);
        });

}

const getContributionTypeById = (req, res, next) => {
    ContributionType.getContributionTypeById(req.params.id)
        .then((contributionType) => {
            if (contributionType) {
                res.status(200);
                res.json({
                    contributionType,
                });
            } else {
                res.status(404);
                res.json({
                    success: false,
                    message: 'No existe un tipo de contribución con el ID especificado',
                });
            }
        })
        .catch((error) => {
            next(error);
        });

}

const createContributionType = (req, res, next) => {
    ContributionType.create(req.body)
        .then((contributionType) => {
            if (contributionType) {
                res.status(200);
                res.json({
                    contributionType,
                });
            } else {
                res.status(409); //conflict
                res.json({
                    success: false,
                    message: 'Ya existe el tipo de contribución para el edificio'
                })
            }
        })
        .catch((error) => {
            next(error);
        });

}

module.exports = {
    getAllContributionTypes,
    getContributionTypeById,
    createContributionType
}