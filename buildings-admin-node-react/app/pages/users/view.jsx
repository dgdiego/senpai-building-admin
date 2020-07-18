const React = require('react');
const { Route } = require('react-router-dom');
const Users = require('../../components/users');
const CreateUser = require('../../components/users/create');
const UpdateUser = require('../../components/users/update');
const { AppContext } = require('../../contexts/appContext');


class UsersPage extends React.Component {
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
                        path="/users"
                        render={(props) => <Users {...props} />}
                    />
                    <Route
                        exact
                        path="/users/create"
                        render={(props) => <CreateUser {...props} />}
                    />
                    <Route
                        exact
                        path="/users/edit/:id"
                        render={(props) => <UpdateUser {...props} id={props.match.params.id} />}
                    />
                </React.Fragment>
            </AppContext.Provider>
        );
    }
};

module.exports = UsersPage;
