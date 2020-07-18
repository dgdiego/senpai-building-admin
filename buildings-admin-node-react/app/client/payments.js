const React = require('react');
const ReactDOM = require('react-dom');
const { BrowserRouter } = require('react-router-dom');

const PaymentPage = require('../pages/payments/view');
const styles = require('../pages/payments/style.scss');

const initialState = JSON.parse(window.__STATE__);

delete window.__STATE__;

ReactDOM/ReactDOM.hydrate(
    <BrowserRouter>
        <PaymentPage initialState={initialState}/>
    </BrowserRouter>,
    document.getElementById('app')
);

// ReactDOM.hydrate(<ToDoListPage initialState={initialState}/>, document.getElementById('app'));
