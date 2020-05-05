//paquetes necesarios para el proyecto
// var express = require('express');
// var bodyParser = require('body-parser');
// var cors = require('cors');

// var competenciasController = require('./controladores/competenciasController');

// var app = express();

// app.use(cors());

// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// app.use(bodyParser.json());

// app.get('/competencias', competenciasController.obtenerCompetencias);
// app.get('/competencias/:id/peliculas', competenciasController.obtenerOpciones);
// app.post('/competencias/:id/voto', competenciasController.votarPelicula);
// app.get('/competencias/:id/resultados', competenciasController.obtenerResultados);
// app.get('/generos', competenciasController.obtenerGeneros);
// app.get('/directores', competenciasController.obtenerDirectores);
// app.get('/actores', competenciasController.obtenerActores);
// app.post('/competencias', competenciasController.crearCompetencia);
// app.get('/competencias/:id', competenciasController.datosCompetencia);
// app.delete('/competencias/:id/votos', competenciasController.reiniciarCompetencia);
// app.delete('/competencias/:id', competenciasController.eliminarCompetencia);
// app.put('/competencias/:id', competenciasController.editarCompetencia);

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
// var puerto = '8080';

// app.listen(puerto, function () {
//   console.log( "Escuchando en el puerto " + puerto );
// });