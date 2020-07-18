const User = require('../models/user');
const { threadId } = require('./db-connection');

//const bcrypt = require('bcrypt');
const crypto = require('crypto');

const login = async (parms, req) => {
    try {
        const { username, password } = parms;

        const user = await User.getUserByUserName(username)
        if (!user) {
            return {
                status: 404,
                success: false,
                message: `No existe un usuario con username ${username}`,
                data: null
            };
        } else {
            const match = crypto.createHash('md5').update(password).digest("hex") === user.password;
            if (match) {
                req.session.user = user;
                return {
                    status: 200,
                    success: true,
                    message: 'OK',
                    data: user
                };
            } else {
                return {
                    status: 400,
                    success: false,
                    message: 'Contraseña incorrecta',
                    data: null
                };
            }
        }
    }
    catch (error) {
        throw (error);
    }


}

const logout = (req) => {
    return new Promise(function (resolve, reject) {
        if (req.session.user) {
            req.session.user = null;
            resolve({
                status: 200,
                success: true,
                message: 'OK',
            })
        } else (
            reject({
                status: 404,
                success: false,
                message: 'No existe usuario loggueado'

            })
        )
    });
}

const getAllUsers = async () => {
    try {
        const users = await User.getAllUsers()
        if (users) {
            return {
                status: 200,
                success: true,
                message: 'OK',
                data: users
            };
        } else {
            return {
                status: 404,
                success: false,
                message: `No existen usuarios`
            };
        }
    }
    catch (error) {
        throw (error);
    }

}

const getUserById = async (id) => {
    try {
        const user = await User.getUserById(id);
        if (user) {
            return {
                status: 200,
                success: true,
                message: 'OK',
                data: user
            };
        } else {
            return {
                status: 404,
                success: false,
                message: `No existe usuario con el ID ${id}`
            };
        }
    }
    catch (error) {
        throw error;
    }
}

const create = async (parms) => {
    try {
        const { username, password } = parms;

        const user = await User.getUserByUserName(username);
        if (user) {
            return {
                status: 400,
                success: false,
                message: `Ya existe un usuario con el username ${username}`
            }
        } else {
            var hashPassword = crypto.createHash('md5').update(password).digest("hex");
            parms = {
                ...parms,
                password: hashPassword
            }
            const newUser = await User.create(parms);
            return {
                status: 200,
                success: true,
                message: 'OK',
                data: newUser
            };
        }
    } catch (error) {
        throw (error);
    }
}

const update = async (parms) => {
    try {
        const { id, username, newPassword } = parms;

        const user = await User.getUserById(id);
        if (!user) {
            return {
                status: 400,
                success: false,
                message: `No existe un usuario con el ID ${id}`
            }
        } else {
            if (user.username != username) {
                const userAux = await User.getUserByUserName(username);
                if (userAux) {
                    return {
                        status: 400,
                        success: false,
                        message: `Ya existe un usuario con username ${username}`
                    }
                }
            }
            if (newPassword && newPassword != '') {
                var hashPassword = crypto.createHash('md5').update(newPassword).digest("hex");
                parms = {
                    ...parms,
                    password: hashPassword
                }
            }else{
                parms = {
                    ...parms,
                    password: user.password
                }
            }
            const updatedUser = await User.update(parms);
            return {
                status: 200,
                success: true,
                message: 'OK',
                data: updatedUser
            };
        }
    } catch (error) {
        throw (error);
    }
}

const changePassword = async (parms) => {
    try {
        const { user, password, newPassword } = parms;

        const bdUser = await User.getUserById(user.id);
        if (!bdUser) {
            return {
                status: 400,
                success: false,
                message: `No existe un usuario con el ID ${id}`
            }
        }else{
            var hashPassword = crypto.createHash('md5').update(password).digest("hex");
            if (hashPassword != bdUser.password){
                return {
                    status: 400,
                    success: false,
                    message: `Password incorrecto`
                }
            }else{
                var newHashPassword = crypto.createHash('md5').update(newPassword).digest("hex");
                parms.password = newHashPassword;
                parms.id = user.id;
                
                const changedUser = await User.changePassword(parms);
                return {
                    status: 200,
                    success: true,
                    message: 'OK',
                    data: changedUser
                };
            }
        }  
    } catch (error) {
        throw (error);
    }
}

const deleted = async (parms) => {
    try {
        const { id } = parms;

        const user = await User.getUserById(id);
        if (!user) {
            return {
                status: 400,
                success: false,
                message: `No existe un usuario con el id ${id}`
            }
        } else {
            const deleted = await User.delete(id);
            return {
                status: 200,
                success: true,
                message: 'OK',
                data: deleted
            }
        }
    }
    catch (error) {
        throw (error);
    }
}

module.exports = {
    login,
    logout,
    getAllUsers,
    getUserById,
    create,
    update,
    deleted,
    changePassword
}