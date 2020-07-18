const React = require('react');
const { Link } = require('react-router-dom');
const { Redirect } = require('react-router-dom');
const { get } = require('../../../services/restClient');
const Apartaments = require('../../apartaments');
const Layout = require('../../layout');

class ViewBuilding extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            building: null,
            error: false,
            message: ''
        };
    }

    componentDidMount() {
        get(`/api/buildings/${this.props.id}`)
            .then((data) => {
                this.setState({
                    building: data.data,
                    loading: false,
                    error: false,
                    message: '',
                });
            }).catch((err) => {
                this.setState({
                    building: null,
                    loading: false,
                    error: true,
                    message: err.message
                });
            });
    }

    render() {
        const building = this.state.building;

        if (this.state.loading) {
            return (
                <div className="container">
                    <div class="d-flex align-items-center">
                        <strong>Cargando edificio...</strong>
                        <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <Layout>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="py-5">
                                    <h2 className="d-inline">Edificio</h2>
                                    <Link to={`/buildings`}><button type="button" class="btn btn-outline-primary float-right"><i className="fas fa-undo"></i> Volver</button></Link>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header">
                                <i className="fas fa-building"></i> {building.name}
                            </div>
                            <div class="card-body">
                                <p class="card-text"><i className="fas fa-map-marker-alt"></i> {building.address}</p>
                            </div>
                        </div>

                        {this.state.error &&
                            <div className="form-group">
                                <div class="alert alert-danger" role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        }
                    </div>
                    <Apartaments Building={building}></Apartaments>
                </Layout>
            </div>
        );
    }
};

module.exports = ViewBuilding;
