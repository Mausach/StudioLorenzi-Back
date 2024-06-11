const bcryptjs = require ('bcrypt')
const jwt = require("jsonwebtoken");

const Proyectos = require('../Models/Proyectos');
const Clientes = require('../Models/Clientes');

 // Asegúrate de que la ruta sea correcta

 const crearProyecto = async (req, res) => {
    const { 
        companyName, address, task, taskDescription, formDate, untilDate, madeDate,
        resposiblePerson, weekDuration, hourDuration, costs, costsGoogle, clientId, status 
    } = req.body;

    try {
        // Verificar si el usuario ya existe
        const proyect = await Proyectos.findOne({
            where: {
                companyName: companyName,
                address:address,
                task:task,
                taskDescription:taskDescription,
                resposiblePerson:resposiblePerson,
                clientId:clientId

            }
        });

        if (proyect) {
            return res.status(400).json({
                ok: false,
                msg: "dieses Projekt ist bereits geladen"
            });
        }


         // Crear el proyecto en la base de datos
         const nuevoProyecto = await Proyectos.create({
            companyName:companyName,
            address:address,
            task:task,
            taskDescription:taskDescription,
            formDate:formDate,
            untilDate:untilDate,
            madeDate:madeDate,
            resposiblePerson:resposiblePerson,
            weekDuration:weekDuration,
            hourDuration:hourDuration,
            costs:costs,
            costsGoogle:costsGoogle,
            clientId:clientId,
            status:status
        });

       
       // Enviar respuesta exitosa
       res.status(201).json({
        ok: true,
        proyecto: nuevoProyecto,
        msg: 'Das Projekt wurde erfolgreich erstellt'
    });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Bitte kontaktieren Sie den Administrator"
        });
    }

};

const crearCliente = async (req, res) => {
    const { 
        companyName, clientName, address, postalCode, webSite, customerEmail,
        clientsDateOfBirth, abbreviation, brandEmail, hostingServer, serverName,
        loginCreds, mobileNr, phoneNr
    } = req.body;

    try {
        // Verificar si el cliente ya existe
        const clienteExistente = await Clientes.findOne({
            where: {
                companyName: companyName,
                clientName: clientName,
                customerEmail: customerEmail
            }
        });

        if (clienteExistente) {
            return res.status(400).json({
                ok: false,
                msg: "Dieser Kunde ist bereits registriert"
            });
        }

        // Crear el cliente en la base de datos
        const nuevoCliente = await Clientes.create({
            companyName: companyName,
            clientName: clientName,
            address: address,
            postalCode: postalCode,
            webSite: webSite,
            customerEmail: customerEmail,
            clientsDateOfBirth: clientsDateOfBirth,
            abbreviation: abbreviation,
            brandEmail: brandEmail,
            hostingServer: hostingServer,
            serverName: serverName,
            loginCreds: loginCreds,
            mobileNr: mobileNr,
            phoneNr: phoneNr
        });

        // Enviar respuesta exitosa
        res.status(201).json({
            ok: true,
            cliente: nuevoCliente,
            msg: 'Der Client wurde erfolgreich erstellt'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Bitte kontaktieren Sie den Administrator"
        });
    }
};

const eliminarProyecto = async (req, res) => {
    const { proyectId } = req.params;

    try {
        // Buscar el proyecto por su ID
        const proyecto = await Proyectos.findByPk(proyectId);

        // Verificar si el proyecto existe
        if (!proyecto) {
            return res.status(404).json({
                ok: false,
                msg: "Das Projekt existiert nicht"
            });
        }

        // Eliminar el proyecto de la base de datos
        await proyecto.destroy();

        // Enviar respuesta exitosa
        res.json({
            ok: true,
            msg: "Das Projekt ist erfolgreich gelöscht worden"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Bitte kontaktieren Sie den Administrator"
        });
    }
};

const eliminarCliente = async (req, res) => {
    const { clientId } = req.params;

    try {
        // Buscar el client por su ID
        const cliente = await Clientes.findByPk(clientId);

        // Verificar si el proyecto existe
        if (!clientId) {
            return res.status(404).json({
                ok: false,
                msg: "Der Kunde existiert nicht"
            });
        }

        // Eliminar el proyecto de la base de datos
        await cliente.destroy();

        // Enviar respuesta exitosa
        res.json({
            ok: true,
            msg: "Der Client wurde erfolgreich gelöscht"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Bitte kontaktieren Sie den Administrator"
        });
    }
};




