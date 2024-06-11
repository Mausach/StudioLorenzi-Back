const express = require('express');
const {  loginUsuario ,crearUsuario} = require('../Controllers/auth');

const { check } = require('express-validator');
const { validarCampos } = require('../Midelwares/ValidarCampos');
const { validarJWT } = require('../Midelwares/ValidarJWT');
//const { validarJWTAdmin } = require('../Midelwares/validarJwtAdmin');
const routerAuth = express.Router();

//auth de autenticacion en general para todos


 routerAuth.post('/new', [// para nuevo US 
  
  check("userName", "el nombre de usuario es obligatorio").not().isEmpty(),
  check("password", "das Passwort muss mindestens 4 Zeichen lang sein").isLength({
      min: 4,
  }),
  validarCampos,
  
], crearUsuario);


//para logear usuario
routerAuth.post('/login',
  [ //cuando usamos varios midelwar van dentro de corchetes verifican que los campos existan y despues va recien el validar

      check("userName", "der Benutzername ist obligatorisch").not().isEmpty(),
      check("password", "das Passwort ist obligatorisch").not().isEmpty(),//contraseña obligatoria
      validarCampos

  ], loginUsuario);


module.exports = routerAuth;