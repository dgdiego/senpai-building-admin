const React = require('react');
const { Link } = require('react-router-dom');
const { Redirect } = require('react-router-dom');
const Layout = require('../../layout');
const { post } = require('../../../services/restClient');

class CreateUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isAdmin: false,
            redirect: null,
            error: false,
            message: ''
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleIsAdminChange = this.handleIsAdminChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        });
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    handleIsAdminChange(event) {
        this.setState({
            isAdmin: event.target.checked
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        post({
            url: '/api/users/create',
            method: 'POST',
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                isAdmin: this.state.isAdmin
            })
        }).then((data) => {
            this.setState({
                redirect: true
            });
        }).catch((err) => {
            this.setState({
                error: true,
                message: err.message
            });
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/users" />
        }
        return (
            <div>
                <Layout>
                    <div className="container">
                        <div className="py-5">
                            <h2 className="d-inline">Agregar usuario</h2>
                            <Link to={`/users`}><button type="button" class="btn btn-outline-primary float-right"><i className="fas fa-undo"></i> Volver</button></Link>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div class="form-group">
                                <label for="name">Username</label>
                                <input type="text" class="form-control col-3" id="username" name="username" value={this.state.username} required onChange={this.handleUsernameChange} />
                            </div>
                            <div class="form-group">
                                <label for="address">Password</label>
                                <input type="password" class="form-control col-6" id="password" name="password" value={this.state.password} required onChange={this.handlePasswordChange} />
                            </div>
                            <div class="form-group">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="isAdminUser" onChange={this.handleIsAdminChange} />
                                    <label class="form-check-label" for="isAdminUser">Administrador</label>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-success">Agregar</button>
                        </form>
                        {this.state.error &&
                            <div className="form-group">
                                <div class="alert alert-danger" role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        }
                    </div>
                </Layout>
            </div>
        );
    }
};

module.exports = CreateUser;
