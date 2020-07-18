const React = require('react');
const { Route } = require('react-router-dom');
const ToDoList = require('../../components/to-do-list');
const TaskDetail = require ('../../components/task-details');
const NewTask = require ('../../components/new-task')

class ToDoListPage extends React.Component {
    render() {
        const { tasks } = this.props.initialState;
        return (
            <React.Fragment>
                <Route
                    path="/to-do-list/task/:id"
                    render={(props) => <TaskDetail {...props} id={props.match.params.id}/>}
                />
                <Route
                    exact
                    path="/to-do-list"
                    render={(props) => <ToDoList {...props} tasks={tasks}/>}
                />
                <Route
                    exact
                    path="/to-do-list/new"
                    render={(props) => <NewTask {...props} tasks={tasks}/>}
                />
            </React.Fragment>
        );
    }
};

module.exports = ToDoListPage;
