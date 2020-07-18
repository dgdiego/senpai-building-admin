const React = require('react');
const { Redirect } = require('react-router-dom');
const { Link } = require('react-router-dom');
const { post } = require('../../services/restClient');

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: null,
            error: false,
            message: ''
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
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

    handleSubmit(event) {
        event.preventDefault();

        post({
            url: `/api/login`,
            method: 'POST',
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
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
            <div class="container">
                <div class="row">
                    <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div class="card card-signin my-5">
                            <div class="card-body">
                                <h5 class="card-title text-center">Administrador de Edificios</h5>
                                <p className="text-center">Bienvenido</p>
                                {this.state.error &&
                                    <div class="alert alert-danger" role="alert">
                                        {this.state.message}
                                    </div>
                                }
                                <form class="form-signin" onSubmit={this.handleSubmit}>
                                    <div class="form-label-group">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1"><i className="fas fa-user"></i></span>
                                            </div>
                                            <input type="text" class="form-control" placeholder="Username" aria-label="Username" name="username" value={this.state.username} required onChange={this.handleUsernameChange} />
                                        </div>
                                    </div>
                                    <div class="form-label-group">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i className="fas fa-lock"></i></span>
                                            </div>
                                            <input type="password" class="form-control" placeholder="Password" aria-label="Password" name="password" value={this.state.password} required onChange={this.handlePasswordChange} />
                                        </div>
                                    </div>
                                    <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Ingresar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

module.exports = Login;
