const React = require('react');
const { Route } = require('react-router-dom');
const Home = require('../../components/home');
const { AppContext } = require('../../contexts/appContext');

class HomePage extends React.Component {
    render() {
        const { currentUser } = this.props.initialState;

        const appContextValue = {
            user: currentUser
        }

        return (
            <AppContext.Provider value={appContextValue}>
                <React.Fragment>
                    <Route
                        exact
                        path="/home"
                        render={(props) => <Home {...props} />}
                    />
                </React.Fragment>
            </AppContext.Provider>
        );
    }
};

module.exports = HomePage;
