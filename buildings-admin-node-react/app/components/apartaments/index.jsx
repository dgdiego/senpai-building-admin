const React = require('react');
const { Link } = require('react-router-dom');
const { get } = require('../../services/restClient');
const { List, Image, Button } = require('semantic-ui-react')

class Apartaments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apartaments: null,
            loading: true,
            error: false,
        };
    }

    componentDidMount() {
        get(`/api/apartaments/${this.props.Building.id}`)
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

    render() {
        const apartaments = this.state.apartaments;
        const building = this.props.Building;
        const idBuilding = this.props.Building.id;

        if (this.state.loading) {
            return (
                <div className="container">
                    <div class="d-flex align-items-center">
                        <strong>Cargando apartamentos...</strong>
                        <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <div className="container">
                    <div className="py-5">
                        <h2 className="d-inline">Listado de apartamentos</h2>
                        {/*<Link to={`/buildings/${idBuilding}/apartaments/create`}><button type="button" class="btn btn-outline-success float-right"><i className="fas fa-plus"></i> Agregar</button></Link>*/}
                    </div>
                    <table className="table table-hover mb-5">
                        <thead>
                            <tr>
                                <th scope="col">Apto.</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Estado</th>
                                <th></th>   
                            </tr>
                        </thead>
                        <tbody>
                            {
                                apartaments.map(apartament =>
                                    <tr key={apartament.id}>
                                        <th scope="row">{apartament.number}</th>
                                        <td>{apartament.type}</td>
                                        <td>{apartament.state}</td>
                                        <td>
                                            <span className="float-right">
                                                <a href={`/payments/apartament/${apartament.id}?building=${building.id}`} title="Ver pagos" className="text-success"><i className="fas fa-cash-register"></i></a>
                                                {/*<Link to={{pathname: `/payments/apartament/${apartament.id}`, building: {building}}} title="Ver pagos" className="text-success"><i className="fas fa-cash-register"></i></Link>*/} 
                                                {/*<Link to={`/buildings/${idBuilding}/apartaments/${apartament.id}`} title="Editar" className="text-info ml-2"><i className="fas fa-edit"></i></Link>*/}
                                            </span>
                                       </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
};

module.exports = Apartaments;
