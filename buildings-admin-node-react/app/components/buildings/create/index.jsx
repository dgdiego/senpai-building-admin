const React = require('react');
const { Link } = require('react-router-dom');
const { Redirect } = require('react-router-dom');
const { post } = require('../../../services/restClient');
const Layout = require('../../layout');

class CreateBuilding extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            redirect: null,
            error: false,
            message: ''
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    handleAddressChange(event) {
        this.setState({
            address: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        post({
            url: '/api/buildings/create',
            method: 'POST',
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify({
                name: this.state.name,
                address: this.state.address
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
            return <Redirect to="/buildings" />
        }
        return (
            <div>
                <Layout>
                    <div className="container">
                        <div className="py-5">
                            <h2 className="d-inline">Agregar edificio</h2>
                            <Link to={`/buildings`}><button type="button" class="btn btn-outline-primary float-right"><i className="fas fa-undo"></i> Volver</button></Link>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div class="form-group">
                                <label for="name">Nombre</label>
                                <input type="text" class="form-control col-3" id="name" name="name" value={this.state.name} required onChange={this.handleNameChange} />
                            </div>
                            <div class="form-group">
                                <label for="address">Dirección</label>
                                <input type="text" class="form-control col-6" id="address" name="address" value={this.state.address} required onChange={this.handleAddressChange} />
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

module.exports = CreateBuilding;
