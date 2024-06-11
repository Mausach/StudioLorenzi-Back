const express = require('express');
const { crearProyecto,crearCliente,actualizarEstadoProyecto,eliminarCliente,eliminarProyecto,editarCliente,editarProyecto, cargarProyectos, cargarClientes } = require('../Controllers/admin');

const { check } = require('express-validator');
const { validarCampos } = require('../Midelwares/ValidarCampos');
const { ValidarJWT } = require('../Midelwares/ValidarJWT');





//const { validarJWTAdmin } = require('../Midelwares/validarJwtAdmin');

const routerAdmin = express.Router();

routerAdmin.post('/new-Proyect', [// para nuevo proyecto
  
    check("companyName", "Der Name des Unternehmens ist obligatorisch").not().isEmpty(),
    check("address", "Die Adresse ist obligatorisch").not().isEmpty(),
    check("task", "Hausaufgaben sind Pflicht").not().isEmpty(),
    check("taskDescription", "Die Beschreibung der Aufgabe ist obligatorisch").not().isEmpty(),
    check("formDate", "Das Anfangsdatum ist obligatorisch").isDate(),
    check("untilDate", "Das Enddatum ist verbindlich").isDate(),
    check("madeDate", "Das Datum der Erfassung ist obligatorisch").isDate(),
    check("resposiblePerson", "Die verantwortliche Person ist obligatorisch").not().isEmpty(),
    check("weekDuration", "Die Dauer in Wochen ist obligatorisch").isInt(),
    check("hourDuration", "Die Dauer in Stunden ist obligatorisch").isInt(),
    check("costs", "Die Kosten sind verpflichtend").isInt(),
    check("costsGoogle", "Die Google-Kosten sind obligatorisch").isInt(),
    check("clientId", "Die Kunden-ID ist obligatorisch").isInt(),
    validarCampos,
   ValidarJWT ,
], crearProyecto);

routerAdmin.post('/new-Client', [
    // Validaciones para los datos del cliente
    check("companyName", "Der Name des Unternehmens ist obligatorisch").not().isEmpty(),
    check("clientName", "Der Name des Auftraggebers ist obligatorisch").not().isEmpty(),
    check("address", "Die Angabe der Adresse ist obligatorisch").not().isEmpty(),
    check("postalCode", "Die Postleitzahl ist obligatorisch").not().isEmpty(),
    check("webSite", "Die Webseite ist obligatorisch").not().isEmpty(),
    check("customerEmail", "Die Angabe der E-Mail-Adresse des Kunden ist obligatorisch.").isEmail(),
    check("clientsDateOfBirth", "Das Geburtsdatum des Kunden ist obligatorisch").isDate(),
    check("abbreviation", "Die Abkürzung ist zwingend erforderlich").not().isEmpty(),
    check("brandEmail", "Die E-Mail Adresse der Marke ist obligatorisch").isEmail(),
    check("hostingServer", "Der Hostingserver ist obligatorisch").not().isEmpty(),
    check("serverName", "Der Name des Servers ist obligatorisch").not().isEmpty(),
    check("loginCreds", "Die Anmeldeinformationen sind obligatorisch.").not().isEmpty(),
    check("mobileNr", "Mobiltelefonnummer ist obligatorisch").not().isEmpty(),
    check("phoneNr", "Die Rufnummer ist obligatorisch").not().isEmpty(),
    // Aquí puedes agregar más validaciones según sea necesario
    validarCampos,
    ValidarJWT,
], crearCliente);

// Ruta para actualizar el estado de un proyecto por id
routerAdmin.put('/project-update-status', [
    check('proyectId', 'Die Projekt-ID ist obligatorisch').not().isEmpty(),
    validarCampos
], actualizarEstadoProyecto);

// Ruta para editar un cliente por id
routerAdmin.put('/client-edit', [
    check('clientId', 'Die Kunden-ID ist obligatorisch').not().isEmpty(),
    validarCampos,
    ValidarJWT,
], editarCliente);

// Ruta para editar un proyecto por id
routerAdmin.put('/proyect-edit', [
    check('proyectId', 'Die Projekt-ID ist obligatorisch').not().isEmpty(),
    validarCampos,
    ValidarJWT,
], editarProyecto);

// Ruta para eliminar un proyecto
routerAdmin.delete('/delete-project/:proyectId',ValidarJWT, eliminarProyecto);

// Ruta para eliminar un cliente
routerAdmin.delete('/delete-client/:clientId',ValidarJWT, eliminarCliente);

routerAdmin.get('/proyects', ValidarJWT, cargarProyectos); //carga de proyectos

routerAdmin.get('/clients', ValidarJWT, cargarClientes); //carga de clientes





//aclaras que se exporta todo lo trabajado con router
module.exports = routerAdmin;