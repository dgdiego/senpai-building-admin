const React = require('react');
const { Link } = require('react-router-dom');
const { Redirect } = require('react-router-dom');
const Layout = require('../layout');
const { get, post } = require('../../services/restClient');

class UpdateProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            newPassword: '',
            error: false,
            message: ''
        };

        this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNewPasswordChange(event) {
        this.setState({
            newPassword: event.target.value
        });
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        post({
            url: `/api/profile`,
            method: 'POST',
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify({
                newPassword: this.state.newPassword,
                password: this.state.password,
            })
        }).then((data) => {
            window.location = '/home';
        }).catch((err) => {
            this.setState({
                error: true,
                message: err.message
            });
        });
    }

    render() {
        return (
            <div>
                <Layout>
                    <div className="container">
                        <div className="py-5">
                            <h2 className="d-inline">Editar contraseña</h2>
                            <a href="/home"><button type="button" class="btn btn-outline-primary float-right"><i className="fas fa-undo"></i> Volver</button></a>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div class="form-group">
                                <label for="password">Password actual</label>
                                <input type="password" class="form-control col-6" id="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
                            </div>
                            <div class="form-group">
                                <label for="newPassword">Password nuevo</label>
                                <input type="password" class="form-control col-6" id="newPassword" name="newPassword" value={this.state.newPassword} onChange={this.handleNewPasswordChange} />
                            </div>
                            <button type="submit" class="btn btn-success">Editar</button>
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

module.exports = UpdateProfile;
