const Expense = require('../models/expense');

const getAllExpensesByBuilding = (req, res, next) => {
    Expense.getAllExpensesByBuilding(req.params.idBuilding)
        .then((Expenses) => {
            res.status(200);
            res.json({
                Expenses,
            });
        })
        .catch((error) => {
            next(error);
        });

}

const getExpenseById = (req, res, next) => {
    Expense.getExpenseById(req.params.id)
        .then((Expense) => {
            if (Expense) {
                res.status(200);
                res.json({
                    Expense,
                });
            } else {
                res.status(404);
                res.json({
                    success: false,
                    message: 'No existe un gasto con el ID especificado',
                });
            }
        })
        .catch((error) => {
            next(error);
        });

}

const createExpense = (req, res, next) => {
    Expense.create(req.body)
        .then((Expense) => {
            res.status(200);
            res.json({
                Expense,
            });
        })
        .catch((error) => {
            next(error);
        });
}

module.exports = {
    getAllExpensesByBuilding,
    getExpenseById,
    createExpense
}