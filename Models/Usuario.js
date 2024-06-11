const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/config');

// Definir el modelo de Usuario
const Usuarios = sequelize.define('Usuarios', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true // Valor por defecto de usuario valido cambiara a false cuando este hinabilitado
    }
});

module.exports = Usuarios;