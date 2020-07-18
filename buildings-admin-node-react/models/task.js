const db = require('../services/db-connection');
const GET_TASK_BY_ID = 'SELECT * from tasks where id = ?';
const GET_ALL_TASKS = 'SELECT * from tasks';

class Task {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    static getTaskById(id) {
        return new Promise(function (resolve, reject) {
            db.query(GET_TASK_BY_ID, [id], function (error, results) {
                if (error) {
                    reject(error);
                } else {
                    const { id, name, description } = results[0];
                    resolve(new Task(id, name, description));
                }
              });
        })
    }

    static getAllTasks() {
        return new Promise(function (resolve, reject) {
            db.query(GET_ALL_TASKS, function (error, results) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        resolve(results.map((task) => {
                            const { id, name, description } = task;
                            return new Task(id, name, description);
                        }));
                    } catch(err) {
                        reject(err);
                    }
                }
              });
        })
    }
}

module.exports = Task;