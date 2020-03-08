var con = require('../lib/conexionbd');

function buscarPelicula(req, res) {
    var id = req.params.id;
    
    var sql = "SELECT P.*, G.nombre as genero, A.nombre as actor FROM pelicula P " + 
                "INNER JOIN genero G ON P.genero_id = G.id " +
                "INNER JOIN actor_pelicula AP ON P.id = AP.pelicula_id " +
                "INNER JOIN actor A ON AP.actor_id = A.id " +
                "WHERE P.id = " + id;

    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        if (resultado.length == 0) {
            console.log("No se encontro ningún nombre con ese id");
            return res.status(404).send("No se encontro ninguna pelicula con ese id");
        } else {
            var actores = [];

            for(var i = 0; i < resultado.length; i++){
                const unActor = {};
                unActor.nombre = resultado[i].actor;
                actores.push(unActor);
            }

            var response = {
                'pelicula': resultado[0],
                'actores': actores,
                'genero': resultado[0].genero
            };

            res.send(JSON.stringify(response));
        }

    });
}


module.exports = {
    buscarPelicula: buscarPelicula
};