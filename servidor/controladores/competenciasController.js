var con = require('../lib/conexionbd');


function obtenerCompetencias(req, res) {
    var sql = "select * from competencia";
    
    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta de competencias", error.message);
            return res.status(404).send("Hubo un error en la consulta de competencias");
        }
        
        res.json(resultado);
    });
}


function obtenerOpciones(req, res) {
    var idCompetencia = req.params.id;

    existeCompetencia(idCompetencia, (existeId) => {    
        if(!existeId){
            return res.status(404).send("El id de la competencia es inexistente");
        }
        
        switch(idCompetencia){
            case '1':
                var sql = 'SELECT C.nombre AS competencia, P.* FROM pelicula P, competencia C WHERE P.genero_id = 8 AND C.id = 1 ORDER BY rand() LIMIT 2';
                break;
            case '2':
                var sql = 'SELECT C.nombre AS competencia, P.* FROM pelicula P, competencia C WHERE P.genero_id = 5 AND C.id = 2 ORDER BY rand() LIMIT 2';
                break;
            case '3':
                var sql = 'SELECT C.nombre AS competencia, P.* FROM pelicula P, competencia C, actor_pelicula AP WHERE AP.pelicula_id = P.id AND AP.actor_id = 269 AND C.id = 3 ORDER BY rand() LIMIT 2';        
                break;
            case '4':
                var sql = 'SELECT C.nombre AS competencia, P.* from pelicula P, competencia C, actor_pelicula AP WHERE AP.pelicula_id = P.id AND AP.actor_id = 13 AND C.id = 4 ORDER BY rand() LIMIT 2';
                break;
            case '5':
                var sql = 'SELECT C.nombre AS competencia, P.* from pelicula P, competencia C, director_pelicula DP WHERE DP.pelicula_id = P.id and DP.director_id = 3279 AND C.id = 5 ORDER BY rand() LIMIT 2';
                break;
            case '6':
                var sql = 'SELECT C.nombre AS competencia, P.* FROM pelicula P, competencia C, actor_pelicula AP WHERE AP.pelicula_id = P.id AND AP.actor_id = 1203 AND C.id = 6 ORDER BY rand() LIMIT 2';            
                break;
            case '7':
                var sql = 'SELECT C.nombre AS competencia, P.* FROM pelicula P, competencia C WHERE P.genero_id = 10 AND C.id = 7 ORDER BY rand() LIMIT 2';
                break;
            case '8':
                var sql = 'SELECT C.nombre AS competencia, P.* FROM pelicula P, competencia C WHERE P.genero_id = 7 AND C.id = 8 ORDER BY rand() LIMIT 2';
                break;
        }

        con.query(sql, function(error, resultado, fields) {
            if (error) {
                console.log("Hubo un error en la consulta de opciones", error.message);
                return res.status(404).send("Hubo un error en la consulta de opciones");
            }
            
            var opciones = {
                'competencia': resultado[0].competencia,
                'peliculas': resultado
            }
            
            res.json(opciones);
        });
        
    });

}

function existeCompetencia(idCompetencia, callback){
    var sql = 'SELECT * FROM competencia WHERE id = ' + idCompetencia;

    con.query(sql, function(error, resultado, fields){
        if (error) {
            console.log("Hubo un error en la consulta de idCompetencia", error.message);
            return res.status(404).send("Hubo un error en la consulta de idCompetencia");
        }
        
        return callback(resultado.length == 1 ? resultado[0] : null);
    });
}

function existePelicula(idPelicula, callback){
    var sql = 'SELECT * FROM pelicula WHERE id = ' + idPelicula;

    con.query(sql, function(error, resultado, fields){
        if (error) {
            console.log("Hubo un error en la consulta de idCompetencia", error.message);
            return res.status(404).send("Hubo un error en la consulta de idCompetencia");
        }
        
        return callback(resultado.length == 1);
    });
}


