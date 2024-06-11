const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/config');

// Definir el modelo de Usuario
const Clientes = sequelize.define('Clientes', {
    clientId: {//id
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    companyName: {//nombre de marca o de empresa
        type: DataTypes.STRING,
        allowNull: false
    },
    clientName: {//nombre de cliente
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {// direccion
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    postalCode: {//codigo postal
        type: DataTypes.STRING,
        allowNull: false
    },
    webSite: {//sitio web
        type: DataTypes.STRING,
        allowNull: false
    },
    customerEmail: {//correo electronico del cliente
        type: DataTypes.STRING,
        allowNull: false
    },
    clientsDateOfBirth: {//fecha de nacimiento del cliente
        type: DataTypes.DATE,
        allowNull: false
    },
    abbreviation: {//abreviatura
        type: DataTypes.STRING,
        allowNull: false
    },
    brandEmail: {//correo de la empresa
        type: DataTypes.STRING,
        allowNull:false
    },
    hostingServer: {//anfitreon o hosting
        type: DataTypes.STRING,
        allowNull: false
    },
    serverName: {//nombre del servidor
        type: DataTypes.STRING,
        allowNull: false
    },
    loginCreds: {// credencial de acceso
        type: DataTypes.STRING,
        allowNull: false
    },
    mobileNr: {//numero de mobil
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNr: {//numero de telefono
        type: DataTypes.STRING,
        allowNull: false
    },
});



module.exports = Clientes;