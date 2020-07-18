const React = require('react');

class Error extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const error = this.props.id;
        var title = '';
        var message = '';
        switch (error) {
            case '403':
                title = 'Acceso Denegado!';
                message = 'Parece que no tienes los permisos necesarios para ejectutar esta operación.';
                break;
            case '500':
                title = 'Error interno del servidor!';
                message = 'El servidor respondido con un error interno al intentar resolver la operación.';
        }
        return (
            <div className="bg-warning vh-100">
                <div class="jumbotron bg-warning text-center">
                    <h1 class="display-4">¡HTTP {error}!</h1>
                    <p class="lead font-weight-bold">{title}</p>
                    <hr class="my-4" />
                    <p>{message}</p>
                    <a class="btn btn-primary btn-lg" href="/home" role="button">Retornarme al inicio</a>
                </div>
            </div>
        );
    }
};

module.exports = Error;