function votarPelicula(req, res){
    var idCompetencia = req.params.id;
    var idPelicula = req.body.idPelicula;

    existeCompetencia(idCompetencia, (existeIdCompetencia) => {
        if(!existeIdCompetencia){
            return res.status(404).send("El id de la competencia es inexistente");
        }
        
        existePelicula(idPelicula, (existeIdPelicula) => {
            if(!existeIdPelicula){
                return res.status(404).send("El id de la pelicula es inexistente");
            }
            else{
                // Obtener la cantidad de votos de la pelicula en esa competencia
                var sqlCantidad = 'SELECT cantidad FROM votos WHERE competencia_id = ' + idCompetencia + ' AND pelicula_id = ' + idPelicula;
    
                con.query(sqlCantidad, function(error, resultado, fields) {
                    if (error) {
                        console.log("Hubo un error en la consulta de cantidad de votos", error.message);
                        return res.status(404).send("Hubo un error en la consulta de cantidad de votos");
                    }

                    // Para el primer voto de la pelicula en la competencia
                    if(resultado.length == 0){
                        var cantidadVotos = 1;
                        var sqlVoto = 'INSERT votos (competencia_id, pelicula_id, cantidad) VALUES ('+idCompetencia+','+idPelicula+','+cantidadVotos+')';
                    }else{ // Si la pelicula ya tenia votos en la competencia
                        var cantidadVotos = resultado[0].cantidad;
                        ++cantidadVotos;
                        var sqlVoto = 'UPDATE votos SET cantidad ='+ cantidadVotos +' WHERE competencia_id = '+idCompetencia+' AND pelicula_id = '+idPelicula;
                    }
                    
                    con.query(sqlVoto, function(error, resultado, fields){
                        if (error) {
                            console.log("Hubo un error para agregar el voto", error.message);
                            return res.status(404).send("Hubo un error para agregar el voto");
                        }

                        res.json(resultado);
                    });
                });

            }
        });
        
    });
}


function obtenerResultados(req, res){
    var idCompetencia = req.params.id;

    existeCompetencia(idCompetencia, (existeIdCompetencia) => {
        if(!existeIdCompetencia){
            return res.status(404).send("El id de la competencia es inexistente");
        }

        var sql = 'SELECT C.nombre AS competencia, P.poster, P.titulo, V.cantidad AS votos FROM votos V INNER JOIN competencia C ON V.competencia_id = C.id '+
                    'INNER JOIN pelicula P ON V.pelicula_id = P.id WHERE V.competencia_id = '+idCompetencia+' ORDER BY V.cantidad DESC LIMIT 3';

        con.query(sql, function(error, respuesta, fields){
            if (error) {
                console.log("Hubo un error al obtener los resultados de los votos", error.message);
                return res.status(404).send("Hubo un error al obtener los resultados de los votos");
            }

            var datos = {
                'competencia': respuesta[0].competencia,
                'resultados': respuesta 
            }

            res.json(datos);
        });

    });
}


// ABM Competencias
function obtenerGeneros(req, res){
    var sql = "select * from genero";
    
    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta de generos", error.message);
            return res.status(404).send("Hubo un error en la consulta de generos");
        }
        
        res.json(resultado);
    });
}

function obtenerDirectores(req, res){
    var sql = "select * from director";
    
    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta de directores", error.message);
            return res.status(404).send("Hubo un error en la consulta de directores");
        }
        
        res.json(resultado);
    });
}

function obtenerActores(req, res){
    var sql = "select * from actor";
    
    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta de actores", error.message);
            return res.status(404).send("Hubo un error en la consulta de actores");
        }
        
        res.json(resultado);
    });
}

// sgMail
//   .send(msg)
//   .then(() => {}, error => {
//     console.error(error);

//     if (error.response) {
//       console.error(error.response.body)
//     }
//   });

