const db = require('../services/db-connection');

const GET_EXPENSE_BY_ID = 'SELECT * FROM expenses WHERE id = ?';
const GET_ALL_EXPENSES_BY_BUILDING = 'SELECT * FROM expenses WHERE building_id = ?';
const INSERT_EXPENSE = 'INSERT INTO expenses SET ?';

class Expense {

    constructor(id, building_id, date, description, amount, computable_amount) {
        this.id = id;
        this.building_id = building_id;
        this.date = date;
        this.description = description;
        this.amount = amount;
        this.computable_amount = computable_amount;
    }

    static getExpenseById(id) {
        return new Promise(function (resolve, reject) {
            db.query(GET_EXPENSE_BY_ID, [id], function (error, results) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        if (results && results.length > 0) {
                            const { id, building_id, date, description, amount, computable_amount } = results[0];
                            resolve(new Expense(id, building_id, date, description, amount, computable_amount));
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

    static getAllExpensesByBuilding(idBuilding) {
        return new Promise(function (resolve, reject) {
            db.query(GET_ALL_EXPENSES_BY_BUILDING, [idBuilding], function (error, results) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        resolve(results.map((obj) => {
                            const { id, building_id, date, description, amount, computable_amount } = obj;
                            return new Expense(id, building_id, date, description, amount, computable_amount);
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
            const { building_id, date, description, amount, computable_amount } = parms;

            const newExpense = {
                building_id,
                date,
                description,
                amount,
                computable_amount
            };
            db.query(INSERT_EXPENSE, newExpense, (error, results) => {
                if (error) {
                    rejected(error);
                } else {
                    try {
                        resolve(new Expense(results.insertId, building_id, date, description, amount, computable_amount));
                    } catch (err) {
                        rejected(err);
                    }
                }
            });
        });
    }
}

module.exports = Expense;