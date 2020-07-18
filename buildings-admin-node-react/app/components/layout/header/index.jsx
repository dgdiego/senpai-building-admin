const React = require('react');
const Logout = require('../../logout')

class Header extends React.Component {
    render() {
        const pathname = window.location.pathname.split('/')[1];
        const currentUser = this.props.currentUser
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="/home"><i className="fas fa-building"></i></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li class={`nav-item ${pathname == 'home' ? 'active' : ''}`}>
                                <a class="nav-link" href="/home">Inicio </a>
                            </li>
                            <li class={`nav-item ${pathname == 'buildings' ? 'active' : ''}`}>
                                <a class="nav-link" href="/buildings">Edificios </a>
                            </li>
                            {currentUser.isAdmin ?
                                <li class={`nav-item ${pathname == 'users' ? 'active' : ''}`}>
                                    <a class="nav-link" href="/users">Usuarios </a>
                                </li>
                            :''}
                            <li class={`nav-item ${pathname == 'profile' ? 'active' : ''}`}>
                                <a class="nav-link" href="/profile">Mi usuario </a>
                            </li>
                        </ul>
                        <Logout></Logout>
                    </div>
                </nav>

            </div>
        );
    }
};

module.exports = Header;