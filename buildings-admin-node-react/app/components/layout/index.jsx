const React = require('react');
const Header = require('./header');
const Footer = require('./footer');
const { AppContext } = require('../../contexts/appContext');

class Layout extends React.Component {
    render() {
        return (
            <AppContext.Consumer>
                {({ user }) => (
                    <div>
                        <Header currentUser={user} />
                        <div className="page-content">
                            {this.props.children}
                        </div>
                        <Footer currentUser={user.username}/>
                    </div>
                )}
            </AppContext.Consumer>
        );
    }
};

module.exports = Layout;
