const React = require('react');
const { Link } = require('react-router-dom');
const Layout = require('../layout');
const { get, post } = require('../../services/restClient');

class Buildings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buildings: null,
            loading: true,
            error: false,
            message: '',
            buildingToDelete: null
        };
    }

    loadData() {
        get(`/api/buildings/`)
            .then((data) => {
                this.setState({
                    buildings: data.data,
                    loading: false,
                    error: false,
                });
            })
            .catch((err) => {
                this.setState({
                    buildings: null,
                    loading: false,
                    error: true,
                    message: err
                });
            });
    }

    componentDidMount() {
        this.loadData();
    }

    handleBuildingToDelete(building, event) {
        this.setState({
            buildingToDelete: building
        })
    }

    handleDelete(event) {
        post({
            url: `/api/buildings/${this.state.buildingToDelete.id}`,
            method: 'DELETE',
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify({
                id: this.state.buildingToDelete.id,
            })
        }).then((data) => {
            this.setState({
                buildingToDelete: null,
                error: false
            });
            this.loadData();
            this.closeModal();

        }).catch((err) => {
            this.setState({
                error: true,
                message: err.message
            });
            this.closeModal();
        });
    }

    closeModal() {
        $('#staticBackdrop').modal('hide');
    }

    render() {
        const buildings = this.state.buildings;
        if (this.state.loading) {
            return (
                <Layout>
                    <div className="container">
                        <div class="d-flex align-items-center">
                            <strong>Cargando edificio...</strong>
                            <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                        </div>
                    </div>
                </Layout>
            )
        }
        return (
            <Layout>
                <div className="container">
                    <div className="py-5">
                        <h1 className="d-inline">Listado de edificios</h1>
                        <Link to={`/buildings/create`}><button type="button" class="btn btn-outline-success float-right"><i className="fas fa-plus"></i> Agregar</button></Link>
                    </div>
                    {this.state.error &&
                        <div class="alert alert-danger" role="alert">
                            {this.state.message}
                        </div>
                    }
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Edificio</th>
                                <th scope="col">Dirección</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                buildings.map(building =>
                                    <tr key={building.id}>
                                        <th scope="row">{building.id}</th>
                                        <td><Link to={`/buildings/${building.id}/apartaments`}>{building.name}</Link></td>
                                        <td>{building.address}</td>
                                        <td><span className="float-right">
                                            <Link to={`/buildings/edit/${building.id}`} title="Editar" className="text-info"><i className="fas fa-edit"></i></Link>
                                            <a href="#" title="Borrar" className="text-danger ml-2"><i className="fas fa-trash-alt"
                                                onClick={this.handleBuildingToDelete.bind(this, building)}
                                                data-toggle="modal" data-target="#staticBackdrop"></i></a>
                                        </span>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="staticBackdropLabel">Atención</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    Seguro desea eliminar el edificio <span className="font-weight-bold">{this.state.buildingToDelete ? this.state.buildingToDelete.name : ''}</span> - Dirección: <span className="font-weight-bold">{this.state.buildingToDelete ? this.state.buildingToDelete.address : ''}</span>?
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                    <button type="button" class="btn btn-danger" onClick={this.handleDelete.bind(this)}>Sí, eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
};

module.exports = Buildings;
