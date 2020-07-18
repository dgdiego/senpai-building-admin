const React = require('react');
const { Route } = require('react-router-dom');
const Landing = require('../../components/landing');

class LandingPage extends React.Component {
    render() {
        return (
                <React.Fragment>
                    <Route
                        exact
                        path="/"
                        render={(props) => <Landing {...props} />}
                    />
                </React.Fragment>
        );
    }
};

module.exports = LandingPage;
