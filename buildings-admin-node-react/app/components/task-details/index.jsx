const React = require('react');
const {Link} = require ('react-router-dom');

class TaskDetail extends React.Component {
    constructor(props) {
        super (props);

        this.state = {
            task: null, 
            loading: true,
            error: null,
        }
    }
    componentDidMount() {
        fetch(`/api/tasks/${this.props.id}`)
        .then(res => res.json()).then((data) =>{
            this.setState({
                task: data.task, 
                loading: false,
                error: false,
            });
        }) 
        .catch((err) => {
            console.error(err);
            this.setState({
                task: null, 
                loading: false,
                error: true,
            });
        });
    }
    render(){
        if (this.state.loading) {
            return (
                <div>Cargando...</div>
            )
        }

        if (this.state.error) {
            return (
                <div>Ocurrio un error al obtener la tarea</div>
            )
        }

        return(
            <div>
                <Link to={`/to-do-list`}>Ir al listado</Link>
                <div>Detalle de tarea</div>
                {JSON.stringify(this.state.task)}
            </div>
        )
    }
}

module.exports = TaskDetail;
