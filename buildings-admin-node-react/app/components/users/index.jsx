const React = require('react');
const { Link } = require('react-router-dom');
const Layout = require('../layout');
const { get, post } = require('../../services/restClient');

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null,
            loading: true,
            error: false,
            message: '',
            userToDelete: null
        };
    }

    loadData() {
        get(`/api/users/`)
            .then((data) => {
                this.setState({
                    users: data.data,
                    loading: false,
                    error: false,
                });
            })
            .catch((err) => {
                this.setState({
                    users: null,
                    loading: false,
                    error: true,
                    message: err
                });
            });
    }

    componentDidMount() {
        this.loadData();
    }

    handleUserToDelete(user, event) {
        this.setState({
            userToDelete: user
        })
    }

    handleDelete(event) {
        post({
            url: `/api/users/${this.state.userToDelete.id}`,
            method: 'DELETE',
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify({
                id: this.state.userToDelete.id,
            })
        }).then((data) => {
            this.setState({
                userToDelete: null,
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
        const users = this.state.users;
        if (this.state.loading) {
            return (
                <div className="container">
                    <div class="d-flex align-items-center">
                        <strong>Cargando usuarios...</strong>
                        <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                    </div>
                </div>
            )
        }
        return (
            <Layout>
                <div className="container">
                    <div className="py-5">
                        <h1 className="d-inline">Listado de usuarios</h1>
                        <Link to={`/users/create`}><button type="button" class="btn btn-outline-success float-right"><i className="fas fa-plus"></i> Agregar</button></Link>
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
                                <th scope="col">Username</th>
                                <th scope="col">Administrador</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user =>
                                    <tr key={user.id}>
                                        <th scope="row">{user.id}</th>
                                        <td>{user.username}</td>
                                        <td>{user.isAdmin ? <i className="fas fa-check-square text-success"></i> : <i className="fas fa-times-circle text-danger"></i>}</td>
                                        <td><span className="float-right">
                                            <Link to={`/users/edit/${user.id}`} title="Editar" className="text-info"><i className="fas fa-edit"></i></Link>
                                            <a href="#" title="Borrar" className="text-danger ml-2"><i className="fas fa-trash-alt"
                                                onClick={this.handleUserToDelete.bind(this, user)}
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
                                    Seguro desea eliminar el usuario <span className="font-weight-bold">{this.state.userToDelete ? this.state.userToDelete.username : ''}</span>?
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

module.exports = Users;
