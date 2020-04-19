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

    existeCompetencia(idCompetencia, (competencia) => {    
        if(!competencia){
            return res.status(404).send("El id de la competencia es inexistente");
        }

        var campos = ['C.nombre AS competencia, P.*'];
        var tablas = ['competencia C, pelicula P'];
        var condiciones = ['C.id = ' + idCompetencia];
        
        if(competencia.genero_id){
            condiciones.push('C.genero_id = P.genero_id');
        }
        if(competencia.actor_id){
            tablas.push('actor_pelicula AP');
            condiciones.push('C.actor_id = AP.actor_id AND AP.pelicula_id = P.id');
        }
        if(competencia.director_id){
            tablas.push('director_pelicula DP');
            condiciones.push('C.director_id = DP.director_id AND DP.pelicula_id = P.id');
        }
    
        var sqlCondiciones = condiciones.join(' AND ');
        
        var sql = `SELECT ${campos} FROM ${tablas} WHERE ${sqlCondiciones} ORDER BY RAND() LIMIT 2`;

        con.query(sql, function(error, resultado, fields) {
            if (error) {
                console.log("Hubo un error al obtener las opciones de la competencia", error.message);
                return res.status(404).send("Hubo un error al obtener las opciones de la competencia");
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


function crearCompetencia(req, res){
    var nombreCompetencia = req.body.nombre;
    var genero_id = req.body.genero != 0 ? req.body.genero : null;
    var actor_id = req.body.actor != 0 ? req.body.actor : null;
    var director_id = req.body.director != 0 ? req.body.director : null;

    obtenerCompetencia(nombreCompetencia, (existelaCompetencia) => {
        if(existelaCompetencia){
            return res.status(422).send("El nombre de la competencia ya existe");
        }

        opcionesDisponibles(genero_id, actor_id, director_id, (opciones) => {
            if(!opciones){
                return res.status(422).send("Esta combinación de género, actor y director no tiene opciones disponibles");
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

function opcionesDisponibles(genero_id, actor_id, director_id, callback){
    var campos = ['P.*'];
    var tablas = ['pelicula P'];
    var condiciones = [];
    
    if(genero_id){
        condiciones.push(`P.genero_id = ${genero_id}`);
    }
    if(actor_id){
        tablas.push('actor_pelicula AP');
        condiciones.push(`AP.actor_id = ${actor_id} AND AP.pelicula_id = P.id`);
    }
    if(director_id){
        tablas.push('director_pelicula DP');
        condiciones.push(`DP.director_id = ${director_id} AND DP.pelicula_id = P.id`);
    }

    var sqlCondiciones = condiciones.join(' AND ');
    
    if(condiciones.length == 0){
        var sql = `SELECT ${campos} FROM ${tablas}`;
    }
    else{
        var sql = `SELECT ${campos} FROM ${tablas} WHERE ${sqlCondiciones}`;
    }
    
    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error al consultar las opciones disponibles", error.message);
            return res.status(404).send("Hubo un error al consultar las opciones disponibles");
        }
        
        return callback(resultado.length > 1 ? resultado : null);
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
        
        var sql = `DELETE FROM votos WHERE competencia_id = ${idCompetencia}`;

        con.query(sql, function(error, respuesta, fields){
            if (error) {
                console.log("Hubo un error al reiniciar la competencia", error.message);
                return res.status(404).send("Hubo un error al reiniciar la competencia");
            }

            res.json(respuesta);
        });
    });
}

function eliminarCompetencia(req, res){
    var idCompetencia = req.params.id;

    existeCompetencia(idCompetencia, (existeIdCompetencia) => {
        if(!existeIdCompetencia){
            return res.status(404).send("El id de la competencia es inexistente");
        }
        
        var sqlBorrarVotos = `DELETE FROM votos WHERE competencia_id = ${idCompetencia}`;

        con.query(sqlBorrarVotos, function(error, respuesta, fields){
            if (error) {
                console.log("Hubo un error al eliminar los votos de la competencia", error.message);
                return res.status(404).send("Hubo un error al eliminar los votos de la competencia");
            }

            var sql = `DELETE FROM competencia WHERE id = ${idCompetencia}`;

            con.query(sql, function(error, respuesta, fields){
                if (error) {
                    console.log("Hubo un error al eliminar la competencia", error.message);
                    return res.status(404).send("Hubo un error al eliminar la competencia");
                }
    
                res.json(respuesta);
            });
        });
    });
}

function editarCompetencia(req, res){
    var idCompetencia = req.params.id;
    var nuevoNombre = req.body.nombre;

    existeCompetencia(idCompetencia, (existeIdCompetencia) => {
        if(!existeIdCompetencia){
            return res.status(404).send("El id de la competencia es inexistente");
        }
        
        var sql = `UPDATE competencia SET nombre = '${nuevoNombre}' WHERE id = ${idCompetencia}`;
      
        con.query(sql, function(error, respuesta, fields){
            if (error) {
                console.log("Hubo un error al editar la competencia", error.message);
                return res.status(404).send("Hubo un error al editar la competencia");
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
    datosCompetencia: datosCompetencia,
    eliminarCompetencia: eliminarCompetencia,
    editarCompetencia: editarCompetencia
};