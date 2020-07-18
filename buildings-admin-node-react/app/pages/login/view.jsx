const React = require('react');
const { Route } = require('react-router-dom');
const Login = require('../../components/login');

class LoginPage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Route
                    exact
                    path="/login"
                    render={(props) => <Login {...props}/>}
                />
            </React.Fragment>
        );
    }
};

module.exports = LoginPage;
