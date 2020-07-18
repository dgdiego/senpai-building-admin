const React = require('react');
const { Route } = require('react-router-dom');
const Profile = require('../../components/profile');
const { AppContext } = require('../../contexts/appContext');


class ProfilePage extends React.Component {
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
                        path="/profile"
                        render={(props) => <Profile {...props} />}
                    />
                </React.Fragment>
            </AppContext.Provider>
        );
    }
};

module.exports = ProfilePage;
