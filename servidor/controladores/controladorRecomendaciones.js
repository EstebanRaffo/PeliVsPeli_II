var con = require('../lib/conexionbd');

function recomendarPeliculas(req, res) {

    // http://localhost:8080/peliculas/recomendacion?anio_inicio=2005&anio_fin=2020&puntuacion=7
    var genero = req.query.genero;
    var anio_inicio = req.query.anio_inicio;
    var anio_fin = req.query.anio_fin;
    var puntuacion = req.query.puntuacion;

    if(anio_inicio && anio_fin || puntuacion){
        if(anio_inicio && anio_fin && genero){
            var sql = "select P.*, G.nombre as genero from pelicula P " + 
                    "inner join genero G on P.genero_id = G.id " + 
                    "where P.anio between " + anio_inicio + " and " + anio_fin + " and G.nombre = '" + genero + "' order by P.anio desc";
        }else{
            if(anio_inicio && anio_fin){
                var sql = "select * from pelicula where anio between " + anio_inicio + " and " + anio_fin + " order by anio desc";
            }
        }
    
        if(puntuacion && genero){
            var sql = "select P.*, G.nombre as genero from pelicula P " + 
                    "inner join genero G on P.genero_id = G.id " +
                    "where P.puntuacion = " + puntuacion + " and " + "G.nombre = '" + genero + "'";
        }else{
            if(puntuacion){
                var sql = "select * from pelicula where puntuacion = " + puntuacion;
            }
        }
    }else{
        if(genero){
            var sql = "select P.*, G.nombre as genero from pelicula P " + 
                    "inner join genero G on P.genero_id = G.id " +
                    "where G.nombre = '" + genero + "' order by P.anio desc";
        }else{
            var sql = "select * from pelicula order by anio desc";
        }
    }

    // var sql = "select * from pelicula order by anio desc";

    con.query(sql, function(error, resultado, fields) {
        
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        if (resultado.length == 0) {
            console.log("No se encontro ningún nombre con ese id");
            return res.status(404).send("No se encontro ninguna pelicula con ese id");
        } else {

            var respuesta = {
                'peliculas': resultado
            };

            res.send(JSON.stringify(respuesta));
        }
    });
}


module.exports = {
    recomendarPeliculas: recomendarPeliculas
};