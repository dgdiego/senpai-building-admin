const React = require('react');

class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            algo: null,
        };
    }

    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-lg bg-navbar text-uppercase fixed-top" id="mainNav">
                    <div class="container">
                        <a class="navbar-brand js-scroll-trigger text-white" href="#page-top">Building Admin</a>
                        <button class="navbar-toggler navbar-toggler-right text-uppercase font-weight-bold bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            <i class="fas fa-bars"></i>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarResponsive">
                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger text-white" href="/login">Login</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <header id="page-top" class="masthead bg-custom text-white text-center vh-100">
                    <div class="container d-flex align-items-center flex-column">

                        <img class="masthead-avatar mb-5" src="imgs/logo-building.png" alt="" />

                        <h1 class="masthead-heading text-uppercase mb-0">Building Admin</h1>

                        <div class="divider-custom divider-light">
                            <div class="divider-custom-line"></div>
                            <div class="divider-custom-icon"><i class="fas fa-building"></i></div>
                            <div class="divider-custom-line"></div>
                        </div>

                        <p class="masthead-subheading font-weight-light mb-0">Administrador de edificios</p>
                    </div>
                </header>


                <section class="page-section bg-light  mb-0" id="about">
                    <div class="container">

                        <h2 class="page-section-heading text-center text-uppercase">Acerca de la aplicación</h2>

                        <div class="divider-custom ">
                            <div class="divider-custom-line"></div>
                            <div class="divider-custom-icon"><i class="fab fa-node-js"></i>   <i class="fab fa-react"></i></div>
                            <div class="divider-custom-line"></div>
                        </div>

                        <div class="row">
                            <div class="col text-center"><p class="lead">Aplicación desarrollada utilizandolas tecnologías de NODE.js y REACT.</p></div>
                        </div>

                        <div class="text-center mt-4">
                            <a class="btn btn-xl btn-outline-light" href="https://startbootstrap.com/themes/freelancer/">
                                <i class="fas fa-download mr-2"></i>
                        Free Download!
                    </a>
                        </div>
                    </div>
                </section>


                <footer class="footer text-center">
                    <div class="container">
                        <div class="row">

                            <div class="col-lg-4 mb-5 mb-lg-0">
                                <h4 class="text-uppercase mb-4">Desarrollador</h4>
                                <p class="lead mb-0">
                                    Diego Giménez
                        </p>
                            </div>

                            <div class="col-lg-4 mb-5 mb-lg-0">
                                <h4 class="text-uppercase mb-4">Tecnologías</h4>
                                <a class="btn btn-outline-light btn-social mx-1" href="https://nodejs.org/en/" target="_blank"><i class="fab fa-node-js"></i></a>
                                <a class="btn btn-outline-light btn-social mx-1" href="https://es.reactjs.org/" target="_blank"><i class="fab fa-react"></i></a>
                                <a class="btn btn-outline-light btn-social mx-1" href="https://developer.mozilla.org/es/docs/HTML/HTML5" target="_blank"><i class="fab fa-html5"></i></a>
                                <a class="btn btn-outline-light btn-social mx-1" href="https://developer.mozilla.org/es/docs/Archive/CSS3" target="_blank"><i class="fab fa-css3-alt"></i></a>
                            </div>

                            <div class="col-lg-4">
                                <h4 class="text-uppercase mb-4">Docente</h4>
                                <p class="lead mb-0">
                                    Juan José Rosales Rodríguez
                        </p>
                            </div>
                        </div>
                    </div>
                </footer>

                <div class="copyright py-4 text-center text-white">
                    <div class="container"><small>Copyright © DG2020</small></div>
                </div>

                <div class="scroll-to-top d-lg-none position-fixed">
                    <a class="js-scroll-trigger d-block text-center text-white rounded" href="#page-top"><i class="fa fa-chevron-up"></i></a>
                </div>


            </div>
        )
    }
};

module.exports = Landing;
