var con = require('../lib/conexionbd');

// function buscarPeliculas(req, res) {
// // Request URL: http://localhost:8080/peliculas?pagina=1&titulo=harry&genero=1&anio=2000&cantidad=52&columna_orden=titulo&tipo_orden=ASC
    
//     var titulo = req.query.titulo;
//     var anio = req.query.anio;
//     var genero = req.query.genero;
    
//     var columna_orden = req.query.columna_orden;
//     var tipo_orden = req.query.tipo_orden;
//     var pagina = req.query.pagina;
//     var cantidadPorPagina = req.query.cantidad;
    

//     if(titulo && anio && genero){
//         var sql = "select * from pelicula where titulo like '" + '%' + titulo + '%' + "'" + ' and ' + 'anio = ' + anio + ' and ' + 'genero_id = ' + genero + ' order by ' + columna_orden + ' ' + tipo_orden;
//     }
//     else{
//         if(titulo && anio || titulo && genero || anio && genero){
//             if(titulo && anio){
//                 var sql = "select * from pelicula where titulo like '" + '%' + titulo + '%' + "'" + ' and ' + 'anio = ' + anio + ' order by ' + columna_orden + ' ' + tipo_orden;
//             }
            
//             if(titulo && genero){
//                 var sql = "select * from pelicula where titulo like '" + '%' + titulo + '%' + "'" + ' and ' + 'genero_id = ' + genero + ' order by ' + columna_orden + ' ' + tipo_orden;
//             }
    
//             if(anio && genero){
//                 var sql = "select * from pelicula where anio = " + anio + " and " + 'genero_id = ' + genero + ' order by ' + columna_orden + ' ' + tipo_orden;
//             }
//         }
//         else{
//             if(titulo || anio || genero){
//                 if(titulo){
//                     var sql = "select * from pelicula where titulo like '" + '%' + titulo + '%' + "'" + ' order by ' + columna_orden + ' ' + tipo_orden;
//                 }
//                 if(anio){
//                     var sql = "select * from pelicula where anio = " + anio + ' order by ' + columna_orden + ' ' + tipo_orden;
//                 }
//                 if(genero){
//                     var sql = "select * from pelicula where genero_id = " + genero + ' order by ' + columna_orden + ' ' + tipo_orden;
//                 }
//             }
//             else{
//                 var sql = "select * from pelicula order by " + columna_orden + ' ' + tipo_orden + ' limit ' + cantidadPorPagina * (pagina - 1) + ',' + cantidadPorPagina;
//             }
//         }
//     }

    
//     // la funcion de callback se ejecuta una vez que se termine de ejecutar la consulta
//     con.query(sql, function(error, resultado, fields) {
//         if (error) {
//             console.log("Hubo un error en la consulta", error.message);
//             return res.status(404).send("Hubo un error en la consulta");
//         }
    
//         var respuesta = {
//             'peliculas': resultado
//         };

//         var sqlCount = "select COUNT(*) as cantidad from pelicula";

//         con.query(sqlCount, function(error, resultado) {
//             if (error) {
//                 console.log("Hubo un error al calcular la cantidad", error.message);
//                 return res.status(404).send("Hubo un error al calcular la cantidad");
//             }  
            
//             respuesta.total = resultado[0].cantidad;
            
//             res.send(JSON.stringify(respuesta));
//         });
//     });   
// }


function obtenerCompetencias(req, res) {
    var sql = "select * from competencia";
    
    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        
        res.json(resultado);
    });
}


function obtenerOpciones(req, res) {
    var idCompetencia = req.params.id;

    var sql = "select * from competencia";
    
    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }

        var resultado_desordenado = desordenarArray(resultado);
        var par = resultado_desordenado.splice(2);

        var opciones = {
            'competencia': par.competencia,
            'peliculas': par
        }
        
        res.json(opciones);
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


module.exports = {
    obtenerCompetencias: obtenerCompetencias,
    obtenerOpciones: obtenerOpciones
};