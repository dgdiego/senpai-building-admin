const React = require('react');
const {Link} = require ('react-router-dom');

class Task extends React.Component {
  render() {
    return (
      <li>
        <h2>{this.props.id}: {this.props.name}</h2>
        <p>{this.props.description}</p>
        <Link to={`/to-do-list/task/${this.props.id}`}>Ir a la tarea</Link>
      </li>
    );
  }
};

module.exports = Task;