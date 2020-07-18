const React = require('react');
const ReactDOM = require('react-dom');
const { BrowserRouter } = require('react-router-dom');

const ToDoListPage = require('../pages/to-do-list/view');
const styles = require('../pages/to-do-list/style.scss');

const initialState = JSON.parse(window.__STATE__);

delete window.__STATE__;

ReactDOM/ReactDOM.hydrate(
    <BrowserRouter>
        <ToDoListPage initialState={initialState}/>
    </BrowserRouter>,
    document.getElementById('app')
);

// ReactDOM.hydrate(<ToDoListPage initialState={initialState}/>, document.getElementById('app'));
