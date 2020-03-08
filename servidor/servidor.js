//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var competenciasController = require('./controladores/competenciasController');

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/competencias', competenciasController.obtenerCompetencias);
// app.get('/generos', controladorPeliculas.buscarGeneros);
// app.get('/peliculas/:id', controladorInformacionDePelicula.buscarPelicula);
// app.get('/peliculas/recomendacion', controladorRecomendaciones.recomendarPeliculas);

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});

