const React = require('react');
const Layout = require('../layout');
const { AppContext } = require('../../contexts/appContext');

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            algo: null,
        };
    }

    render() {
        return (
            <AppContext.Consumer>
                {({ user }) => (
                    <Layout>
                        <div className="container-fulid background-home vh-100">
                            <div className="container">
                                <div class="jumbotron background-home">
                                    <h1 class="display-4">Hola, {user.username}!</h1>
                                    <p class="lead">Bienvenido al sistema de administración de edificios</p>
                                    <hr class="my-4" />
                                    <p>Las distintas funcionalidades las encontrarás haciendo click en el siguiente botón</p>
                                    <a class="btn btn-primary btn-lg" href="/buildings" role="button">Comenzar</a>
                                </div>
                            </div>
                        </div>
                    </Layout>
                )}
            </AppContext.Consumer>
        )
    }
};

module.exports = Home;
