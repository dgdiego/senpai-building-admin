const React = require('react');
const ReactDOM = require('react-dom');
const { BrowserRouter } = require('react-router-dom');

const HomePage = require('../pages/home/view');
const styles = require('../pages/home/style.scss');

const initialState = JSON.parse(window.__STATE__);

delete window.__STATE__;

ReactDOM/ReactDOM.hydrate(
    <BrowserRouter>
        <HomePage initialState={initialState}/>
    </BrowserRouter>,
    document.getElementById('app')
);

// ReactDOM.hydrate(<ToDoListPage initialState={initialState}/>, document.getElementById('app'));
