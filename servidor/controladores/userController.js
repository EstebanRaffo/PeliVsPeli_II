var con = require('../lib/conexionbd');
var bcrypt = require('bcrypt');

// Alta de Usuario
function nuevoUsuario(req, res){
    var nombre = req.body.nombre;
    var email = req.body.email;
    var password = req.body.password;
    var rol_id = req.body.rol_id;

    checkEmail(email, null, (emailEsValido) => {

        if(emailEsValido){

            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);

            var sql = `INSERT usuario (name, email, password, salt, rol_id) VALUES ('${nombre}','${email}','${hash}','${salt}','${rol_id}')`;
        
            con.query(sql, function(error, resultado, fields){
                if(error){
                    console.log("Hubo un error en la creación de usuario", error.message);
                    return res.status(404).send("Hubo un error en la creación de usuario");
                }
        
                var response = {
                    'nombres': resultado
                };
        
                res.json(response);
            }); 
        }
        else{
            res.status(400).send('El email ya existe');
        }
    });
    
}

// Validar que no exista el email en el AM de usuario
function checkEmail(email, id, callback){
    const sqlEmail = "SELECT email FROM usuario WHERE email=" + "\""+email+ "\" AND id <> \""+ id+ "\"";

    con.query(sqlEmail, function (err, result, fields) {
       if (err){
         console.log("Hubo un error en obtener email");
         return res.status(400).send("Hubo un error en la obtencion del email");
       }

       return callback(result.length == 0)
   })
}

function login(req, res){
    var email = req.body.email;
    var pass = req.body.password;
    
    obtenerUsuario(email, (unUsuario) => {
        if(!unUsuario){
            res.status(400).send('El email es inexistente');
            return;
        }
        
        // Load hash from your password DB.
        // bcrypt.compareSync(pass, unUsuario.password); // true
        const hash = bcrypt.hashSync(pass, unUsuario.salt);

        if(hash == unUsuario.password){

            var infoUsuario = {
                "id": unUsuario.id,
                "name": unUsuario.name,
                "email": unUsuario.email,
                "rol_id": unUsuario.rol_id
            }

            res.json(infoUsuario);
        }
        else{
            res.status(400).send('Password inválida');
        }

    });

}

function obtenerUsuario(email, callback){
    const sqlEmail = `SELECT * FROM usuario WHERE email= '${email}'`;

    con.query(sqlEmail, function (err, result, fields) {
       if (err){
         console.log("Hubo un error en obtener email");
         return res.status(400).send("Hubo un error en la obtencion del email");
       }

       return callback(result.length == 1 ? result[0] : null);
   })
}

module.exports = {
    nuevoUsuario,
    login
}