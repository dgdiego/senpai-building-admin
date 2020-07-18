const db = require('../services/db-connection');
const Building = require('./building');

const GET_APARTAMENT_BY_ID = 'SELECT * FROM apartaments WHERE id = ?';
const GET_APARTAMENT_BY_KEY = 'SELECT * FROM apartaments WHERE number = ? AND building_id = ? AND type = ?';
const GET_ALL_APARTAMENTS_BY_BUILDING = 'SELECT * FROM apartaments WHERE building_id = ?';
const INSERT_APARTAMENT = 'INSERT INTO apartaments SET ?';

class Apartament {

    building = null;

    constructor(id, number, building_id, type, state, contribution_type) {
        this.id = id;
        this.number = number;
        this.building_id = building_id;
        this.type = type;
        this.state = state;
        this.contribution_type = contribution_type;
    }

    static getApartamentById(id) {
        return new Promise(function (resolve, reject) {
            db.query(GET_APARTAMENT_BY_ID, [id], function (error, results) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        if (results && results.length > 0) {
                            const { id, number, building_id, type, state, contribution_type } = results[0];
                            resolve(new Apartament(id, number, building_id, type, state, contribution_type));
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

    static getApartamentByKey(number, building_id, type) {
        return new Promise(function (resolve, reject) {
            db.query(GET_APARTAMENT_BY_KEY, [number, building_id, type], function (error, results) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        if (results && results.length > 0) {
                            const { id, number, building_id, type, state, contribution_type } = results[0];
                            resolve(new Apartament(id, number, building_id, type, state, contribution_type));
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

    static getAllApartamentsByBuilding(idBuilding) {
        return new Promise(function (resolve, reject) {
            db.query(GET_ALL_APARTAMENTS_BY_BUILDING, [idBuilding], function (error, results) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        resolve(results.map((Apto) => {
                            const { id, number, building_id, type, state, contribution_type } = Apto;
                            return new Apartament(id, number, building_id, type, state, contribution_type);
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
            const { number, building_id, type, state, contribution_type } = parms;

            const newApartament = {
                number,
                building_id,
                type,
                state,
                contribution_type,
            };
            db.query(INSERT_APARTAMENT, newApartament, (error, results) => {
                if (error) {
                    rejected(error);
                } else {
                    try {
                        resolve(new Apartament(results.insertId, number, building_id, type, state, contribution_type));
                    } catch (err) {
                        rejected(err);
                    }
                }
            });
        });
    }
}

module.exports = Apartament;