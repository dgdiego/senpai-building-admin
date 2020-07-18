const React = require('react');
const { Link } = require('react-router-dom');
const { Redirect } = require('react-router-dom');
const Layout = require('../layout');
const { get, post } = require('../../services/restClient');

class Payments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            payments: null,
            error: false,
            message: '',
            paymentToDelete: null,
            building: null,
            apartament: null
        };
    }

    initData() {
        get(`/api/buildings/${this.props.idBuilding}`)
            .then((data) => {
                this.setState({
                    building: data.data,
                });
            }).catch((err) => {
                this.setState({
                    error: true,
                    message: err.message
                });
            });

        get(`/api/apartaments/${this.props.idBuilding}/${this.props.idApto}`)
            .then((data) => {
                this.setState({
                    apartament: data.data,
                });
            }).catch((err) => {
                this.setState({
                    error: true,
                    message: err.message
                });
            });
    }

    loadData() {
        get(`/api/payments/apartament/${this.props.idApto}`)
            .then((data) => {
                this.setState({
                    payments: data.data,
                    loading: false,
                    error: false,
                    message: '',
                });
            }).catch((err) => {
                this.setState({
                    payments: null,
                    loading: false,
                    error: true,
                    message: err.message
                });
            });
    }


    componentDidMount() {
        this.initData();
        this.loadData();
    }

    handlePaymentToDelete(payment, event) {
        this.setState({
            paymentToDelete: payment
        })
    }

    handleDelete(event) {
        post({
            url: `/api/payments/${this.state.paymentToDelete.id}`,
            method: 'DELETE',
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify({
                id: this.state.paymentToDelete.id,
            })
        }).then((data) => {
            this.setState({
                paymentToDelete: null
            });
            this.loadData();
            this.closeModal();


        }).catch((err) => {
            this.setState({
                error: true,
                message: err.message
            });
            this.closeModal();
            alert(this.state.message);
        });
    }

    closeModal() {
        $('#staticBackdrop').modal('hide');
    }

    render() {
        const payments = this.state.payments;
        const idApto = this.props.idApto;
        const building = this.state.building;
        const apartament = this.state.apartament;


        if (!this.state.payments || !this.state.building || !this.state.apartament) {
            return (
                <Layout>
                    <div className="container">
                        <div class="d-flex align-items-center">
                            <strong>Cargando pagos...</strong>
                            <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                        </div>
                    </div>
                </Layout>
            )
        }

        if (this.state.building.id != this.state.apartament.building_id) {
            return (
                <Layout>
                    <div className="container">
                        <div class="alert alert-danger" role="alert">
                            Oops! Algo hice mal. <a href="/buildings" class="alert-link">Retornarme al Inicio</a>.
                    </div>
                    </div>
                </Layout>
            )
        }

        return (
            <div>
                <Layout>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="py-5">
                                    <h2 className="d-inline">Pagos</h2>
                                    <a href={`/buildings/${this.props.idBuilding}/apartaments`}><button type="button" class="btn btn-outline-primary float-right"><i className="fas fa-undo"></i> Volver</button></a>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header">
                                <i className="fas fa-building"></i> {building.name}
                            </div>
                            <div class="card-body">
                                <p class="card-text"><i className="fas fa-map-marker-alt"></i> {building.address}</p>
                                <p class="card-text"><i className="fas fa-home"></i> {apartament.number} <i className="fas fa-chevron-circle-right"></i> {apartament.type}</p>
                            </div>
                        </div>

                        {this.state.error &&
                            <div className="form-group">
                                <div class="alert alert-danger" role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        }


                        <div className="py-5">
                            <h2 className="d-inline">Listado de pagos</h2>
                            <Link to={{pathname: `/payments/${idApto}/create`, building: building, apartament: apartament}}><button type="button" class="btn btn-outline-success float-right"><i className="fas fa-plus"></i> Agregar</button></Link>
                        </div>
                        <table className="table table-hover mb-5">
                            <thead>
                                <tr>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Importe</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    payments.map(payment =>
                                        <tr key={payment.id}>
                                            <th scope="row">{payment.date}</th>
                                            <td>{payment.amount}</td>
                                            <td>
                                                <span className="float-right">
                                                    <Link to={{pathname: `/payments/${payment.id}`, building: building, apartament: apartament }} title="Editar" className="text-primary"><i className="fas fa-edit"></i></Link>
                                                    <a href="#" title="Borrar" className="text-danger ml-2"><i className="fas fa-trash-alt"
                                                        onClick={this.handlePaymentToDelete.bind(this, payment)}
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
                                        Seguro desea eliminar el pago de Fecha <span className="font-weight-bold">{this.state.paymentToDelete ? this.state.paymentToDelete.date : ''}</span> y Monto <span className="font-weight-bold">{this.state.paymentToDelete ? this.state.paymentToDelete.amount : ''}</span>?
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
            </div>
        );
    }
};

module.exports = Payments;
