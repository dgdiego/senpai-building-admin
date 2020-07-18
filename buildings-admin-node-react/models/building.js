const db = require('../services/db-connection');
const GET_BUILDING_BY_ID = 'SELECT * FROM buildings WHERE id = ?';
const GET_BUILDING_BY_NAME = 'SELECT * FROM buildings WHERE name = ?';
const GET_ALL_BULDINGS = 'SELECT * FROM buildings';
const INSERT_BUILDING = 'INSERT INTO buildings SET ?';
const UPDATE_BUILDING = 'UPDATE buildings SET name = ?, address = ? WHERE id = ?';
const DELETE_BUILDING = 'DELETE FROM buildings WHERE id = ?';

class Building {
    constructor(id, name, address) {
        this.id = id;
        this.name = name;
        this.address = address;
    }

    static getBuildingById(id) {
        return new Promise(function (resolve, reject) {
            db.query(GET_BUILDING_BY_ID, [id], function (error, results) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        if (results && results.length > 0) {
                            const { id, name, address } = results[0];
                            resolve(new Building(id, name, address));
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

    static getBuildingByName(name) {
        return new Promise(function (resolve, reject) {
            db.query(GET_BUILDING_BY_NAME, [name], function (error, results) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        if (results && results.length > 0) {
                            const { id, name, address } = results[0];
                            resolve(new Building(id, name, address));
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

    static getAllBuildings() {
        return new Promise(function (resolve, reject) {
            db.query(GET_ALL_BULDINGS, function (error, results) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        resolve(results.map((building) => {
                            const { id, name, address } = building;
                            return new Building(id, name, address);
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
            const { name, address } = parms;
            const newBuilding = {
                name,
                address
            };
            db.query(INSERT_BUILDING, newBuilding, (error, results) => {
                if (error) {
                    rejected(error);
                } else {
                    try {
                        resolve(new Building(results.insertId, name, address));
                    } catch (err) {
                        rejected(err);
                    }
                }
            })     
        });
    }
    
    static update(parms) {
        return new Promise((resolve, rejected) => {
            const { id, name, address } = parms;
            db.query(UPDATE_BUILDING, [name, address, id], (error, results) => {
                if (error) {
                    rejected(error);
                } else {
                    try {
                        resolve(new Building(id, name, address));
                    } catch (err) {
                        rejected(err);
                    }
                }
            })
        });
    }

    static delete(id) {
        return new Promise((resolve, rejected) => {
            db.query(DELETE_BUILDING, [id], (error, results) => {
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
}

module.exports = Building;