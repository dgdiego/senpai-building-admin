const React = require('react');
const ReactDOM = require('react-dom');
const { BrowserRouter } = require('react-router-dom');

const ErrorPage = require('../pages/errors/view');
const styles = require('../pages/errors/style.scss');

const initialState = JSON.parse(window.__STATE__);

delete window.__STATE__;

ReactDOM/ReactDOM.hydrate(
    <BrowserRouter>
        <ErrorPage initialState={initialState}/>
    </BrowserRouter>,
    document.getElementById('app')
);

// ReactDOM.hydrate(<ToDoListPage initialState={initialState}/>, document.getElementById('app'));