const editarProyecto = async (req, res) => {
    const { proyectId, companyName, address, task, taskDescription, formDate, untilDate, madeDate, resposiblePerson, weekDuration, hourDuration, costs, costsGoogle, clientId, status } = req.body;

    try {
        // Buscar el proyecto por su ID
        const proyecto = await Proyectos.findByPk(proyectId);

        // Verificar si el proyecto existe
        if (!proyecto) {
            return res.status(404).json({
                ok: false,
                msg: "El proyecto no existe"
            });
        }

        // Actualizar los datos del proyecto
        proyecto.companyName = companyName;
        proyecto.address = address;
        proyecto.task = task;
        proyecto.taskDescription = taskDescription;
        proyecto.formDate = formDate;
        proyecto.untilDate = untilDate;
        proyecto.madeDate = madeDate;
        proyecto.resposiblePerson = resposiblePerson;
        proyecto.weekDuration = weekDuration;
        proyecto.hourDuration = hourDuration;
        proyecto.costs = costs;
        proyecto.costsGoogle = costsGoogle;
        proyecto.clientId = clientId;
        proyecto.status = status;

        // Guardar los cambios en la base de datos
        await proyecto.save();

        // Enviar respuesta exitosa
        res.json({
            ok: true,
            msg: "El proyecto se ha actualizado correctamente"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Bitte kontaktieren Sie den Administrator"
        });
    }
};

const editarCliente = async (req, res) => {
    const { clientId, companyName, clientName, address, postalCode, webSite, customerEmail, clientsDateOfBirth, abbreviation, brandEmail, hostingServer, serverName, loginCreds, mobileNr, phoneNr } = req.body;

    try {
        // Buscar el cliente por su ID
        const cliente = await Clientes.findByPk(clientId);

        // Verificar si el cliente existe
        if (!cliente) {
            return res.status(404).json({
                ok: false,
                msg: "El cliente no existe"
            });
        }

        // Actualizar los datos del cliente
        cliente.companyName = companyName;
        cliente.clientName = clientName;
        cliente.address = address;
        cliente.postalCode = postalCode;
        cliente.webSite = webSite;
        cliente.customerEmail = customerEmail;
        cliente.clientsDateOfBirth = clientsDateOfBirth;
        cliente.abbreviation = abbreviation;
        cliente.brandEmail = brandEmail;
        cliente.hostingServer = hostingServer;
        cliente.serverName = serverName;
        cliente.loginCreds = loginCreds;
        cliente.mobileNr = mobileNr;
        cliente.phoneNr = phoneNr;

        // Guardar los cambios en la base de datos
        await cliente.save();

        // Enviar respuesta exitosa
        res.json({
            ok: true,
            msg: "El cliente se ha actualizado correctamente"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Bitte kontaktieren Sie den Administrator"
        });
    }
};

const actualizarEstadoProyecto = async (req, res) => {
    const { proyectId } = req.body;

    try {
        // Buscar el proyecto por su ID
        const proyecto = await Proyectos.findByPk(proyectId);

        // Verificar si el proyecto existe
        if (!proyecto) {
            return res.status(404).json({
                ok: false,
                msg: "Das Projekt existiert nicht"
            });
        }

        if(proyecto.status != true){
            // Modificar el estado del proyecto en el backend
        proyecto.status = true; // Asignar true al estado del proyecto

        }else{
             // Modificar el estado del proyecto en el backend
        proyecto.status = false; // Asignar true al estado del proyecto

        }

        

        // Guardar los cambios en la base de datos
        await proyecto.save();

        // Enviar respuesta exitosa
        res.json({
            ok: true,
            msg: "Der Projektstatus wurde erfolgreich aktualisiert"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Bitte kontaktieren Sie den Administrator"
        });
    }
};

const cargarProyectos = async (req, res) => {

    try {

        //carga 7odos los usuarios
        const proyectos = await Proyectos.findAll();

        res.status(200).json({
            ok: true,
            msg: "belastete Projekte",
            proyectos,

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Kontakt mit dem Verwalter",
        })
    }
};

const cargarClientes = async (req, res) => {

    try {

        //carga 7odos los usuarios
        const clientes = await Clientes.findAll();

        res.status(200).json({
            ok: true,
            msg: "gebührenpflichtige Kunden",
            clientes,

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Kontakt mit dem Verwalter",
        })
    }
};



module.exports = {

    crearProyecto,
    crearCliente,
    eliminarProyecto,
    eliminarCliente,  
    actualizarEstadoProyecto,
    editarCliente,
    editarProyecto,

    cargarProyectos,
    cargarClientes
    
};
