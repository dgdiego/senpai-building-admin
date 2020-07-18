const React = require('react');
const {Link} = require ('react-router-dom');
const { Redirect } = require ('react-router-dom');
const { Button } = require ('semantic-ui-react');

class NewTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            redirect: null
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    handleDescriptionChange(event) {
        this.setState({
            description: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch('/api/tasks', {
            method: 'POST',
            headers : { "Content-Type" : "application/json; charset=utf-8"},
            body: JSON.stringify({
                name: this.state.name,
                description: this.state.description
            })
        }).then(res => res.json()).then((data) =>{

            this.setState({
                redirect: true
            });

        }).catch((err) => {
            alert('Ocurrio un error');
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/to-do-list" />
        }
        return (
            <div>
                <h2 className="red-text">Crear una nueva tarea</h2>
                <Link to={`/to-do-list/`}>Ir al listado</Link>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        Name:
                        <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} />
                    </div>
                    <div>
                        Description:
                        <input type="text" name="decription" value={this.state.description} onChange={this.handleDescriptionChange}/>
                    </div>
                    <Button primary >Crear</Button>
                </form>
            </div>
        );
    }
};

module.exports = NewTask;
