const db = require('../services/db-connection');
const { threadId } = require('../services/db-connection');

const GET_FUND_BY_ID = 'SELECT * FROM funds WHERE id = ?';
const GET_ALL_FUNDS_BY_BUILDING = 'SELECT * FROM funds WHERE building_id = ?';
const INSERT_FUND = 'INSERT INTO funds SET ?';

class Fund {

    constructor(id, building_id, date, initial_amount, credits, debits) {
        this.id = id;
        this.building_id = building_id;
        this.date = date;
        this.initial_amount = initial_amount;
        this.credits = credits;
        this.debits = debits;
    }

    static getFundById(id) {
        return new Promise(function (resolve, reject) {
            db.query(GET_FUND_BY_ID, [id], function (error, results) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        if (results && results.length > 0) {
                            const { id, building_id, date, initial_amount, credits, debits } = results[0];
                            resolve(new Fund(id, building_id, date, initial_amount, credits, debits));
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

    static getAllFundsByBuilding(idBuilding) {
        return new Promise(function (resolve, reject) {
            db.query(GET_ALL_FUNDS_BY_BUILDING, [idBuilding], function (error, results) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        resolve(results.map((obj) => {
                            const { id, building_id, date, initial_amount, credits, debits } = obj;
                            return new Fund(id, building_id, date, initial_amount, credits, debits);
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
            const { building_id, date, initial_amount, credits, debits } = parms;

            const newFund = {
                building_id,
                date,
                initial_amount,
                credits,
                debits
            };
            db.query(INSERT_FUND, newFund, (error, results) => {
                if (error) {
                    rejected(error);
                } else {
                    try {
                        resolve(new Fund(results.insertId, building_id, date, initial_amount, credits, debits));
                    } catch (err) {
                        rejected(err);
                    }
                }
            });
        });
    }
}

module.exports = Fund;