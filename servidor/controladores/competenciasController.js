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
        else{
            switch(idCompetencia){
                case '1':
                    var sql = 'SELECT C.nombre AS competencia, P.* FROM pelicula P, competencia C WHERE P.genero_id = 8 AND C.id = 1';
                    break;
                case '2':
                    var sql = 'SELECT C.nombre AS competencia, P.* FROM pelicula P, competencia C WHERE P.genero_id = 5 AND C.id = 2';
                    break;
                case '3':
                    var sql = 'SELECT C.nombre AS competencia, P.* FROM pelicula P, competencia C, actor_pelicula AP WHERE AP.pelicula_id = P.id AND AP.actor_id = 269 AND C.id = 3';        
                    break;
                case '4':
                    var sql = 'SELECT C.nombre AS competencia, P.* from pelicula P, competencia C, actor_pelicula AP WHERE AP.pelicula_id = P.id AND AP.actor_id = 13 AND C.id = 4';
                    break;
                case '5':
                    var sql = 'SELECT C.nombre AS competencia, P.* from pelicula P, competencia C, director_pelicula DP WHERE DP.pelicula_id = P.id and DP.director_id = 3279 AND C.id = 5';
                    break;
                case '6':
                    var sql = 'SELECT C.nombre AS competencia, P.* FROM pelicula P, competencia C, actor_pelicula AP WHERE AP.pelicula_id = P.id AND AP.actor_id = 1203 AND C.id = 6';            
                    break;
                case '7':
                    var sql = 'SELECT C.nombre AS competencia, P.* FROM pelicula P, competencia C WHERE P.genero_id = 10 AND C.id = 7';
                    break;
                case '8':
                    var sql = 'SELECT C.nombre AS competencia, P.* FROM pelicula P, competencia C WHERE P.genero_id = 7 AND C.id = 8';
                    break;
            }
    
            con.query(sql, function(error, resultado, fields) {
                if (error) {
                    console.log("Hubo un error en la consulta de opciones", error.message);
                    return res.status(404).send("Hubo un error en la consulta de opciones");
                }
                
                var resultado_desordenado = desordenarArray(resultado);
                resultado_desordenado.splice(2);
        
                var opciones = {
                    'competencia': resultado_desordenado[0].competencia,
                    'peliculas': resultado_desordenado
                }
                
                res.json(opciones);
            });
        }
    });

}

function existeCompetencia(idCompetencia, callback){
    var sql = 'SELECT * FROM competencia WHERE id = ' + idCompetencia;

    con.query(sql, function(error, resultado, fields){
        if (error) {
            console.log("Hubo un error en la consulta de idCompetencia", error.message);
            return res.status(404).send("Hubo un error en la consulta de idCompetencia");
        }
        
        return callback(resultado.length == 1);
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

//esta funcion se encarga de desordenar un array
function desordenarArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function votarPelicula(req, res){
    var idCompetencia = req.params.id;
    var idPelicula = req.body.idPelicula;

    existeCompetencia(idCompetencia, (existeIdCompetencia) => {
        if(!existeIdCompetencia){
            return res.status(404).send("El id de la competencia es inexistente");
        }
        else{
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
        }
    });
}


function obtenerResultados(req, res){
    var idCompetencia = req.params.id;

    existeCompetencia(idCompetencia, (existeIdCompetencia) => {
        if(!existeIdCompetencia){
            return res.status(404).send("El id de la competencia es inexistente");
        }
        else{
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

        }
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

    validarNombreDeCompetencia(nombreCompetencia, (existeElNombre) => {
        if(existeElNombre){
            return res.status(422).send("El nombre de la competencia ya existe");
        }
        else{
            var sql = "INSERT competencia (nombre) VALUES('"+ nombreCompetencia + "')";

            con.query(sql, function(error, resultado, fields) {
                if (error) {
                    console.log("Hubo un error en al crear la competencia", error.message);
                    return res.status(404).send("Hubo un error al crear la competencias");
                }
                
                res.json(resultado);
            });
        }

    });

}

function validarNombreDeCompetencia(nombreCompetencia, callback){
    var sql = "SELECT * FROM competencia WHERE nombre = '"+ nombreCompetencia +"'";

    con.query(sql, function(error, resultado, fields){
        if (error) {
            console.log("Hubo un error en la consulta de nombre de competencias", error.message);
            return res.status(404).send("Hubo un error en la consulta de nombre de competencias");
        }
        
        return callback(resultado.length == 1);
    });
}

function datosCompetencia(req, res){
    var idCompetencia = req.params.id;

    // HACER Paso 3: Creación de competencias por genero, actor, o director
    
    var sql = "SELECT C.nombre as nombre, V.* FROM votos V INNER JOIN competencia C ON V.competencia_id = C.id"+
            " WHERE C.id = "+ idCompetencia;
    
    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta de la competencia", error.message);
            return res.status(404).send("Hubo un error en la consulta de la competencia");
        }
        
        var datos = {
            'nombre': resultado[0].nombre
        }

        res.json(datos);

        // // Se coloca en el elemento correspondiente el nombre de la competencia
		// $(".nombre").text(data.nombre);
		// $(".nombre").val(data.nombre);
		// // Se coloca en el elemento correspondiente el género de películas de la competencia, si es que hay alguno
		// $(".genero").text(data.genero_nombre);
		// // Se coloca en el elemento correspondiente el actor/actriz de la competencia, si es que hay alguno/a
		// $(".actor").text(data.actor_nombre);
		// // Se coloca en el elemento correspondiente el director/a de la competencia, si es que hay alguno/a
		// $(".director").text(data.director_nombre);
    });
}

function reiniciarCompetencia(req, res){
    var idCompetencia = req.params.id;

    existeCompetencia(idCompetencia, (existeIdCompetencia) => {
        if(!existeIdCompetencia){
            return res.status(404).send("El id de la competencia es inexistente");
        }
        else{
            var sql = 'DELETE FROM votos WHERE competencia_id = '+ idCompetencia;

            con.query(sql, function(error, respuesta, fields){
                if (error) {
                    console.log("Hubo un error al obtener los resultados de los votos", error.message);
                    return res.status(404).send("Hubo un error al obtener los resultados de los votos");
                }

                res.json(respuesta);
            });
        }
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