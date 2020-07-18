const services = require('../services/user-services');

const login = (req, res, next) => {
    services.login(req.body, req)
        .then((result) => {
            res.status(result.status);
            res.json(result);
        })
        .catch((error) => {
            next(error);
        });

}

const logout = (req, res, next) => {
    services.logout(req)
        .then((result) => {
            res.status(result.status);
            res.json(result);
        })
        .catch((error) => {
            next(error);
        });

}

const getAllUsers = (req, res, next) => {
    services.getAllUsers()
        .then((result) => {
            res.status(result.status);
            res.json(result);
        })
        .catch((error) => {
            next(error);
        });

}

const getUserById = (req, res, next) => {
    services.getUserById(req.params.id)
        .then((result) => {
            res.status(result.status);
            res.json(result);
        })
        .catch((error) => {
            next(error);
        });
}

const createUser = (req, res, next) => {
    services.create(req.body)
        .then((result) => {
            res.status(result.status);
            res.json(result);
        })
        .catch((error) => {
            next(error);
        });

}

const updateUser = (req, res, next) => {
    services.update(req.body)
        .then((result) => {
            res.status(result.status);
            res.json(result);
        })
        .catch((error) => {
            next(error);
        });

}

const deleteUser = (req, res, next) => {
    services.deleted(req.body)
        .then((result) => {
            res.status(result.status);
            res.json(result);
        })
        .catch((error) => {
            next(error);
        });

}

const changeUserPassword = (req, res, next) => {
    const currentUser = req.session.user;
    req.body = {
        ...req.body,
        user: currentUser
    }
    services.changePassword(req.body)
        .then((result) => {
            res.status(result.status);
            res.json(result);
        })
        .catch((error) => {
            next(error);
        });

}

module.exports = {
    login,
    logout,
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    changeUserPassword
}