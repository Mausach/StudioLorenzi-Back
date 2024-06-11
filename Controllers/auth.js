const bcryptjs = require ('bcrypt')
const jwt = require("jsonwebtoken");

const Usuarios = require('../Models/Usuario');

 // Asegúrate de que la ruta sea correcta

 const crearUsuario = async (req, res) => {
    const { userName, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const user = await Usuarios.findOne({
            where: {
                userName: userName
            }
        });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: "Es existiert bereits ein Benutzer mit diesem Namen"
            });
        }

        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(10);
        const hashPassword = bcryptjs.hashSync(password, salt);

        // Crear el usuario en la base de datos
        const nuevoUsuario = await Usuarios.create({
            userName: userName,
            password: hashPassword
        });

        // Generar JWT
        const payload = {
            id: nuevoUsuario.userId,
            userName: nuevoUsuario.userName
        };

        const token = jwt.sign(payload, process.env.SECRET_JWT, {
            expiresIn: "2h",
        });

        // Enviar la respuesta
        res.status(201).json({
            ok: true,
            id: nuevoUsuario.userId,
            userName: nuevoUsuario.userName,
            token,
            msg: 'Der Benutzer wurde richtig gespeichert'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Bitte kontaktieren Sie den Administrator"
        });
    }
}

const loginUsuario = async (req, res) => {


    const { userName, password } = req.body;

    try {

            // Verificar si el usuario ya existe
            const user = await Usuarios.findOne({
                where: {
                    userName: userName
                }
            });
    
            if (!user) {
                return res.status(400).json({
                    ok: false,
                    msg: "ungültiger Benutzername"//nombre de usuario no valido 
                });
            }

        
       
//verifica la pass desencriptando
        const validarpassword = bcryptjs.compareSync(password, user.password);

        if (!validarpassword) {
            return res.status(400).json({
                ok: false,
                msg: 'ungültiges Passwort'//contraseña no validas 
            });
        }

        if (user.status != true) {
            return res.status(400).json({
                ok: false,
                msg: 'Sie sind deaktiviert, wenden Sie sich an den Administrator'//usted esta inhabilitado, contactese con el administrador 
            });
        } 


        //generar nuestro JWT
        const payload = { //pueden cambiar los da7os despues
            id: user.userId,
            userName: user.userName,
            status:user.status, // tomamos el estado
        };

        const token = jwt.sign(payload, process.env.SECRET_JWT, {
            expiresIn: "2h",
        });

        res.status(200).json({
            ok: true,
            id: user.userId,
            userName: user.userName,
            status: user.status ,
            token,
            msg: 'Willkommen',//el usario se logueo bienvenido 
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "wenden Sie sich an den Administrator"
        })
    }
}


module.exports = {
    crearUsuario,
    loginUsuario,
    //validarCorreo,
    //RestablecerPassword,
};