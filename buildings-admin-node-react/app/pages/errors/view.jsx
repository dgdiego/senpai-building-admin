const React = require('react');
const { Route } = require('react-router-dom');
const Login = require('../../components/errors');

class ErrorsPage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Route
                    exact
                    path="/error/:id"
                    render={(props) => <Login {...props} id={props.match.params.id}/>}
                />
            </React.Fragment>
        );
    }
};

module.exports = ErrorsPage;
