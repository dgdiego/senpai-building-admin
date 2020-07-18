const React = require('react');
const { post } = require('../../services/restClient');

class Logout extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        console.log(event);
        event.preventDefault();

        post({
            url: `/api/logout`,
            method: 'POST',
            headers: { "Content-Type": "application/json; charset=utf-8" }
        }).then((data) => {
            window.location = './login';
        }).catch((err) => {
            window.location = './buildings';
        });
    }

    render() {
        return (
            <div>
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a href="/logut" className="nav-link" onClick={this.handleSubmit}><i className="fas fa-sign-out-alt"></i> Salir</a>
                    </li>
                </ul>
            </div>
        );
    }
};

module.exports = Logout;
