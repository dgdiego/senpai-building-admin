const db = require('../services/db-connection');
const GET_USER_BY_USERNAME = 'SELECT * FROM users WHERE username = ?';
const GET_USER_BY_ID = 'SELECT * FROM users WHERE id = ?';
const GET_ALL_USERS = 'SELECT * FROM users';
const INSERT_USER = 'INSERT INTO users SET ?';
const UPDATE_USER = 'UPDATE users SET username = ?, password = ?, isAdmin = ? WHERE id = ?';
const CHANGE_USER_PASSWORD = 'UPDATE users SET password = ? WHERE id = ?';
const DELETE_USER = 'DELETE FROM users WHERE id = ?';

class User {
    constructor(id, username, password, isAdmin) {
        this.id = id
        this.username = username;
        this.password = password;
        this.isAdmin = isAdmin;
    }

    static getUserById(id) {
        return new Promise(function (resolve, reject) {
            db.query(GET_USER_BY_ID, [id], function (error, results) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        if (results && results.length > 0) {
                            const { id, username, password, isAdmin } = results[0];
                            resolve(new User(id, username, password, isAdmin));
                        } else {
                            resolve(null);
                        }
                    } catch (err) {
                        reject(err);
                    }
                }
            });
        })
    }

    static getUserByUserName(username) {
        return new Promise(function (resolve, reject) {
            db.query(GET_USER_BY_USERNAME, [username], function (error, results) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        if (results && results.length > 0) {
                            const { id, username, password, isAdmin } = results[0];
                            resolve(new User(id, username, password, isAdmin));
                        } else {
                            resolve(null);
                        }
                    } catch (err) {
                        reject(err);
                    }
                }
            });
        })
    }

    static getAllUsers() {
        return new Promise(function (resolve, reject) {
            db.query(GET_ALL_USERS, function (error, results) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        resolve(results.map((user) => {
                            const { id, username, password, isAdmin } = user;
                            return new User(id, username, password, isAdmin);
                        }));
                    } catch (err) {
                        reject(err);
                    }
                }
            });
        })
    }

    static create(parms) {
        return new Promise((resolve, rejected) => {
            const { username, password, isAdmin } = parms;
            const newUser = {
                username,
                password,
                isAdmin
            };
            db.query(INSERT_USER, newUser, (error, results) => {
                if (error) {
                    rejected(error);
                } else {
                    try {
                        resolve(new User(results.insertId, username, password, isAdmin));
                    } catch (err) {
                        rejected(err);
                    }
                }
            })     
        });
    }
    
    static update(parms) {
        return new Promise((resolve, rejected) => {
            const { id, username, password, isAdmin } = parms;
            db.query(UPDATE_USER, [username, password, isAdmin, id], (error, results) => {
                if (error) {
                    rejected(error);
                } else {
                    try {
                        resolve(new User(id, username, password, isAdmin));
                    } catch (err) {
                        rejected(err);
                    }
                }
            })
        });
    }

    static delete(id) {
        return new Promise((resolve, rejected) => {
            db.query(DELETE_USER, [id], (error, results) => {
                if (error) {
                    rejected(error);
                } else {
                    try {
                        resolve('true');
                    } catch (err) {
                        rejected(err);
                    }
                }
            })
        });
    }

    static changePassword(parms) {
        return new Promise((resolve, rejected) => {
            const { id, password} = parms;
            db.query(CHANGE_USER_PASSWORD, [password, id], (error, results) => {
                if (error) {
                    rejected(error);
                } else {
                    try {
                        resolve(new User(id, password));
                    } catch (err) {
                        rejected(err);
                    }
                }
            })
        });
    }
}

module.exports = User;