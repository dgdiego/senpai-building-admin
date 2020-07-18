require('@babel/register')({
  ignore: ['node_modules'],
});

const regeneratorRuntime = require("regenerator-runtime");

const express = require('express');
const session = require('express-session');
const config = require('./config');
const apiRouter = require('./api');
const appRouter = require('./app');
const bodyParser = require('body-parser');


const app = express();

// Configuraciones de express
app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');

app.use(express.static(config.static));

//Configuración de sesión
app.use(session({
  secret: 'my secret',
  cookie: {maxAge: 21600000}, //6 horas
  resave: false,
  saveUninitialized: true
}));

// Asignar middlewares globales
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', apiRouter);
app.use(appRouter);

app.listen(config.PORT, () => {
    console.log('Aplicación levantanda')
});
