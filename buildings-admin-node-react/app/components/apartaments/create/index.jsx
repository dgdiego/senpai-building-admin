const React = require('react');
const { Link } = require('react-router-dom');
const { Redirect } = require('react-router-dom');
const { post } = require('../../../services/restClient');

class CreateApartament extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            number: '',
            address: '',
            redirect: null,
            error: false,
            message: ''
        };

        this.handleNameChange = this.handleNumberChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNumberChange(event) {
        this.setState({
            number: event.target.value
        });
    }

    handleAddressChange(event) {
        this.setState({
            address: event.target.value
        });
    }

    componentDidMount() {
        get(`/api/apartaments/${this.props.idBuilding}`)
            .then((data) => {
                this.setState({
                    apartaments: data.data,
                    loading: false,
                    error: false,
                });
            })
            .catch((err) => {
                this.setState({
                    apartaments: null,
                    loading: false,
                    error: true,
                });
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
            return <Redirect to={`/buildings/${idBuilding}/apartaments`}/>
        }
        return (
            <div>
                <div className="container">
                    <div className="py-5">
                        <h2 className="d-inline">Agregar apartamento</h2>
                        <Link to={`/buildings/${idBuilding}/apartaments`}><button type="button" class="btn btn-outline-primary float-right"><i className="fas fa-undo"></i> Volver</button></Link>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div class="form-group">
                            <label for="number">Número</label>
                            <input type="text" class="form-control col-3" id="number" name="number" value={this.state.number} required onChange={this.handleNumberChange} />
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
            </div>
        );
    }
};

module.exports = CreateApartament;
