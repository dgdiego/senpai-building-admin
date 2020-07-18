const React = require('react');

class Footer extends React.Component {
    render() {
        return (
            <div>
                <div class="fixed-bottom navbar-light bg-light">
                    <div className="row">
                        <div className="col-sm-6 py-2"><span className="ml-2 font-weight-light">Usuario: {this.props.currentUser}</span></div>
                        <div className="col-sm-6 text-right py-2"><span className="mr-2 font-weight-light">{new Date().toLocaleDateString()}</span></div>
                    </div>
                </div>
            </div>
        );
    }
};

module.exports = Footer;