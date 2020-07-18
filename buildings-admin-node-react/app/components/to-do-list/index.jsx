const React = require('react');
const Task = require('../task');
const {Link} = require ('react-router-dom');

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: null,
            loading: true,
            error: false,
        };
    }

    componentDidMount() {
        fetch(`/api/tasks/`)
            .then(res => res.json()).then((data) =>{
                console.log(data.tasks);
            this.setState({
                tasks: data.tasks,
                loading: false,
                error: false,
            });
        })
            .catch((err) => {
                console.error(err);
                this.setState({
                    tasks: null,
                    loading: false,
                    error: true,
                });
            });
    }

    render() {
        const tasks  = this.state.tasks;
        if (this.state.loading) {
            return <div>Cargando tareas ...</div>
        }
        return (
            <div>
                <h1>Listado de tares</h1>
                <Link to={`/to-do-list/new`}>Crear nueva tarea</Link>
                <ul className="to-do-list">
                    {
                        tasks.map(task => (
                            <Task key={task.id} id={task.id} name={task.name} description={task.description} />
                        ))
                    }
                </ul>
            </div>
        );
    }
};

module.exports = ToDoList;
