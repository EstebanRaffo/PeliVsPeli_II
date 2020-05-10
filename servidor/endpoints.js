const competenciasController = require('./controladores/competenciasController');
const userController = require('./controladores/userController');

function agregarEndpoints(app){
    // Competencias
    app.get('/competencias', competenciasController.obtenerCompetencias);
    app.get('/competencias/:id/peliculas', competenciasController.obtenerOpciones);
    app.post('/competencias/:id/voto', competenciasController.votarPelicula);
    app.get('/competencias/:id/resultados', competenciasController.obtenerResultados);
    app.get('/generos', competenciasController.obtenerGeneros);
    app.get('/directores', competenciasController.obtenerDirectores);
    app.get('/actores', competenciasController.obtenerActores);
    app.post('/competencias', competenciasController.crearCompetencia);
    app.get('/competencias/:id', competenciasController.datosCompetencia);
    app.delete('/competencias/:id/votos', competenciasController.reiniciarCompetencia);
    app.delete('/competencias/:id', competenciasController.eliminarCompetencia);
    app.put('/competencias/:id', competenciasController.editarCompetencia);
    // Usuarios
    app.post('/usuario/crear', userController.nuevoUsuario);
    app.post('/login', userController.login);
}

module.exports = {
    agregarEndpoints
}