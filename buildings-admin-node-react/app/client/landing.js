const React = require('react');
const ReactDOM = require('react-dom');
const { BrowserRouter } = require('react-router-dom');

const LandingPage = require('../pages/landing/view');
const styles = require('../pages/landing/style.scss');

const initialState = JSON.parse(window.__STATE__);

delete window.__STATE__;

ReactDOM/ReactDOM.hydrate(
    <BrowserRouter>
        <LandingPage initialState={initialState}/>
    </BrowserRouter>,
    document.getElementById('app')
);

// ReactDOM.hydrate(<ToDoListPage initialState={initialState}/>, document.getElementById('app'));