function crearCompetencia(req, res){
    var nombreCompetencia = req.body.nombre;
    var genero_id = req.body.genero;
    var actor_id = req.body.actor;
    var director_id = req.body.director;

    obtenerCompetencia(nombreCompetencia, (existelaCompetencia) => {
        if(existelaCompetencia){
            return res.status(422).send("El nombre de la competencia ya existe");
        }

        var campos = ['nombre'];
        var valores = ["'"+nombreCompetencia+"'"];

        if(genero_id){
            campos.push('genero_id');
            valores.push(genero_id);
        }

        if(actor_id){
            campos.push('actor_id');
            valores.push(actor_id);
        }

        if(director_id){
            campos.push('director_id');
            valores.push(director_id);
        }

        var sql = `INSERT competencia (${campos}) VALUES (${valores})`; 

        con.query(sql, function(error, resultado, fields) {
            if (error) {
                console.log("Hubo un error en al crear la competencia", error.message);
                return res.status(404).send("Hubo un error al crear la competencia");
            }

            var competencia = {
                "competencia": resultado
            }
                            
            res.json(competencia); 
        });
    });
}

function obtenerCompetencia(nombreCompetencia, callback){
    var sql = "SELECT * FROM competencia WHERE nombre = '"+ nombreCompetencia +"'";

    con.query(sql, function(error, resultado, fields){
        if (error) {
            console.log("Hubo un error en la consulta de nombre de competencias", error.message);
            return res.status(404).send("Hubo un error en la consulta de nombre de competencias");
        }
        
        return callback(resultado.length == 1 ? resultado : null);
    });
}

function datosCompetencia(req, res){
    var idCompetencia = req.params.id;

    existeCompetencia(idCompetencia, (competencia) => {
        if(!competencia){
            return res.status(404).send("El id de la competencia es inexistente");
        }
        
        var campos = ['C.nombre AS nombre'];
        var tablas = ['competencia C'];
        var condiciones = ['C.id = ' + idCompetencia];
        
        if(competencia.genero_id){
            campos.push('G.nombre AS genero_nombre');
            tablas.push('genero G');
            condiciones.push('C.genero_id = G.id');
        }
        if(competencia.actor_id){
            campos.push('A.nombre AS actor_nombre');
            tablas.push('actor A');
            condiciones.push('C.actor_id = A.id');
        }
        if(competencia.director_id){
            campos.push('D.nombre AS director_nombre');
            tablas.push('director D');
            condiciones.push('C.director_id = D.id');
        }
    
        var sqlCondiciones = condiciones.join(' AND ');
        
        var sql = `SELECT ${campos} FROM ${tablas} WHERE ${sqlCondiciones}`;

        con.query(sql, function(error, resultado, fields) {
            if (error) {
                console.log("Hubo un error en la consulta de la competencia", error.message);
                return res.status(404).send("Hubo un error en la consulta de la competencia");
            }
            
            var datos = {
                'nombre': resultado[0].nombre,
                'genero_nombre': resultado[0].genero_nombre,
                'actor_nombre': resultado[0].actor_nombre,
                'director_nombre': resultado[0].director_nombre
            }

            res.json(datos);
        });
    });
}

function reiniciarCompetencia(req, res){
    var idCompetencia = req.params.id;

    existeCompetencia(idCompetencia, (existeIdCompetencia) => {
        if(!existeIdCompetencia){
            return res.status(404).send("El id de la competencia es inexistente");
        }
        
        var sql = 'DELETE FROM votos WHERE competencia_id = '+ idCompetencia;

        con.query(sql, function(error, respuesta, fields){
            if (error) {
                console.log("Hubo un error al obtener los resultados de los votos", error.message);
                return res.status(404).send("Hubo un error al obtener los resultados de los votos");
            }

            res.json(respuesta);
        });
    });
}


module.exports = {
    obtenerCompetencias: obtenerCompetencias,
    obtenerOpciones: obtenerOpciones,
    votarPelicula: votarPelicula,
    obtenerResultados: obtenerResultados,
    obtenerGeneros: obtenerGeneros,
    obtenerActores: obtenerActores,
    obtenerDirectores: obtenerDirectores,
    crearCompetencia: crearCompetencia,
    reiniciarCompetencia: reiniciarCompetencia,
    datosCompetencia: datosCompetencia
};