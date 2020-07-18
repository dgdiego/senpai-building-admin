const db = require('../services/db-connection');

const GET_CONTRIBUTIONTYPE_BY_ID = 'SELECT * FROM contribution_types WHERE id = ?';
const GET_CONTRIBUTIONTYPE_BY_KEY = 'SELECT * FROM contribution_types WHERE building_id = ? AND expenses_type = ?';
const GET_ALL_CONTRIBUTIONTYPES = 'SELECT * FROM contribution_types';
const INSERT_CONTRIBUTIONTYPE = 'INSERT INTO contribution_types SET ?';

class ContributionType {

    constructor(id, building_id, expenses_type, expenses_value, saving_type, saving_value, init_date, end_date) {
        this.id = id;
        this.building_id = building_id;
        this.expenses_type = expenses_type;
        this.expenses_value = expenses_value;
        this.saving_type = saving_type;
        this.saving_value = saving_value;
        this.init_date = init_date;
        this.end_date = end_date;
    }

    static getContributionTypeById(id) {
        return new Promise(function (resolve, reject) {
            db.query(GET_CONTRIBUTIONTYPE_BY_ID, [id], function (error, results) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        if (results && results.length > 0) {
                            const { id, building_id, expenses_type, expenses_value, saving_type, saving_value, init_date, end_date } = results[0];
                            resolve(new ContributionType(id, building_id, expenses_type, expenses_value, saving_type, saving_value, init_date, end_date));
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

    static getContributionTypeByKey(building_id, expenses_type) {
        return new Promise(function (resolve, reject) {
            db.query(GET_CONTRIBUTIONTYPE_BY_KEY, [building_id, expenses_type], function (error, results) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        if (results && results.length > 0) {
                            const { id, building_id, expenses_type, expenses_value, saving_type, saving_value, init_date, end_date } = results[0];
                            resolve(new ContributionType(id, building_id, expenses_type, expenses_value, saving_type, saving_value, init_date, end_date));
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

    static getAllContributionTypes() {
        return new Promise(function (resolve, reject) {
            db.query(GET_ALL_CONTRIBUTIONTYPES, function (error, results) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        resolve(results.map((contributionType) => {
                            const { id, building_id, expenses_type, expenses_value, saving_type, saving_value, init_date, end_date } = contributionType;
                            return new ContributionType(id, building_id, expenses_type, expenses_value, saving_type, saving_value, init_date, end_date);
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
            const { building_id, expenses_type, expenses_value, saving_type, saving_value, init_date, end_date } = parms;

            this.getContributionTypeByKey(building_id, expenses_type)
                .then((found) => {
                    if (!found) {
                        const newContributionType = {
                            building_id,
                            expenses_type,
                            expenses_value,
                            saving_type,
                            saving_value,
                            init_date,
                            end_date
                        };
                        db.query(INSERT_CONTRIBUTIONTYPE, newContributionType, (error, results) => {
                            if (error) {
                                rejected(error);
                            } else {
                                try {
                                    resolve(new ContributionType(results.insertId, building_id, expenses_type, expenses_value, saving_type, saving_value, init_date, end_date));
                                } catch (err) {
                                    rejected(err);
                                }
                            }
                        });
                    } else {
                        resolve(null);
                    }
                })
                .catch((error) => {
                    rejected(error);
                });
        });
    }
}

module.exports = ContributionType;